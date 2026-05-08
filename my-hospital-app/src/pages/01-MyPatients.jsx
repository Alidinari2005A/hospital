import { useState, useMemo } from 'react';
import { Search, ChevronRight, AlertCircle, Check, Clock, User, Activity, Heart, Stethoscope, ArrowLeft } from 'lucide-react';

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
    admitted:   { bg: '#e3f2fd',  border: '#90caf9',  text: '#1565c0',  badge: '#bbdefb', badgeText: '#0d47a1' },
    critical:   { bg: '#ffebee',  border: '#ef9a9a',  text: '#c62828',  badge: '#ffcdd2', badgeText: '#b71c1c' },
    discharged: { bg: '#e8f5e9', border: '#81c784',  text: '#2e7d32', badge: '#c8e6c9', badgeText: '#1b5e20' }
  };

  const statusIcons = {
    admitted:   <Clock size={13} />,
    critical:   <AlertCircle size={13} />,
    discharged: <Check size={13} />
  };

  const filterLabels = { all: 'All', admitted: 'Admitted', critical: 'Critical', discharged: 'Discharged' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa', padding: '2rem' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; }
        .patient-row {
          transition: all 0.2s ease;
          opacity: 0;
          animation: slideIn 0.35s ease-out forwards;
        }
        .patient-row:nth-child(1) { animation-delay: 0.02s; }
        .patient-row:nth-child(2) { animation-delay: 0.04s; }
        .patient-row:nth-child(3) { animation-delay: 0.06s; }
        .patient-row:nth-child(4) { animation-delay: 0.08s; }
        .patient-row:nth-child(5) { animation-delay: 0.10s; }
        .patient-row:nth-child(6) { animation-delay: 0.12s; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .patient-row:hover { 
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .filter-btn { 
          transition: all 0.18s ease; 
          font-family: 'Inter', sans-serif; 
          cursor: pointer; 
          border: none; 
          font-size: 0.9rem;
          font-weight: 500;
        }
        .filter-btn:hover { transform: translateY(-1px); }
        .search-input {
          font-family: 'Inter', sans-serif;
        }
        .search-input:focus { 
          outline: none; 
          border-color: #14b8a6 !important;
          box-shadow: 0 0 0 3px rgba(20,184,166,0.1);
        }
        .tab-btn { 
          transition: all 0.18s ease; 
          cursor: pointer; 
          background: none; 
          border: none;
          font-family: 'Inter', sans-serif;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.28s ease-out; }
        .chevron-icon { transition: all 0.2s ease; }
        .patient-row:hover .chevron-icon { transform: translateX(3px); color: #14b8a6; }
      `}</style>

      {!selectedPatient ? (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', margin: 0, marginBottom: '8px', letterSpacing: '-0.5px' }}>
              My Patients
            </h1>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>
              Manage and view all assigned patients
            </p>
          </div>

          {/* Search and Filters Section */}
          <div style={{ marginBottom: '2rem' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <Search size={18} style={{ 
                position: 'absolute', 
                left: '14px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af', 
                pointerEvents: 'none' 
              }} />
              <input
                type="text"
                placeholder="Search by name or MRN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                style={{
                  width: '100%',
                  paddingLeft: '44px',
                  paddingRight: '16px',
                  paddingTop: '11px',
                  paddingBottom: '11px',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#1f2937',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['all', 'admitted', 'critical', 'discharged'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className="filter-btn"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: selectedStatus === status ? 600 : 500,
                    background: selectedStatus === status
                      ? '#14b8a6'
                      : '#ffffff',
                    color: selectedStatus === status ? '#ffffff' : '#6b7280',
                    border: selectedStatus === status ? 'none' : '1px solid #e5e7eb',
                    boxShadow: selectedStatus === status ? '0 2px 4px rgba(20,184,166,0.2)' : 'none',
                  }}
                >
                  {filterLabels[status]}
                </button>
              ))}
            </div>
          </div>

          {/* Patient List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredPatients.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e5e7eb'
              }}>
                <User size={40} style={{ color: '#d1d5db', margin: '0 auto 12px', display: 'block' }} />
                <p style={{ color: '#6b7280', fontSize: '1rem', margin: 0 }}>No patients match your search</p>
              </div>
            ) : (
              filteredPatients.map((patient) => {
                const style = statusStyles[patient.status];
                return (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className="patient-row"
                    style={{
                      width: '100%',
                      padding: '16px 18px',
                      borderRadius: '10px',
                      border: `1px solid ${style.border}`,
                      background: style.bg,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                      {/* Avatar */}
                      <div style={{
                        width: '44px', 
                        height: '44px', 
                        borderRadius: '50%',
                        background: '#ffffff',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0, 
                        border: `2px solid ${style.border}`,
                        fontWeight: 600,
                        color: style.text,
                        fontSize: '0.85rem'
                      }}>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <h3 style={{ color: '#1f2937', fontSize: '0.95rem', margin: 0, fontWeight: 600, whiteSpace: 'nowrap' }}>
                            {patient.name}
                          </h3>
                          <span style={{
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            padding: '3px 10px', 
                            borderRadius: '5px', 
                            fontSize: '0.75rem', 
                            fontWeight: 600,
                            background: style.badge,
                            color: style.badgeText,
                          }}>
                            {statusIcons[patient.status]}
                            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                          </span>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          gap: '12px', 
                          fontSize: '0.8rem', 
                          color: '#6b7280', 
                          marginBottom: '6px', 
                          flexWrap: 'wrap'
                        }}>
                          <span>{patient.mrn}</span>
                          <span>Age: {patient.age}</span>
                          <span>Last visit: {patient.lastVisit}</span>
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {patient.diagnosis}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className="chevron-icon"
                      style={{ color: '#d1d5db', flexShrink: 0 }}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Stats Cards */}
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Total Patients', value: mockPatients.length, color: '#1f2937' },
              { label: 'Critical Cases', value: mockPatients.filter(p => p.status === 'critical').length, color: '#dc2626' },
              { label: 'Currently Admitted', value: mockPatients.filter(p => p.status === 'admitted').length, color: '#0d47a1' },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '20px',
                borderRadius: '10px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
              }}>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', margin: '0 0 8px', fontWeight: 500 }}>{stat.label}</p>
                <p style={{ fontSize: '2rem', color: stat.color, margin: 0, fontWeight: 700 }}>{stat.value}</p>
              </div>
            ))}
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

  const statusColor = {
    critical: { bg: '#ffebee', text: '#c62828', light: '#ffcdd2' },
    admitted: { bg: '#e3f2fd', text: '#1565c0', light: '#bbdefb' },
    discharged: { bg: '#e8f5e9', text: '#2e7d32', light: '#c8e6c9' }
  };

  const color = statusColor[patient.status];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }} className="fade-up">
      <style>{`
        .back-btn {
          display: inline-flex; 
          align-items: center; 
          gap: 6px;
          padding: 10px 16px; 
          border-radius: 8px; 
          cursor: pointer;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          color: #4b5563; 
          font-size: 0.9rem; 
          transition: all 0.18s ease;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }
        .back-btn:hover { 
          background: #f9fafb; 
          color: #1f2937; 
          border-color: #d1d5db;
        }
        .info-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
        }
      `}</style>

      <button className="back-btn" onClick={onBack} style={{ marginBottom: '28px' }}>
        <ArrowLeft size={16} />
        Back to Patients
      </button>

      {/* Patient Header Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px', 
        padding: '24px', 
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px', 
              height: '56px', 
              borderRadius: '50%',
              background: '#14b8a6',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1.1rem'
            }}>
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: '0 0 4px' }}>
                {patient.name}
              </h1>
              <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem', fontWeight: 500 }}>{patient.mrn}</p>
            </div>
          </div>
          <span style={{
            padding: '8px 16px', 
            borderRadius: '6px', 
            fontSize: '0.8rem', 
            fontWeight: 600,
            background: color.light,
            color: color.text,
          }}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Age', value: patient.age },
            { label: 'Last Visit', value: patient.lastVisit },
            { label: 'Status', value: patient.status.charAt(0).toUpperCase() + patient.status.slice(1) },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 6px', fontWeight: 600, textTransform: 'uppercase' }}>
                {item.label}
              </p>
              <p style={{ color: '#1f2937', fontWeight: 600, margin: 0, fontSize: '1rem' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnosis Banner */}
      <div style={{
        background: color.bg,
        border: `1px solid ${color.light}`,
        borderRadius: '10px',
        padding: '16px 18px',
        marginBottom: '24px'
      }}>
        <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase' }}>
          Primary Diagnosis
        </p>
        <p style={{ color: color.text, fontWeight: 600, margin: 0, fontSize: '0.95rem' }}>
          {patient.diagnosis}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
        {['overview', 'vitals', 'history'].map(tab => (
          <button
            key={tab}
            className="tab-btn"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 20px',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab ? 600 : 500,
              color: activeTab === tab ? '#14b8a6' : '#6b7280',
              borderBottom: activeTab === tab ? '3px solid #14b8a6' : '3px solid transparent',
              marginBottom: '-1px',
              background: 'transparent'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="fade-up" key={activeTab}>
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="info-card">
              <h2 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1f2937', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={18} style={{ color: '#14b8a6' }} /> 
                Medical Info
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 4px', fontWeight: 600 }}>DIAGNOSIS</p>
                  <p style={{ color: '#1f2937', fontWeight: 500, margin: 0, fontSize: '0.9rem' }}>{patient.diagnosis}</p>
                </div>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 4px', fontWeight: 600 }}>ALLERGIES</p>
                  <p style={{ 
                    color: patient.allergies === 'NKDA' ? '#059669' : '#dc2626', 
                    fontWeight: 600, 
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    {patient.allergies}
                  </p>
                </div>
              </div>
            </div>
            <div className="info-card">
              <h2 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1f2937', margin: '0 0 16px' }}>
                Clinical Notes
              </h2>
              <p style={{ color: '#6b7280', margin: 0, lineHeight: 1.6, fontSize: '0.9rem' }}>{patient.notes}</p>
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { label: 'Blood Pressure', value: patient.vitals.bp, icon: <Heart size={18} style={{ color: '#dc2626' }} /> },
              { label: 'Temperature', value: patient.vitals.temp, icon: <Activity size={18} style={{ color: '#f97316' }} /> },
              { label: 'Heart Rate', value: patient.vitals.hr + ' bpm', icon: <Heart size={18} style={{ color: '#ec4899' }} /> }
            ].map((vital, idx) => (
              <div key={idx} className="info-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: 0, fontWeight: 600, textTransform: 'uppercase' }}>
                    {vital.label}
                  </p>
                  {vital.icon}
                </div>
                <p style={{ fontWeight: 700, fontSize: '1.75rem', color: '#1f2937', margin: 0 }}>
                  {vital.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="info-card">
            <h2 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1f2937', margin: '0 0 20px' }}>
              Visit History
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { date: '2024-01-17', type: 'Follow-up', note: 'Regular checkup - vitals stable' },
                { date: '2024-01-10', type: 'Appointment', note: 'Lab work reviewed' },
                { date: '2024-01-01', type: 'Consultation', note: 'Initial assessment' }
              ].map((visit, idx, arr) => (
                <div key={idx} style={{
                  display: 'flex', 
                  gap: '14px', 
                  paddingBottom: idx < arr.length - 1 ? '16px' : 0,
                  marginBottom: idx < arr.length - 1 ? '16px' : 0,
                  borderBottom: idx < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}>
                  <div style={{
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%',
                    background: '#14b8a6', 
                    marginTop: '6px', 
                    flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ color: '#1f2937', fontWeight: 600, margin: '0 0 2px', fontSize: '0.9rem' }}>
                      {visit.type}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 4px', fontWeight: 500 }}>
                      {visit.date}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>{visit.note}</p>
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