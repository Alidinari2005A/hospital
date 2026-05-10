import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Shield, Zap, Activity, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      setError("Please enter your email and password to continue.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((res) => setTimeout(res, 800));

    const roleMap = {
      "doctor@hospital.com":  { role: "doctor",  path: "/doctor"  },
      "patient@hospital.com": { role: "patient", path: "/patient" },
      "nurse@hospital.com":   { role: "nurse",   path: "/nurse"   },
      "admin@hospital.com":   { role: "admin",   path: "/admin"   },
    };

    const match = roleMap[email];
    if (match) {
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("role", match.role);
      navigate(match.path);
    } else {
      setError("Wrong email or password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #03080f; height: 100%; }

        .mc-input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #f0f6ff;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .mc-input::placeholder { color: rgba(160,190,230,0.35); }
        .mc-input:focus {
          outline: none;
          border-color: rgba(0,201,167,0.55);
          background: rgba(0,201,167,0.04);
          box-shadow: 0 0 0 4px rgba(0,201,167,0.08);
        }

        .mc-role-btn {
          padding: 11px 8px;
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(180,210,255,0.6);
          transition: all 0.2s;
          text-align: center;
        }
        .mc-role-btn:hover {
          border-color: rgba(0,201,167,0.4);
          background: rgba(0,201,167,0.07);
          color: #00c9a7;
        }

        .mc-login-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #00c9a7, #38bdf8);
          border: none;
          border-radius: 14px;
          color: #03080f;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 8px 32px rgba(0,201,167,0.3);
        }
        .mc-login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(0,201,167,0.45);
        }
        .mc-login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .mc-forgot:hover { color: #00c9a7 !important; }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
      `}</style>

      <div style={{
        display: "flex", minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        background: "#03080f", color: "#f0f6ff",
        overflow: "hidden"
      }}>

        {/* ── LEFT PANEL ── */}
        <div style={{
          flex: 1, padding: "48px 52px",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          position: "relative", overflow: "hidden",
          background: "linear-gradient(145deg, #03080f 0%, #060d1a 100%)",
          borderRight: "1px solid rgba(0,201,167,0.1)"
        }}>
          {/* Grid */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: "linear-gradient(rgba(0,201,167,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,167,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px"
          }} />

          {/* Orbs */}
          <div className="orb" style={{ width: 500, height: 500, background: "rgba(0,201,167,0.1)", top: -120, right: -120, zIndex: 0 }} />
          <div className="orb" style={{ width: 380, height: 380, background: "rgba(56,189,248,0.06)", bottom: -80, left: -60, zIndex: 0 }} />
          <div className="orb" style={{ width: 250, height: 250, background: "rgba(129,140,248,0.07)", top: "45%", left: "38%", zIndex: 0 }} />

          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
            <div style={{
              background: "linear-gradient(135deg, #00c9a7, #38bdf8)",
              padding: 10, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(0,201,167,0.4)"
            }}>
              <Heart color="white" size={20} fill="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", color: "#fff" }}>MedCore</span>
          </div>

          {/* Main copy */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,201,167,0.1)", border: "1px solid rgba(0,201,167,0.3)",
              padding: "7px 16px", borderRadius: 100, marginBottom: 28,
              color: "#00c9a7", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em",
              textTransform: "uppercase", fontFamily: "'Inter', sans-serif"
            }}>
              <Zap size={12} fill="#00c9a7" stroke="none" />
              Secure Staff Portal
            </div>

            <h2 style={{
              fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 800,
              lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1.5px", color: "#fff"
            }}>
              Your hospital,<br />
              <span style={{
                background: "linear-gradient(135deg, #00c9a7 0%, #38bdf8 60%, #818cf8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
              }}>all in one place.</span>
            </h2>

            <p style={{
              fontSize: 16, color: "rgba(180,210,255,0.55)",
              lineHeight: 1.8, maxWidth: 360,
              fontFamily: "'Inter', sans-serif", fontWeight: 300
            }}>
              A secure portal for doctors, patients, nurses and staff. Everything you need, always accessible.
            </p>
          </div>

          {/* Feature pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }}>
            {[
              { icon: Shield,   color: "#00c9a7", text: "Secure & encrypted access" },
              { icon: Activity, color: "#38bdf8", text: "Real-time patient records" },
              { icon: Zap,      color: "#fbbf24", text: "Available 24 / 7" },
            ].map(({ icon: Icon, color, text }) => (
              <div key={text} style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "14px 18px"
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: `${color}18`, border: `1px solid ${color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon size={16} color={color} />
                </div>
                <span style={{ fontSize: 13, color: "rgba(200,220,255,0.7)", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{
          width: 480, background: "#060d1a",
          padding: "52px 44px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          flexShrink: 0, position: "relative", overflow: "hidden"
        }}>
          <div className="orb" style={{ width: 300, height: 300, background: "rgba(0,201,167,0.06)", top: -80, right: -80, zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Header */}
            <div style={{
              display: "inline-block",
              background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)",
              borderRadius: 100, padding: "5px 16px",
              color: "#38bdf8", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: 16, fontFamily: "'Inter', sans-serif"
            }}>
              Staff Portal
            </div>

            <h1 style={{
              fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700,
              color: "#fff", marginBottom: 8, letterSpacing: "-1px",
              lineHeight: 1.2
            }}>
              Sign in to your account
            </h1>
            <p style={{
              fontSize: 14, color: "rgba(160,190,230,0.5)",
              marginBottom: 36, lineHeight: 1.65,
              fontFamily: "'Inter', sans-serif", fontWeight: 300
            }}>
              Welcome back. Please enter your details below.
            </p>

            {/* Error */}
            {error && (
              <div style={{
                background: "rgba(244,63,94,0.08)",
                border: "1.5px solid rgba(244,63,94,0.3)",
                borderRadius: 12, padding: "12px 16px",
                fontSize: 13, color: "#f87171",
                marginBottom: 20, fontFamily: "'Inter', sans-serif"
              }}>
                {error}
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label style={{
                display: "block", fontSize: 11, fontWeight: 600,
                color: "rgba(160,190,230,0.6)", letterSpacing: "0.07em",
                textTransform: "uppercase", marginBottom: 8,
                fontFamily: "'Inter', sans-serif"
              }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@hospital.com"
                className="mc-input"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 12 }}>
              <label style={{
                display: "block", fontSize: 11, fontWeight: 600,
                color: "rgba(160,190,230,0.6)", letterSpacing: "0.07em",
                textTransform: "uppercase", marginBottom: 8,
                fontFamily: "'Inter', sans-serif"
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mc-input"
                  style={{ paddingRight: "52px" }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(0,201,167,0.7)", display: "flex", alignItems: "center",
                    transition: "color 0.2s"
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <a href="#" className="mc-forgot" style={{
              display: "block", textAlign: "right",
              fontSize: 12, color: "rgba(0,201,167,0.65)",
              fontWeight: 500, marginBottom: 28, cursor: "pointer",
              textDecoration: "none", fontFamily: "'Inter', sans-serif",
              transition: "color 0.2s"
            }}>
              Forgot your password?
            </a>

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="mc-login-btn"
            >
              {loading ? "Signing in…" : (
                <><span>Sign In</span><ArrowRight size={18} /></>
              )}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 20px" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
              <span style={{ fontSize: 11, color: "rgba(160,190,230,0.35)", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
                sign in as
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* Role buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "🩺 Doctor",  email: "doctor@hospital.com" },
                { label: "🏥 Patient", email: "patient@hospital.com" },
                { label: "💊 Nurse",   email: "nurse@hospital.com"  },
                { label: "⚙️ Admin",   email: "admin@hospital.com"  },
              ].map((r) => (
                <button
                  key={r.label}
                  className="mc-role-btn"
                  onClick={() => setEmail(r.email)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}