/* ═══════════════════════════════════════════
   SHARED DESIGN SYSTEM (matching Doctor UI)
═══════════════════════════════════════════ */
import { useState } from "react";
const Avatar = ({ initials, color }) => (
  <div style={{
    width: 36, height: 36, borderRadius: "50%",
    background: color, display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 12, fontWeight: 700,
    color: "#fff", flexShrink: 0, fontFamily: "'Inter', sans-serif"
  }}>{initials}</div>
);

const StatCard = ({ label, value, sub1, sub2, icon, iconBg }) => (
  <div style={{
    background: "#fff", borderRadius: 16, padding: "24px",
    border: "1px solid #f0f0f0", flex: 1, minWidth: 0
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>{label}</p>
        <p style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: 0, fontFamily: "'Inter', sans-serif" }}>{value}</p>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4, fontFamily: "'Inter', sans-serif" }}>{sub1}</p>
      </div>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
    </div>
    {sub2 && <p style={{ fontSize: 12, color: sub2.startsWith("↑") ? "#10b981" : sub2.startsWith("↓") ? "#ef4444" : "#6b7280", marginTop: 16, fontFamily: "'Inter', sans-serif" }}>{sub2}</p>}
  </div>
);

const MedSidebar = ({ nav, active, setActive, user, onCallUsers, accentColor }) => (
  <aside style={{
    width: 240, background: "#0d1f17", display: "flex", flexDirection: "column",
    padding: "24px 16px", flexShrink: 0, fontFamily: "'Inter', sans-serif"
  }}>
    {/* Brand */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, paddingLeft: 8 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>+</div>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>MedCore</span>
      <span style={{ marginLeft: "auto", fontSize: 18, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>‹‹</span>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      {nav.map(item => (
        <button key={item.label} onClick={() => setActive(item.label)} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
          background: active === item.label ? "rgba(0,201,167,0.12)" : "transparent",
          color: active === item.label ? accentColor : "rgba(255,255,255,0.5)",
          fontWeight: active === item.label ? 600 : 400,
          fontSize: 14, width: "100%", textAlign: "left", position: "relative"
        }}>
          <span style={{ fontSize: 18 }}>{item.emoji}</span>
          {item.label}
          {active === item.label && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: accentColor }} />}
          {item.badge && active !== item.label && (
            <span style={{ marginLeft: "auto", background: "#ef4444", color: "#fff", fontSize: 10, padding: "2px 6px", borderRadius: 99, fontWeight: 700 }}>{item.badge}</span>
          )}
        </button>
      ))}
    </nav>

    {/* On Call */}
    {onCallUsers && (
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, paddingLeft: 4 }}>ON CALL NOW</p>
        {onCallUsers.map(u => (
          <div key={u.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px" }}>
            <Avatar initials={u.initials} color={u.color} />
            <div>
              <p style={{ fontSize: 12, color: "#fff", fontWeight: 600, margin: 0 }}>{u.name}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>{u.dept} · <span style={{ color: u.statusColor }}>{u.status}</span></p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* User */}
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
      <Avatar initials={user.initials} color={accentColor} />
      <div>
        <p style={{ fontSize: 13, color: "#fff", fontWeight: 600, margin: 0 }}>{user.name}</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>{user.role}</p>
      </div>
    </div>
  </aside>
);

const TopBar = ({ greeting, date, searchPlaceholder, accentColor, userInitials }) => (
  <div style={{ display: "flex", alignItems: "center", padding: "20px 32px", borderBottom: "1px solid #f0f0f0", background: "#fff", gap: 16 }}>
    <div style={{ flex: 1 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0, fontFamily: "'Inter', sans-serif" }}>{greeting}</h1>
      <p style={{ fontSize: 13, color: "#6b7280", margin: 0, fontFamily: "'Inter', sans-serif" }}>{date}</p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 14px", width: 240 }}>
      <span style={{ color: "#94a3b8" }}>🔍</span>
      <input placeholder={searchPlaceholder} style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#64748b", width: "100%", fontFamily: "'Inter', sans-serif" }} />
    </div>
    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>🔔</div>
    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
      💬
      <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#ef4444", borderRadius: "50%", fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>2</span>
    </div>
    <div style={{ width: 36, height: 36, borderRadius: "50%", background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Inter', sans-serif" }}>{userInitials}</div>
  </div>
);

/* ═══════════════════════════════════════════
   PATIENT DASHBOARD
═══════════════════════════════════════════ */
export function PatientDashboard() {
  const [active, setActive] = useState("Dashboard");
  const accentColor = "#0891b2";

  const nav = [
    { emoji: "🏠", label: "Dashboard" },
    { emoji: "📅", label: "Appointments" },
    { emoji: "🧪", label: "My Results" },
    { emoji: "💊", label: "Medications" },
    { emoji: "💬", label: "Messages", badge: 2 },
    { emoji: "💳", label: "Billing" },
    { emoji: "⚙️", label: "Settings" },
  ];

  const appointments = [
    { time: "Mon 12 May", doctor: "Dr. Khalil", specialty: "Cardiology", room: "B-207", status: "Confirmed", statusColor: "#10b981", initials: "AK", color: "#0891b2" },
    { time: "Fri 16 May", doctor: "Dr. Reyes", specialty: "General Check", room: "A-102", status: "Pending", statusColor: "#f59e0b", initials: "SR", color: "#7c3aed" },
    { time: "Mon 19 May", doctor: "Dr. Faris", specialty: "Anesthesiology", room: "C-301", status: "Confirmed", statusColor: "#10b981", initials: "OF", color: "#dc2626" },
  ];

  const results = [
    { name: "Blood Panel", date: "3 days ago", status: "Normal", color: "#10b981", bg: "#ecfdf5" },
    { name: "ECG Report", date: "1 week ago", status: "Review", color: "#f59e0b", bg: "#fffbeb" },
    { name: "Chest X-Ray", date: "2 weeks ago", status: "Normal", color: "#10b981", bg: "#ecfdf5" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#f8fafc" }}>
      <MedSidebar nav={nav} active={active} setActive={setActive} accentColor={accentColor}
        user={{ name: "Sarah Mitchell", initials: "SM", role: "Patient · Ward A" }}
        onCallUsers={null}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar greeting="Good morning, Sarah" date="Sunday, 10 May 2026" searchPlaceholder="Search records, doctors..." accentColor={accentColor} userInitials="SM" />
        <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>

          {/* Stat Cards */}
          <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
            <StatCard label="Upcoming Appointments" value="3" sub1="Next: Mon 12 May" sub2="↑ 1 added this week" icon="📅" iconBg="#e0f2fe" />
            <StatCard label="Active Medications" value="4" sub1="2 need refill soon" sub2="Check reminders" icon="💊" iconBg="#fef9c3" />
            <StatCard label="Pending Results" value="1" sub1="ECG awaiting review" sub2="↓ Action needed" icon="🧪" iconBg="#fce7f3" />
            <StatCard label="Unread Messages" value="2" sub1="From care team" sub2="Reply recommended" icon="💬" iconBg="#ede9fe" />
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            {/* Appointments Table */}
            <div style={{ flex: 2, background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: 0 }}>Upcoming Appointments</h2>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>3 scheduled · 0 completed</p>
                </div>
                <button style={{ background: accentColor, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Book New</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1.5fr 0.8fr 1fr 0.3fr", gap: 8, padding: "8px 0", borderBottom: "1px solid #f0f0f0", marginBottom: 8 }}>
                {["DATE", "DOCTOR", "TYPE", "ROOM", "STATUS", ""].map(h => (
                  <span key={h} style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em" }}>{h}</span>
                ))}
              </div>
              {appointments.map((a, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1.5fr 0.8fr 1fr 0.3fr", gap: 8, padding: "14px 0", borderBottom: "1px solid #f8fafc", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{a.time}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar initials={a.initials} color={a.color} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>{a.doctor}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: "#374151" }}>{a.specialty}</span>
                  <span style={{ fontSize: 13, color: "#6b7280", background: "#f1f5f9", padding: "3px 8px", borderRadius: 6, display: "inline-block" }}>{a.room}</span>
                  <span style={{ fontSize: 12, color: a.statusColor, fontWeight: 600 }}>● {a.status}</span>
                  <span style={{ color: "#cbd5e1", cursor: "pointer" }}>›</span>
                </div>
              ))}
            </div>

            {/* Results Panel */}
            <div style={{ flex: 1, background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: 0 }}>Recent Results</h2>
                <span style={{ fontSize: 13, color: accentColor, cursor: "pointer", fontWeight: 600 }}>View All ›</span>
              </div>
              {results.map((r, i) => (
                <div key={i} style={{ background: r.bg, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>{r.name}</p>
                    <span style={{ fontSize: 12, color: r.color, fontWeight: 700 }}>{r.status}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 12px" }}>{r.date}</p>
                  <button style={{ width: "100%", background: "#fff", border: `1px solid ${r.color}30`, borderRadius: 8, padding: "7px", fontSize: 12, color: r.color, fontWeight: 600, cursor: "pointer" }}>View Report</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NURSE DASHBOARD
═══════════════════════════════════════════ */
export function NurseDashboard() {
  const [active, setActive] = useState("Dashboard");
  const accentColor = "#7c3aed";

  const nav = [
    { emoji: "🏠", label: "Dashboard" },
    { emoji: "🛏️", label: "My Patients" },
    { emoji: "📋", label: "Tasks", badge: 5 },
    { emoji: "💉", label: "Vitals" },
    { emoji: "💬", label: "Messages", badge: 1 },
    { emoji: "📅", label: "Schedule" },
    { emoji: "⚙️", label: "Settings" },
  ];

  const patients = [
    { name: "James Okafor", age: "52y", room: "B-207", condition: "Cardiac monitoring", vitals: "BP 140/90", priority: "Critical", priorityColor: "#ef4444", priorityBg: "#fef2f2", initials: "JO", color: "#ef4444" },
    { name: "Fatima Al-Rashid", age: "29y", room: "C-301", condition: "Post-op recovery", vitals: "BP 118/76", priority: "Stable", priorityColor: "#10b981", priorityBg: "#ecfdf5", initials: "FA", color: "#f59e0b" },
    { name: "Marcus Chen", age: "67y", room: "A-115", condition: "Infection suspected", vitals: "Temp 38.9°C", priority: "High", priorityColor: "#f59e0b", priorityBg: "#fffbeb", initials: "MC", color: "#0891b2" },
    { name: "Elena Vasquez", age: "41y", room: "B-204", condition: "Prenatal check", vitals: "HR 88 bpm", priority: "Stable", priorityColor: "#10b981", priorityBg: "#ecfdf5", initials: "EV", color: "#7c3aed" },
  ];

  const tasks = [
    { task: "Administer insulin — James Okafor", time: "09:00", done: false, urgency: "#ef4444" },
    { task: "Record vitals — Ward B", time: "10:00", done: false, urgency: "#f59e0b" },
    { task: "Dressing change — Room C-301", time: "11:30", done: true, urgency: "#10b981" },
    { task: "Doctor handover notes", time: "14:00", done: false, urgency: "#f59e0b" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#f8fafc" }}>
      <MedSidebar nav={nav} active={active} setActive={setActive} accentColor={accentColor}
        user={{ name: "Nurse Amina T.", initials: "AT", role: "RN · Ward B & C" }}
        onCallUsers={[
          { name: "Dr. Khalil", initials: "AK", color: "#0891b2", dept: "Cardiology", status: "On duty", statusColor: "#10b981" },
          { name: "Dr. Reyes", initials: "SR", color: "#7c3aed", dept: "Emergency", status: "Standby", statusColor: "#f59e0b" },
        ]}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar greeting="Good morning, Amina" date="Sunday, 10 May 2026" searchPlaceholder="Search patients, tasks..." accentColor={accentColor} userInitials="AT" />
        <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>

          <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
            <StatCard label="Assigned Patients" value="8" sub1="Across Ward B & C" sub2="↑ 2 vs yesterday" icon="🛏️" iconBg="#ede9fe" />
            <StatCard label="Pending Tasks" value="5" sub1="2 urgent" sub2="↓ Action needed" icon="📋" iconBg="#fce7f3" />
            <StatCard label="Vitals Due" value="3" sub1="Next at 10:00 AM" sub2="On schedule" icon="💉" iconBg="#ecfdf5" />
            <StatCard label="Shift Hours" value="6h" sub1="Ends at 15:00" sub2="Break at 12:30" icon="🕐" iconBg="#fef9c3" />
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            {/* Patient List */}
            <div style={{ flex: 2, background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: 0 }}>My Patients</h2>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>4 shown · 8 total assigned</p>
                </div>
                <button style={{ background: accentColor, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Record Vitals</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.8fr 1.5fr 1.2fr 1fr 0.3fr", gap: 8, padding: "8px 0", borderBottom: "1px solid #f0f0f0", marginBottom: 8 }}>
                {["PATIENT", "ROOM", "CONDITION", "LATEST VITALS", "PRIORITY", ""].map(h => (
                  <span key={h} style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em" }}>{h}</span>
                ))}
              </div>
              {patients.map((p, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 0.8fr 1.5fr 1.2fr 1fr 0.3fr", gap: 8, padding: "14px 0", borderBottom: "1px solid #f8fafc", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar initials={p.initials} color={p.color} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>{p.name}</p>
                      <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{p.age}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: "#6b7280", background: "#f1f5f9", padding: "3px 8px", borderRadius: 6 }}>{p.room}</span>
                  <span style={{ fontSize: 12, color: "#374151" }}>{p.condition}</span>
                  <span style={{ fontSize: 12, color: "#374151", fontFamily: "monospace" }}>{p.vitals}</span>
                  <span style={{ fontSize: 12, color: p.priorityColor, fontWeight: 700, background: p.priorityBg, padding: "3px 10px", borderRadius: 99, display: "inline-block" }}>● {p.priority}</span>
                  <span style={{ color: "#cbd5e1", cursor: "pointer" }}>›</span>
                </div>
              ))}
            </div>

            {/* Task Panel */}
            <div style={{ flex: 1, background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: 0 }}>Today's Tasks</h2>
                <span style={{ fontSize: 13, color: accentColor, cursor: "pointer", fontWeight: 600 }}>View All ›</span>
              </div>
              {tasks.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f8fafc", alignItems: "flex-start", opacity: t.done ? 0.5 : 1 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${t.done ? "#10b981" : t.urgency}`, background: t.done ? "#10b981" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    {t.done && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: "#0f172a", margin: 0, textDecoration: t.done ? "line-through" : "none" }}>{t.task}</p>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "3px 0 0" }}>{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ADMIN DASHBOARD
═══════════════════════════════════════════ */
export function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");
  const accentColor = "#dc2626";

  const nav = [
    { emoji: "🏠", label: "Dashboard" },
    { emoji: "👨‍⚕️", label: "Staff" },
    { emoji: "🏥", label: "Departments" },
    { emoji: "💰", label: "Billing" },
    { emoji: "📊", label: "Reports" },
    { emoji: "💬", label: "Messages", badge: 4 },
    { emoji: "⚙️", label: "Settings" },
  ];

  const staff = [
    { name: "Dr. Amir Khalil", role: "Cardiologist", dept: "Cardiology", status: "On Duty", statusColor: "#10b981", statusBg: "#ecfdf5", patients: 12, initials: "AK", color: "#0891b2" },
    { name: "Dr. Sofia Reyes", role: "Emergency MD", dept: "Emergency", status: "On Duty", statusColor: "#10b981", statusBg: "#ecfdf5", patients: 8, initials: "SR", color: "#7c3aed" },
    { name: "Dr. Omar Faris", role: "Anesthesiologist", dept: "Surgery", status: "Standby", statusColor: "#f59e0b", statusBg: "#fffbeb", patients: 3, initials: "OF", color: "#f59e0b" },
    { name: "Nurse Amina T.", role: "Head Nurse", dept: "Ward B & C", status: "On Duty", statusColor: "#10b981", statusBg: "#ecfdf5", patients: 8, initials: "AT", color: "#dc2626" },
  ];

  const alerts = [
    { title: "ICU Bed Shortage", desc: "Only 2 beds available in ICU", level: "Critical", levelColor: "#ef4444", time: "5m ago", bg: "#fef2f2" },
    { title: "Equipment Maintenance", desc: "MRI Unit 2 — scheduled downtime", level: "Notice", levelColor: "#f59e0b", time: "1h ago", bg: "#fffbeb" },
    { title: "Pharmacy Stock Low", desc: "Amoxicillin below threshold", level: "Warning", levelColor: "#f59e0b", time: "2h ago", bg: "#fffbeb" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#f8fafc" }}>
      <MedSidebar nav={nav} active={active} setActive={setActive} accentColor={accentColor}
        user={{ name: "Admin Hassan", initials: "AH", role: "Hospital Administrator" }}
        onCallUsers={null}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar greeting="Good morning, Hassan" date="Sunday, 10 May 2026" searchPlaceholder="Search staff, departments..." accentColor={accentColor} userInitials="AH" />
        <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>

          <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
            <StatCard label="Total Staff On Duty" value="24" sub1="Out of 38 total" sub2="↑ 3 vs yesterday" icon="👨‍⚕️" iconBg="#fef2f2" />
            <StatCard label="Active Departments" value="6" sub1="All operational" sub2="No closures today" icon="🏥" iconBg="#ecfdf5" />
            <StatCard label="Monthly Revenue" value="$1.2M" sub1="82% collected" sub2="↑ +8% vs last month" icon="💰" iconBg="#fef9c3" />
            <StatCard label="Open Tickets" value="7" sub1="3 high priority" sub2="↓ Action needed" icon="🎫" iconBg="#ede9fe" />
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            {/* Staff Table */}
            <div style={{ flex: 2, background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: 0 }}>Staff Overview</h2>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>24 on duty · 14 off shift</p>
                </div>
                <button style={{ background: accentColor, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Staff</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 1.2fr 1fr 0.8fr 0.3fr", gap: 8, padding: "8px 0", borderBottom: "1px solid #f0f0f0", marginBottom: 8 }}>
                {["STAFF MEMBER", "ROLE", "DEPARTMENT", "STATUS", "PATIENTS", ""].map(h => (
                  <span key={h} style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em" }}>{h}</span>
                ))}
              </div>
              {staff.map((s, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 1.2fr 1fr 0.8fr 0.3fr", gap: 8, padding: "14px 0", borderBottom: "1px solid #f8fafc", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar initials={s.initials} color={s.color} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>{s.name}</p>
                  </div>
                  <span style={{ fontSize: 13, color: "#374151" }}>{s.role}</span>
                  <span style={{ fontSize: 13, color: "#374151" }}>{s.dept}</span>
                  <span style={{ fontSize: 12, color: s.statusColor, fontWeight: 700, background: s.statusBg, padding: "3px 10px", borderRadius: 99, display: "inline-block" }}>● {s.status}</span>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{s.patients}</span>
                  <span style={{ color: "#cbd5e1", cursor: "pointer" }}>›</span>
                </div>
              ))}
            </div>

            {/* Alerts Panel */}
            <div style={{ flex: 1, background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: 0 }}>System Alerts</h2>
                <span style={{ fontSize: 13, color: accentColor, cursor: "pointer", fontWeight: 600 }}>View All ›</span>
              </div>
              {alerts.map((a, i) => (
                <div key={i} style={{ background: a.bg, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: 0 }}>{a.title}</p>
                    <span style={{ fontSize: 11, color: a.levelColor, fontWeight: 700 }}>{a.level}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 12px" }}>{a.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{a.time}</span>
                    <button style={{ background: "#fff", border: `1px solid ${a.levelColor}30`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: a.levelColor, fontWeight: 600, cursor: "pointer" }}>Resolve</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}