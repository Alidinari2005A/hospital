import { useState } from "react";

/* ─── FONTS & GLOBAL STYLES ─── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:wght@500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .font-lora { font-family: 'Lora', serif; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

  .fade-in { animation: fadeUp 0.45s ease both; }
  .fade-1 { animation-delay: 0.05s; }
  .fade-2 { animation-delay: 0.12s; }
  .fade-3 { animation-delay: 0.19s; }
  .fade-4 { animation-delay: 0.26s; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pulse-ring { animation: pulseRing 2s ease-in-out infinite; }
  @keyframes pulseRing {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0; }
  }

  .card { background: #fff; border-radius: 14px; border: 1px solid #e8edf3; }
  .card-hover { transition: box-shadow 0.2s ease, transform 0.2s ease; }
  .card-hover:hover { box-shadow: 0 6px 24px rgba(15,35,75,0.08); transform: translateY(-2px); }

  .nav-btn { transition: background 0.15s ease, color 0.15s ease; }
  .sidebar-trans { transition: width 0.28s cubic-bezier(0.4,0,0.2,1); }
  .bar-fill { transition: height 0.6s ease; }

  .badge-pulse::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: #f43f5e;
    animation: pulseRing 2s ease-in-out infinite;
    z-index: -1;
  }

  input:focus { outline: none; }
  button { cursor: pointer; border: none; background: transparent; }
`;

/* ─── DATA ─── */
const NAV = [
  { id: "dashboard",   label: "Dashboard",       icon: "home" },
  { id: "patients",    label: "My Patients",     icon: "users" },
  { id: "appointments",label: "Appointments",    icon: "calendar" },
  { id: "records",     label: "Medical Records", icon: "file" },
  { id: "lab",         label: "Lab Results",     icon: "flask" },
  { id: "prescriptions",label: "Prescriptions", icon: "pill" },
  { id: "messages",    label: "Messages",        icon: "chat",   badge: 4 },
  { id: "analytics",   label: "Analytics",       icon: "chart" },
  { id: "settings",    label: "Settings",        icon: "cog" },
];

const STATS = [
  { label: "Patients Today",   value: "12", sub: "3 remaining",       trend: "+2 vs yesterday",  up: true,  color: "#2563eb", bg: "#eff6ff", icon: "users" },
  { label: "Appointments",     value: "6",  sub: "Next at 10:00 AM",  trend: "On schedule",      up: null,  color: "#0d9488", bg: "#f0fdfa", icon: "calendar" },
  { label: "Pending Lab Alerts",value: "3", sub: "2 critical",        trend: "Action needed",    up: false, color: "#e11d48", bg: "#fff1f2", icon: "flask" },
  { label: "Surgeries",        value: "1",  sub: "Scheduled 3:00 PM", trend: "Team confirmed",   up: null,  color: "#7c3aed", bg: "#f5f3ff", icon: "surgery" },
];

const APPOINTMENTS = [
  { time: "08:30", name: "Sarah Mitchell",   age: 34, type: "Follow-up",          status: "Completed",   avatar: "SM", hue: "#d1fae5", text: "#065f46", room: "A-102" },
  { time: "09:15", name: "James Okafor",     age: 52, type: "Cardiology Consult", status: "In Progress", avatar: "JO", hue: "#dbeafe", text: "#1e40af", room: "B-207" },
  { time: "10:00", name: "Fatima Al-Rashid", age: 29, type: "Prenatal Check",     status: "Waiting",     avatar: "FA", hue: "#ede9fe", text: "#5b21b6", room: "C-301" },
  { time: "11:30", name: "Marcus Chen",      age: 67, type: "Post-op Review",     status: "Waiting",     avatar: "MC", hue: "#fef3c7", text: "#92400e", room: "A-115" },
  { time: "13:00", name: "Elena Vasquez",    age: 41, type: "General Checkup",    status: "Scheduled",   avatar: "EV", hue: "#ffe4e6", text: "#9f1239", room: "B-204" },
  { time: "14:30", name: "David Nkomo",      age: 58, type: "Diabetes Management",status: "Scheduled",   avatar: "DN", hue: "#ccfbf1", text: "#134e4a", room: "C-310" },
];

const LAB_ALERTS = [
  { patient: "James Okafor",  test: "Troponin levels",    finding: "Elevated — Cardiac risk", urgency: "Critical", time: "12m ago", action: "View Report" },
  { patient: "Marcus Chen",   test: "WBC Count",          finding: "Abnormal — Infection suspected", urgency: "High", time: "1h ago",  action: "View Report" },
  { patient: "Aisha Bello",   test: "HbA1c",              finding: "7.9% — Review needed",    urgency: "Moderate", time: "3h ago",  action: "View Report" },
];

const MESSAGES = [
  { from: "Dr. Lena Park",      role: "Radiologist",        msg: "CT scan for Chen is ready for review.", time: "9:04 AM",  unread: true,  avatar: "LP", color: "#dbeafe" },
  { from: "Nurse Aida Torres",  role: "Ward 4B",            msg: "James Okafor is asking about discharge.", time: "8:47 AM", unread: true,  avatar: "AT", color: "#d1fae5" },
  { from: "Dr. Kwame Mensah",   role: "Internal Medicine",  msg: "Can you co-sign the referral for Vasquez?", time: "8:12 AM", unread: false, avatar: "KM", color: "#f5f3ff" },
  { from: "Reception",          role: "Admin",              msg: "New patient file uploaded — Yuki Tanaka.", time: "7:58 AM", unread: false, avatar: "RX", color: "#fef3c7" },
];

const TASKS = [
  { text: "Sign discharge form — Sarah Mitchell", priority: "High",   done: false },
  { text: "Review CT scan — Marcus Chen",         priority: "High",   done: false },
  { text: "Complete weekly audit report",         priority: "Medium", done: false },
  { text: "Call pharma rep re: new formulary",    priority: "Low",    done: true  },
  { text: "Update care plan — Fatima Al-Rashid",  priority: "Medium", done: false },
];

const WEEKLY_LOAD = [
  { day: "Mon", patients: 9,  surgeries: 1 },
  { day: "Tue", patients: 14, surgeries: 2 },
  { day: "Wed", patients: 11, surgeries: 0 },
  { day: "Thu", patients: 12, surgeries: 1 },
  { day: "Fri", patients: 7,  surgeries: 1 },
  { day: "Sat", patients: 4,  surgeries: 0 },
  { day: "Sun", patients: 2,  surgeries: 0 },
];

const WARD_BEDS = [
  { ward: "Cardiology 4B", total: 20, occupied: 16, critical: 3 },
  { ward: "General 2A",    total: 24, occupied: 18, critical: 1 },
  { ward: "ICU",           total: 8,  occupied: 7,  critical: 7 },
  { ward: "Maternity",     total: 12, occupied: 9,  critical: 0 },
];

const RECENT_ACTIVITY = [
  { text: "Prescription issued for David Nkomo (Metformin 500mg)", time: "10:22 AM", type: "rx" },
  { text: "Lab order placed — Complete blood panel (Marcus Chen)", time: "9:58 AM",  type: "lab" },
  { text: "Appointment rescheduled — Elena Vasquez to 1:00 PM",   time: "9:31 AM",  type: "apt" },
  { text: "Referral sent to Dr. Park — Cardiology (James Okafor)", time: "8:55 AM", type: "ref" },
  { text: "Medical record updated — Fatima Al-Rashid",            time: "8:40 AM",  type: "rec" },
];

const ONCALL = [
  { name: "Dr. Sofia Reyes",  spec: "Emergency",      status: "On duty",  avatar: "SR" },
  { name: "Dr. Omar Faris",   spec: "Anesthesiology", status: "Standby",  avatar: "OF" },
];

/* ─── ICON HELPER ─── */
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    file: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    flask: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    pill: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    chat: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    cog: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    surgery: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    chevron: "M9 5l7 7-7 7",
    chevronDown: "M19 9l-7 7-7-7",
    plus: "M12 4v16m8-8H4",
    check: "M5 13l4 4L19 7",
    arrowUp: "M5 15l7-7 7 7",
    arrowDown: "M19 9l-7 7-7-7",
    menu: "M4 6h16M4 12h16M4 18h16",
    fold: "M11 19l-7-7 7-7m8 14l-7-7 7-7",
    logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    bed: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {(paths[name] || "").split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
}

/* ─── STATUS / URGENCY HELPERS ─── */
const STATUS_CONFIG = {
  "Completed":   { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  "In Progress": { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
  "Waiting":     { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  "Scheduled":   { bg: "#f1f5f9", text: "#475569", dot: "#94a3b8" },
};
const URGENCY_CONFIG = {
  "Critical": { bg: "#fff1f2", text: "#9f1239", border: "#fecdd3", dot: "#e11d48" },
  "High":     { bg: "#fffbeb", text: "#92400e", border: "#fde68a", dot: "#f59e0b" },
  "Moderate": { bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe", dot: "#3b82f6" },
};
const PRIORITY_CONFIG = {
  "High":   { bg: "#fff1f2", text: "#9f1239" },
  "Medium": { bg: "#fffbeb", text: "#92400e" },
  "Low":    { bg: "#f0fdf4", text: "#166534" },
};
const ACTIVITY_ICONS = {
  rx: { icon: "pill",     color: "#7c3aed", bg: "#f5f3ff" },
  lab: { icon: "flask",   color: "#0d9488", bg: "#f0fdfa" },
  apt: { icon: "calendar",color: "#2563eb", bg: "#eff6ff" },
  ref: { icon: "users",   color: "#d97706", bg: "#fffbeb" },
  rec: { icon: "file",    color: "#64748b", bg: "#f1f5f9" },
};

/* ─── MINI COMPONENTS ─── */
function SectionHeader({ title, sub, action, actionLabel }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
      <div>
        <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</p>
        {sub && <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{sub}</p>}
      </div>
      {actionLabel && (
        <button onClick={action} style={{ fontSize: 12, color: "#0d9488", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          {actionLabel} <Icon name="chevron" size={12} color="#0d9488" />
        </button>
      )}
    </div>
  );
}

/* ─── SIDEBAR ─── */
function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <aside className="sidebar-trans" style={{
      width: open ? 240 : 72,
      flexShrink: 0,
      background: "linear-gradient(180deg, #0b1f3a 0%, #0d2748 100%)",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "relative",
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #0d9488, #059669)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(13,148,136,0.4)" }}>
            <Icon name="plus" size={18} color="#fff" strokeWidth={2.5} />
          </div>
          {open && (
            <span className="font-lora" style={{ color: "#fff", fontSize: 18, fontWeight: 600, letterSpacing: "-0.3px", whiteSpace: "nowrap" }}>
              MedCore
            </span>
          )}
        </div>
        {open && (
          <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", color: "rgba(255,255,255,0.25)", padding: 4, borderRadius: 6, flexShrink: 0 }}>
            <Icon name="fold" size={16} color="rgba(255,255,255,0.3)" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
        {!open && (
          <button onClick={() => setOpen(true)} className="nav-btn" style={{ display: "flex", justifyContent: "center", padding: "10px", borderRadius: 10, marginBottom: 4, color: "rgba(255,255,255,0.4)" }}>
            <Icon name="menu" size={20} color="rgba(255,255,255,0.4)" />
          </button>
        )}
        {NAV.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} className="nav-btn"
              style={{ display: "flex", alignItems: "center", gap: 10, padding: open ? "10px 12px" : "10px", borderRadius: 10, width: "100%", justifyContent: open ? "flex-start" : "center",
                background: isActive ? "rgba(13,148,136,0.18)" : "transparent",
                color: isActive ? "#2dd4bf" : "rgba(255,255,255,0.42)",
              }}>
              <div style={{ flexShrink: 0, position: "relative" }}>
                <Icon name={item.icon} size={19} color={isActive ? "#2dd4bf" : "rgba(255,255,255,0.42)"} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.badge && !open && (
                  <span style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: 99, background: "#e11d48", fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, border: "2px solid #0b1f3a" }}>
                    {item.badge}
                  </span>
                )}
              </div>
              {open && <>
                <span style={{ fontSize: 13.5, fontWeight: isActive ? 600 : 500, whiteSpace: "nowrap", flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ fontSize: 10, fontWeight: 700, background: "#e11d48", color: "#fff", borderRadius: 99, padding: "1px 6px" }}>{item.badge}</span>
                )}
                {isActive && <div style={{ width: 6, height: 6, borderRadius: 99, background: "#2dd4bf", flexShrink: 0 }} />}
              </>}
            </button>
          );
        })}
      </nav>

      {/* On-Call Panel */}
      {open && (
        <div style={{ margin: "0 8px", padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>On Call Now</p>
          {ONCALL.map((doc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < ONCALL.length - 1 ? 8 : 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: 99, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                {doc.avatar}
              </div>
              <div style={{ overflow: "hidden" }}>
                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.name}</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.32)" }}>{doc.spec} · <span style={{ color: doc.status === "On duty" ? "#4ade80" : "#fbbf24" }}>{doc.status}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Profile */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 10, cursor: "pointer" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 99, background: "linear-gradient(135deg, #0d9488, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700 }}>
              AK
            </div>
            <span style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: 99, background: "#4ade80", border: "2px solid #0b1f3a" }} />
          </div>
          {open && (
            <div style={{ flex: 1, overflow: "hidden" }}>
              <p style={{ fontSize: 13, color: "#fff", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dr. Amir Khalil</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>Cardiologist · Ward 4B</p>
            </div>
          )}
          {open && <Icon name="logout" size={15} color="rgba(255,255,255,0.25)" />}
        </div>
      </div>
    </aside>
  );
}

/* ─── WEEKLY CHART ─── */
function WeeklyChart() {
  const maxPat = Math.max(...WEEKLY_LOAD.map(d => d.patients));
  const today = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
  return (
    <div className="card" style={{ padding: "0", overflow: "hidden" }}>
      <SectionHeader title="Weekly Patient Load" sub="This week — patients & surgeries by day" actionLabel="Full Report" />
      <div style={{ padding: "16px 20px 12px" }}>
        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          {[["#0d9488","Patients"],["#7c3aed","Surgeries"]].map(([c, l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
              <span style={{ fontSize: 11.5, color: "#64748b", fontWeight: 500 }}>{l}</span>
            </div>
          ))}
        </div>
        {/* Bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 110 }}>
          {WEEKLY_LOAD.map((d) => {
            const isToday = d.day === today;
            const patH = Math.max(4, (d.patients / maxPat) * 95);
            const surH = Math.max(0, (d.surgeries / 3) * 40);
            return (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", display: "flex", gap: 3, alignItems: "flex-end", height: 95 }}>
                  <div className="bar-fill" title={`${d.patients} patients`} style={{ flex: 1, height: patH, borderRadius: "4px 4px 0 0", background: isToday ? "#0d9488" : "#e2f4f2", transition: "height 0.6s ease" }} />
                  <div className="bar-fill" title={`${d.surgeries} surgeries`} style={{ flex: 1, height: surH, borderRadius: "4px 4px 0 0", background: isToday ? "#7c3aed" : "#ede9fe", transition: "height 0.6s ease" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: isToday ? 700 : 500, color: isToday ? "#0d9488" : "#94a3b8" }}>{d.day}</span>
              </div>
            );
          })}
        </div>
        {/* Values row */}
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {WEEKLY_LOAD.map((d) => (
            <div key={d.day} style={{ flex: 1, textAlign: "center" }}>
              <span style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>{d.patients}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── WARD STATUS ─── */
function WardStatus() {
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <SectionHeader title="Ward & Bed Status" sub="Live occupancy across your wards" />
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {WARD_BEDS.map((ward) => {
          const pct = Math.round((ward.occupied / ward.total) * 100);
          const barColor = pct >= 90 ? "#e11d48" : pct >= 75 ? "#f59e0b" : "#0d9488";
          return (
            <div key={ward.ward}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#1e293b" }}>{ward.ward}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {ward.critical > 0 && (
                    <span style={{ fontSize: 10, fontWeight: 700, background: "#fff1f2", color: "#9f1239", padding: "1px 7px", borderRadius: 99, border: "1px solid #fecdd3" }}>
                      {ward.critical} critical
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{ward.occupied}/{ward.total}</span>
                </div>
              </div>
              <div style={{ height: 7, borderRadius: 99, background: "#f1f5f9", overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: barColor, transition: "width 0.6s ease" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── TASKS ─── */
function TaskList() {
  const [tasks, setTasks] = useState(TASKS);
  const toggle = (i) => setTasks(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
  const pending = tasks.filter(t => !t.done).length;
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <SectionHeader title="My Tasks" sub={`${pending} pending · ${tasks.length - pending} completed`} actionLabel="All Tasks" />
      <div style={{ padding: "8px 12px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
        {tasks.map((task, i) => {
          const pc = PRIORITY_CONFIG[task.priority];
          return (
            <div key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 10, cursor: "pointer", background: task.done ? "#fafafa" : "#fff", border: "1px solid #f1f5f9", opacity: task.done ? 0.6 : 1, transition: "all 0.15s" }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, border: task.done ? "none" : "2px solid #cbd5e1", background: task.done ? "#0d9488" : "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                {task.done && <Icon name="check" size={11} color="#fff" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 12.5, color: "#334155", fontWeight: 500, flex: 1, textDecoration: task.done ? "line-through" : "none", lineHeight: 1.4 }}>{task.text}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: pc.bg, color: pc.text, flexShrink: 0 }}>{task.priority}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── MESSAGES PREVIEW ─── */
function MessagesPanel() {
  const unreadCount = MESSAGES.filter(m => m.unread).length;
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <SectionHeader title="Messages" sub={`${unreadCount} unread`} actionLabel="Open Inbox" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {MESSAGES.map((msg, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 16px", borderBottom: i < MESSAGES.length - 1 ? "1px solid #f8fafc" : "none", cursor: "pointer", background: msg.unread ? "#fafffe" : "#fff", transition: "background 0.15s" }}>
            <div style={{ width: 34, height: 34, borderRadius: 99, background: msg.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#334155", flexShrink: 0 }}>
              {msg.avatar}
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: msg.unread ? 700 : 500, color: "#1e293b" }}>{msg.from}</span>
                <span style={{ fontSize: 10.5, color: "#94a3b8" }}>{msg.time}</span>
              </div>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{msg.role}</p>
              <p style={{ fontSize: 12, color: msg.unread ? "#334155" : "#94a3b8", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: msg.unread ? 500 : 400 }}>
                {msg.msg}
              </p>
            </div>
            {msg.unread && <div style={{ width: 7, height: 7, borderRadius: 99, background: "#0d9488", flexShrink: 0, marginTop: 5 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── RECENT ACTIVITY ─── */
function ActivityFeed() {
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <SectionHeader title="Recent Activity" sub="Your actions today" />
      <div style={{ padding: "10px 16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {RECENT_ACTIVITY.map((act, i) => {
          const cfg = ACTIVITY_ICONS[act.type];
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <Icon name={cfg.icon} size={14} color={cfg.color} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.4 }}>{act.text}</p>
                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{act.time}</p>
              </div>
              {i < RECENT_ACTIVITY.length - 1 && (
                <div style={{ position: "absolute", left: 46, width: 1, height: 10, background: "#f1f5f9", marginTop: 30 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── MAIN DASHBOARD ─── */
export default function DoctorDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchVal, setSearchVal] = useState("");

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const notifCount = 3;
  const msgCount = MESSAGES.filter(m => m.unread).length;

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f0f4f8", fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: "hidden" }}>
      <style>{GLOBAL_CSS}</style>

      <Sidebar active={activeNav} setActive={setActiveNav} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* ── TOP HEADER ── */}
        <header style={{ height: 64, background: "#fff", borderBottom: "1px solid #e8edf3", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, flexShrink: 0, zIndex: 5 }}>
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} style={{ color: "#64748b", marginRight: 4, padding: 6, borderRadius: 8 }}>
              <Icon name="menu" size={20} color="#64748b" />
            </button>
          )}
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", lineHeight: 1.2 }} className="font-lora">{greeting}, Dr. Khalil</p>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>{today}</p>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <Icon name="search" size={15} color="#94a3b8" />
              </div>
              <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search patients, records…"
                style={{ paddingLeft: 34, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: "#f8fafc", border: "1.5px solid #e8edf3", borderRadius: 10, fontSize: 13, color: "#334155", width: 240, transition: "border-color 0.2s", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                onFocus={e => e.target.style.borderColor = "#0d9488"}
                onBlur={e => e.target.style.borderColor = "#e8edf3"}
              />
            </div>

            {/* Notifications */}
            <button style={{ position: "relative", width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "1.5px solid #e8edf3" }}>
              <Icon name="bell" size={18} color="#475569" />
              {notifCount > 0 && (
                <span className="badge-pulse" style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 99, background: "#e11d48", border: "2px solid #fff" }} />
              )}
            </button>

            {/* Messages */}
            <button style={{ position: "relative", width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "1.5px solid #e8edf3" }}>
              <Icon name="chat" size={18} color="#475569" />
              {msgCount > 0 && (
                <span style={{ position: "absolute", top: 5, right: 5, width: 16, height: 16, borderRadius: 99, background: "#e11d48", fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, border: "2px solid #fff" }}>{msgCount}</span>
              )}
            </button>

            {/* Divider */}
            <div style={{ width: 1, height: 28, background: "#e8edf3" }} />

            {/* Doctor Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 10px", borderRadius: 10, border: "1.5px solid #e8edf3", background: "#f8fafc" }}>
              <div style={{ width: 30, height: 30, borderRadius: 99, background: "linear-gradient(135deg, #0d9488, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700 }}>AK</div>
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>Dr. Khalil</p>
                <p style={{ fontSize: 10.5, color: "#94a3b8" }}>Cardiologist</p>
              </div>
              <Icon name="chevronDown" size={14} color="#94a3b8" />
            </div>
          </div>
        </header>

        {/* ── DASHBOARD BODY ── */}
        <main style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

          {/* ── STAT CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {STATS.map((s, i) => (
              <div key={s.label} className={`card card-hover fade-in fade-${i + 1}`} style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{s.label}</p>
                    <p style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", lineHeight: 1.1, marginTop: 4 }}>{s.value}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{s.sub}</p>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={s.icon} size={19} color={s.color} strokeWidth={2} />
                  </div>
                </div>
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 5 }}>
                  {s.up !== null && <Icon name={s.up ? "arrowUp" : "arrowDown"} size={12} color={s.up ? "#059669" : "#e11d48"} strokeWidth={2.5} />}
                  <span style={{ fontSize: 11.5, color: s.up === true ? "#059669" : s.up === false ? "#e11d48" : "#64748b", fontWeight: 600 }}>{s.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── ROW 2: APPOINTMENTS + RIGHT PANEL ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 14 }}>

            {/* Appointments */}
            <div className="card" style={{ overflow: "hidden" }}>
              <SectionHeader title="Today's Appointments" sub="6 scheduled · 2 completed · 3 remaining" actionLabel="New Appointment" />
              <div>
                {/* Table header */}
                <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 1fr 90px 110px 40px", gap: 8, padding: "8px 20px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  {["Time", "Patient", "Visit Type", "Room", "Status", ""].map((h, i) => (
                    <span key={i} style={{ fontSize: 10.5, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                  ))}
                </div>
                {APPOINTMENTS.map((apt, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "70px 1fr 1fr 90px 110px 40px", gap: 8, padding: "13px 20px", borderBottom: idx < APPOINTMENTS.length - 1 ? "1px solid #f8fafc" : "none", alignItems: "center", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fafffe"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{apt.time}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 99, background: apt.hue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: apt.text, flexShrink: 0 }}>
                        {apt.avatar}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{apt.name}</p>
                        <p style={{ fontSize: 11, color: "#94a3b8" }}>{apt.age}y old</p>
                      </div>
                    </div>
                    <span style={{ fontSize: 12.5, color: "#475569" }}>{apt.type}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", background: "#f1f5f9", padding: "3px 10px", borderRadius: 7, display: "inline-block" }}>{apt.room}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: 99, background: STATUS_CONFIG[apt.status].dot, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: STATUS_CONFIG[apt.status].text }}>{apt.status}</span>
                    </div>
                    <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, background: "#f1f5f9", color: "#64748b" }}>
                      <Icon name="chevron" size={13} color="#64748b" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: Lab Alerts + Quick Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Lab Alerts */}
              <div className="card" style={{ overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Lab Alerts</p>
                    <span style={{ fontSize: 10, fontWeight: 700, background: "#fff1f2", color: "#9f1239", padding: "2px 8px", borderRadius: 99, border: "1px solid #fecdd3" }}>3 new</span>
                  </div>
                  <button style={{ fontSize: 12, color: "#0d9488", fontWeight: 600 }}>View All</button>
                </div>
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {LAB_ALERTS.map((alert, i) => {
                    const uc = URGENCY_CONFIG[alert.urgency];
                    return (
                      <div key={i} style={{ padding: "11px 12px", borderRadius: 11, background: uc.bg, border: `1px solid ${uc.border}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                          <div style={{ flex: 1, overflow: "hidden" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                              <div style={{ width: 6, height: 6, borderRadius: 99, background: uc.dot, flexShrink: 0 }} />
                              <p style={{ fontSize: 13, fontWeight: 700, color: uc.text }}>{alert.patient}</p>
                            </div>
                            <p style={{ fontSize: 11.5, color: uc.text, opacity: 0.8 }}>{alert.test}</p>
                            <p style={{ fontSize: 11, fontWeight: 500, color: uc.text, marginTop: 2 }}>{alert.finding}</p>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: uc.text, display: "block" }}>{alert.urgency}</span>
                            <span style={{ fontSize: 10, opacity: 0.6, color: uc.text }}>{alert.time}</span>
                          </div>
                        </div>
                        <button style={{ marginTop: 8, fontSize: 11.5, fontWeight: 700, color: uc.text, padding: "5px 12px", borderRadius: 7, border: `1px solid ${uc.border}`, background: "rgba(255,255,255,0.6)", width: "100%", textAlign: "center" }}>
                          {alert.action}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card" style={{ overflow: "hidden" }}>
                <SectionHeader title="Quick Actions" />
                <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "New Prescription", icon: "pill",     color: "#7c3aed", bg: "#f5f3ff" },
                    { label: "Add Patient",       icon: "users",    color: "#0d9488", bg: "#f0fdfa" },
                    { label: "Order Lab Test",    icon: "flask",    color: "#2563eb", bg: "#eff6ff" },
                    { label: "Refer Patient",     icon: "file",     color: "#d97706", bg: "#fffbeb" },
                    { label: "Book Surgery",      icon: "surgery",  color: "#e11d48", bg: "#fff1f2" },
                    { label: "Send Message",      icon: "chat",     color: "#0891b2", bg: "#ecfeff" },
                  ].map((a) => (
                    <button key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 8px", borderRadius: 10, background: a.bg, border: "1px solid transparent", transition: "all 0.15s", textAlign: "center" }}
                      onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.96)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                      onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "scale(1)"; }}
                    >
                      <Icon name={a.icon} size={20} color={a.color} strokeWidth={2} />
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: a.color, lineHeight: 1.3 }}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 3: CHART + WARD + MESSAGES + TASKS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <WeeklyChart />
            <WardStatus />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <MessagesPanel />
            <TaskList />
          </div>

          {/* ── ROW 5: RECENT ACTIVITY ── */}
          <ActivityFeed />

          {/* Bottom spacer */}
          <div style={{ height: 8 }} />
        </main>
      </div>
    </div>
  );
  
}

