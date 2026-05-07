/**
 * Placeholder dashboards for Patient, Nurse, and Admin.
 * Each one is a ready-to-expand shell with the same design language
 * as DoctorDashboard. Replace the content sections as you build them out.
 */

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:wght@600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  button { cursor: pointer; border: none; background: transparent; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade { animation: fadeUp 0.4s ease both; }
`;

/* ─── Shared Shell ─── */
function DashboardShell({ role, accentColor, accentBg, navItems, cards, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f0f4f8", fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: "hidden" }}>
      <style>{CSS}</style>

      {/* Sidebar */}
      <aside style={{ width: 220, flexShrink: 0, background: "linear-gradient(180deg, #0b1f3a 0%, #0d2748 100%)", display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Logo */}
        <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 10, boxShadow: `0 4px 12px ${accentColor}44` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Lora', serif", color: "#fff", fontSize: 18, fontWeight: 600 }}>MedCore</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: item.active ? `${accentColor}22` : "transparent", color: item.active ? accentColor : "rgba(255,255,255,0.42)", fontWeight: item.active ? 600 : 500, fontSize: 13.5, cursor: "pointer" }}>
              <span style={{ fontSize: 16 }}>{item.emoji}</span>
              {item.label}
              {item.badge && <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, background: "#e11d48", color: "#fff", borderRadius: 99, padding: "1px 6px" }}>{item.badge}</span>}
            </div>
          ))}
        </nav>

        {/* User profile + logout */}
        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 99, background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700, flexShrink: 0 }}>
              {user?.avatar}
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <p style={{ fontSize: 12.5, color: "#fff", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", textTransform: "capitalize" }}>{role}</p>
            </div>
            <button onClick={handleLogout} title="Log out" style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Header */}
        <header style={{ height: 64, background: "#fff", borderBottom: "1px solid #e8edf3", display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0 }}>
          <div>
            <p style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 16, color: "#0f172a" }}>{greeting}, {user?.name}</p>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>{today}</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99, background: accentBg, color: accentColor, textTransform: "capitalize", border: `1px solid ${accentColor}33` }}>{role} Portal</span>
            <button onClick={handleLogout} style={{ fontSize: 13, fontWeight: 600, color: "#e11d48", padding: "6px 14px", borderRadius: 8, border: "1.5px solid #fecdd3", background: "#fff1f2" }}>
              Log out
            </button>
          </div>
        </header>

        {/* Body */}
       <main style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "24px" }}>
          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cards.length}, 1fr)`, gap: 14, marginBottom: 20 }}>
            {cards.map((c, i) => (
              <div key={i} className="fade" style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8edf3", padding: "18px 20px", animationDelay: `${i * 0.07}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{c.label}</p>
                    <p style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", lineHeight: 1.1, marginTop: 4 }}>{c.value}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{c.sub}</p>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    {c.emoji}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder content */}
          {children}
        </main>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PATIENT DASHBOARD
───────────────────────────────────────── */
export function PatientDashboard() {
  const patientNav = [
    { emoji: "🏠", label: "Overview",        active: true },
    { emoji: "📅", label: "My Appointments" },
    { emoji: "💊", label: "Prescriptions" },
    { emoji: "🧪", label: "Lab Results" },
    { emoji: "📋", label: "Medical History" },
    { emoji: "💬", label: "Messages",        badge: 1 },
    { emoji: "💳", label: "Billing" },
    { emoji: "⚙️", label: "Settings" },
  ];

  const cards = [
    { label: "Upcoming Appointments", value: "2",  sub: "Next: Tomorrow 10 AM",  emoji: "📅", bg: "#eff6ff" },
    { label: "Active Prescriptions",  value: "3",  sub: "1 refill needed",        emoji: "💊", bg: "#f5f3ff" },
    { label: "Lab Results Pending",   value: "1",  sub: "Expected today",         emoji: "🧪", bg: "#fefce8" },
    { label: "Unread Messages",       value: "1",  sub: "From Dr. Khalil",        emoji: "💬", bg: "#f0fdfa" },
  ];

  return (
    <DashboardShell role="patient" accentColor="#0d9488" accentBg="#f0fdfa" navItems={patientNav} cards={cards}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Upcoming Appointments */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8edf3", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Upcoming Appointments</p>
          </div>
          {[
            { date: "Tomorrow",    time: "10:00 AM", doctor: "Dr. Amir Khalil", type: "Follow-up",     color: "#dbeafe", text: "#1e40af" },
            { date: "May 15",      time: "2:30 PM",  doctor: "Dr. Lena Park",   type: "Lab Review",    color: "#d1fae5", text: "#065f46" },
          ].map((apt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: i === 0 ? "1px solid #f8fafc" : "none" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: apt.color, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: apt.text }}>{apt.date.slice(0, 3).toUpperCase()}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13.5, fontWeight: 600, color: "#1e293b" }}>{apt.type}</p>
                <p style={{ fontSize: 12, color: "#64748b" }}>{apt.doctor} · {apt.time}</p>
              </div>
              <button style={{ fontSize: 12, fontWeight: 600, color: "#0d9488", padding: "5px 12px", borderRadius: 7, border: "1.5px solid #0d9488", background: "transparent" }}>Details</button>
            </div>
          ))}
        </div>

        {/* Active Prescriptions */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8edf3", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Active Prescriptions</p>
          </div>
          {[
            { name: "Metformin 500mg",   freq: "Twice daily",  refill: "12 days left",  urgent: false },
            { name: "Lisinopril 10mg",   freq: "Once daily",   refill: "Refill needed", urgent: true },
            { name: "Atorvastatin 20mg", freq: "Once at night", refill: "20 days left", urgent: false },
          ].map((rx, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < 2 ? "1px solid #f8fafc" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💊</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{rx.name}</p>
                <p style={{ fontSize: 11.5, color: "#64748b" }}>{rx.freq}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 99, background: rx.urgent ? "#fff1f2" : "#f0fdf4", color: rx.urgent ? "#9f1239" : "#166534" }}>{rx.refill}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

/* ─────────────────────────────────────────
   NURSE DASHBOARD
───────────────────────────────────────── */
export function NurseDashboard() {
  const nurseNav = [
    { emoji: "🏠", label: "Overview",       active: true },
    { emoji: "🛏️", label: "Ward Patients" },
    { emoji: "📅", label: "My Schedule" },
    { emoji: "💉", label: "Medications" },
    { emoji: "📋", label: "Care Plans" },
    { emoji: "⚠️", label: "Alerts",         badge: 3 },
    { emoji: "💬", label: "Messages",       badge: 2 },
    { emoji: "⚙️", label: "Settings" },
  ];

  const cards = [
    { label: "Patients in Ward",    value: "14", sub: "Ward 4B · 2 critical",  emoji: "🛏️", bg: "#eff6ff" },
    { label: "Medications Due",     value: "6",  sub: "Next in 15 minutes",    emoji: "💉", bg: "#fdf4ff" },
    { label: "Pending Vitals",      value: "4",  sub: "3 overdue",             emoji: "🩺", bg: "#fff7ed" },
    { label: "Active Alerts",       value: "3",  sub: "1 critical",            emoji: "⚠️", bg: "#fff1f2" },
  ];

  return (
    <DashboardShell role="nurse" accentColor="#7c3aed" accentBg="#f5f3ff" navItems={nurseNav} cards={cards}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Medication Schedule */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8edf3", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Medication Schedule</p>
            <span style={{ fontSize: 11, fontWeight: 700, background: "#fdf4ff", color: "#7c3aed", padding: "2px 10px", borderRadius: 99 }}>6 due today</span>
          </div>
          {[
            { time: "10:00 AM", patient: "James Okafor",  med: "Aspirin 100mg",      status: "Due",   statusColor: "#f59e0b", statusBg: "#fffbeb" },
            { time: "10:30 AM", patient: "Marcus Chen",   med: "Warfarin 5mg",       status: "Due",   statusColor: "#f59e0b", statusBg: "#fffbeb" },
            { time: "11:00 AM", patient: "Fatima Al-Rashid", med: "Folic Acid 400mcg", status: "Upcoming", statusColor: "#64748b", statusBg: "#f1f5f9" },
            { time: "08:00 AM", patient: "Sarah Mitchell", med: "Amoxicillin 500mg", status: "Given",  statusColor: "#059669", statusBg: "#f0fdf4" },
          ].map((med, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < 3 ? "1px solid #f8fafc" : "none" }}>
              <div style={{ textAlign: "center", width: 52, flexShrink: 0 }}>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{med.time}</p>
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{med.patient}</p>
                <p style={{ fontSize: 11.5, color: "#64748b" }}>{med.med}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: med.statusBg, color: med.statusColor, flexShrink: 0 }}>{med.status}</span>
            </div>
          ))}
        </div>

        {/* Vitals Pending */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8edf3", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Vitals Pending</p>
            <span style={{ fontSize: 11, fontWeight: 700, background: "#fff1f2", color: "#e11d48", padding: "2px 10px", borderRadius: 99 }}>3 overdue</span>
          </div>
          {[
            { patient: "Marcus Chen",    room: "A-115", due: "Overdue 30m", overdue: true },
            { patient: "David Nkomo",    room: "C-310", due: "Overdue 10m", overdue: true },
            { patient: "Elena Vasquez",  room: "B-204", due: "Overdue 5m",  overdue: true },
            { patient: "James Okafor",   room: "B-207", due: "Due in 20m",  overdue: false },
          ].map((v, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < 3 ? "1px solid #f8fafc" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: v.overdue ? "#fff1f2" : "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🩺</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{v.patient}</p>
                <p style={{ fontSize: 11.5, color: "#64748b" }}>Room {v.room}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: v.overdue ? "#9f1239" : "#065f46", background: v.overdue ? "#fff1f2" : "#f0fdf4", padding: "3px 9px", borderRadius: 99 }}>{v.due}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

/* ─────────────────────────────────────────
   ADMIN DASHBOARD
───────────────────────────────────────── */
export function AdminDashboard() {
  const adminNav = [
    { emoji: "🏠", label: "Overview",       active: true },
    { emoji: "👥", label: "Staff",           },
    { emoji: "🏥", label: "Departments" },
    { emoji: "📅", label: "Scheduling" },
    { emoji: "💳", label: "Billing & Finance" },
    { emoji: "📦", label: "Inventory" },
    { emoji: "📊", label: "Reports" },
    { emoji: "⚙️", label: "Settings" },
  ];

  const cards = [
    { label: "Total Patients Today", value: "48", sub: "↑ 6 vs yesterday",       emoji: "🏥", bg: "#eff6ff" },
    { label: "Staff on Duty",        value: "32", sub: "8 departments active",   emoji: "👥", bg: "#f0fdfa" },
    { label: "Beds Occupied",        value: "64", sub: "Out of 80 total",        emoji: "🛏️", bg: "#fdf4ff" },
    { label: "Pending Invoices",     value: "11", sub: "MAD 24,500 outstanding", emoji: "💳", bg: "#fffbeb" },
  ];

  return (
    <DashboardShell role="admin" accentColor="#d97706" accentBg="#fffbeb" navItems={adminNav} cards={cards}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Department Overview */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8edf3", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Department Overview</p>
          </div>
          {[
            { dept: "Cardiology",    staff: 12, patients: 18, color: "#dbeafe", text: "#1e40af" },
            { dept: "General Ward",  staff: 8,  patients: 24, color: "#d1fae5", text: "#065f46" },
            { dept: "ICU",           staff: 6,  patients: 8,  color: "#fff1f2", text: "#9f1239" },
            { dept: "Maternity",     staff: 5,  patients: 12, color: "#fdf4ff", text: "#7e22ce" },
            { dept: "Emergency",     staff: 7,  patients: 6,  color: "#fffbeb", text: "#92400e" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 20px", borderBottom: i < 4 ? "1px solid #f8fafc" : "none" }}>
              <div style={{ width: 10, height: 10, borderRadius: 99, background: d.text, flexShrink: 0 }} />
              <p style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: "#1e293b" }}>{d.dept}</p>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{d.staff}</p>
                  <p style={{ fontSize: 10, color: "#94a3b8" }}>staff</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{d.patients}</p>
                  <p style={{ fontSize: 10, color: "#94a3b8" }}>patients</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent System Activity */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8edf3", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Recent System Activity</p>
          </div>
          {[
            { icon: "👤", text: "New patient registered — Yuki Tanaka",        time: "9:15 AM",  color: "#eff6ff" },
            { icon: "💳", text: "Invoice #4821 paid — MAD 3,200",             time: "8:52 AM",  color: "#f0fdf4" },
            { icon: "🏥", text: "ICU bed 6 assigned to James Okafor",          time: "8:30 AM",  color: "#fff1f2" },
            { icon: "👥", text: "Dr. Sofia Reyes checked in for on-call duty", time: "8:00 AM",  color: "#fdf4ff" },
            { icon: "📦", text: "Pharmacy stock alert — Amoxicillin low",      time: "7:45 AM",  color: "#fffbeb" },
          ].map((act, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 20px", borderBottom: i < 4 ? "1px solid #f8fafc" : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: act.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                {act.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.4 }}>{act.text}</p>
                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
