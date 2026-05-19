import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

function HeartLogo() {
  return (
    <div style={{ width: 38, height: 38, background: "var(--cyan)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
        <path d="M10 17S1 11 1 5.5A4.5 4.5 0 0 1 10 3.5 4.5 4.5 0 0 1 19 5.5C19 11 10 17 10 17Z" fill="white" />
      </svg>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((res) => setTimeout(res, 800));

    const roleMap = {
      "doctor@hospital.com": { role: "doctor", path: "/doctor" },
      "patient@hospital.com": { role: "patient", path: "/patient" },
      "nurse@hospital.com": { role: "nurse", path: "/nurse" },
      "admin@hospital.com": { role: "admin", path: "/admin" },
    };

    const match = roleMap[email];
    if (match) {
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("role", match.role);
      navigate(match.path);
    } else {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        :root {
          --cyan: #00b4d8;
          --cyan-light: #e0f7fd;
          --cyan-dark: #0096c7;
          --navy: #0d1b2a;
          --navy-soft: #1e3a5f;
          --bg: #eaf4fb;
          --white: #ffffff;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          overflow-x: hidden;
          overflow-y: auto !important;
          height: auto !important;
          min-height: 100%;
          margin: 0; padding: 0;
          background: var(--bg);
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #dde6ef; }
        ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 10px; }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); }

        .page { min-height: 100vh; background: var(--bg); display: flex; flex-direction: column; }

        /* NAV */
        .nav {
          background: var(--navy);
          padding: 0 48px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-brand-text { display: flex; flex-direction: column; }
        .nav-brand-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 17px; color: white; line-height: 1; }
        .nav-brand-sub { font-size: 9px; color: #6b9fc3; letter-spacing: 0.12em; text-transform: uppercase; }
        .nav-links { display: flex; gap: 32px; }
        .nav-link { color: #b0c8df; text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 0.03em; transition: color 0.2s; }
        .nav-link:hover { color: white; }
        .nav-right { display: flex; gap: 12px; align-items: center; }
        .btn-signup {
          background: var(--cyan); border: none;
          color: var(--navy); padding: 10px 22px; border-radius: 12px;
          font-size: 14px; font-family: inherit; font-weight: 600; cursor: pointer;
          transition: background 0.2s;
          display: flex; align-items: center; gap: 6px;
        }
        .btn-signup:hover { background: var(--cyan-dark); color: white; }

        /* MAIN */
        .main { flex: 1; display: flex; align-items: flex-start; justify-content: center; padding: 48px 24px 64px; gap: 48px; }

        /* LEFT PANEL */
        .left-panel { flex: 0 0 380px; padding-top: 24px; }
        .badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: white; border-radius: 100px; padding: 6px 14px;
          font-size: 11px; font-weight: 600; color: var(--navy);
          letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 28px;
          box-shadow: 0 2px 8px rgba(0,180,216,0.15);
        }
        .badge-dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; }
        .hero-title { font-family: 'Sora', sans-serif; font-size: 50px; font-weight: 800; color: var(--navy); line-height: 1.1; margin-bottom: 18px; }
        .hero-accent { color: var(--cyan); }
        .hero-sub { font-size: 15px; color: #4a6580; line-height: 1.65; max-width: 340px; margin-bottom: 36px; }

        /* INFO CARD */
        .info-card {
          background: white; border-radius: 20px; padding: 28px;
          box-shadow: 0 4px 24px rgba(0,100,160,0.08);
        }
        .info-card-top { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
        .icon-circle {
          width: 52px; height: 52px; border-radius: 50%;
          border: 2px solid var(--cyan-light);
          display: flex; align-items: center; justify-content: center;
        }
        .info-card-label { font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; color: var(--navy); }
        .info-card-sub { font-size: 12px; color: var(--cyan); font-weight: 600; }
        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .feature-chip {
          border-radius: 12px; padding: 13px 14px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 5px;
        }
        .feature-chip.blue { background: #eaf6fb; }
        .feature-chip.purple { background: #f0eeff; }
        .feature-chip.green { background: #eafaf2; }
        .feature-chip.yellow { background: #fffbea; }
        .feature-chip-label { font-size: 12px; font-weight: 600; color: var(--navy); }

        /* FORM CARD */
        .form-card {
          flex: 0 0 480px;
          background: white; border-radius: 24px;
          box-shadow: 0 8px 40px rgba(0,100,160,0.1);
          overflow: hidden;
        }
        .form-header {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-soft) 100%);
          padding: 28px 32px;
        }
        .form-header-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; color: white; margin-bottom: 4px; }
        .form-header-sub { font-size: 13px; color: #6b9fc3; }

        /* FORM BODY */
        .form-body { padding: 32px; }
        .form-title { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
        .form-desc { font-size: 13px; color: #7a90a4; margin-bottom: 24px; }

        .field-group {
          display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;
        }
        .field-label {
          font-size: 12px; font-weight: 600; color: var(--navy); letter-spacing: 0.04em; text-transform: uppercase;
        }
        .field-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1.5px solid #dde6ef;
          background: #f7fbff;
          font-size: 14px;
          color: var(--navy);
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field-input::placeholder { color: #b0bec5; }
        .field-input:focus {
          outline: none;
          border-color: var(--cyan);
          box-shadow: 0 0 0 3px rgba(0,180,216,0.12);
        }

        .input-wrapper {
          position: relative;
        }
        .field-input.with-icon { padding-right: 44px; }
        .eye-toggle {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: var(--cyan); display: flex; align-items: center;
          transition: color 0.2s;
        }
        .eye-toggle:hover { color: var(--cyan-dark); }

        .error-box {
          background: #fff1f0; border: 1px solid #ffc5c0; border-radius: 10px;
          padding: 12px 14px; font-size: 13px; color: #c0392b; margin-bottom: 20px;
          display: flex; gap: 8px; align-items: flex-start;
        }

        .forgot-link {
          display: block; text-align: right; font-size: 12px; color: var(--cyan);
          font-weight: 600; text-decoration: none; margin-bottom: 20px;
          transition: color 0.2s;
        }
        .forgot-link:hover { color: var(--cyan-dark); }

        .btn-login {
          width: 100%;
          padding: 14px;
          background: var(--cyan);
          border: none;
          border-radius: 12px;
          font-size: 14px; font-weight: 700; color: white;
          cursor: pointer; font-family: inherit;
          transition: background 0.2s, transform 0.1s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-login:hover:not(:disabled) { background: var(--cyan-dark); }
        .btn-login:active:not(:disabled) { transform: scale(0.98); }
        .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

        .signin-hint { text-align: center; font-size: 13px; color: #7a90a4; margin-top: 20px; }
        .signin-hint a { color: var(--cyan); font-weight: 600; text-decoration: none; }
        .signin-hint a:hover { text-decoration: underline; }

        .divider {
          display: flex; align-items: center; gap: 12px; margin: 24px 0 20px;
        }
        .divider-line { flex: 1; height: 1px; background: #dde6ef; }
        .divider-text { font-size: 11px; color: #7a90a4; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }

        .role-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        .role-btn {
          padding: 11px 8px; border: 1.5px solid #dde6ef; border-radius: 12px;
          background: white; cursor: pointer; font-family: inherit;
          font-size: 12px; font-weight: 600; color: var(--navy);
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .role-btn:hover {
          border-color: var(--cyan); background: var(--cyan-light); color: var(--cyan-dark);
        }

        @media (max-width: 1200px) {
          .main { gap: 32px; }
          .left-panel { flex: 0 0 300px; }
          .form-card { flex: 0 0 420px; }
        }

        @media (max-width: 900px) {
          .main { flex-direction: column; align-items: center; padding: 32px 20px 48px; }
          .left-panel { flex: 1; width: 100%; max-width: 400px; }
          .form-card { flex: 1; width: 100%; max-width: 500px; }
        }
      `}</style>

      <div className="page">
        {/* NAV */}
        <nav className="nav">
          <a href="/" className="nav-brand">
            <HeartLogo />
            <div className="nav-brand-text">
              <span className="nav-brand-name">MedCore</span>
              <span className="nav-brand-sub">Hospital Group</span>
            </div>
          </a>
          <div className="nav-right">
            <button className="btn-signup" onClick={() => navigate("/register")}>
              <span>Sign Up</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </nav>

        {/* MAIN */}
        <div className="main">
          {/* LEFT PANEL */}
          <div className="left-panel">
            <div className="badge"><span className="badge-dot" />⚡ Secure Staff Portal · Est. 2010</div>
            <h1 className="hero-title">
              Welcome<br />
              back to<br />
              <span className="hero-accent">MedCore.</span>
            </h1>
            <p className="hero-sub">
              Access your secure staff dashboard. Everything you need for seamless patient care and hospital operations.
            </p>

            <div className="info-card">
              <div className="info-card-top">
                <div className="icon-circle">
                  <HeartLogo />
                </div>
                <div>
                  <div className="info-card-label">MedCore Staff Access</div>
                  <div className="info-card-sub">Secure · Trusted · Always Ready</div>
                </div>
              </div>
              <div className="features-grid">
                <div className="feature-chip blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="feature-chip-label">HIPAA Secure</span>
                </div>
                <div className="feature-chip purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <span className="feature-chip-label">AI Powered</span>
                </div>
                <div className="feature-chip green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  <span className="feature-chip-label">Real-time</span>
                </div>
                <div className="feature-chip yellow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span className="feature-chip-label">Role-Based</span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="form-card">
            <div className="form-header">
              <div className="form-header-title">Sign in to your account</div>
              <div className="form-header-sub">Staff login · Secure access</div>
            </div>

            <div className="form-body">
              <div className="form-title">Welcome Back</div>
              <div className="form-desc">Please sign in with your credentials</div>

              {error && <div className="error-box"><span>⚠</span>{error}</div>}

              {/* Email */}
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hospital.com"
                    className="field-input"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="field-input with-icon"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-toggle"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <a href="#" className="forgot-link">Forgot your password?</a>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="btn-login"
              >
                {loading ? "Signing in…" : (
                  <><span>Sign In</span><ArrowRight size={16} /></>
                )}
              </button>

              {/* Divider */}
              <div className="divider">
                <div className="divider-line" />
                <span className="divider-text">Demo Accounts</span>
                <div className="divider-line" />
              </div>

              {/* Role Buttons */}
              <div className="role-grid">
                {[
                  { label: "🩺 Doctor", email: "doctor@hospital.com" },
                  { label: "🏥 Patient", email: "patient@hospital.com" },
                  { label: "💊 Nurse", email: "nurse@hospital.com" },
                  { label: "⚙️ Admin", email: "admin@hospital.com" },
                ].map((r) => (
                  <button
                    key={r.label}
                    className="role-btn"
                    onClick={() => setEmail(r.email)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="signin-hint">
                Don't have an account? <a href="/register">Sign up here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}