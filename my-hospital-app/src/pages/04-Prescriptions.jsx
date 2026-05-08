import { useState } from 'react';
import {
  Plus, X, RotateCw, Trash2, Search, Calendar,
  AlertCircle, CheckCircle, Clock, Pill, User,
  ChevronRight, ArrowLeft, Edit2
} from 'lucide-react';

const initialPrescriptions = [
  { id: 1, patientName: 'Ahmed Hassan', patientId: '0001', drug: 'Lisinopril', dose: '10mg', frequency: 'Once daily', duration: '30 days', status: 'active', endDate: '2026-05-31', refills: 2, instructions: 'Take with water.' },
  { id: 2, patientName: 'Ahmed Hassan', patientId: '0001', drug: 'Metformin', dose: '500mg', frequency: 'Twice daily', duration: '90 days', status: 'active', endDate: '2026-07-05', refills: 1, instructions: 'Take with food.' },
  { id: 3, patientName: 'Fatima Al-Rashid', patientId: '0002', drug: 'Aspirin', dose: '325mg', frequency: 'Once daily', duration: '30 days', status: 'active', endDate: '2026-06-01', refills: 0, instructions: 'Take after meals.' },
  { id: 4, patientName: 'Mohammad Khan', patientId: '0003', drug: 'Amoxicillin', dose: '500mg', frequency: 'Three times daily', duration: '7 days', status: 'expired', endDate: '2026-01-17', refills: 0, instructions: 'Finish entire course.' },
  { id: 5, patientName: 'Layla Mansouri', patientId: '0004', drug: 'Prenatal Vitamins', dose: '1 tablet', frequency: 'Once daily', duration: '180 days', status: 'active', endDate: '2026-11-08', refills: 5, instructions: 'Take in morning.' },
  { id: 6, patientName: 'Hassan Ibrahim', patientId: '0005', drug: 'Antibiotic Drops', dose: '1 drop', frequency: 'Four times daily', duration: '14 days', status: 'pending', endDate: '2026-05-22', refills: 0, instructions: 'Both eyes.' },
];

const statusConfig = {
  active:  { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', dot: '#22c55e', label: 'Active',   Icon: CheckCircle },
  expired: { bg: '#f9fafb', text: '#6b7280', border: '#e5e7eb', dot: '#9ca3af', label: 'Expired',  Icon: Clock },
  pending: { bg: '#fffbeb', text: '#b45309', border: '#fde68a', dot: '#f59e0b', label: 'Pending',  Icon: AlertCircle },
};

const FREQUENCY_OPTIONS = ['Once daily','Twice daily','Three times daily','Four times daily','Every 8 hours','As needed'];

const inp = {
  width: '100%', padding: '10px 12px', background: '#f9fafb',
  border: '1px solid #e5e7eb', borderRadius: 12, outline: 'none',
  fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit',
};

function NewPrescriptionForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({ patientName:'', drug:'', dose:'', frequency:'Once daily', duration:'', instructions:'' });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => { setForm(f => ({...f, [k]: e.target.value})); setErrors(er => ({...er, [k]: null})); };

  const submit = () => {
    const errs = {};
    if (!form.patientName.trim()) errs.patientName = 'Required';
    if (!form.drug.trim())        errs.drug        = 'Required';
    if (!form.dose.trim())        errs.dose        = 'Required';
    if (!form.duration.trim())    errs.duration    = 'Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, id: Date.now(), patientId: String(Math.floor(Math.random()*9000+1000)), status:'active', endDate:'2026-12-31', refills:1 });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,.10)', border: '1px solid #e5e7eb', padding: 36 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 24 }}>
        <h2 style={{ margin:0, fontSize:22, fontWeight:800, color:'#111', display:'flex', alignItems:'center', gap:8 }}>
          <Plus size={20} color="#0d9488" /> New Prescription
        </h2>
        <button type="button" onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:6, borderRadius:999 }}>
          <X size={20} color="#6b7280" />
        </button>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div>
          <div style={{ position:'relative' }}>
            <User size={16} color="#9ca3af" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
            <input style={{ ...inp, paddingLeft:36, borderColor: errors.patientName ? '#f87171':'#e5e7eb' }} placeholder="Patient Name" value={form.patientName} onChange={set('patientName')} />
          </div>
          {errors.patientName && <p style={{ color:'#ef4444', fontSize:11, margin:'4px 0 0 4px' }}>{errors.patientName}</p>}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div>
            <input style={{ ...inp, borderColor: errors.drug ? '#f87171':'#e5e7eb' }} placeholder="Medication (e.g. Aspirin)" value={form.drug} onChange={set('drug')} />
            {errors.drug && <p style={{ color:'#ef4444', fontSize:11, margin:'4px 0 0 4px' }}>{errors.drug}</p>}
          </div>
          <div>
            <input style={{ ...inp, borderColor: errors.dose ? '#f87171':'#e5e7eb' }} placeholder="Dose (e.g. 500mg)" value={form.dose} onChange={set('dose')} />
            {errors.dose && <p style={{ color:'#ef4444', fontSize:11, margin:'4px 0 0 4px' }}>{errors.dose}</p>}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div>
            <label style={{ fontSize:10, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:1, display:'block', marginBottom:4 }}>Frequency</label>
            <select style={{ ...inp }} value={form.frequency} onChange={set('frequency')}>
              {FREQUENCY_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize:10, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:1, display:'block', marginBottom:4 }}>Duration</label>
            <input style={{ ...inp, borderColor: errors.duration ? '#f87171':'#e5e7eb' }} placeholder="e.g. 30 days" value={form.duration} onChange={set('duration')} />
            {errors.duration && <p style={{ color:'#ef4444', fontSize:11, margin:'4px 0 0 4px' }}>{errors.duration}</p>}
          </div>
        </div>

        <textarea style={{ ...inp, height:90, resize:'none' }} placeholder="Special Instructions…" value={form.instructions} onChange={set('instructions')} />

        <button type="button" onClick={submit}
          style={{ background:'#0d9488', color:'#fff', border:'none', borderRadius:12, padding:'13px 0', fontWeight:700, fontSize:15, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:'0 4px 16px rgba(13,148,136,.25)' }}>
          <Pill size={17} /> Issue Prescription
        </button>
      </div>
    </div>
  );
}

function PrescriptionDetail({ rx, onBack, onRenew, onDelete }) {
  const cfg = statusConfig[rx.status] || statusConfig.active;
  return (
    <div style={{ maxWidth: 780, margin:'0 auto', background:'#fff', borderRadius:20, border:'1px solid #e5e7eb', boxShadow:'0 4px 20px rgba(0,0,0,.07)', overflow:'hidden' }}>
      <div style={{ padding:'14px 20px', borderBottom:'1px solid #f3f4f6', background:'#f9fafb', display:'flex', alignItems:'center', gap:12 }}>
        <button type="button" onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:6, borderRadius:8 }}>
          <ArrowLeft size={20} color="#374151" />
        </button>
        <span style={{ fontWeight:700, color:'#374151' }}>Prescription Details</span>
      </div>

      <div style={{ padding:32 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28 }}>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <div style={{ width:60, height:60, background:'#ccfbf1', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Pill size={28} color="#0d9488" />
            </div>
            <div>
              <h3 style={{ margin:0, fontSize:26, fontWeight:900, color:'#111' }}>{rx.drug}</h3>
              <div style={{ display:'flex', alignItems:'center', gap:8, color:'#6b7280', fontSize:13, marginTop:4 }}>
                <User size={14} /> {rx.patientName}
                <span style={{ background:'#f3f4f6', borderRadius:999, padding:'2px 8px', fontSize:10, fontWeight:700 }}>ID #{rx.patientId}</span>
              </div>
            </div>
          </div>
          <span style={{ background: cfg.bg, color: cfg.text, border:`1px solid ${cfg.border}`, borderRadius:999, padding:'6px 14px', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
            <cfg.Icon size={14} /> {cfg.label}
          </span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
          {[
            { label:'Dosage',    value: rx.dose },
            { label:'Frequency', value: rx.frequency },
            { label:'Refills',   value: rx.refills, color: rx.refills > 0 ? '#0d9488' : '#ef4444' },
            { label:'End Date',  value: rx.endDate },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background:'#f9fafb', borderRadius:12, border:'1px solid #f3f4f6', padding:'14px 16px' }}>
              <p style={{ margin:'0 0 4px', fontSize:9, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:1 }}>{label}</p>
              <p style={{ margin:0, fontWeight:700, color: color || '#111', fontSize:14 }}>{value}</p>
            </div>
          ))}
        </div>

        {rx.instructions && (
          <div style={{ background:'#fffbeb', border:'1px solid #fde68a', borderRadius:12, padding:'12px 16px', marginBottom:20 }}>
            <p style={{ margin:'0 0 3px', fontSize:9, fontWeight:700, color:'#b45309', textTransform:'uppercase', letterSpacing:1 }}>Instructions</p>
            <p style={{ margin:0, fontSize:13, color:'#92400e', fontWeight:500 }}>{rx.instructions}</p>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, paddingTop:20, borderTop:'1px solid #f3f4f6' }}>
          <button type="button" onClick={() => onRenew(rx.id)}
            style={{ background:'#0d9488', color:'#fff', border:'none', borderRadius:12, padding:'12px 0', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:14 }}>
            <RotateCw size={16} /> Renew
          </button>
          <button type="button"
            style={{ background:'#fff', color:'#374151', border:'1px solid #e5e7eb', borderRadius:12, padding:'12px 0', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:14 }}>
            <Edit2 size={16} /> Edit
          </button>
          <button type="button" onClick={() => onDelete(rx.id)}
            style={{ background:'#fff5f5', color:'#dc2626', border:'1px solid #fecaca', borderRadius:12, padding:'12px 0', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:14 }}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [view, setView]     = useState({ type:'list', data:null });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = prescriptions.filter(p => {
    const q = search.toLowerCase();
    return (p.patientName.toLowerCase().includes(q) || p.drug.toLowerCase().includes(q))
      && (filter === 'all' || p.status === filter);
  });

  const handleRenew = (id) => {
    setPrescriptions(prev => {
      const next = prev.map(p => p.id === id ? { ...p, refills: p.refills + 1, status:'active' } : p);
      setView({ type:'detail', data: next.find(p => p.id === id) });
      return next;
    });
  };

  const handleDelete = (id) => {
    setPrescriptions(prev => prev.filter(p => p.id !== id));
    setView({ type:'list', data:null });
  };

  if (view.type === 'new') return (
    <div style={{ padding:32, minHeight:'100vh', background:'#f9fafb' }}>
      <NewPrescriptionForm
        onClose={() => setView({ type:'list', data:null })}
        onSubmit={rx => { setPrescriptions(p => [...p, rx]); setView({ type:'list', data:null }); }}
      />
    </div>
  );

  if (view.type === 'detail') return (
    <div style={{ padding:32, minHeight:'100vh', background:'#f9fafb' }}>
      <PrescriptionDetail rx={view.data} onBack={() => setView({ type:'list', data:null })} onRenew={handleRenew} onDelete={handleDelete} />
    </div>
  );

  const counts = {
    total:      prescriptions.length,
    active:     prescriptions.filter(p => p.status === 'active').length,
    needRefill: prescriptions.filter(p => p.refills === 0 && p.status === 'active').length,
    expired:    prescriptions.filter(p => p.status === 'expired').length,
  };

  const statCards = [
    { label:'Total',       value: counts.total,      icon: <Pill size={15} color="#3b82f6" />,       color:'#1e40af' },
    { label:'Active',      value: counts.active,     icon: <CheckCircle size={15} color="#22c55e" />, color:'#15803d' },
    { label:'Need Refill', value: counts.needRefill, icon: <AlertCircle size={15} color="#f59e0b" />, color:'#b45309' },
    { label:'Expired',     value: counts.expired,    icon: <Clock size={15} color="#9ca3af" />,       color:'#6b7280' },
  ];

  // table column flex weights
  const cols = [
    { label:'Patient',    flex:3 },
    { label:'Medication', flex:3 },
    { label:'Dosage',     flex:2 },
    { label:'End Date',   flex:2 },
    { label:'Refills',    flex:1 },
    { label:'Status',     flex:2, right:true },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#f9fafb', padding:32, fontFamily:'system-ui,sans-serif' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ margin:0, fontSize:28, fontWeight:900, color:'#111', letterSpacing:'-0.5px' }}>Prescriptions</h1>
            <p style={{ margin:'4px 0 0', color:'#6b7280', fontSize:14 }}>Manage patient medications and records</p>
          </div>
          <button type="button" onClick={() => setView({ type:'new', data:null })}
            style={{ background:'#0d9488', color:'#fff', border:'none', borderRadius:12, padding:'11px 20px', fontWeight:700, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 14px rgba(13,148,136,.3)' }}>
            <Plus size={18} /> New Prescription
          </button>
        </div>

        {/* Stat cards — pure CSS grid, no Tailwind */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
          {statCards.map(({ label, value, icon, color }) => (
            <div key={label} style={{ background:'#fff', borderRadius:16, border:'1px solid #f3f4f6', boxShadow:'0 1px 4px rgba(0,0,0,.05)', padding:'18px 20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:10, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:1 }}>{label}</span>
                {icon}
              </div>
              <span style={{ fontSize:26, fontWeight:900, color }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid #f3f4f6', boxShadow:'0 1px 4px rgba(0,0,0,.05)', padding:14, marginBottom:18, display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
          <div style={{ flex:'1 1 200px', position:'relative' }}>
            <Search size={16} color="#9ca3af" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
            <input style={{ ...inp, paddingLeft:36 }} placeholder="Search by patient name or medication…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display:'flex', background:'#f3f4f6', borderRadius:12, padding:4, gap:2 }}>
            {['all','active','expired','pending'].map(s => (
              <button key={s} type="button" onClick={() => setFilter(s)}
                style={{ background: filter===s ? '#fff':'transparent', color: filter===s ? '#0d9488':'#6b7280', border:'none', borderRadius:9, padding:'7px 14px', fontWeight:700, fontSize:12, cursor:'pointer', textTransform:'capitalize', boxShadow: filter===s ? '0 1px 4px rgba(0,0,0,.1)':'none' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid #f3f4f6', boxShadow:'0 1px 4px rgba(0,0,0,.05)', overflow:'hidden' }}>
          {/* Header */}
          <div style={{ display:'flex', padding:'12px 20px', background:'#f9fafb', borderBottom:'1px solid #f3f4f6' }}>
            {cols.map(({ label, flex, right }) => (
              <div key={label} style={{ flex, textAlign: right ? 'right':'left', fontSize:9, fontWeight:800, color:'#9ca3af', textTransform:'uppercase', letterSpacing:1.2 }}>{label}</div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding:'60px 0', textAlign:'center', color:'#9ca3af' }}>
              <div style={{ fontSize:36, opacity:.25, marginBottom:10 }}>💊</div>
              <p style={{ margin:0, fontWeight:700, color:'#6b7280' }}>No prescriptions found</p>
              <p style={{ margin:'4px 0 0', fontSize:13 }}>Try adjusting your search or filter</p>
            </div>
          ) : (
            filtered.map((p, i) => {
              const cfg = statusConfig[p.status] || statusConfig.active;
              const initials = p.patientName.split(' ').map(n => n[0]).join('');
              return (
                <div key={p.id}
                  onClick={() => setView({ type:'detail', data:p })}
                  style={{ display:'flex', alignItems:'center', padding:'14px 20px', borderBottom: i < filtered.length-1 ? '1px solid #f9fafb':'none', cursor:'pointer', transition:'background .12s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#f0fdfa'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <div style={{ flex:3, display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:38, height:38, borderRadius:999, background:'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, color:'#374151', flexShrink:0 }}>{initials}</div>
                    <div>
                      <p style={{ margin:0, fontWeight:700, fontSize:14, color:'#111' }}>{p.patientName}</p>
                      <p style={{ margin:0, fontSize:10, fontWeight:600, color:'#9ca3af' }}>ID #{p.patientId}</p>
                    </div>
                  </div>
                  <div style={{ flex:3 }}>
                    <p style={{ margin:0, fontWeight:700, fontSize:14, color:'#111' }}>{p.drug}</p>
                    <p style={{ margin:0, fontSize:11, color:'#9ca3af', fontStyle:'italic' }}>{p.frequency}</p>
                  </div>
                  <div style={{ flex:2 }}>
                    <p style={{ margin:0, fontWeight:700, fontSize:14, color:'#111' }}>{p.dose}</p>
                    <p style={{ margin:0, fontSize:11, color:'#9ca3af' }}>{p.duration}</p>
                  </div>
                  <div style={{ flex:2, display:'flex', alignItems:'center', gap:6, color:'#374151', fontSize:13, fontWeight:600 }}>
                    <Calendar size={13} color="#d1d5db" /> {p.endDate}
                  </div>
                  <div style={{ flex:1, fontWeight:800, color:'#0d9488', fontSize:15 }}>{p.refills}</div>
                  <div style={{ flex:2, display:'flex', justifyContent:'flex-end', alignItems:'center', gap:8 }}>
                    <span style={{ background: cfg.bg, color: cfg.text, border:`1px solid ${cfg.border}`, borderRadius:999, padding:'4px 10px', fontSize:10, fontWeight:800, display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:6, height:6, borderRadius:999, background: cfg.dot, display:'inline-block' }} />
                      {cfg.label}
                    </span>
                    <ChevronRight size={15} color="#d1d5db" />
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}