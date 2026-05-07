import { createContext, useContext, useState } from "react";

/* ─── Hardcoded users — replace with API calls later ─── */
const USERS = [
  { email: "doctor@hospital.com",  password: "doctor123",  role: "doctor",  name: "Dr. Amir Khalil",  avatar: "AK" },
  { email: "patient@hospital.com", password: "patient123", role: "patient", name: "Sarah Mitchell",    avatar: "SM" },
  { email: "nurse@hospital.com",   password: "nurse123",   role: "nurse",   name: "Nurse Aida Torres", avatar: "AT" },
  { email: "admin@hospital.com",   password: "admin123",   role: "admin",   name: "Admin User",        avatar: "AU" },
];

const ROLE_ROUTES = {
  doctor:  "/doctor",
  patient: "/patient",
  nurse:   "/nurse",
  admin:   "/admin",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("hms_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const found = USERS.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!found) return { success: false, message: "Invalid email or password." };

    const userData = { email: found.email, role: found.role, name: found.name, avatar: found.avatar };
    sessionStorage.setItem("hms_user", JSON.stringify(userData));
    setUser(userData);
    return { success: true, redirect: ROLE_ROUTES[found.role] };
  };

  const logout = () => {
    sessionStorage.removeItem("hms_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
