import { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, X, Flag, MessageSquare, Link as LinkIcon, Eye, Download, FileText } from 'lucide-react';

const mockLabResults = [
  {
    id: 1, patientName: 'Ahmed Hassan', testName: 'Complete Blood Count (CBC)',
    result: 'Abnormal', status: 'pending', date: '2024-01-17', flagged: false,
    comments: [],
    values: { WBC: '7.2 k/uL', RBC: '4.8 M/uL', Hemoglobin: '14.2 g/dL', Hematocrit: '42%' }
  },
  {
    id: 2, patientName: 'Fatima Al-Rashid', testName: 'Troponin T',
    result: 'High', status: 'critical', date: '2024-01-17', flagged: true,
    comments: [{ author: 'Dr. Khalil', text: 'Elevated levels - urgent consultation required' }],
    values: { TroponinT: '0.45 ng/mL', normalRange: '< 0.04 ng/mL' }
  },
  {
    id: 3, patientName: 'Mohammad Khan', testName: 'Chest X-Ray',
    result: 'Normal', status: 'reviewed', date: '2024-01-16', flagged: false,
    comments: [{ author: 'Radiologist', text: 'No acute findings' }],
    values: { findings: 'Clear bilateral lungs', impression: 'Consistent with clinical recovery' }
  },
  {
    id: 4, patientName: 'Layla Mansouri', testName: 'Glucose Tolerance Test',
    result: 'Normal', status: 'reviewed', date: '2024-01-16', flagged: false,
    comments: [],
    values: { fasting: '95 mg/dL', '2hour': '110 mg/dL' }
  },
  {
    id: 5, patientName: 'Hassan Ibrahim', testName: 'Vision Test',
    result: 'Normal', status: 'reviewed', date: '2024-01-15', flagged: false,
    comments: [{ author: 'Optometrist', text: 'Vision 20/20 post-surgery' }],
    values: { leftEye: '20/20', rightEye: '20/20' }
  },
  {
    id: 6, patientName: 'Noor Al-Mansouri', testName: 'Spirometry (Lung Function)',
    result: 'Abnormal', status: 'pending', date: '2024-01-17', flagged: true,
    comments: [],
    values: { FEV1: '62% predicted', FVC: '68% predicted', ratio: '91%' }
  }
];

const statusStyles = {
  pending:  { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40', label: 'Pending',  icon: Clock        },
  reviewed: { bg: 'bg-blue-500/20',  text: 'text-blue-300',  border: 'border-blue-500/40',  label: 'Reviewed', icon: CheckCircle  },
  critical: { bg: 'bg-red-500/20',   text: 'text-red-300',   border: 'border-red-500/40',   label: 'Critical', icon: AlertCircle  },
};

export default function LabResults() {
  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [labs, setLabs]                   = useState(mockLabResults);

  const filteredLabs = labs.filter(lab => {
    const matchesSearch =
      lab.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.testName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lab.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleFlag = (id) => setLabs(labs.map(lab => lab.id === id ? { ...lab, flagged: !lab.flagged } : lab));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .heading { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; letter-spacing: -0.5px; }
        .lab-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); animation: slideIn 0.5s ease-out forwards; }
        .lab-card:nth-child(1) { animation-delay: 0.05s; }
        .lab-card:nth-child(2) { animation-delay: 0.1s;  }
        .lab-card:nth-child(3) { animation-delay: 0.15s; }
        .lab-card:nth-child(4) { animation-delay: 0.2s;  }
        .lab-card:nth-child(5) { animation-delay: 0.25s; }
        .lab-card:nth-child(6) { animation-delay: 0.3s;  }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .lab-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
        .modal-fade { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1);    }
        }
      `}</style>

      {!selectedReport ? (
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="heading text-4xl text-white mb-2">Lab Results</h1>
            <p className="text-slate-400">View and manage all laboratory test results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 relative group">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors" size={20} />
              <input
                type="text" placeholder="Search by patient name or test type..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'reviewed', 'critical'].map(status => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredLabs.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <FileText size={48} className="mx-auto text-slate-600 mb-4 opacity-50" />
                <p className="text-slate-400 text-lg">No lab results found</p>
              </div>
            ) : (
              filteredLabs.map((lab) => {
                const style = statusStyles[lab.status];
                const StatusIcon = style.icon;
                return (
                  <div key={lab.id} className={`lab-card p-6 rounded-xl border cursor-pointer transition-all group ${style.bg} ${style.border}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="heading text-lg text-white font-semibold">{lab.testName}</h3>
                          {lab.flagged && <Flag size={16} className="text-red-400 fill-red-400" />}
                        </div>
                        <p className="text-slate-300 text-sm">{lab.patientName}</p>
                      </div>
                      <StatusIcon size={20} className={style.text} />
                    </div>

                    <div className="mb-4 p-3 bg-slate-800/30 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Result</p>
                      <p className={`heading text-lg font-bold ${
                        lab.result === 'Normal' ? 'text-green-400' : lab.result === 'Abnormal' ? 'text-amber-400' : 'text-red-400'
                      }`}>{lab.result}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                      <span>{lab.date}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={14} /> {lab.comments.length}</span>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => setSelectedReport(lab)}
                        className="flex-1 px-3 py-2 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 font-medium text-sm transition-all flex items-center justify-center gap-1">
                        <Eye size={14} /> View
                      </button>
                      <button onClick={() => toggleFlag(lab.id)}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                          lab.flagged
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-slate-700/30 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                        }`}>
                        <Flag size={14} className={lab.flagged ? 'fill-current' : ''} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Tests',      value: labs.length,                                        color: 'text-blue-400'  },
              { label: 'Pending Review',   value: labs.filter(l => l.status === 'pending').length,    color: 'text-amber-400' },
              { label: 'Flagged',          value: labs.filter(l => l.flagged).length,                 color: 'text-red-400'   },
              { label: 'Critical Results', value: labs.filter(l => l.status === 'critical').length,   color: 'text-red-500'   },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className={`heading text-2xl ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ViewReportModal report={selectedReport} onClose={() => setSelectedReport(null)} onToggleFlag={toggleFlag} />
      )}
    </div>
  );
}

function ViewReportModal({ report, onClose, onToggleFlag }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments]     = useState(report.comments);
  const style = statusStyles[report.status];

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { author: 'Dr. Khalil', text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-fade">
        <div className={`sticky top-0 p-6 border-b border-slate-700 flex items-start justify-between ${style.bg}`}>
          <div>
            <h2 className="heading text-2xl text-white mb-1">{report.testName}</h2>
            <p className="text-slate-300">{report.patientName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${style.bg} ${style.border} border`}>
              <p className="text-slate-400 text-sm mb-2">Status</p>
              <p className={`heading text-lg ${style.text}`}>{style.label}</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700">
              <p className="text-slate-400 text-sm mb-2">Test Date</p>
              <p className="text-white font-semibold">{report.date}</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-700/20 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Overall Result</p>
            <p className={`heading text-2xl font-bold ${
              report.result === 'Normal' ? 'text-green-400' : report.result === 'Abnormal' ? 'text-amber-400' : 'text-red-400'
            }`}>{report.result}</p>
          </div>

          <div>
            <h3 className="heading text-lg text-white mb-3">Test Values</h3>
            <div className="space-y-2">
              {Object.entries(report.values).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-slate-700/20 rounded-lg border border-slate-700">
                  <span className="text-slate-300">{key}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="heading text-lg text-white mb-3">Comments & Notes</h3>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-slate-400 text-sm italic">No comments yet</p>
              ) : (
                comments.map((comment, idx) => (
                  <div key={idx} className="p-3 bg-slate-700/30 rounded-lg border border-slate-700">
                    <p className="text-sm font-semibold text-teal-400 mb-1">{comment.author}</p>
                    <p className="text-slate-300">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
            <div className="space-y-2">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm resize-none h-20"
                placeholder="Add a comment..." />
              <button onClick={handleAddComment}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-semibold transition-all text-sm">
                Add Comment
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <button onClick={() => onToggleFlag(report.id)}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                report.flagged
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                  : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
              }`}>
              <Flag size={18} className={report.flagged ? 'fill-current' : ''} />
              {report.flagged ? 'Unflag' : 'Flag for Review'}
            </button>
            <button className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-semibold border border-slate-600 transition-all flex items-center justify-center gap-2">
              <Download size={18} /> Download
            </button>
            <button className="flex-1 px-4 py-3 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg font-semibold border border-teal-500/40 transition-all flex items-center justify-center gap-2">
              <LinkIcon size={18} /> Link to Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}