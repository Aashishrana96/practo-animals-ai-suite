import React, { useState } from 'react';
import { Provider } from '../../types';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitToBackend } from '../../utils/dataStore';

interface BookAppointmentModalProps {
  provider: Provider | null;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  provider,
  onClose,
  onSuccess
}) => {
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState('Dog');
  const [reason, setReason] = useState('General Consultation & Checkup');
  const [appointmentType, setAppointmentType] = useState<'clinic' | 'home'>('clinic');
  const [date, setDate] = useState('Today (ASAP)');
  const [timeSlot, setTimeSlot] = useState('Immediate / Next Available');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!provider) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim() || !parentName.trim() || !parentPhone.trim()) {
      setErrorMsg('Please enter your pet name, your name, and phone number.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    await submitToBackend('appointment_booking', {
      providerId: provider.id,
      providerName: provider.name,
      petName,
      petSpecies,
      reason,
      appointmentType,
      date,
      timeSlot,
      parentName,
      parentPhone,
      fee: provider.consultationFee
    });

    setIsSubmitting(false);
    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.6 }
    });
    onSuccess(`Appointment enquiry for ${petName} saved to database! The clinic desk at ${provider.name} will confirm via WhatsApp.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-teal-900 text-white p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full text-teal-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Fast-Track Pet Appointment</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">{provider.name}</h3>
          <p className="text-xs text-teal-100 mt-1">
            Verified Consultation Fee: <strong className="text-amber-300">₹{provider.consultationFee}</strong> (Pay at clinic / online after visit)
          </p>
        </div>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pet Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Leo / Bagheera"
                value={petName}
                onChange={e => setPetName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Species</label>
              <select
                value={petSpecies}
                onChange={e => setPetSpecies(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="Dog">Dog 🐕</option>
                <option value="Cat">Cat 🐈</option>
                <option value="Bird">Bird 🦜</option>
                <option value="Exotic">Exotic / Rabbit 🦎</option>
                <option value="Livestock">Livestock 🐎</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Visit Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAppointmentType('clinic')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all min-h-[44px] ${
                  appointmentType === 'clinic'
                    ? 'border-teal-600 bg-teal-50 text-teal-900'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                🏥 In-Clinic Visit
              </button>
              <button
                type="button"
                disabled={!provider.offersHomeVisit}
                onClick={() => setAppointmentType('home')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all min-h-[44px] ${
                  appointmentType === 'home'
                    ? 'border-teal-600 bg-teal-50 text-teal-900'
                    : provider.offersHomeVisit
                    ? 'border-slate-200 text-slate-600'
                    : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                🏡 Doorstep / Home Visit {!provider.offersHomeVisit && '(N/A)'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Visit</label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
            >
              <option value="General Consultation & Checkup">General Consultation & Physical OPD</option>
              <option value="Annual Vaccination & Deworming">Annual Vaccination & Deworming</option>
              <option value="Acute Illness (Vomiting, Fever, Diarrhea)">Acute Illness (Fever, Vomiting, Lethargy)</option>
              <option value="Skin, Fur or Allergy Issues">Skin, Fur & Ear Infection</option>
              <option value="Orthopedic / Limping / Trauma">Limping / Joint / Trauma</option>
              <option value="Surgery / Dental Consultation">Surgery / Dental Consultation</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Day</label>
              <select
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Today (ASAP)">Today (ASAP)</option>
                <option value="Tomorrow Morning">Tomorrow Morning</option>
                <option value="Tomorrow Evening">Tomorrow Evening</option>
                <option value="This Weekend">This Weekend</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time Window</label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Immediate / Next Available">Immediate / Next Available</option>
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Parent Name"
                value={parentName}
                onChange={e => setParentName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp Number</label>
              <input
                type="text"
                required
                placeholder="+91 98450 11223"
                value={parentPhone}
                onChange={e => setParentPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving to Database...' : 'Confirm Appointment Request (Free)'}</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              No advance payment needed. Direct coordination with clinic reception.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
