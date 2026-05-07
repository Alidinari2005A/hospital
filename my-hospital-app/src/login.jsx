import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  window.location.href = match.path;
} else {
  setError("Wrong email or password. Please try again.");
  setLoading(false);
}
  }

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f4f8; }
        input:focus { outline: none; border-color: #1a6fb5 !important; box-shadow: 0 0 0 4px rgba(26,111,181,0.1) !important; background: #fff !important; }
        input::placeholder { color: #b0bac9; }
        .role-btn:hover { border-color: #1a6fb5 !important; background: #eff6ff !important; color: #1a6fb5 !important; }
        .login-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(15,76,129,0.4) !important; }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .forgot:hover { text-decoration: underline; }
      `}</style>

      <div style={s.page}>

        {/* ── LEFT PANEL ── */}
        <div style={s.left}>
          <div style={s.c1} />
          <div style={s.c2} />
          <div style={s.c3} />

          <div style={s.brand}>
            <div style={s.brandIcon}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="9" y="2" width="4" height="18" rx="2" fill="white" />
                <rect x="2" y="9" width="18" height="4" rx="2" fill="white" />
              </svg>
            </div>
            <span style={s.brandName}>MediSystem</span>
          </div>

          <div style={s.leftBody}>
            <h2 style={s.leftTitle}>
              Your hospital,{" "}
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
                all in one place.
              </em>
            </h2>
            <p style={s.leftSub}>
              A secure portal for doctors, patients, nurses and staff.
              Everything you need, always accessible.
            </p>
          </div>

          <div style={s.pills}>
            {[
              { color: "#34d399", text: "Secure & encrypted access" },
              { color: "#60a5fa", text: "Real-time patient records" },
              { color: "#fbbf24", text: "Available 24 / 7" },
            ].map((p) => (
              <div key={p.text} style={s.pill}>
                <div style={{ ...s.pillDot, background: p.color }} />
                <span style={s.pillText}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={s.right}>
          <p style={s.welcome}>Staff Portal</p>
          <h1 style={s.title}>Sign in to your account</h1>
          <p style={s.subtitle}>Welcome back. Please enter your details below.</p>

          {error && <div style={s.errorBox}>{error}</div>}

          <div style={s.field}>
            <label style={s.label}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hospital.com"
              style={s.input}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ ...s.input, paddingRight: "64px" }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={s.toggleBtn}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <a href="#" className="forgot" style={s.forgot}>
            Forgot your password?
          </a>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="login-btn"
            style={{
              ...s.loginBtn,
              opacity: loading ? 0.65 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div style={s.dividerRow}>
            <div style={s.dividerLine} />
            <span style={s.dividerText}>sign in as</span>
            <div style={s.dividerLine} />
          </div>

          <div style={s.roles}>
            {[
              { label: "🩺 Doctor",  email: "doctor@hospital.com" },
              { label: "🏥 Patient", email: "patient@hospital.com" },
              { label: "💊 Nurse",   email: "nurse@hospital.com" },
              { label: "⚙️ Admin",   email: "admin@hospital.com" },
            ].map((r) => (
              <button
                key={r.label}
                className="role-btn"
                onClick={() => setEmail(r.email)}
                style={s.roleBtn}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  page: { display:"flex", minHeight:"100vh", fontFamily:"'DM Sans', sans-serif" },
  left: { flex:1, background:"linear-gradient(160deg, #0f4c81 0%, #1a6fb5 40%, #0d8a7a 100%)", padding:"48px 44px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden" },
  c1: { position:"absolute", width:320, height:320, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.08)", top:-80, right:-80 },
  c2: { position:"absolute", width:220, height:220, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.06)", bottom:-40, left:-60 },
  c3: { position:"absolute", width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.04)", top:"40%", right:20 },
  brand: { display:"flex", alignItems:"center", gap:12, position:"relative", zIndex:1 },
  brandIcon: { width:44, height:44, background:"rgba(255,255,255,0.15)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(255,255,255,0.2)" },
  brandName: { fontSize:18, fontWeight:600, color:"#fff", letterSpacing:"-0.3px" },
  leftBody: { position:"relative", zIndex:1 },
  leftTitle: { fontFamily:"'DM Serif Display', serif", fontSize:38, color:"#fff", lineHeight:1.15, marginBottom:16 },
  leftSub: { fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.75, maxWidth:280 },
  pills: { display:"flex", flexDirection:"column", gap:10, position:"relative", zIndex:1 },
  pill: { display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:40, padding:"10px 16px" },
  pillDot: { width:8, height:8, borderRadius:"50%", flexShrink:0 },
  pillText: { fontSize:13, color:"rgba(255,255,255,0.85)", fontWeight:500 },
  right: { width:440, background:"#ffffff", padding:"52px 44px", display:"flex", flexDirection:"column", justifyContent:"center", flexShrink:0 },
  welcome: { fontSize:12, fontWeight:600, color:"#0f4c81", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:10 },
  title: { fontFamily:"'DM Serif Display', serif", fontSize:32, color:"#0d1f35", marginBottom:6, lineHeight:1.2 },
  subtitle: { fontSize:14, color:"#6b7a90", marginBottom:36, lineHeight:1.65 },
  errorBox: { background:"#fff5f5", border:"1.5px solid #fecaca", borderRadius:10, padding:"12px 16px", fontSize:13, color:"#dc2626", marginBottom:18 },
  field: { marginBottom:20 },
  label: { display:"block", fontSize:12, fontWeight:600, color:"#374151", letterSpacing:"0.05em", textTransform:"uppercase", marginBottom:8 },
  input: { width:"100%", padding:"14px 18px", border:"1.5px solid #e2e8f0", borderRadius:12, fontFamily:"'DM Sans', sans-serif", fontSize:15, color:"#0d1f35", background:"#f8fafc", transition:"border-color 0.2s, box-shadow 0.2s" },
  toggleBtn: { position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, color:"#1a6fb5", fontFamily:"'DM Sans', sans-serif", padding:"4px 6px" },
  forgot: { display:"block", textAlign:"right", fontSize:12, color:"#1a6fb5", fontWeight:500, marginTop:-12, marginBottom:24, cursor:"pointer", textDecoration:"none" },
  loginBtn: { width:"100%", padding:16, background:"linear-gradient(135deg, #0f4c81, #1a6fb5)", border:"none", borderRadius:12, color:"#fff", fontFamily:"'DM Sans', sans-serif", fontSize:15, fontWeight:600, boxShadow:"0 4px 20px rgba(15,76,129,0.3)", letterSpacing:"0.01em", transition:"transform 0.15s, box-shadow 0.15s" },
  dividerRow: { display:"flex", alignItems:"center", gap:12, margin:"24px 0" },
  dividerLine: { flex:1, height:1, background:"#e8edf3" },
  dividerText: { fontSize:12, color:"#94a3b8", fontWeight:500, whiteSpace:"nowrap" },
  roles: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 },
  roleBtn: { padding:"10px 8px", border:"1.5px solid #e2e8f0", borderRadius:10, background:"#f8fafc", cursor:"pointer", fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:600, color:"#374151", transition:"all 0.2s", textAlign:"center" },
};