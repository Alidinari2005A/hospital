import { useState } from 'react';
import { ChevronRight, ChevronLeft, Clock, CheckCircle, Loader, Plus, X, Edit2, Trash2 } from 'lucide-react';

const mockAppointments = [
  { id: 1, patientName: 'Ahmed Hassan',      time: '09:00', status: 'waiting',     type: 'Consultation', notes: 'Hypertension follow-up'   },
  { id: 2, patientName: 'Fatima Al-Rashid',  time: '09:30', status: 'in_progress', type: 'Emergency',    notes: 'Chest pain assessment'     },
  { id: 3, patientName: 'Mohammad Khan',     time: '10:15', status: 'waiting',     type: 'Follow-up',    notes: 'Post-operative check'       },
  { id: 4, patientName: 'Layla Mansouri',    time: '11:00', status: 'completed',   type: 'Prenatal',     notes: 'Pregnancy checkup'          },
  { id: 5, patientName: 'Hassan Ibrahim',    time: '14:00', status: 'waiting',     type: 'Consultation', notes: 'General checkup'            },
  { id: 6, patientName: 'Noor Al-Mansouri', time: '14:45', status: 'in_progress', type: 'Emergency',    notes: 'Asthma assessment'          },
  { id: 7, patientName: 'Sara Mohamed',      time: '15:30', status: 'waiting',     type: 'Follow-up',    notes: 'Medication adjustment'      },
  { id: 8, patientName: 'Omar Ibrahim',      time: '16:15', status: 'waiting',     type: 'Consultation', notes: 'New patient intake'         },
];

const statusStyles = {
  waiting:     { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40', label: 'Waiting',     icon: Clock        },
  in_progress: { bg: 'bg-blue-500/20',  text: 'text-blue-300',  border: 'border-blue-500/40',  label: 'In Progress', icon: Loader       },
  completed:   { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/40', label: 'Completed',   icon: CheckCircle  },
};

export default function Appointments() {
  const [currentDate, setCurrentDate]               = useState(new Date(2024, 0, 17));
  const [viewMode, setViewMode]                     = useState('calendar');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNewForm, setShowNewForm]               = useState(false);

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay    = getFirstDayOfMonth(currentDate);
  const days        = Array.from({ length: firstDay }, () => null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
  };

  const appointmentsForDate = mockAppointments;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .heading { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; letter-spacing: -0.5px; }
        .appointment-slot { transition: all 0.2s ease; animation: slideUp 0.4s ease-out forwards; }
        .appointment-slot:nth-child(1) { animation-delay: 0.05s; }
        .appointment-slot:nth-child(2) { animation-delay: 0.1s;  }
        .appointment-slot:nth-child(3) { animation-delay: 0.15s; }
        .appointment-slot:nth-child(4) { animation-delay: 0.2s;  }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .appointment-slot:hover { transform: translateX(4px); box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
        .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; border-radius: 8px; }
        .cal-day.other-month { color: rgba(148,163,184,0.3); }
        .cal-day.today { background: linear-gradient(135deg, rgb(20,184,166), rgb(6,182,212)); color: rgb(15,23,42); font-weight: 600; }
        .cal-day:not(.other-month):not(.today):hover { background: rgba(20,184,166,0.1); border: 1px solid rgba(20,184,166,0.3); }
        .modal-enter { animation: modalFadeIn 0.3s ease-out; }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1);    }
        }
      `}</style>

      {!selectedAppointment && !showNewForm ? (
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="heading text-4xl text-white mb-2">Appointments</h1>
              <p className="text-slate-400">Manage your daily schedule</p>
            </div>
            <button
              onClick={() => setShowNewForm(true)}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-teal-500/30 transform hover:scale-105"
            >
              <Plus size={20} /> New Appointment
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 mb-8">
            {['calendar', 'list'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  viewMode === mode
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
                }`}
              >
                {mode === 'calendar' ? '📅 Calendar' : '📋 List'}
              </button>
            ))}
          </div>

          {viewMode === 'calendar' ? (
            <CalendarView
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              monthName={monthName}
              days={days}
              isToday={isToday}
              appointments={appointmentsForDate}
              setSelectedAppointment={setSelectedAppointment}
            />
          ) : (
            <ListView appointments={appointmentsForDate} setSelectedAppointment={setSelectedAppointment} />
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Today',  value: appointmentsForDate.length,                                        color: 'text-blue-400'  },
              { label: 'Waiting',      value: appointmentsForDate.filter(a => a.status === 'waiting').length,     color: 'text-amber-400' },
              { label: 'In Progress',  value: appointmentsForDate.filter(a => a.status === 'in_progress').length, color: 'text-blue-400'  },
              { label: 'Completed',    value: appointmentsForDate.filter(a => a.status === 'completed').length,   color: 'text-green-400' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className={`heading text-2xl ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : selectedAppointment ? (
        <AppointmentDetail appointment={selectedAppointment} onBack={() => setSelectedAppointment(null)} />
      ) : (
        <NewAppointmentForm onClose={() => setShowNewForm(false)} />
      )}
    </div>
  );
}

function CalendarView({ currentDate, setCurrentDate, monthName, days, isToday, appointments, setSelectedAppointment }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Calendar */}
      <div className="lg:col-span-2 bg-slate-800/30 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading text-xl text-white">{monthName}</h2>
          <div className="flex gap-2">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="p-2 hover:bg-slate-700 rounded-lg transition">
              <ChevronLeft size={20} className="text-slate-400" />
            </button>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="p-2 hover:bg-slate-700 rounded-lg transition">
              <ChevronRight size={20} className="text-slate-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-slate-400 text-sm font-semibold py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => (
            <div key={idx} className={`cal-day ${!day ? 'other-month' : ''} ${day && isToday(day) ? 'today' : ''}`}>
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
        <h3 className="heading text-lg text-white mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          {appointments.map(apt => {
            const StatusIcon = statusStyles[apt.status].icon;
            return (
              <button
                key={apt.id}
                onClick={() => setSelectedAppointment(apt)}
                className={`appointment-slot w-full p-3 rounded-lg border text-left transition-all ${statusStyles[apt.status].bg} ${statusStyles[apt.status].border}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Clock size={14} className={statusStyles[apt.status].text} />
                    <span className="font-semibold text-white text-sm">{apt.time}</span>
                  </div>
                  <StatusIcon size={14} className={statusStyles[apt.status].text} />
                </div>
                <p className="text-sm text-white font-medium truncate">{apt.patientName}</p>
                <p className="text-xs text-slate-300 truncate">{apt.type}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ListView({ appointments, setSelectedAppointment }) {
  return (
    <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
      <h2 className="heading text-xl text-white mb-6">Schedule for Today</h2>
      <div className="space-y-3">
        {appointments.map(apt => {
          const StatusIcon = statusStyles[apt.status].icon;
          return (
            <button
              key={apt.id}
              onClick={() => setSelectedAppointment(apt)}
              className={`appointment-slot w-full p-4 rounded-lg border flex items-center justify-between cursor-pointer ${statusStyles[apt.status].bg} ${statusStyles[apt.status].border}`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{apt.time}</div>
                  <StatusIcon size={16} className={statusStyles[apt.status].text} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{apt.patientName}</h3>
                  <p className="text-sm text-slate-300">{apt.type}</p>
                  <p className="text-xs text-slate-400 mt-1">{apt.notes}</p>
                </div>
              </div>
              <ChevronRight className="text-slate-500 flex-shrink-0" size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AppointmentDetail({ appointment, onBack }) {
  const [status, setStatus] = useState(appointment.status);
  const StatusStyle = statusStyles[status];
  const StatusIcon  = StatusStyle.icon;

  return (
    <div className="max-w-2xl mx-auto modal-enter">
      <button onClick={onBack} className="mb-6 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700/50 transition-all flex items-center gap-2">
        ← Back
      </button>

      <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="heading text-3xl text-white mb-2">{appointment.patientName}</h1>
            <p className="text-slate-400">{appointment.type}</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${StatusStyle.bg} ${StatusStyle.text}`}>
            <StatusIcon size={18} />
            {StatusStyle.label}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Appointment Time</p>
            <p className="heading text-2xl text-white flex items-center gap-2">
              <Clock size={24} className="text-teal-400" />
              {appointment.time}
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Appointment Type</p>
            <p className="heading text-xl text-white">{appointment.type}</p>
          </div>
          <div className="md:col-span-2 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Notes</p>
            <p className="text-white leading-relaxed">{appointment.notes}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="heading text-lg text-white mb-4">Update Status</h2>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(statusStyles).map(([key, style]) => (
              <button
                key={key}
                onClick={() => setStatus(key)}
                className={`p-4 rounded-lg border-2 transition-all font-medium ${
                  status === key
                    ? `${style.bg} ${style.border} ${style.text} border-2 transform scale-105`
                    : 'bg-slate-700/30 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-semibold transition-all">
            <Edit2 size={18} /> Reschedule
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg font-semibold transition-all">
            <Trash2 size={18} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function NewAppointmentForm({ onClose }) {
  const [formData, setFormData] = useState({ patientName: '', date: '', time: '', type: 'Consultation', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="max-w-2xl mx-auto modal-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading text-3xl text-white">Schedule New Appointment</h1>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition">
          <X size={24} className="text-slate-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-white font-medium mb-2">Patient Name</label>
          <input
            type="text" required
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            placeholder="Patient name..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Date</label>
            <input
              type="date" required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Time</label>
            <input
              type="time" required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Appointment Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
          >
            <option>Consultation</option>
            <option>Follow-up</option>
            <option>Emergency</option>
            <option>Prenatal</option>
            <option>Post-operative</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 h-24 resize-none"
            placeholder="Additional notes..."
          />
        </div>

        <button type="submit" className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-teal-500/30">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}