import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HospitalLanding from "./pages/HospitalLanding";
import Login from "./login";
import SignUpPage from "./SignUp";  // ← ADD THIS
import DoctorDashboard from "./components/DoctorDashboard";
import { PatientDashboard, NurseDashboard, AdminDashboard } from "./pages/Dashboards";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HospitalLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpPage />} /> {/* ← ADD THIS */}

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