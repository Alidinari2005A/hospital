import { useState } from 'react';
import { Send, Search, CheckCheck, MessageCircle, User, Paperclip } from 'lucide-react';

const mockThreads = [
  {
    id: 1,
    type: 'patient',
    name: 'Ahmed Hassan',
    lastMessage: 'Thank you for the medications. How soon can I expect results?',
    timestamp: '2 mins ago',
    unread: 2,
    avatar: 'AH',
    messages: [
      { id: 1, sender: 'Ahmed Hassan', content: 'Good morning Dr. Khalil', timestamp: '10:30 AM', fromPatient: true },
      { id: 2, sender: 'Dr. Khalil', content: 'Good morning! How are you feeling today?', timestamp: '10:32 AM', fromPatient: false },
      { id: 3, sender: 'Ahmed Hassan', content: 'Much better, thank you. When should I follow up?', timestamp: '10:35 AM', fromPatient: true },
      { id: 4, sender: 'Dr. Khalil', content: 'Please schedule an appointment for next week for a check-up.', timestamp: '10:37 AM', fromPatient: false },
      { id: 5, sender: 'Ahmed Hassan', content: 'Thank you for the medications. How soon can I expect results?', timestamp: '2 mins ago', fromPatient: true },
    ]
  },
  {
    id: 2,
    type: 'staff',
    name: 'Nurse Fatima',
    lastMessage: 'Room 204 is ready for the next patient',
    timestamp: '15 mins ago',
    unread: 0,
    avatar: 'NF',
    messages: [
      { id: 1, sender: 'Nurse Fatima', content: 'Doctor, we need you in room 201', timestamp: '2:45 PM', fromPatient: false },
      { id: 2, sender: 'Dr. Khalil', content: 'On my way, give me 2 minutes', timestamp: '2:47 PM', fromPatient: false },
      { id: 3, sender: 'Nurse Fatima', content: 'Room 204 is ready for the next patient', timestamp: '15 mins ago', fromPatient: false },
    ]
  },
  {
    id: 3,
    type: 'patient',
    name: 'Fatima Al-Rashid',
    lastMessage: 'Experiencing chest pain again',
    timestamp: '1 hour ago',
    unread: 1,
    avatar: 'FR',
    messages: [
      { id: 1, sender: 'Fatima Al-Rashid', content: 'Doctor, I am not feeling well', timestamp: '12:30 PM', fromPatient: true },
      { id: 2, sender: 'Dr. Khalil', content: 'Can you describe your symptoms?', timestamp: '12:35 PM', fromPatient: false },
      { id: 3, sender: 'Fatima Al-Rashid', content: 'Experiencing chest pain again', timestamp: '1 hour ago', fromPatient: true },
    ]
  },
  {
    id: 4,
    type: 'staff',
    name: 'Lab Technician Hassan',
    lastMessage: 'Troponin results came back elevated',
    timestamp: '2 hours ago',
    unread: 0,
    avatar: 'LT',
    messages: [
      { id: 1, sender: 'Lab Technician Hassan', content: 'Doctor, we have preliminary results', timestamp: '11:00 AM', fromPatient: false },
      { id: 2, sender: 'Dr. Khalil', content: 'Which tests?', timestamp: '11:05 AM', fromPatient: false },
      { id: 3, sender: 'Lab Technician Hassan', content: 'Troponin results came back elevated', timestamp: '2 hours ago', fromPatient: false },
    ]
  },
  {
    id: 5,
    type: 'patient',
    name: 'Mohammad Khan',
    lastMessage: 'Should I continue with the medication?',
    timestamp: '4 hours ago',
    unread: 0,
    avatar: 'MK',
    messages: [
      { id: 1, sender: 'Mohammad Khan', content: 'The antibiotics seem to be working', timestamp: '8:00 AM', fromPatient: true },
      { id: 2, sender: 'Dr. Khalil', content: 'That is good to hear. How are your symptoms?', timestamp: '8:10 AM', fromPatient: false },
      { id: 3, sender: 'Mohammad Khan', content: 'Should I continue with the medication?', timestamp: '4 hours ago', fromPatient: true },
    ]
  },
  {
    id: 6,
    type: 'patient',
    name: 'Layla Mansouri',
    lastMessage: 'Next appointment confirmed for Tuesday',
    timestamp: '5 hours ago',
    unread: 0,
    avatar: 'LM',
    messages: [
      { id: 1, sender: 'Layla Mansouri', content: 'When is my next prenatal check?', timestamp: '9:00 AM', fromPatient: true },
      { id: 2, sender: 'Dr. Khalil', content: 'Let me check the schedule', timestamp: '9:05 AM', fromPatient: false },
      { id: 3, sender: 'Dr. Khalil', content: 'Next appointment confirmed for Tuesday at 10 AM', timestamp: '9:15 AM', fromPatient: false },
      { id: 4, sender: 'Layla Mansouri', content: 'Next appointment confirmed for Tuesday', timestamp: '5 hours ago', fromPatient: true },
    ]
  }
];

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThread, setSelectedThread] = useState(mockThreads[0]);
  const [threads, setThreads] = useState(mockThreads);
  const [newMessage, setNewMessage] = useState('');

  const filteredThreads = threads.filter(thread =>
    thread.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = threads.reduce((sum, thread) => sum + thread.unread, 0);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedThread) {
      const updatedThreads = threads.map(thread =>
        thread.id === selectedThread.id
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                { id: thread.messages.length + 1, sender: 'Dr. Khalil', content: newMessage, timestamp: 'Just now', fromPatient: false }
              ],
              lastMessage: newMessage,
              timestamp: 'Just now'
            }
          : thread
      );
      setThreads(updatedThreads);
      setSelectedThread(updatedThreads.find(t => t.id === selectedThread.id));
      setNewMessage('');
    }
  };

  const markAsRead = (threadId) => {
    setThreads(threads.map(thread =>
      thread.id === threadId ? { ...thread, unread: 0 } : thread
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .heading { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; letter-spacing: -0.5px; }
        .thread-item { transition: all 0.2s ease; animation: slideIn 0.4s ease-out forwards; }
        .thread-item:nth-child(1) { animation-delay: 0.05s; }
        .thread-item:nth-child(2) { animation-delay: 0.1s; }
        .thread-item:nth-child(3) { animation-delay: 0.15s; }
        .thread-item:nth-child(4) { animation-delay: 0.2s; }
        .thread-item:nth-child(5) { animation-delay: 0.25s; }
        .thread-item:nth-child(6) { animation-delay: 0.3s; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .thread-item:hover { transform: translateX(4px); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
        .message-item { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .message-bubble { max-width: 70%; word-wrap: break-word; }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">

        {/* Threads List */}
        <div className="lg:col-span-1 bg-slate-800/30 border border-slate-700 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="heading text-xl text-white mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageCircle size={24} className="text-teal-400" />
                Messages
              </span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </h2>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-slate-700">
              {filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => { setSelectedThread(thread); markAsRead(thread.id); }}
                  className={`thread-item w-full p-4 text-left transition-all hover:bg-slate-700/30 ${selectedThread?.id === thread.id ? 'bg-slate-700/50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm ${
                      thread.type === 'patient' ? 'bg-teal-500/30 text-teal-300' : 'bg-blue-500/30 text-blue-300'
                    }`}>
                      {thread.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <p className={`heading font-semibold truncate ${thread.unread > 0 ? 'text-white' : 'text-slate-300'}`}>
                          {thread.name}
                        </p>
                        {thread.unread > 0 && (
                          <span className="bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                            {thread.unread}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm truncate ${thread.unread > 0 ? 'text-slate-400' : 'text-slate-500'}`}>
                        {thread.lastMessage}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{thread.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat View */}
        <div className="lg:col-span-2 bg-slate-800/30 border border-slate-700 rounded-xl flex flex-col overflow-hidden">
          {selectedThread ? (
            <>
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    selectedThread.type === 'patient' ? 'bg-teal-500/30 text-teal-300' : 'bg-blue-500/30 text-blue-300'
                  }`}>
                    {selectedThread.avatar}
                  </div>
                  <div>
                    <p className="heading font-semibold text-white">{selectedThread.name}</p>
                    <p className="text-xs text-slate-400 capitalize">{selectedThread.type === 'patient' ? 'Patient' : 'Staff'}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-700/50 rounded-lg transition text-slate-400 hover:text-white">
                  <MessageCircle size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedThread.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-item flex gap-3 ${message.fromPatient ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.fromPatient && (
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-slate-400" />
                      </div>
                    )}
                    <div className={`flex flex-col gap-1 ${message.fromPatient ? '' : 'items-end'}`}>
                      <div className={`message-bubble px-4 py-2 rounded-lg ${
                        message.fromPatient
                          ? 'bg-slate-700/50 border border-slate-600 text-slate-200'
                          : 'bg-teal-500 text-slate-950 font-medium'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-slate-500">{message.timestamp}</p>
                    </div>
                    {!message.fromPatient && (
                      <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                        <CheckCheck size={16} className="text-slate-950" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-700/30 rounded-lg transition text-slate-400 hover:text-white">
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 rounded-lg transition font-semibold"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle size={48} className="mx-auto text-slate-600 mb-4 opacity-50" />
                <p className="text-slate-400">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}