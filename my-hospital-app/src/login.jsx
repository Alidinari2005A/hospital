import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:wght@600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  input:focus { outline: none; }
  button { cursor: pointer; border: none; }
  .login-input:focus { border-color: #0d9488 !important; box-shadow: 0 0 0 3px rgba(13,148,136,0.12); }
  .login-btn:hover { background: #0b7a71 !important; }
  .login-btn:active { transform: scale(0.98); }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.5s ease both; }
`;

const ROLE_COLORS = {
  doctor:  { bg: "#eff6ff", text: "#1d4ed8", label: "Doctor" },
  patient: { bg: "#f0fdf4", text: "#166534", label: "Patient" },
  nurse:   { bg: "#fdf4ff", text: "#7e22ce", label: "Nurse" },
  admin:   { bg: "#fff7ed", text: "#9a3412", label: "Admin" },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in both fields."); return; }
    setError("");
    setLoading(true);

    // Simulate a small delay (replace with real API call later)
    await new Promise(r => setTimeout(r, 600));

    const result = login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
    } else {
      navigate(result.redirect, { replace: true });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0b1f3a 0%, #0d2e52 60%, #0f3a60 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{CSS}</style>

      {/* Background decorations */}
      <div style={{ position: "fixed", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: "rgba(13,148,136,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.07)", pointerEvents: "none" }} />

      <div className="fade-up" style={{ width: "100%", maxWidth: 420 }}>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 24px 60px rgba(0,0,0,0.22)" }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #0d9488, #059669)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(13,148,136,0.35)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>MedCore</p>
              <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Hospital Management System</p>
            </div>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>Welcome back</h1>
          <p style={{ fontSize: 13.5, color: "#64748b", marginBottom: 28 }}>Sign in to access your dashboard</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email address</label>
              <input
                type="email"
                className="login-input"
                placeholder="you@hospital.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, color: "#1e293b", background: "#f8fafc", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Password</label>
                <button type="button" style={{ fontSize: 12, color: "#0d9488", fontWeight: 600, background: "none" }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  className="login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "11px 42px 11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, color: "#1e293b", background: "#f8fafc", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", color: "#94a3b8" }}>
                  {showPass
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "#fff1f2", border: "1px solid #fecdd3", marginBottom: 16 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{ fontSize: 13, color: "#9f1239", fontWeight: 500 }}>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="login-btn" disabled={loading}
              style={{ width: "100%", padding: "13px", borderRadius: 11, background: loading ? "#94a3b8" : "#0d9488", color: "#fff", fontSize: 15, fontWeight: 700, transition: "background 0.2s, transform 0.1s", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={{ marginTop: 28, padding: "16px", borderRadius: 12, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Demo credentials</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { role: "doctor",  email: "doctor@hospital.com",  pass: "doctor123" },
                { role: "patient", email: "patient@hospital.com", pass: "patient123" },
                { role: "nurse",   email: "nurse@hospital.com",   pass: "nurse123" },
                { role: "admin",   email: "admin@hospital.com",   pass: "admin123" },
              ].map(cred => {
                const rc = ROLE_COLORS[cred.role];
                return (
                  <button key={cred.role} type="button"
                    onClick={() => { setEmail(cred.email); setPassword(cred.pass); setError(""); }}
                    style={{ textAlign: "left", padding: "8px 10px", borderRadius: 8, background: rc.bg, border: "none", cursor: "pointer", transition: "filter 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.filter = "brightness(0.96)"}
                    onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
                  >
                    <p style={{ fontSize: 11.5, fontWeight: 700, color: rc.text, textTransform: "capitalize" }}>{cred.role}</p>
                    <p style={{ fontSize: 10.5, color: "#64748b", marginTop: 1 }}>{cred.pass}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          © 2026 MedCore HMS · All rights reserved
        </p>
      </div>
    </div>
  );
}
