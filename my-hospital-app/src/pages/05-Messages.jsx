import { useState } from 'react';
import { Send, Search, CheckCheck, MessageCircle, User, Paperclip } from 'lucide-react';

const mockThreads = [
  {
    id: 1, type: 'patient', name: 'Ahmed Hassan',
    lastMessage: 'Thank you for the medications. How soon can I expect results?',
    timestamp: '2 mins ago', unread: 2, avatar: 'AH',
    messages: [
      { id: 1, sender: 'Ahmed Hassan', content: 'Good morning Dr. Khalil', timestamp: '10:30 AM', fromPatient: true },
      { id: 2, sender: 'Dr. Khalil', content: 'Good morning! How are you feeling today?', timestamp: '10:32 AM', fromPatient: false },
      { id: 3, sender: 'Ahmed Hassan', content: 'Much better, thank you. When should I follow up?', timestamp: '10:35 AM', fromPatient: true },
      { id: 4, sender: 'Dr. Khalil', content: 'Please schedule an appointment for next week for a check-up.', timestamp: '10:37 AM', fromPatient: false },
      { id: 5, sender: 'Ahmed Hassan', content: 'Thank you for the medications. How soon can I expect results?', timestamp: '2 mins ago', fromPatient: true },
    ]
  },
  {
    id: 2, type: 'staff', name: 'Nurse Fatima',
    lastMessage: 'Room 204 is ready for the next patient',
    timestamp: '15 mins ago', unread: 0, avatar: 'NF',
    messages: [
      { id: 1, sender: 'Nurse Fatima', content: 'Doctor, we need you in room 201', timestamp: '2:45 PM', fromPatient: false },
      { id: 2, sender: 'Dr. Khalil', content: 'On my way, give me 2 minutes', timestamp: '2:47 PM', fromPatient: false },
      { id: 3, sender: 'Nurse Fatima', content: 'Room 204 is ready for the next patient', timestamp: '15 mins ago', fromPatient: false },
    ]
  },
  {
    id: 3, type: 'patient', name: 'Fatima Al-Rashid',
    lastMessage: 'Experiencing chest pain again',
    timestamp: '1 hour ago', unread: 1, avatar: 'FR',
    messages: [
      { id: 1, sender: 'Fatima Al-Rashid', content: 'Doctor, I am not feeling well', timestamp: '12:30 PM', fromPatient: true },
      { id: 2, sender: 'Dr. Khalil', content: 'Can you describe your symptoms?', timestamp: '12:35 PM', fromPatient: false },
      { id: 3, sender: 'Fatima Al-Rashid', content: 'Experiencing chest pain again', timestamp: '1 hour ago', fromPatient: true },
    ]
  },
  {
    id: 4, type: 'staff', name: 'Lab Technician Hassan',
    lastMessage: 'Troponin results came back elevated',
    timestamp: '2 hours ago', unread: 0, avatar: 'LT',
    messages: [
      { id: 1, sender: 'Lab Technician Hassan', content: 'Doctor, we have preliminary results', timestamp: '11:00 AM', fromPatient: false },
      { id: 2, sender: 'Dr. Khalil', content: 'Which tests?', timestamp: '11:05 AM', fromPatient: false },
      { id: 3, sender: 'Lab Technician Hassan', content: 'Troponin results came back elevated', timestamp: '2 hours ago', fromPatient: false },
    ]
  },
  {
    id: 5, type: 'patient', name: 'Mohammad Khan',
    lastMessage: 'Should I continue with the medication?',
    timestamp: '4 hours ago', unread: 0, avatar: 'MK',
    messages: [
      { id: 1, sender: 'Mohammad Khan', content: 'The antibiotics seem to be working', timestamp: '8:00 AM', fromPatient: true },
      { id: 2, sender: 'Dr. Khalil', content: 'That is good to hear. How are your symptoms?', timestamp: '8:10 AM', fromPatient: false },
      { id: 3, sender: 'Mohammad Khan', content: 'Should I continue with the medication?', timestamp: '4 hours ago', fromPatient: true },
    ]
  },
  {
    id: 6, type: 'patient', name: 'Layla Mansouri',
    lastMessage: 'Next appointment confirmed for Tuesday',
    timestamp: '5 hours ago', unread: 0, avatar: 'LM',
    messages: [
      { id: 1, sender: 'Layla Mansouri', content: 'When is my next prenatal check?', timestamp: '9:00 AM', fromPatient: true },
      { id: 2, sender: 'Dr. Khalil', content: 'Let me check the schedule', timestamp: '9:05 AM', fromPatient: false },
      { id: 3, sender: 'Dr. Khalil', content: 'Next appointment confirmed for Tuesday at 10 AM', timestamp: '9:15 AM', fromPatient: false },
      { id: 4, sender: 'Layla Mansouri', content: 'Next appointment confirmed for Tuesday', timestamp: '5 hours ago', fromPatient: true },
    ]
  }
];

export default function Messages() {
  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedThread, setSelectedThread] = useState(mockThreads[0]);
  const [threads, setThreads]             = useState(mockThreads);
  const [newMessage, setNewMessage]       = useState('');

  const filteredThreads = threads.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const unreadCount = threads.reduce((s, t) => s + t.unread, 0);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedThread) return;
    const msg = { id: Date.now(), sender: 'Dr. Khalil', content: newMessage, timestamp: 'Just now', fromPatient: false };
    setThreads(prev => {
      const next = prev.map(t => t.id === selectedThread.id
        ? { ...t, messages: [...t.messages, msg], lastMessage: newMessage, timestamp: 'Just now' }
        : t
      );
      setSelectedThread(next.find(t => t.id === selectedThread.id));
      return next;
    });
    setNewMessage('');
  };

  const markAsRead = (id) => setThreads(prev => prev.map(t => t.id === id ? { ...t, unread: 0 } : t));

  // ── colour helpers ──────────────────────────────────────────────────────────
  const avatarStyle = (type) => ({
    width: 40, height: 40, borderRadius: 999, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 600, fontSize: 13,
    background: type === 'patient' ? 'rgba(20,184,166,.25)' : 'rgba(59,130,246,.25)',
    color:      type === 'patient' ? '#5eead4'               : '#93c5fd',
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)', padding: 32, fontFamily: "'Outfit', system-ui, sans-serif", boxSizing: 'border-box' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&family=Outfit:wght@400;500;600&display=swap');
        .msg-thread { transition: background .15s, transform .15s; }
        .msg-thread:hover { background: rgba(255,255,255,.05) !important; transform: translateX(3px); }
        .msg-thread.active { background: rgba(255,255,255,.08) !important; }
        .msg-bubble { animation: msgIn .25s ease-out; }
        @keyframes msgIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 4px; }
      `}</style>

      {/* Outer 2-column layout — pure inline flex, no Tailwind grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 20, height: 'calc(100vh - 80px)' }}>

        {/* ── LEFT: Thread list ─────────────────────────────────────────────── */}
        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'rgba(30,41,59,.5)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.3px' }}>
                <MessageCircle size={22} color="#2dd4bf" /> Messages
              </span>
              {unreadCount > 0 && (
                <span style={{ background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 999, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </div>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                placeholder="Search conversations…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10, color: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* Thread list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredThreads.map(thread => (
              <button
                key={thread.id}
                type="button"
                onClick={() => { setSelectedThread(thread); markAsRead(thread.id); }}
                className={`msg-thread${selectedThread?.id === thread.id ? ' active' : ''}`}
                style={{ width: '100%', padding: '14px 18px', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,.05)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={avatarStyle(thread.type)}>{thread.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 14, color: thread.unread > 0 ? '#fff' : '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>
                        {thread.name}
                      </span>
                      {thread.unread > 0 && (
                        <span style={{ background: '#14b8a6', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 999, padding: '2px 7px', flexShrink: 0 }}>
                          {thread.unread}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {thread.lastMessage}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 11, color: '#475569' }}>{thread.timestamp}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Chat view ──────────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: 'rgba(30,41,59,.5)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, overflow: 'hidden' }}>
          {selectedThread ? (
            <>
              {/* Chat header */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={avatarStyle(selectedThread.type)}>{selectedThread.avatar}</div>
                  <div>
                    <p style={{ margin: 0, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, color: '#fff' }}>{selectedThread.name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#64748b', textTransform: 'capitalize' }}>{selectedThread.type === 'patient' ? 'Patient' : 'Staff'}</p>
                  </div>
                </div>
                <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: '#64748b' }}>
                  <MessageCircle size={20} />
                </button>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {selectedThread.messages.map(msg => (
                  <div key={msg.id} className="msg-bubble" style={{ display: 'flex', justifyContent: msg.fromPatient ? 'flex-start' : 'flex-end', alignItems: 'flex-end', gap: 10 }}>
                    {msg.fromPatient && (
                      <div style={{ width: 30, height: 30, borderRadius: 999, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <User size={15} color="#64748b" />
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.fromPatient ? 'flex-start' : 'flex-end', gap: 4, maxWidth: '68%' }}>
                      <div style={{
                        padding: '9px 14px', borderRadius: 14, fontSize: 13, lineHeight: 1.5, wordBreak: 'break-word',
                        background: msg.fromPatient ? 'rgba(255,255,255,.07)' : '#14b8a6',
                        color:      msg.fromPatient ? '#cbd5e1'               : '#0f172a',
                        border:     msg.fromPatient ? '1px solid rgba(255,255,255,.1)' : 'none',
                        fontWeight: msg.fromPatient ? 400 : 500,
                      }}>
                        {msg.content}
                      </div>
                      <span style={{ fontSize: 11, color: '#475569' }}>{msg.timestamp}</span>
                    </div>
                    {!msg.fromPatient && (
                      <div style={{ width: 30, height: 30, borderRadius: 999, background: '#14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCheck size={15} color="#0f172a" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: '#64748b', flexShrink: 0 }}>
                  <Paperclip size={19} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message…"
                  style={{ flex: 1, minWidth: 0, padding: '9px 14px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10, color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  style={{ background: newMessage.trim() ? '#14b8a6' : 'rgba(255,255,255,.07)', border: 'none', borderRadius: 10, padding: '9px 12px', cursor: newMessage.trim() ? 'pointer' : 'not-allowed', color: newMessage.trim() ? '#0f172a' : '#475569', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s' }}>
                  <Send size={19} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#475569' }}>
              <MessageCircle size={44} style={{ opacity: .3 }} />
              <p style={{ margin: 0, fontSize: 14 }}>Select a conversation to start messaging</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}