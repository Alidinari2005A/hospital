import { useState } from 'react';
import { Plus, X, Edit2, RotateCw, Trash2, Search, Calendar, AlertCircle, CheckCircle, Clock, Pill, User } from 'lucide-react';

const mockPrescriptions = [
  { id: 1, patientName: 'Ahmed Hassan',    patientId: 1, drug: 'Lisinopril',       dose: '10mg',    frequency: 'Once daily',       duration: '30 days',  status: 'active',  startDate: '2024-01-01', endDate: '2024-01-31', notes: 'For hypertension management. Take in morning.',              refills: 2, instructions: 'Take with water, do not skip doses'              },
  { id: 2, patientName: 'Ahmed Hassan',    patientId: 1, drug: 'Metformin',        dose: '500mg',   frequency: 'Twice daily',      duration: '90 days',  status: 'active',  startDate: '2024-01-05', endDate: '2024-04-05', notes: 'For diabetes management. Take with meals.',                  refills: 1, instructions: 'Take with food to avoid stomach upset'            },
  { id: 3, patientName: 'Fatima Al-Rashid',patientId: 2, drug: 'Aspirin',          dose: '325mg',   frequency: 'Once daily',       duration: '30 days',  status: 'active',  startDate: '2024-01-17', endDate: '2024-02-17', notes: 'Post-MI care. Blood thinner.',                               refills: 0, instructions: 'Take after meals'                                  },
  { id: 4, patientName: 'Mohammad Khan',   patientId: 3, drug: 'Amoxicillin',      dose: '500mg',   frequency: 'Three times daily', duration: '7 days',   status: 'expired', startDate: '2024-01-10', endDate: '2024-01-17', notes: 'Pneumonia treatment - completed course.',                    refills: 0, instructions: 'Finish entire course even if feeling better'       },
  { id: 5, patientName: 'Layla Mansouri',  patientId: 4, drug: 'Prenatal Vitamins', dose: '1 tablet', frequency: 'Once daily',      duration: '180 days', status: 'active',  startDate: '2023-09-01', endDate: '2024-02-28', notes: 'Pregnancy support. Contains folic acid and iron.',           refills: 3, instructions: 'Take in morning with breakfast'                   },
  { id: 6, patientName: 'Hassan Ibrahim',  patientId: 5, drug: 'Antibiotic Drops', dose: '1 drop',  frequency: 'Four times daily', duration: '14 days',  status: 'active',  startDate: '2024-01-17', endDate: '2024-01-31', notes: 'Post-cataract surgery. For eye infection prevention.',       refills: 0, instructions: 'Apply to affected eye. Wash hands before use'     },
];

const statusStyles = {
  active:  { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/40', label: 'Active',  icon: CheckCircle },
  expired: { bg: 'bg-slate-500/20', text: 'text-slate-300', border: 'border-slate-500/40', label: 'Expired', icon: Clock       },
  pending: { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40', label: 'Pending', icon: AlertCircle },
};

export default function Prescriptions() {
  const [searchTerm, setSearchTerm]                 = useState('');
  const [selectedStatus, setSelectedStatus]         = useState('all');
  const [prescriptions, setPrescriptions]           = useState(mockPrescriptions);
  const [showNewForm, setShowNewForm]               = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch =
      rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.drug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || rx.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRenew  = (id) => setPrescriptions(prescriptions.map(rx => rx.id === id ? { ...rx, refills: Math.max(0, rx.refills - 1) } : rx));
  const handleDelete = (id) => setPrescriptions(prescriptions.filter(rx => rx.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .heading { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; letter-spacing: -0.5px; }
        .rx-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); animation: slideIn 0.5s ease-out forwards; }
        .rx-card:nth-child(1) { animation-delay: 0.05s; }
        .rx-card:nth-child(2) { animation-delay: 0.1s;  }
        .rx-card:nth-child(3) { animation-delay: 0.15s; }
        .rx-card:nth-child(4) { animation-delay: 0.2s;  }
        .rx-card:nth-child(5) { animation-delay: 0.25s; }
        .rx-card:nth-child(6) { animation-delay: 0.3s;  }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .rx-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
        .modal-fade { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1);    }
        }
      `}</style>

      {!showNewForm && !selectedPrescription ? (
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="heading text-4xl text-white mb-2">Prescriptions</h1>
              <p className="text-slate-400">Manage patient medications and prescriptions</p>
            </div>
            <button onClick={() => setShowNewForm(true)}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-teal-500/30 transform hover:scale-105">
              <Plus size={20} /> New Prescription
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors" size={20} />
              <input type="text" placeholder="Search by patient name or medication..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'active', 'expired', 'pending'].map(status => (
                <button key={status} onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-all flex-1 md:flex-none ${
                    selectedStatus === status
                      ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
                  }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPrescriptions.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <Pill size={48} className="mx-auto text-slate-600 mb-4 opacity-50" />
                <p className="text-slate-400 text-lg">No prescriptions found</p>
              </div>
            ) : (
              filteredPrescriptions.map((rx) => {
                const style = statusStyles[rx.status];
                const StatusIcon = style.icon;
                return (
                  <button key={rx.id} onClick={() => setSelectedPrescription(rx)}
                    className={`rx-card p-6 rounded-xl border text-left group transition-all ${style.bg} ${style.border}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Pill size={20} className="text-teal-400" />
                          <h3 className="heading text-lg text-white font-semibold truncate">{rx.drug}</h3>
                        </div>
                        <p className="text-slate-300 text-sm">{rx.patientName}</p>
                      </div>
                      <StatusIcon size={20} className={style.text} />
                    </div>

                    <div className="mb-4 p-3 bg-slate-800/30 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Dosage</p>
                      <p className="text-white font-semibold">{rx.dose}</p>
                      <p className="text-slate-300 text-xs mt-1">{rx.frequency}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="p-2 bg-slate-700/20 rounded text-xs">
                        <p className="text-slate-400 mb-1">Duration</p>
                        <p className="text-white font-semibold">{rx.duration}</p>
                      </div>
                      <div className="p-2 bg-slate-700/20 rounded text-xs">
                        <p className="text-slate-400 mb-1">Refills Left</p>
                        <p className={`font-semibold ${rx.refills > 0 ? 'text-green-400' : 'text-slate-400'}`}>{rx.refills}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                      <button onClick={(e) => { e.stopPropagation(); handleRenew(rx.id); }}
                        disabled={rx.refills === 0}
                        className="flex-1 px-2 py-2 rounded text-xs font-medium transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed">
                        <RotateCw size={12} /> Renew
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(rx.id); }}
                        className="flex-1 px-2 py-2 rounded text-xs font-medium text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all flex items-center justify-center">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Prescriptions', value: prescriptions.length,                                                          color: 'text-blue-400'  },
              { label: 'Active',              value: prescriptions.filter(p => p.status === 'active').length,                       color: 'text-green-400' },
              { label: 'Need Refill',         value: prescriptions.filter(p => p.refills === 0 && p.status === 'active').length,    color: 'text-amber-400' },
              { label: 'Expired',             value: prescriptions.filter(p => p.status === 'expired').length,                     color: 'text-slate-400' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className={`heading text-2xl ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : selectedPrescription ? (
        <PrescriptionDetail prescription={selectedPrescription} onBack={() => setSelectedPrescription(null)} onRenew={handleRenew} onDelete={handleDelete} />
      ) : (
        <NewPrescriptionForm onClose={() => setShowNewForm(false)} />
      )}
    </div>
  );
}

function PrescriptionDetail({ prescription, onBack, onRenew, onDelete }) {
  const style = statusStyles[prescription.status];
  const StatusIcon = style.icon;

  return (
    <div className="max-w-2xl mx-auto modal-fade">
      <button onClick={onBack} className="mb-6 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700/50 transition-all flex items-center gap-2">
        ← Back
      </button>

      <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-500/20 rounded-lg"><Pill size={32} className="text-teal-400" /></div>
            <div>
              <h1 className="heading text-3xl text-white">{prescription.drug}</h1>
              <p className="text-slate-400 mt-1">{prescription.patientName}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${style.bg} ${style.border} border`}>
            <StatusIcon size={18} className={style.text} />
            <span className={style.text}>{style.label}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-3 uppercase tracking-wide font-semibold">Dosage Information</p>
            <div className="space-y-3">
              <div><p className="text-slate-400 text-xs mb-1">Strength</p><p className="heading text-xl text-white">{prescription.dose}</p></div>
              <div><p className="text-slate-400 text-xs mb-1">Frequency</p><p className="text-white font-semibold">{prescription.frequency}</p></div>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-3 uppercase tracking-wide font-semibold">Duration & Refills</p>
            <div className="space-y-3">
              <div><p className="text-slate-400 text-xs mb-1">Duration</p><p className="text-white font-semibold">{prescription.duration}</p></div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Refills Available</p>
                <p className={`font-semibold heading text-lg ${prescription.refills > 0 ? 'text-green-400' : 'text-red-400'}`}>{prescription.refills}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-slate-700/20 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-xs mb-2">Start Date</p>
            <p className="text-white font-semibold flex items-center gap-2"><Calendar size={16} /> {prescription.startDate}</p>
          </div>
          <div className="p-4 bg-slate-700/20 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-xs mb-2">End Date</p>
            <p className="text-white font-semibold flex items-center gap-2"><Calendar size={16} /> {prescription.endDate}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="heading text-white font-semibold mb-2">Special Instructions</h3>
            <p className="text-slate-300 leading-relaxed text-sm">{prescription.instructions}</p>
          </div>
          <div>
            <h3 className="heading text-white font-semibold mb-2">Clinical Notes</h3>
            <p className="text-slate-300 leading-relaxed text-sm">{prescription.notes}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-slate-700">
          <button onClick={() => onRenew(prescription.id)} disabled={prescription.refills === 0}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
            <RotateCw size={18} /> Renew
          </button>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all border border-slate-600">
            <Edit2 size={18} /> Edit
          </button>
          <button onClick={() => onDelete(prescription.id)}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function NewPrescriptionForm({ onClose }) {
  const [formData, setFormData] = useState({ patientName: '', drug: '', dose: '', frequency: 'Once daily', duration: '', instructions: '', notes: '', refills: 0 });

  const handleSubmit = (e) => { e.preventDefault(); onClose(); };

  return (
    <div className="max-w-2xl mx-auto modal-fade">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading text-3xl text-white">Write New Prescription</h1>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition"><X size={24} className="text-slate-400" /></button>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-white font-semibold mb-2 flex items-center gap-2"><User size={18} className="text-teal-400" /> Patient</label>
          <input type="text" required value={formData.patientName} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            placeholder="Select patient..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2 flex items-center gap-2"><Pill size={18} className="text-teal-400" /> Medication</label>
            <input type="text" required value={formData.drug} onChange={(e) => setFormData({ ...formData, drug: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g. Lisinopril" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Dose</label>
            <input type="text" required value={formData.dose} onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g. 10mg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2">Frequency</label>
            <select value={formData.frequency} onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
              <option>Once daily</option><option>Twice daily</option><option>Three times daily</option>
              <option>Four times daily</option><option>Every other day</option><option>As needed</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Duration</label>
            <input type="text" required value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g. 30 days" />
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Number of Refills</label>
          <input type="number" min="0" value={formData.refills} onChange={(e) => setFormData({ ...formData, refills: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Special Instructions</label>
          <textarea value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 h-20 resize-none"
            placeholder="e.g. Take with food, avoid alcohol, etc." />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Clinical Notes</label>
          <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 h-20 resize-none"
            placeholder="e.g. For hypertension management..." />
        </div>

        <button type="submit" className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-teal-500/30">
          Issue Prescription
        </button>
      </form>
    </div>
  );
}