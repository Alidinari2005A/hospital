import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wraps a route so only logged-in users with the correct role can access it.
 * allowedRole: "doctor" | "patient" | "nurse" | "admin"
 */
export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) return <Navigate to="/login" replace />;

  return children;
}
