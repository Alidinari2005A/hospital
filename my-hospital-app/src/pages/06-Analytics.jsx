import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar,
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

// FIX 1: bg-linear-to-t → bg-gradient-to-t (invalid Tailwind class)
const Chart = ({ data, label, gradientFrom, gradientTo }) => {
  const maxValue = Math.max(...data.map(d => d[label] || 0));
  return (
    <div style={{ height: '192px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '8px', padding: '16px 8px' }}>
      {data.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
          <div
            style={{
              width: '100%',
              height: `${maxValue > 0 ? (item[label] / maxValue) * 100 : 0}%`,
              minHeight: '4px',
              background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
              borderRadius: '4px 4px 0 0',
              position: 'relative',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            title={String(item[label])}
          />
          <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{item.day}</p>
        </div>
      ))}
    </div>
  );
};

// FIX 2: Use inline styles for the grid layout to avoid Tailwind responsive class issues in artifact env
const StatCard = ({ icon: Icon, label, value, change, iconBg }) => {
  const isPositive = change >= 0;
  return (
    <div style={{
      padding: '24px',
      background: 'rgba(30, 41, 59, 0.4)',
      border: '1px solid rgba(51, 65, 85, 0.5)',
      borderRadius: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ padding: '12px', borderRadius: '8px', background: iconBg }}>
          <Icon size={24} color="white" />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          fontSize: '12px', fontWeight: 700,
          padding: '4px 8px', borderRadius: '9999px',
          background: isPositive ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
          color: isPositive ? '#4ade80' : '#f87171',
        }}>
          <TrendingUp size={14} style={{ transform: isPositive ? 'none' : 'rotate(180deg)' }} />
          {Math.abs(change)}%
        </div>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{label}</p>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '30px', color: 'white', fontWeight: 700, letterSpacing: '-0.025em' }}>{value}</p>
    </div>
  );
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');
  const totalDist = Object.values(mockAnalytics.distribution).reduce((a, b) => a + b, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#e2e8f0', padding: '32px', fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', color: 'white', marginBottom: '8px', letterSpacing: '-0.025em', fontWeight: 700 }}>Performance</h1>
            <p style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              Hospital Analytics <ChevronRight size={16} /> <span style={{ color: '#2dd4bf' }}>{timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}ly</span>
            </p>
          </div>
          <div style={{ display: 'flex', background: '#0f172a', padding: '4px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            {['week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: '8px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: timeRange === range ? '#1e293b' : 'transparent',
                  color: timeRange === range ? 'white' : '#64748b',
                }}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* FIX 3: Stats Grid — use inline grid to guarantee layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <StatCard icon={Users} label="Total Patients" value={mockAnalytics.performance.patientsSeenThisWeek} change={12} iconBg="#2563eb" />
          <StatCard icon={Clock} label="Avg Visit" value={`${mockAnalytics.performance.avgAppointmentDuration}m`} change={-3} iconBg="#4f46e5" />
          <StatCard icon={AlertCircle} label="Alerts" value={mockAnalytics.performance.totalLabAlerts} change={-25} iconBg="#e11d48" />
          <StatCard icon={CheckCircle} label="Success" value={`${mockAnalytics.performance.appointmentSuccessRate}%`} change={5} iconBg="#059669" />
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', color: 'white', fontWeight: 700 }}>Daily Traffic</h3>
              <Activity color="#3b82f6" size={20} />
            </div>
            {/* FIX 1 applied: gradient via inline style */}
            <Chart data={mockAnalytics.weeklyStats} label="patients" gradientFrom="#1d4ed8" gradientTo="#60a5fa" />
          </div>
          <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', color: 'white', fontWeight: 700 }}>Lab Alert Trends</h3>
              <BarChart3 color="#f43f5e" size={20} />
            </div>
            <Chart data={mockAnalytics.weeklyStats} label="alerts" gradientFrom="#be123c" gradientTo="#fb7185" />
          </div>
        </div>

        {/* Distribution and Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', color: 'white', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>Department Distribution</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 48px', padding: '0 16px' }}>
              {[
                { name: 'Consultations', val: 22, color: '#3b82f6' },
                { name: 'Follow-ups', val: 12, color: '#6366f1' },
                { name: 'Emergencies', val: 4, color: '#f43f5e' },
                { name: 'Prenatal', val: 2, color: '#14b8a6' },
              ].map((item) => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: '#94a3b8' }}>{item.name}</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>{item.val}</span>
                  </div>
                  <div style={{ height: '8px', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(item.val / totalDist) * 100}%`, background: item.color, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', color: 'white', fontWeight: 700, marginBottom: '24px' }}>Weekly Tracker</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: Calendar, label: 'Scheduled', value: 40, color: '#60a5fa' },
                { icon: CheckCircle, label: 'Completed', value: 35, color: '#34d399' },
                { icon: X, label: 'Cancelled', value: 5, color: '#f87171' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px', background: 'rgba(30,41,59,0.3)', borderRadius: '12px',
                  border: '1px solid rgba(30,41,59,0.5)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={18} color={color} />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
                  </div>
                  <span style={{ color: 'white', fontWeight: 700 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}