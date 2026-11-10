import React, { useState } from 'react';
import { Provider } from '../../types';
import { X, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { submitToBackend } from '../../utils/dataStore';

interface SubmitCorrectionModalProps {
  provider: Provider | null;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export const SubmitCorrectionModal: React.FC<SubmitCorrectionModalProps> = ({
  provider,
  onClose,
  onSubmitSuccess
}) => {
  const [issueType, setIssueType] = useState('phone');
  const [correctedValue, setCorrectedValue] = useState('');
  const [notes, setNotes] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!provider) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctedValue.trim() || !reporterContact.trim()) {
      setErrorMsg('Please fill in both the corrected value and your contact info.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    await submitToBackend('clinic_correction', {
      providerId: provider.id,
      providerName: provider.name,
      issueType,
      correctedValue,
      notes,
      reporterContact
    });

    setIsSubmitting(false);
    onSubmitSuccess(`Correction for "${provider.name}" saved and synced to database! Verification review in progress.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          aria-label="Close correction modal"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-amber-600 mb-2">
          <AlertCircle className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Crowdsourced Quality</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900">
          Submit a Correction
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Helping India's pet parents get 100% verified data for <span className="font-semibold text-slate-800">{provider.name}</span>.
        </p>

        {errorMsg && (
          <div className="mt-3 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              What needs to be updated?
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="phone">Incorrect Phone Number</option>
              <option value="timings">Outdated Timings or Closed</option>
              <option value="address">Clinic Relocated or Wrong Address</option>
              <option value="fee">Consultation Fee Discrepancy</option>
              <option value="doctor">New Veterinarian / Staff Update</option>
              <option value="emergency">Emergency 24/7 Availability Changed</option>
              <option value="other">Other Information</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Correct Information / What should it be?
            </label>
            <input
              type="text"
              required
              value={correctedValue}
              onChange={(e) => setCorrectedValue(e.target.value)}
              placeholder="e.g. New direct emergency number is +91 80 4115 1060"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Additional Details or Proof (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Visited clinic yesterday; they also offer overnight ICU care now."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Phone / WhatsApp (For quick verification)
            </label>
            <input
              type="text"
              required
              value={reporterContact}
              onChange={(e) => setReporterContact(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-sm flex items-center gap-2 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving to Database...' : 'Submit Update'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
