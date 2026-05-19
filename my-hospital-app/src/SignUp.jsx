import { useState } from "react";

const BLOOD_TYPES = ["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"];
const BLOOD_LABELS = { A_POS: "A+", A_NEG: "A−", B_POS: "B+", B_NEG: "B−", AB_POS: "AB+", AB_NEG: "AB−", O_POS: "O+", O_NEG: "O−" };

const STEPS = [
  { id: 1, label: "Account" },
  { id: 2, label: "Personal" },
  { id: 3, label: "Medical" },
  { id: 4, label: "Emergency" },
];

function HeartLogo() {
  return (
    <div style={{ width: 38, height: 38, background: "var(--cyan)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
        <path d="M10 17S1 11 1 5.5A4.5 4.5 0 0 1 10 3.5 4.5 4.5 0 0 1 19 5.5C19 11 10 17 10 17Z" fill="white" />
      </svg>
    </div>
  );
}

function FieldGroup({ label, children, required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: "var(--cyan)", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1.5px solid #dde6ef",
  background: "#f7fbff",
  fontSize: 14,
  color: "var(--navy)",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

function Input({ type = "text", value, onChange, placeholder, onFocus, onBlur }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      style={inputStyle}
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select value={value} onChange={onChange} style={{ ...inputStyle, cursor: "pointer" }}>
      {children}
    </select>
  );
}

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    phone: "", dateOfBirth: "", gender: "",
    bloodType: "", address: "",
    emergencyContactName: "", emergencyContactPhone: "",
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validateStep = () => {
    if (step === 1) {
      if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword)
        return "Please fill in all required fields.";
      if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email address.";
      if (form.password.length < 8) return "Password must be at least 8 characters.";
      if (form.password !== form.confirmPassword) return "Passwords do not match.";
    }
    if (step === 2) {
      if (!form.dateOfBirth || !form.gender) return "Date of birth and gender are required.";
    }
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError("");
    setStep((s) => s + 1);
  };

  const back = () => { setError(""); setStep((s) => s - 1); };

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const body = Object.fromEntries(
        Object.entries(form).filter(([, v]) => v !== "")
      );
      const res = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Registration failed.");
      setSuccess(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

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
        ::-webkit-scrollbar-thumb:hover { background: var(--cyan-dark); }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); }

        .page { min-height: 100vh; background: var(--bg); display: flex; flex-direction: column; }

        /* NAV */
        .nav {
          background: #0d1b2a;
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
        .btn-login {
          background: transparent; border: 1.5px solid rgba(255,255,255,0.2);
          color: white; padding: 7px 20px; border-radius: 8px;
          font-size: 14px; font-family: inherit; font-weight: 500; cursor: pointer;
          transition: border-color 0.2s;
        }
        .btn-login:hover { border-color: var(--cyan); color: var(--cyan); }

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
        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .feature-chip {
          border-radius: 12px; padding: 13px 14px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 5px;
        }
        .feature-chip.blue { background: #eaf6fb; }
        .feature-chip.purple { background: #f0eeff; }
        .feature-chip.green { background: #eafaf2; }
        .feature-chip.yellow { background: #fffbea; }
        .feature-chip-label { font-size: 12px; font-weight: 600; color: var(--navy); }
        .status-bar {
          background: #f0fdf6; border-radius: 10px; padding: 10px 14px;
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: var(--navy);
        }
        .status-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* FORM CARD */
        .form-card {
          flex: 0 0 480px;
          background: white; border-radius: 24px;
          box-shadow: 0 8px 40px rgba(0,100,160,0.1);
          overflow: hidden;
        }
        .form-header {
          background: linear-gradient(135deg, #0d1b2a 0%, #1e3a5f 100%);
          padding: 28px 32px;
        }
        .form-header-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; color: white; margin-bottom: 4px; }
        .form-header-sub { font-size: 13px; color: #6b9fc3; }

        /* STEPPER */
        .stepper { display: flex; align-items: center; padding: 20px 32px 0; gap: 0; }
        .step-item { display: flex; align-items: center; gap: 0; flex: 1; }
        .step-circle {
          width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; flex-shrink: 0; transition: all 0.3s;
        }
        .step-circle.done { background: var(--cyan); color: white; }
        .step-circle.active { background: var(--navy); color: white; border: 2px solid var(--cyan); }
        .step-circle.pending { background: #f0f4f8; color: #94a3b8; border: 2px solid #e2e8f0; }
        .step-label { font-size: 10px; font-weight: 600; margin-top: 4px; color: #94a3b8; letter-spacing: 0.04em; }
        .step-label.active { color: var(--navy); }
        .step-label.done { color: var(--cyan); }
        .step-connector { flex: 1; height: 2px; background: #e2e8f0; margin: 0 4px; margin-bottom: 14px; transition: background 0.3s; }
        .step-connector.done { background: var(--cyan); }
        .step-wrap { display: flex; flex-direction: column; align-items: center; }

        /* FORM BODY */
        .form-body { padding: 24px 32px 32px; }
        .step-title { font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
        .step-desc { font-size: 12.5px; color: #7a90a4; margin-bottom: 22px; }
        .fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .fields-grid.single { grid-template-columns: 1fr; }
        .col-span-2 { grid-column: span 2; }

        .error-box {
          background: #fff1f0; border: 1px solid #ffc5c0; border-radius: 10px;
          padding: 10px 14px; font-size: 13px; color: #c0392b; margin-bottom: 16px;
          display: flex; gap: 8px; align-items: flex-start;
        }

        /* BUTTONS */
        .btn-row { display: flex; gap: 10px; margin-top: 24px; }
        .btn-back {
          flex: 1; padding: 12px; border-radius: 12px;
          border: 1.5px solid #dde6ef; background: white;
          font-size: 14px; font-weight: 600; color: var(--navy);
          cursor: pointer; font-family: inherit; transition: border-color 0.2s;
        }
        .btn-back:hover { border-color: var(--cyan); color: var(--cyan); }
        .btn-next {
          flex: 2; padding: 12px; border-radius: 12px;
          background: var(--cyan); border: none;
          font-size: 14px; font-weight: 700; color: white;
          cursor: pointer; font-family: inherit;
          transition: background 0.2s, transform 0.1s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-next:hover:not(:disabled) { background: var(--cyan-dark); }
        .btn-next:active:not(:disabled) { transform: scale(0.98); }
        .btn-next:disabled { opacity: 0.6; cursor: not-allowed; }

        .signin-hint { text-align: center; font-size: 13px; color: #7a90a4; margin-top: 16px; }
        .signin-hint a { color: var(--cyan); font-weight: 600; text-decoration: none; }
        .signin-hint a:hover { text-decoration: underline; }

        /* SUCCESS */
        .success-wrap { padding: 48px 32px; text-align: center; }
        .success-icon {
          width: 70px; height: 70px; background: var(--cyan-light); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
        }
        .success-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 10px; }
        .success-sub { font-size: 14px; color: #4a6580; line-height: 1.6; max-width: 300px; margin: 0 auto 28px; }
        .btn-go { display: inline-block; padding: 12px 32px; background: var(--cyan); color: white; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; border: none; cursor: pointer; font-family: inherit; }
        .btn-go:hover { background: var(--cyan-dark); }

        input:focus, select:focus { border-color: var(--cyan) !important; box-shadow: 0 0 0 3px rgba(0,180,216,0.12); }
        input::placeholder { color: #b0bec5; }

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
          <div className="nav-links">
            {["Services", "About", "Reviews", "Contact"].map((l) => (
              <a key={l} href="#" className="nav-link">{l.toUpperCase()}</a>
            ))}
          </div>
          <div className="nav-right">
            <button className="btn-login" onClick={() => window.location.href = "/login"}>Login</button>
          </div>
        </nav>

        {/* MAIN */}
        <div className="main">
          {/* LEFT */}
          <div className="left-panel">
            <div className="badge"><span className="badge-dot" />⚡ AI-Powered Diagnostics · Est. 2010</div>
            <h1 className="hero-title">
              Join<br />
              <span className="hero-accent">MedCore.</span>
            </h1>
            <p className="hero-sub">
              Create your patient account in minutes. Get access to your health records, appointments, and AI-powered care — all in one place.
            </p>

            <div className="info-card">
              <div className="info-card-top">
                <div className="icon-circle">
                  <HeartLogo />
                </div>
                <div>
                  <div className="info-card-label">MedCore Care System</div>
                  <div className="info-card-sub">Advanced · Trusted · Always On</div>
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
                  <span className="feature-chip-label">5-Star Rated</span>
                </div>
              </div>
              <div className="status-bar">
                <span className="status-dot" />
                Doctors Available Now · Walk-in Welcome
              </div>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="form-card">
            <div className="form-header">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="form-header-title">Create your account</div>
                  <div className="form-header-sub">Patient self-registration · Free to join</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#6b9fc3", fontWeight: 600 }}>STEP</div>
                  <div style={{ fontFamily: "Sora, sans-serif", fontSize: 22, fontWeight: 800, color: "white", lineHeight: 1 }}>
                    {step}<span style={{ fontSize: 13, color: "#6b9fc3", fontWeight: 400 }}>/4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEPPER */}
            {!success && (
              <div className="stepper">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="step-item" style={{ flex: i < STEPS.length - 1 ? "1" : "0 0 auto" }}>
                    <div className="step-wrap">
                      <div className={`step-circle ${step > s.id ? "done" : step === s.id ? "active" : "pending"}`}>
                        {step > s.id ? "✓" : s.id}
                      </div>
                      <div className={`step-label ${step > s.id ? "done" : step === s.id ? "active" : ""}`}>{s.label}</div>
                    </div>
                    {i < STEPS.length - 1 && <div className={`step-connector ${step > s.id ? "done" : ""}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* BODY */}
            {success ? (
              <div className="success-wrap">
                <div className="success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="success-title">You're all set!</div>
                <p className="success-sub">Your MedCore patient account has been created. You can now log in and access your health dashboard.</p>
                <button className="btn-go" onClick={() => window.location.href = "/login"}>Go to Login →</button>
              </div>
            ) : (
              <div className="form-body">
                {step === 1 && (
                  <>
                    <div className="step-title">Account Details</div>
                    <div className="step-desc">Set up your login credentials</div>
                    {error && <div className="error-box"><span>⚠</span>{error}</div>}
                    <div className="fields-grid">
                      <FieldGroup label="First Name" required>
                        <Input value={form.firstName} onChange={set("firstName")} placeholder="Jane" />
                      </FieldGroup>
                      <FieldGroup label="Last Name" required>
                        <Input value={form.lastName} onChange={set("lastName")} placeholder="Doe" />
                      </FieldGroup>
                      <FieldGroup label="Email Address" required>
                        <div className="col-span-2" style={{ gridColumn: "span 2" }}>
                          <Input type="email" value={form.email} onChange={set("email")} placeholder="jane.doe@email.com" />
                        </div>
                      </FieldGroup>
                      <FieldGroup label="Password" required>
                        <Input type="password" value={form.password} onChange={set("password")} placeholder="Min. 8 characters" />
                      </FieldGroup>
                      <FieldGroup label="Confirm Password" required>
                        <Input type="password" value={form.confirmPassword} onChange={set("confirmPassword")} placeholder="Repeat password" />
                      </FieldGroup>
                      <FieldGroup label="Phone Number">
                        <div style={{ gridColumn: "span 2" }}>
                          <Input type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 555 000 0000" />
                        </div>
                      </FieldGroup>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="step-title">Personal Information</div>
                    <div className="step-desc">Help us serve you better</div>
                    {error && <div className="error-box"><span>⚠</span>{error}</div>}
                    <div className="fields-grid">
                      <FieldGroup label="Date of Birth" required>
                        <Input type="date" value={form.dateOfBirth} onChange={set("dateOfBirth")} />
                      </FieldGroup>
                      <FieldGroup label="Gender" required>
                        <Select value={form.gender} onChange={set("gender")}>
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Select>
                      </FieldGroup>
                      <FieldGroup label="Address">
                        <div style={{ gridColumn: "span 2" }}>
                          <Input value={form.address} onChange={set("address")} placeholder="123 Main St, City, State" />
                        </div>
                      </FieldGroup>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="step-title">Medical Information</div>
                    <div className="step-desc">Optional — helps our team prepare for your care</div>
                    {error && <div className="error-box"><span>⚠</span>{error}</div>}
                    <div className="fields-grid single">
                      <FieldGroup label="Blood Type">
                        <Select value={form.bloodType} onChange={set("bloodType")}>
                          <option value="">Select blood type (optional)</option>
                          {BLOOD_TYPES.map((b) => (
                            <option key={b} value={b}>{BLOOD_LABELS[b]}</option>
                          ))}
                        </Select>
                      </FieldGroup>
                    </div>
                    <div style={{ marginTop: 16, padding: "14px 16px", background: "#f0fdf6", borderRadius: 12, fontSize: 13, color: "#166534", lineHeight: 1.6 }}>
                      <strong>Why we ask:</strong> Blood type and medical details help our team respond faster in emergencies and provide personalized care from day one.
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="step-title">Emergency Contact</div>
                    <div className="step-desc">Optional — someone we can reach in an emergency</div>
                    {error && <div className="error-box"><span>⚠</span>{error}</div>}
                    <div className="fields-grid single">
                      <FieldGroup label="Contact Full Name">
                        <Input value={form.emergencyContactName} onChange={set("emergencyContactName")} placeholder="e.g. John Doe" />
                      </FieldGroup>
                      <FieldGroup label="Contact Phone Number">
                        <Input type="tel" value={form.emergencyContactPhone} onChange={set("emergencyContactPhone")} placeholder="+1 555 000 0000" />
                      </FieldGroup>
                    </div>
                    <div style={{ marginTop: 16, padding: "14px 16px", background: "#fffbea", borderRadius: 12, fontSize: 13, color: "#92400e", lineHeight: 1.6 }}>
                      <strong>Almost done!</strong> Review your details before submitting. You can update this info anytime from your patient profile.
                    </div>
                  </>
                )}

                <div className="btn-row">
                  {step > 1 && (
                    <button className="btn-back" onClick={back}>← Back</button>
                  )}
                  {step < 4 ? (
                    <button className="btn-next" onClick={next}>
                      Continue <span>→</span>
                    </button>
                  ) : (
                    <button className="btn-next" onClick={submit} disabled={loading}>
                      {loading ? (
                        <>
                          <svg style={{ animation: "spin 1s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                          Creating account…
                        </>
                      ) : "Create My Account ✓"}
                    </button>
                  )}
                </div>

                <div className="signin-hint">
                  Already have an account? <a href="/login">Sign in here</a>
                </div>

                {step === 1 && (
                  <div style={{ marginTop: 16, textAlign: "center", fontSize: 11.5, color: "#b0bec5", lineHeight: 1.6 }}>
                    By registering, you agree to MedCore's <a href="#" style={{ color: "var(--cyan)" }}>Terms of Service</a> and <a href="#" style={{ color: "var(--cyan)" }}>Privacy Policy</a>.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* STATS BAR */}
        <div style={{ background: "var(--bg)", borderTop: "1px solid #dde6ef", padding: "16px 48px", display: "flex", gap: 40 }}>
          {[["99%", "Success Rate"], ["24/7", "Emergency"], ["50K+", "Patients Served"]].map(([stat, label]) => (
            <div key={label}>
              <span style={{ fontFamily: "Sora, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--cyan)" }}>{stat}</span>
              <span style={{ fontSize: 12, color: "#7a90a4", marginLeft: 6, fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}