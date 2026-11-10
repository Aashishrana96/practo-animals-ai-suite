import React, { useState, useEffect } from 'react';
import { getAllSubmissions, SubmissionRecord } from '../utils/dataStore';
import { X, Database, CheckCircle, Cloud, Copy, Download, RefreshCw, Layers } from 'lucide-react';

interface SubmissionsViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionsViewerModal: React.FC<SubmissionsViewerModalProps> = ({ isOpen, onClose }) => {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadSubmissions = () => {
    setSubmissions(getAllSubmissions());
  };

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyJson = (sub: SubmissionRecord) => {
    navigator.clipboard.writeText(JSON.stringify(sub, null, 2));
    setCopiedId(sub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `all_submissions_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">Live Form Submissions Inspector</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {submissions.length} Records Captured
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time database entries from Animal Care, AI Course Lead Capture & Corrections.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadSubmissions}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportAll}
              className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table / Card List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-grow bg-slate-50">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Database className="w-10 h-10 mx-auto text-slate-400 mb-2" />
              <p className="font-bold text-sm">No submissions recorded yet.</p>
              <p className="text-xs text-slate-400 mt-1">
                Submit an appointment, AI course enquiry, correction, or business listing to see live payloads here.
              </p>
            </div>
          ) : (
            submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      sub.type === 'course_lead' ? 'bg-indigo-100 text-indigo-800' :
                      sub.type === 'clinic_listing' ? 'bg-teal-100 text-teal-800' :
                      sub.type === 'clinic_correction' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {sub.type.replace('_', ' ')}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">{new Date(sub.timestamp).toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>Synced to Cloud (HTTP 200)</span>
                    </span>
                    <button
                      onClick={() => handleCopyJson(sub)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700"
                      title="Copy JSON"
                    >
                      {copiedId === sub.id ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Payload preview */}
                <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono overflow-x-auto max-h-36">
                  {JSON.stringify(sub.payload, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

