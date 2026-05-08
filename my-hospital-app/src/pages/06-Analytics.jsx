import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, // Re-added to the Summary section below
  AlertCircle, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  Activity, 
  X,
  ChevronRight 
} from 'lucide-react';

const mockAnalytics = {
  weeklyStats: [
    { day: 'Mon', patients: 8, duration: 45, alerts: 1 },
    { day: 'Tue', patients: 6, duration: 38, alerts: 2 },
    { day: 'Wed', patients: 9, duration: 52, alerts: 0 },
    { day: 'Thu', patients: 7, duration: 41, alerts: 3 },
    { day: 'Fri', patients: 10, duration: 48, alerts: 1 },
  ],
  performance: {
    patientsSeenThisWeek: 40,
    avgAppointmentDuration: 44.8,
    totalLabAlerts: 7,
    criticalResults: 2,
    appointmentsCompleted: 35,
    appointmentSuccessRate: 87.5
  },
  distribution: {
    consultations: 22,
    followups: 12,
    emergencies: 4,
    prenatal: 2
  }
};

const Chart = ({ data, label, colorClass = "from-teal-500 to-teal-400" }) => {
  const maxValue = Math.max(...data.map(d => d[label] || 0));
  return (
    <div className="h-48 flex items-end justify-around gap-2 px-2 py-4">
      {data.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
          <div
            className={`w-full bg-gradient-to-t ${colorClass} rounded-t hover:opacity-80 transition-all cursor-pointer relative group`}
            style={{
              height: `${maxValue > 0 ? (item[label] / maxValue) * 100 : 0}%`,
              minHeight: '4px'
            }}
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-slate-700 z-10 shadow-xl">
              {item[label]}
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium">{item.day}</p>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, change, colorClass }) => {
  const isPositive = change >= 0;
  return (
    <div className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-xl">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClass}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          <TrendingUp size={14} className={!isPositive ? 'rotate-180' : ''} />
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <p className="heading text-3xl text-white tracking-tight">{value}</p>
    </div>
  );
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');
  const totalDist = Object.values(mockAnalytics.distribution).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .heading { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="heading text-4xl text-white mb-2 tracking-tight">Performance</h1>
            <p className="text-slate-400 flex items-center gap-2">
              Hospital Analytics <ChevronRight size={16} /> <span className="text-teal-400 capitalize">{timeRange}ly</span>
            </p>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {['week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  timeRange === range ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} label="Total Patients" value={mockAnalytics.performance.patientsSeenThisWeek} change={12} colorClass="bg-blue-600" />
          <StatCard icon={Clock} label="Avg Visit" value={`${mockAnalytics.performance.avgAppointmentDuration}m`} change={-3} colorClass="bg-indigo-600" />
          <StatCard icon={AlertCircle} label="Alerts" value={mockAnalytics.performance.totalLabAlerts} change={-25} colorClass="bg-rose-600" />
          <StatCard icon={CheckCircle} label="Success" value={`${mockAnalytics.performance.appointmentSuccessRate}%`} change={5} colorClass="bg-emerald-600" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="heading text-lg text-white">Daily Traffic</h3>
              <Activity className="text-blue-500" size={20} />
            </div>
            <Chart data={mockAnalytics.weeklyStats} label="patients" colorClass="from-blue-600 to-blue-400" />
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="heading text-lg text-white">Lab Alert Trends</h3>
              <BarChart3 className="text-rose-500" size={20} />
            </div>
            <Chart data={mockAnalytics.weeklyStats} label="alerts" colorClass="from-rose-600 to-rose-400" />
          </div>
        </div>

        {/* Distribution and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="heading text-lg text-white mb-6 text-center">Department Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 px-4">
              {[
                { name: 'Consultations', val: 22, color: 'bg-blue-500' },
                { name: 'Follow-ups', val: 12, color: 'bg-indigo-500' },
                { name: 'Emergencies', val: 4, color: 'bg-rose-500' },
                { name: 'Prenatal', val: 2, color: 'bg-teal-500' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-400">{item.name}</span>
                    <span className="text-white font-bold">{item.val}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${(item.val / totalDist) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="heading text-lg text-white mb-6">Weekly Tracker</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-blue-400" />
                  <span className="text-sm font-medium">Scheduled</span>
                </div>
                <span className="text-white font-bold">40</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-emerald-500" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <span className="text-white font-bold">35</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <X size={18} className="text-rose-500" />
                  <span className="text-sm font-medium">Cancelled</span>
                </div>
                <span className="text-white font-bold">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}