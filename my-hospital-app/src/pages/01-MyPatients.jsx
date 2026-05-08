import { useState, useMemo } from 'react';
import { Search, ChevronRight, AlertCircle, Check, Clock, User, Activity, Heart, Stethoscope } from 'lucide-react';

const mockPatients = [
  {
    id: 1,
    name: "Ahmed Hassan",
    age: 45,
    mrn: "MRN-2024-001",
    status: "admitted",
    lastVisit: "2024-01-15",
    diagnosis: "Hypertension, Type 2 Diabetes",
    vitals: { bp: "150/95", temp: "98.6°F", hr: "82" },
    allergies: "Penicillin",
    notes: "Patient shows good compliance with medication."
  },
  {
    id: 2,
    name: "Fatima Al-Rashid",
    age: 32,
    mrn: "MRN-2024-002",
    status: "critical",
    lastVisit: "2024-01-16",
    diagnosis: "Acute myocardial infarction",
    vitals: { bp: "160/100", temp: "99.2°F", hr: "105" },
    allergies: "NKDA",
    notes: "Under intensive care. Troponin levels elevated."
  },
  {
    id: 3,
    name: "Mohammad Khan",
    age: 67,
    mrn: "MRN-2024-003",
    status: "discharged",
    lastVisit: "2024-01-14",
    diagnosis: "Pneumonia - resolved",
    vitals: { bp: "135/82", temp: "98.4°F", hr: "74" },
    allergies: "Sulfonamides",
    notes: "Successfully treated. Follow-up in 2 weeks."
  },
  {
    id: 4,
    name: "Layla Mansouri",
    age: 28,
    mrn: "MRN-2024-004",
    status: "admitted",
    lastVisit: "2024-01-17",
    diagnosis: "Pregnancy - 32 weeks",
    vitals: { bp: "118/76", temp: "98.7°F", hr: "88" },
    allergies: "Aspirin",
    notes: "Regular prenatal checkups on schedule."
  },
  {
    id: 5,
    name: "Hassan Ibrahim",
    age: 55,
    mrn: "MRN-2024-005",
    status: "discharged",
    lastVisit: "2024-01-13",
    diagnosis: "Cataract surgery - post-op",
    vitals: { bp: "128/80", temp: "98.5°F", hr: "76" },
    allergies: "NKDA",
    notes: "Vision improving well. Stitches to be removed next week."
  },
  {
    id: 6,
    name: "Noor Al-Mansouri",
    age: 19,
    mrn: "MRN-2024-006",
    status: "critical",
    lastVisit: "2024-01-17",
    diagnosis: "Acute severe asthma exacerbation",
    vitals: { bp: "125/78", temp: "99.5°F", hr: "110" },
    allergies: "NSAIDs",
    notes: "On continuous monitoring. Responding to steroids."
  }
];

export default function MyPatients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = useMemo(() => {
    return mockPatients.filter(patient => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const statusStyles = {
    admitted:   { bg: 'bg-blue-500/20',  border: 'border-blue-500/40',  text: 'text-blue-300',  badge: 'bg-blue-500/30'  },
    critical:   { bg: 'bg-red-500/20',   border: 'border-red-500/40',   text: 'text-red-300',   badge: 'bg-red-500/30'   },
    discharged: { bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-300', badge: 'bg-green-500/30' }
  };

  const statusIcons = {
    admitted:   <Clock size={14} />,
    critical:   <AlertCircle size={14} />,
    discharged: <Check size={14} />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .heading { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; letter-spacing: -0.5px; }
        .patient-row { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); animation: slideIn 0.5s ease-out forwards; }
        .patient-row:nth-child(1) { animation-delay: 0.05s; }
        .patient-row:nth-child(2) { animation-delay: 0.1s; }
        .patient-row:nth-child(3) { animation-delay: 0.15s; }
        .patient-row:nth-child(4) { animation-delay: 0.2s; }
        .patient-row:nth-child(5) { animation-delay: 0.25s; }
        .patient-row:nth-child(6) { animation-delay: 0.3s; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .patient-row:hover { transform: translateX(4px); box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
        .filter-btn { transition: all 0.2s ease; }
        .filter-btn.active { transform: scale(1.05); }
      `}</style>

      {!selectedPatient ? (
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="heading text-3xl md:text-4xl text-white mb-2">My Patients</h1>
            <p className="text-slate-400">Manage and view all assigned patients</p>
          </div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search by name or MRN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'admitted', 'critical', 'discharged'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`filter-btn px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    selectedStatus === status
                      ? 'active bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Patient List */}
          <div className="space-y-3">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-16">
                <User size={48} className="mx-auto text-slate-600 mb-4 opacity-50" />
                <p className="text-slate-400 text-lg">No patients found matching your criteria</p>
              </div>
            ) : (
              filteredPatients.map((patient) => {
                const style = statusStyles[patient.status];
                return (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`patient-row w-full p-5 rounded-xl border cursor-pointer text-left group ${style.bg} ${style.border}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-600/50 transition-colors">
                          <span className="text-sm font-bold text-slate-300">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="heading text-white font-semibold truncate">{patient.name}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${style.badge} ${style.text}`}>
                              {statusIcons[patient.status]}
                              {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                            <span>{patient.mrn}</span>
                            <span>Age: {patient.age}</span>
                            <span className="hidden sm:inline">Last visit: {patient.lastVisit}</span>
                          </div>
                          <p className="text-sm text-slate-300 mt-2 truncate">{patient.diagnosis}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all flex-shrink-0" size={20} />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Total Patients</p>
              <p className="heading text-2xl text-white">{mockPatients.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Critical Cases</p>
              <p className="heading text-2xl text-red-400">{mockPatients.filter(p => p.status === 'critical').length}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Currently Admitted</p>
              <p className="heading text-2xl text-blue-400">{mockPatients.filter(p => p.status === 'admitted').length}</p>
            </div>
          </div>
        </div>
      ) : (
        <PatientProfile patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
      )}
    </div>
  );
}

function PatientProfile({ patient, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .tab-button { transition: all 0.2s ease; border-b-2 border-transparent; }
        .tab-button.active { border-b-color: rgb(20,184,166); color: rgb(229,231,235); }
        .tab-button:not(.active):hover { border-b-color: rgba(20,184,166,0.3); }
      `}</style>

      <div className="flex items-start justify-between mb-8">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600 transition-all flex items-center gap-2"
        >
          ← Back to Patients
        </button>
      </div>

      {/* Patient Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-slate-900">{patient.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div>
              <h1 className="heading text-3xl text-white mb-1">{patient.name}</h1>
              <p className="text-slate-400">{patient.mrn}</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-lg font-medium text-sm ${
            patient.status === 'critical'  ? 'bg-red-500/20 text-red-300'   :
            patient.status === 'admitted'  ? 'bg-blue-500/20 text-blue-300' :
            'bg-green-500/20 text-green-300'
          }`}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-slate-400 text-sm mb-1">Age</p>
            <p className="heading text-xl text-white">{patient.age}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Last Visit</p>
            <p className="text-white">{patient.lastVisit}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-slate-400 text-sm mb-1">Primary Diagnosis</p>
            <p className="text-white">{patient.diagnosis}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700 mb-6 flex gap-6">
        {['overview', 'vitals', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button pb-3 font-medium transition-colors ${
              activeTab === tab
                ? 'text-white border-b-2 border-teal-500'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="heading text-lg text-white mb-4 flex items-center gap-2">
                <Stethoscope size={20} className="text-teal-400" />
                Medical Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Diagnosis</p>
                  <p className="text-white font-medium">{patient.diagnosis}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Allergies</p>
                  <p className={`font-medium ${patient.allergies === 'NKDA' ? 'text-green-400' : 'text-amber-400'}`}>
                    {patient.allergies}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="heading text-lg text-white mb-4">Clinical Notes</h2>
              <p className="text-slate-300 leading-relaxed">{patient.notes}</p>
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Blood Pressure', value: patient.vitals.bp,   icon: <Heart size={20} className="text-red-400" />    },
              { label: 'Temperature',    value: patient.vitals.temp, icon: <Activity size={20} className="text-orange-400" /> },
              { label: 'Heart Rate',     value: patient.vitals.hr,   icon: <Heart size={20} className="text-pink-400" />   }
            ].map((vital, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-300 font-medium">{vital.label}</h3>
                  {vital.icon}
                </div>
                <p className="heading text-3xl text-white">{vital.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="heading text-lg text-white mb-4">Visit History</h2>
            <div className="space-y-4">
              {[
                { date: '2024-01-17', type: 'Follow-up',    note: 'Regular checkup - vitals stable' },
                { date: '2024-01-10', type: 'Appointment',  note: 'Lab work reviewed'               },
                { date: '2024-01-01', type: 'Consultation', note: 'Initial assessment'              }
              ].map((visit, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b border-slate-700 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{visit.type}</p>
                    <p className="text-slate-400 text-sm">{visit.date}</p>
                    <p className="text-slate-300 text-sm mt-1">{visit.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}