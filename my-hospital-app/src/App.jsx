import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HospitalLanding from "./pages/HospitalLanding";
import Login from "./login";
import DoctorDashboard from "./components/DoctorDashboard";

// Placeholder dashboards until you build the real ones
const PatientDashboard = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>🧑‍⚕️ Patient Dashboard</h2>
    <p>Coming soon...</p>
  </div>
);

const NurseDashboard = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>👩‍⚕️ Nurse Dashboard</h2>
    <p>Coming soon...</p>
  </div>
);

const AdminDashboard = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>🛠️ Admin Dashboard</h2>
    <p>Coming soon...</p>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HospitalLanding />} />
          <Route path="/login" element={<Login />} />

          <Route path="/doctor" element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/patient" element={
            <ProtectedRoute allowedRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/nurse" element={
            <ProtectedRoute allowedRole="nurse">
              <NurseDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}