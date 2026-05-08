import { useState } from 'react';
import {
  AlertCircle, Clock, X, Flag, MessageSquare,
  Link as LinkIcon, Download, Search, Bell,
  ChevronRight, FlaskConical
} from 'lucide-react';

const mockLabResults = [
  {
    id: 1, patientName: 'Ahmed Hassan', patientAge: '45y old', initials: 'AH', color: '#6366f1',
    testName: 'Complete Blood Count (CBC)', result: 'Abnormal', status: 'pending',
    date: '2024-01-17', flagged: false, comments: [],
    values: { WBC: '7.2 k/uL', RBC: '4.8 M/uL', Hemoglobin: '14.2 g/dL', Hematocrit: '42%' }
  },
  {
    id: 2, patientName: 'Fatima Al-Rashid', patientAge: '29y old', initials: 'FA', color: '#ec4899',
    testName: 'Troponin T', result: 'High', status: 'critical', date: '2024-01-17', flagged: true,
    comments: [{ author: 'Dr. Khalil', text: 'Elevated levels - urgent consultation required' }],
    values: { TroponinT: '0.45 ng/mL', normalRange: '< 0.04 ng/mL' }
  },
  {
    id: 3, patientName: 'Mohammad Khan', patientAge: '52y old', initials: 'MK', color: '#0ea5e9',
    testName: 'Chest X-Ray', result: 'Normal', status: 'reviewed', date: '2024-01-16', flagged: false,
    comments: [{ author: 'Radiologist', text: 'No acute findings' }],
    values: { findings: 'Clear bilateral lungs', impression: 'Consistent with clinical recovery' }
  },
  {
    id: 4, patientName: 'Layla Mansouri', patientAge: '34y old', initials: 'LM', color: '#10b981',
    testName: 'Glucose Tolerance Test', result: 'Normal', status: 'reviewed', date: '2024-01-16', flagged: false,
    comments: [],
    values: { fasting: '95 mg/dL', '2hour': '110 mg/dL' }
  },
  {
    id: 5, patientName: 'Hassan Ibrahim', patientAge: '61y old', initials: 'HI', color: '#f59e0b',
    testName: 'Vision Test', result: 'Normal', status: 'reviewed', date: '2024-01-15', flagged: false,
    comments: [{ author: 'Optometrist', text: 'Vision 20/20 post-surgery' }],
    values: { leftEye: '20/20', rightEye: '20/20' }
  },
  {
    id: 6, patientName: 'Noor Al-Mansouri', patientAge: '38y old', initials: 'NA', color: '#8b5cf6',
    testName: 'Spirometry (Lung Function)', result: 'Abnormal', status: 'pending', date: '2024-01-17', flagged: true,
    comments: [],
    values: { FEV1: '62% predicted', FVC: '68% predicted', ratio: '91%' }
  }
];

const statusConfig = {
  pending:  { bg: '#fffbeb', text: '#d97706', border: '#fde68a', dot: '#f59e0b', label: 'Pending' },
  reviewed: { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe', dot: '#3b82f6', label: 'Reviewed' },
  critical: { bg: '#fff1f2', text: '#e11d48', border: '#fecdd3', dot: '#f43f5e', label: 'Critical' },
};

const resultConfig = {
  Normal:   { text: '#059669', bg: '#ecfdf5' },
  Abnormal: { text: '#d97706', bg: '#fffbeb' },
  High:     { text: '#e11d48', bg: '#fff1f2' },
};

export default function LabResults() {
  const [searchTerm, setSearchTerm]         = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [labs, setLabs]                     = useState(mockLabResults);

  const filteredLabs = labs.filter(lab => {
    const matchesSearch =
      lab.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.testName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lab.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleFlag = (id) => {
    setLabs(prev => prev.map(lab => lab.id === id ? { ...lab, flagged: !lab.flagged } : lab));
    setSelectedReport(prev => prev?.id === id ? { ...prev, flagged: !prev.flagged } : prev);
  };

  const addComment = (id, comment) => {
    setLabs(prev => prev.map(lab =>
      lab.id === id ? { ...lab, comments: [...lab.comments, comment] } : lab
    ));
    setSelectedReport(prev =>
      prev?.id === id ? { ...prev, comments: [...prev.comments, comment] } : prev
    );
  };

  const stats = [
    { label: 'Total Tests',      value: labs.length,                                      sub: 'This week',        icon: FlaskConical, accent: '#0d9488' },
    { label: 'Pending Review',   value: labs.filter(l => l.status === 'pending').length,  sub: 'Awaiting action',  icon: Clock,        accent: '#d97706' },
    { label: 'Flagged',          value: labs.filter(l => l.flagged).length,               sub: 'Needs attention',  icon: Flag,         accent: '#e11d48' },
    { label: 'Critical Results', value: labs.filter(l => l.status === 'critical').length, sub: 'Urgent review',    icon: AlertCircle,  accent: '#e11d48' },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; }

        .lab-row { transition: background 0.15s ease; }
        .lab-row:hover { background: #f8fafc !important; }
        .lab-row:hover .row-arrow { opacity: 1 !important; transform: translateX(2px); }
        .row-arrow { opacity: 0; transition: all 0.2s ease; color: #0d9488; }

        .stat-card { transition: box-shadow 0.2s, transform 0.2s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }

        .tab-pill { transition: all 0.15s ease; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; }

        .modal-overlay { animation: overlayIn 0.2s ease; }
        .modal-card   { animation: modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes overlayIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn   { from { opacity: 0; transform: translateY(16px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      {/* Top Nav */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, background: '#0d9488', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FlaskConical size={18} color="white" />
          </div>
          <span style={{ fontWeight: 600, fontSize: 16, color: '#0f172a' }}>Lab Results</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              placeholder="Search patients, records..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, color: '#0f172a', outline: 'none', width: 260, fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <Bell size={18} color="#64748b" />
            <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: '#e11d48', borderRadius: '50%', border: '2px solid white' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, cursor: 'pointer' }}>
            <div style={{ width: 30, height: 30, background: '#0d9488', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'white' }}>AK</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>Dr. Khalil</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Cardiologist</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: 1280, margin: '0 auto' }}>

        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Friday, 8 May 2026</p>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: '#0f172a', fontFamily: 'DM Serif Display, serif', margin: 0 }}>Lab Results</h1>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>View and manage all laboratory test results</p>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>{s.label}</p>
                  <p style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1, marginBottom: 6 }}>{s.value}</p>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>{s.sub}</p>
                </div>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: s.accent + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color={s.accent} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main table */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>

          {/* Table toolbar */}
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>All Results</span>
              <span style={{ fontSize: 12, color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: 20 }}>{filteredLabs.length} records</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['all', 'pending', 'reviewed', 'critical'].map(s => (
                <button key={s} className="tab-pill" onClick={() => setSelectedStatus(s)}
                  style={{
                    padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                    background: selectedStatus === s ? '#0d9488' : 'white',
                    color: selectedStatus === s ? 'white' : '#64748b',
                    border: selectedStatus === s ? '1px solid #0d9488' : '1px solid #e2e8f0',
                  }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 120px 110px 100px 110px 40px', padding: '10px 24px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
            {['PATIENT', 'TEST NAME', 'VISIT TYPE', 'DATE', 'RESULT', 'STATUS', ''].map((h, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em' }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {filteredLabs.length === 0 ? (
            <div style={{ padding: '64px 24px', textAlign: 'center' }}>
              <FlaskConical size={40} color="#cbd5e1" style={{ margin: '0 auto 12px', display: 'block' }} />
              <p style={{ color: '#94a3b8', fontSize: 15 }}>No lab results found</p>
            </div>
          ) : (
            filteredLabs.map((lab, idx) => {
              const sc = statusConfig[lab.status];
              const rc = resultConfig[lab.result] || resultConfig['Normal'];
              return (
                <div key={lab.id} className="lab-row"
                  style={{ display: 'grid', gridTemplateColumns: '180px 1fr 120px 110px 100px 110px 40px', padding: '14px 24px', borderBottom: idx < filteredLabs.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center', background: 'white', cursor: 'pointer' }}
                  onClick={() => setSelectedReport(lab)}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: lab.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: lab.color, flexShrink: 0 }}>
                      {lab.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', lineHeight: 1.3, margin: 0 }}>{lab.patientName}</p>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{lab.patientAge}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>{lab.testName}</span>
                    {lab.flagged && <Flag size={12} color="#e11d48" fill="#e11d48" />}
                    {lab.comments.length > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#94a3b8' }}>
                        <MessageSquare size={11} />{lab.comments.length}
                      </span>
                    )}
                  </div>

                  <span style={{ fontSize: 13, color: '#64748b' }}>Lab Test</span>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{lab.date}</span>

                  <span style={{ fontSize: 12, fontWeight: 600, color: rc.text, background: rc.bg, padding: '3px 10px', borderRadius: 20, display: 'inline-block', width: 'fit-content' }}>
                    {lab.result}
                  </span>

                  <span style={{ fontSize: 12, fontWeight: 500, color: sc.text, background: sc.bg, padding: '4px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5, width: 'fit-content', whiteSpace: 'nowrap' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, flexShrink: 0 }} />
                    {sc.label}
                  </span>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="row-arrow">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onToggleFlag={toggleFlag}
          onAddComment={addComment}
        />
      )}
    </div>
  );
}

function ReportModal({ report, onClose, onToggleFlag, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const sc = statusConfig[report.status];
  const rc = resultConfig[report.result] || resultConfig['Normal'];

  const handleAdd = () => {
    if (newComment.trim()) {
      onAddComment(report.id, { author: 'Dr. Khalil', text: newComment });
      setNewComment('');
    }
  };

  return (
    <div className="modal-overlay"
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="modal-card" style={{ background: 'white', borderRadius: 20, width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}>

        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'white', borderRadius: '20px 20px 0 0', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: report.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: report.color }}>
              {report.initials}
            </div>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', margin: 0 }}>{report.testName}</h2>
              <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{report.patientName} · {report.patientAge}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'STATUS',  content: <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: sc.dot }} /><span style={{ fontSize: 14, fontWeight: 600, color: sc.text }}>{sc.label}</span></span>, bg: sc.bg, border: sc.border },
              { label: 'RESULT',  content: <span style={{ fontSize: 14, fontWeight: 600, color: rc.text }}>{report.result}</span>, bg: rc.bg, border: '#e2e8f0' },
              { label: 'DATE',    content: <span style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>{report.date}</span>, bg: '#f8fafc', border: '#e2e8f0' },
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.05em' }}>{item.label}</p>
                {item.content}
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 10 }}>Test Values</p>
            <div style={{ border: '1px solid #f1f5f9', borderRadius: 12, overflow: 'hidden' }}>
              {Object.entries(report.values).map(([key, value], i, arr) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 16px', borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{key}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 10 }}>Comments & Notes</p>
            {report.comments.length === 0 && <p style={{ fontSize: 13, color: '#94a3b8', fontStyle: 'italic', marginBottom: 12 }}>No comments yet</p>}
            {report.comments.length > 0 && (
              <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 160, overflowY: 'auto' }}>
                {report.comments.map((c, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 10, padding: '12px 14px' }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#0d9488', marginBottom: 4 }}>{c.author}</p>
                    <p style={{ fontSize: 13, color: '#334155' }}>{c.text}</p>
                  </div>
                ))}
              </div>
            )}
            <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add a comment..."
              style={{ width: '100%', padding: '12px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#0f172a', resize: 'none', height: 76, outline: 'none', fontFamily: 'DM Sans, sans-serif', marginBottom: 8, display: 'block' }} />
            <button onClick={handleAdd}
              style={{ padding: '9px 18px', background: '#0d9488', color: 'white', borderRadius: 9, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              Add Comment
            </button>
          </div>

          <div style={{ display: 'flex', gap: 10, paddingTop: 8, borderTop: '1px solid #f1f5f9' }}>
            <button onClick={() => onToggleFlag(report.id)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: report.flagged ? '#fff1f2' : 'white', color: report.flagged ? '#e11d48' : '#64748b', border: report.flagged ? '1px solid #fecdd3' : '1px solid #e2e8f0' }}>
              <Flag size={14} fill={report.flagged ? '#e11d48' : 'none'} stroke={report.flagged ? '#e11d48' : 'currentColor'} />
              {report.flagged ? 'Unflag' : 'Flag for Review'}
            </button>
            <button style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'white', color: '#64748b', border: '1px solid #e2e8f0' }}>
              <Download size={14} /> Download
            </button>
            <button style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}>
              <LinkIcon size={14} /> Link to Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}