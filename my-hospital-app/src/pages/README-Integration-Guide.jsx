import { useState } from 'react';
// REMOVED: 'Menu' icon was unused
import { Bell, Search, LogOut } from 'lucide-react';

// Import all pages
import MyPatients from './01-MyPatients';
import Appointments from './02-Appointments';
import LabResults from './03-LabResults';
import Prescriptions from './04-Prescriptions';
import Messages from './05-Messages';
import Analytics from './06-Analytics';
import MedicalRecords, { NotificationsPanel, SearchOverlay } from './EXTRA-Components';

export default function DashboardApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'my-patients': return <MyPatients />;
      case 'appointments': return <Appointments />;
      case 'lab-results': return <LabResults />;
      case 'prescriptions': return <Prescriptions />;
      case 'messages': return <Messages />;
      case 'analytics': return <Analytics />;
      case 'medical-records': return <MedicalRecords />;
      default: return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <nav className="sticky top-0 z-40 bg-slate-800/50 border-b border-slate-700 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-lg">DK</span>
            </div>
            <div>
              <h1 className="font-bold text-white">Dr. Khalil</h1>
              <p className="text-xs text-slate-400">Medical Dashboard</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <button
              onClick={() => setShowSearch(true)}
              className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 transition text-sm flex items-center gap-2"
            >
              <Search size={16} />
              Search patients...
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-slate-700/30 rounded-lg transition text-slate-400 hover:text-white"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={() => setShowSearch(true)}
              className="md:hidden p-2 hover:bg-slate-700/30 rounded-lg transition text-slate-400 hover:text-white"
            >
              <Search size={20} />
            </button>

            <button className="p-2 hover:bg-slate-700/30 rounded-lg transition text-slate-400 hover:text-white">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 p-8">
        <div className="lg:col-span-1">
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sticky top-24 space-y-2">
            {[
              { icon: '🏠', label: 'Dashboard', id: 'dashboard' },
              { icon: '👥', label: 'My Patients', id: 'my-patients' },
              { icon: '📅', label: 'Appointments', id: 'appointments' },
              { icon: '🧪', label: 'Lab Results', id: 'lab-results' },
              { icon: '💊', label: 'Prescriptions', id: 'prescriptions' },
              { icon: '💬', label: 'Messages', id: 'messages', badge: 4 },
              { icon: '📊', label: 'Analytics', id: 'analytics' },
              { icon: '📋', label: 'Medical Records', id: 'medical-records' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium flex items-center justify-between ${
                  currentPage === item.id
                    ? 'bg-teal-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-700/30'
                }`}
              >
                <span>{item.icon} {item.label}</span>
                {item.badge && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          {renderPage()}
        </div>
      </div>

      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </div>
  );
}

function Dashboard({ setCurrentPage }) {
  const stats = [
    { label: 'My Patients', value: '6', color: 'from-teal-500 to-cyan-500', id: 'my-patients' },
    { label: "Today's Appointments", value: '8', color: 'from-blue-500 to-blue-600', id: 'appointments' },
    { label: 'Pending Labs', value: '3', color: 'from-amber-500 to-orange-600', id: 'lab-results' },
    { label: 'Unread Messages', value: '4', color: 'from-pink-500 to-rose-600', id: 'messages' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Dr. Khalil</h1>
        <p className="text-slate-400">Here's your daily overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((card, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(card.id)}
            // FIXED: 'card.color' is now used to apply the gradient style
            className={`p-6 rounded-xl bg-gradient-to-br ${card.color} border border-white/10 hover:opacity-90 transition-all hover:transform hover:scale-105 text-left group`}
          >
            <p className="text-white/70 text-sm mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </button>
        ))}
      </div>

      <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => setCurrentPage('my-patients')} className="p-6 bg-teal-500/10 border border-teal-500/30 rounded-lg hover:bg-teal-500/20 transition text-left">
            <p className="text-teal-400 font-semibold">View Patient List</p>
            <p className="text-slate-400 text-sm">Navigation → My Patients</p>
          </button>
          <button onClick={() => setCurrentPage('appointments')} className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition text-left">
            <p className="text-blue-400 font-semibold">Schedule Appointment</p>
            <p className="text-slate-400 text-sm">Navigation → Appointments</p>
          </button>
          <button onClick={() => setCurrentPage('prescriptions')} className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition text-left">
            <p className="text-purple-400 font-semibold">New Prescription</p>
            <p className="text-slate-400 text-sm">Navigation → Prescriptions</p>
          </button>
        </div>
      </div>
    </div>
  );
}