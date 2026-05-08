import { useState } from 'react';

export default function AppointmentsDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 17));
  const [viewMode, setViewMode] = useState('calendar');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const appointments = [
    { id: 1, patientName: 'Ahmed Hassan', time: '09:00', status: 'waiting', type: 'Consultation', notes: 'Hypertension follow-up' },
    { id: 2, patientName: 'Fatima Al-Rashid', time: '09:30', status: 'in_progress', type: 'Emergency', notes: 'Chest pain assessment' },
    { id: 3, patientName: 'Mohammad Khan', time: '10:15', status: 'waiting', type: 'Follow-up', notes: 'Post-operative check' },
    { id: 4, patientName: 'Layla Mansouri', time: '11:00', status: 'completed', type: 'Prenatal', notes: 'Pregnancy checkup' },
    { id: 5, patientName: 'Hassan Ibrahim', time: '14:00', status: 'waiting', type: 'Consultation', notes: 'General checkup' },
    { id: 6, patientName: 'Noor Al-Mansouri', time: '14:45', status: 'in_progress', type: 'Emergency', notes: 'Asthma assessment' },
    { id: 7, patientName: 'Sara Mohamed', time: '15:30', status: 'waiting', type: 'Follow-up', notes: 'Medication adjustment' },
    { id: 8, patientName: 'Omar Ibrahim', time: '16:15', status: 'waiting', type: 'Consultation', notes: 'New patient intake' },
  ];

  const statusColors = {
    waiting: { bg: '#fef3c7', text: '#b45309', icon: '⏱' },
    in_progress: { bg: '#dbeafe', text: '#1e40af', icon: '⚙️' },
    completed: { bg: '#dcfce7', text: '#166534', icon: '✓' },
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const containerStyle = {
    padding: '20px',
    background: 'var(--color-background-primary)',
    fontFamily: 'var(--font-sans)',
  };

  const headerStyle = {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    margin: '0 0 8px 0',
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  };

  const toggleButtonStyle = (isActive) => ({
    padding: '10px 16px',
    border: isActive ? '1px solid var(--color-border-primary)' : '0.5px solid var(--color-border-tertiary)',
    background: isActive ? 'var(--color-background-secondary)' : 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    transition: 'all 0.2s',
  });

  const calendarStyle = {
    background: 'var(--color-background-primary)',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '20px',
  };

  const calendarHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const calendarTitleStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    margin: 0,
  };

  const navButtonStyle = {
    background: 'transparent',
    border: '0.5px solid var(--color-border-tertiary)',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const dayHeaderStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    marginBottom: '12px',
  };

  const dayLabelStyle = {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--color-text-secondary)',
    padding: '8px 0',
  };

  const daysGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  };

  const dayStyle = (day) => ({
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: day ? 'pointer' : 'default',
    background: day && isToday(day) ? 'var(--color-background-info)' : 'transparent',
    color: day && isToday(day) ? 'var(--color-text-info)' : day ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
    fontWeight: day && isToday(day) ? '600' : '400',
    opacity: day ? 1 : 0.3,
  });

  const appointmentStyle = (status) => ({
    padding: '12px',
    background: statusColors[status].bg,
    color: statusColors[status].text,
    border: `0.5px solid ${statusColors[status].text}40`,
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '8px',
    transition: 'all 0.2s',
  });

  const scheduleContainerStyle = {
    background: 'var(--color-background-primary)',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: '12px',
    padding: '16px',
    maxHeight: '400px',
    overflowY: 'auto',
  };

  const scheduleHeaderStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    marginBottom: '12px',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      {!selectedAppointment && !showNewForm ? (
        <>
          <div style={headerStyle}>
            <div>
              <h1 style={titleStyle}>Appointments</h1>
              <p style={subtitleStyle}>Manage your daily schedule</p>
            </div>
            <button
              onClick={() => setShowNewForm(true)}
              style={{
                padding: '10px 16px',
                background: 'var(--color-background-info)',
                color: 'var(--color-text-info)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              + New Appointment
            </button>
          </div>

          <div style={buttonGroupStyle}>
            {['calendar', 'list'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={toggleButtonStyle(viewMode === mode)}
              >
                {mode === 'calendar' ? '📅 Calendar' : '📋 List'}
              </button>
            ))}
          </div>

          {viewMode === 'calendar' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div style={calendarStyle}>
                <div style={calendarHeaderStyle}>
                  <h2 style={calendarTitleStyle}>{monthName}</h2>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                      style={navButtonStyle}
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                      style={navButtonStyle}
                    >
                      →
                    </button>
                  </div>
                </div>

                <div style={dayHeaderStyle}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} style={dayLabelStyle}>
                      {d}
                    </div>
                  ))}
                </div>

                <div style={daysGridStyle}>
                  {days.map((day, idx) => (
                    <div key={idx} style={dayStyle(day)}>
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div style={scheduleContainerStyle}>
                <h3 style={scheduleHeaderStyle}>Today's Schedule</h3>
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => setSelectedAppointment(apt)}
                    style={{
                      ...appointmentStyle(apt.status),
                      fontSize: '13px',
                    }}
                  >
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {statusColors[apt.status].icon} {apt.time}
                    </div>
                    <div style={{ fontWeight: '500' }}>{apt.patientName}</div>
                    <div style={{ fontSize: '12px', opacity: 0.8 }}>{apt.type}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={scheduleContainerStyle}>
              <h3 style={scheduleHeaderStyle}>Schedule for Today</h3>
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => setSelectedAppointment(apt)}
                  style={{
                    ...appointmentStyle(apt.status),
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {statusColors[apt.status].icon} {apt.time} — {apt.patientName}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.8 }}>{apt.type}</div>
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>{apt.notes}</div>
                  </div>
                  <span>→</span>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
              marginTop: '20px',
            }}
          >
            {[
              { label: 'Total Today', value: appointments.length },
              { label: 'Waiting', value: appointments.filter((a) => a.status === 'waiting').length },
              { label: 'In Progress', value: appointments.filter((a) => a.status === 'in_progress').length },
              { label: 'Completed', value: appointments.filter((a) => a.status === 'completed').length },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  background: 'var(--color-background-secondary)',
                  borderRadius: '8px',
                  border: '0.5px solid var(--color-border-tertiary)',
                }}
              >
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 6px 0' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', margin: 0 }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : selectedAppointment ? (
        <div>
          <button
            onClick={() => setSelectedAppointment(null)}
            style={{
              background: 'transparent',
              border: '0.5px solid var(--color-border-tertiary)',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '16px',
              fontSize: '14px',
            }}
          >
            ← Back
          </button>
          <div
            style={{
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: '600', margin: '0 0 8px 0', color: 'var(--color-text-primary)' }}>
              {selectedAppointment.patientName}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 16px 0' }}>
              {selectedAppointment.type}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--color-background-secondary)', padding: '12px', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 6px 0' }}>Time</p>
                <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{selectedAppointment.time}</p>
              </div>
              <div style={{ background: 'var(--color-background-secondary)', padding: '12px', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 6px 0' }}>Status</p>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: 0,
                    color: statusColors[selectedAppointment.status].text,
                  }}
                >
                  {statusColors[selectedAppointment.status].icon} {selectedAppointment.status.replace('_', ' ')}
                </p>
              </div>
            </div>

            <div style={{ background: 'var(--color-background-secondary)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 6px 0' }}>Notes</p>
              <p style={{ fontSize: '14px', margin: 0 }}>{selectedAppointment.notes}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                style={{
                  padding: '10px 16px',
                  background: 'var(--color-background-info)',
                  color: 'var(--color-text-info)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                }}
              >
                ✏️ Reschedule
              </button>
              <button
                style={{
                  padding: '10px 16px',
                  background: 'var(--color-background-danger)',
                  color: 'var(--color-text-danger)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                }}
              >
                🗑️ Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowNewForm(false)}
            style={{
              background: 'transparent',
              border: '0.5px solid var(--color-border-tertiary)',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '16px',
              fontSize: '14px',
            }}
          >
            ← Back
          </button>
          <div
            style={{
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: '600', margin: '0 0 16px 0' }}>Schedule New Appointment</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowNewForm(false);
              }}
              style={{ display: 'grid', gap: '12px' }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
                  Patient Name
                </label>
                <input
                  type="text"
                  placeholder="Enter patient name..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Date</label>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '0.5px solid var(--color-border-tertiary)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Time</label>
                  <input
                    type="time"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '0.5px solid var(--color-border-tertiary)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
                  Appointment Type
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option>Consultation</option>
                  <option>Follow-up</option>
                  <option>Emergency</option>
                  <option>Prenatal</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Notes</label>
                <textarea
                  placeholder="Additional notes..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    minHeight: '80px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '10px 16px',
                  background: 'var(--color-background-info)',
                  color: 'var(--color-text-info)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginTop: '8px',
                }}
              >
                Schedule Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}