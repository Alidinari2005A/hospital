import { useState } from 'react';
// Imports from your 'pages' folder
import MyPatients from "./pages/01-MyPatients";
import Appointments from "./pages/02-Appointments";
import LabResults from "./pages/03-LabResults";
import Prescriptions from "./pages/04-Prescriptions";
import Messages from "./pages/05-Messages";
import Analytics from "./pages/06-Analytics";

/* ═══════════════════════════════════════════
   SUPPORTING COMPONENTS
═══════════════════════════════════════════ */

// Fix for "PlaceholderPage is not defined"
const PlaceholderPage = ({ title, emoji, accentColor }) => (
  <div className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
    <div className="text-6xl mb-4">{emoji}</div>
    <h2 className="text-2xl font-bold" style={{ color: accentColor }}>{title} Module</h2>
    <p className="text-slate-500 mt-2">Currently under construction for this demo.</p>
  </div>
);

// Fix for "setActiveTab is never used" -> We now use it in the sidebar buttons
const DashboardShell = ({ navItems, pages, accentColor, accentBg }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-2">
        <div className="font-bold text-xl mb-8 flex items-center gap-2">
          <span className="p-2 rounded-lg bg-blue-600 text-white text-xs">H+</span>
          HospitalApp
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)} // setActiveTab IS NOW USED
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === item.label
                  ? `shadow-sm text-slate-900`
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
              style={activeTab === item.label ? { backgroundColor: accentBg } : {}}
            >
              <span>{item.emoji}</span>
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {pages[activeTab] || <PlaceholderPage title={activeTab} emoji="❓" accentColor={accentColor} />}
        </div>
      </main>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN DOCTOR DASHBOARD
═══════════════════════════════════════════ */
export function DoctorDashboard() {
  const navItems = [
    { emoji: "🏠", label: "Overview" },
    { emoji: "👥", label: "My Patients" },
    { emoji: "📅", label: "Appointments" },
    { emoji: "🧪", label: "Lab Results" },
    { emoji: "💊", label: "Prescriptions" },
    { emoji: "💬", label: "Messages", badge: 3 },
    { emoji: "📊", label: "Analytics" },
    { emoji: "⚙️", label: "Settings" },
  ];

  const pages = {
    "Overview":      <PlaceholderPage title="Overview" emoji="🏠" accentColor="#2563eb" />,
    "My Patients":   <MyPatients />,
    "Appointments":  <Appointments />,
    "Lab Results":   <LabResults />,
    "Prescriptions": <Prescriptions />,
    "Messages":      <Messages />,
    "Analytics":     <Analytics />,
    "Settings":      <PlaceholderPage title="Settings" emoji="⚙️" accentColor="#2563eb" />,
  };

  return (
    <DashboardShell 
      navItems={navItems} 
      pages={pages} 
      accentColor="#2563eb" 
      accentBg="#eff6ff" 
    />
  );
}