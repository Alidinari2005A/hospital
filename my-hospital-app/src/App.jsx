import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HospitalLanding from "./pages/HospitalLanding";
import Login from "./login";
import DoctorDashboard from "./components/DoctorDashboard";

// ✅ REMOVED: Settings import here — Settings is rendered inside DoctorDashboard directly
// No need for a standalone /settings route anymore

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
          {/* Public routes */}
          <Route path="/" element={<HospitalLanding />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
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

          {/* ✅ REMOVED the broken /settings route — Settings now lives inside
              DoctorDashboard's internal router (renderPage), so clicking Settings
              in the sidebar renders <Settings /> directly without any route conflict. */}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}