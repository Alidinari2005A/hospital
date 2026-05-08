import { useState } from 'react';
import MyPatients from "./pages/01-MyPatients";
import Analytics from "./pages/06-Analytics";

// FIXED: Defining PlaceholderPage so it's not 'undefined'
const PlaceholderPage = ({ title, emoji }) => (
  <div className="flex flex-col items-center justify-center p-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
    <span className="text-6xl mb-4">{emoji}</span>
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    <p className="text-slate-500 mt-2">Section is currently under development.</p>
  </div>
);

export default function DoctorDashboard() {
  // FIXED: setActiveTab will now be used in the sidebar buttons
  const [activeTab, setActiveTab] = useState("Overview");

  const pages = {
    "Overview": <PlaceholderPage title="Dashboard Overview" emoji="🏠" />,
    "My Patients": <MyPatients />,
    "Analytics": <Analytics />,
    "Settings": <PlaceholderPage title="Settings" emoji="⚙️" />
  };

  const menuItems = ["Overview", "My Patients", "Analytics", "Settings"];

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 border-r p-6 bg-slate-50">
        <h1 className="text-xl font-bold mb-10 text-teal-600">MedClinic Pro</h1>
        <nav className="flex flex-col gap-2">
          {menuItems.map(item => (
            <button
              key={item}
              // FIXED: Actually using setActiveTab here
              onClick={() => setActiveTab(item)}
              className={`text-left px-4 py-3 rounded-xl transition ${
                activeTab === item ? 'bg-teal-500 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      
      <main className="flex-1 p-8">
        {pages[activeTab]}
      </main>
    </div>
  );
}