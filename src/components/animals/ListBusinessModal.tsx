import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Building2, Stethoscope, ShieldCheck, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitToBackend } from '../../utils/dataStore';

interface ListBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export const ListBusinessModal: React.FC<ListBusinessModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'vet',
    city: 'Bangalore',
    locality: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    consultationFee: '600',
    is24x7: false,
    offersHomeVisit: false,
    animals: ['dog', 'cat'],
    vciRegistrationNumber: '',
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      if (!formData.businessName.trim() || !formData.locality.trim() || !formData.phone.trim()) {
        setErrorMessage('Please fill in practice name, locality, and contact phone.');
        return;
      }
    }
    if (step === 2) {
      if (formData.animals.length === 0) {
        setErrorMessage('Please select at least one animal species treated.');
        return;
      }
    }
    setErrorMessage('');
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step > 1) setStep(step - 1);
  };

  const handleAnimalToggle = (animal: string) => {
    setFormData(prev => {
      const exists = prev.animals.includes(animal);
      return {
        ...prev,
        animals: exists ? prev.animals.filter(a => a !== animal) : [...prev.animals, animal]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vciRegistrationNumber.trim()) {
      setErrorMessage('Please enter the VCI or State Veterinary Council registration number.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    await submitToBackend('clinic_listing', formData);

    setIsSubmitting(false);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    onSubmitSuccess(`Listing application for "${formData.businessName}" saved & synced to database! Verification review in progress.`);
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>PawPulse Provider Network</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">List Your Practice / Business</h3>
          <p className="text-xs text-slate-300 mt-1">
            Reach 45,000+ active pet parents and rescue volunteers in your city.
          </p>

          {/* Stepper indicator */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-teal-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
          <div className="text-[11px] text-teal-300 font-semibold mt-1">
            Step {step} of 3: {step === 1 ? 'Clinic & Location' : step === 2 ? 'Services & Animals' : 'Verification & License'}
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-grow">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Clinic / Hospital / Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Pet Hospital & Trauma Center"
                  value={formData.businessName}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="vet">Veterinary Clinic</option>
                    <option value="hospital">24/7 Multi-Specialty Hospital</option>
                    <option value="ambulance">Pet Ambulance Service</option>
                    <option value="boarding">Pet Boarding / Kennel</option>
                    <option value="diagnostics">Diagnostics & Lab</option>
                    <option value="ngo">Animal Shelter / NGO</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City</label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi-NCR">Delhi-NCR</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Locality / Area</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indiranagar 100ft Road"
                  value={formData.locality}
                  onChange={e => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Ramesh Gupta"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98450 11223"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Animals Treated at Facility</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'dog', label: '🐕 Dogs' },
                    { id: 'cat', label: '🐈 Cats' },
                    { id: 'bird', label: '🦜 Birds / Avian' },
                    { id: 'exotic', label: '🦎 Exotics / Rabbits' },
                    { id: 'livestock', label: '🐎 Large Animals / Cattle' }
                  ].map(a => (
                    <button
                      type="button"
                      key={a.id}
                      onClick={() => handleAnimalToggle(a.id)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all flex items-center justify-between min-h-[44px] ${
                        formData.animals.includes(a.id)
                          ? 'border-teal-500 bg-teal-50 text-teal-900'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span>{a.label}</span>
                      {formData.animals.includes(a.id) && <CheckCircle className="w-4 h-4 text-teal-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Standard OPD Fee (₹)</label>
                  <input
                    type="number"
                    value={formData.consultationFee}
                    onChange={e => setFormData({ ...formData, consultationFee: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp for Pet Parents</label>
                  <input
                    type="text"
                    placeholder="+91 98450 11223"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is24x7}
                    onChange={e => setFormData({ ...formData, is24x7: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    This facility offers 24/7 Overnight Emergency & ICU
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.offersHomeVisit}
                    onChange={e => setFormData({ ...formData, offersHomeVisit: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    We offer Doorstep / Home Visit Veterinary Consultations
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">PawPulse Quality Guarantee</div>
                  <div>Every listed provider is cross-verified against State Veterinary Council registries to safeguard animal wellbeing.</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  VCI / State Veterinary Council Registration Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VCI-2018-KA-10492"
                  value={formData.vciRegistrationNumber}
                  onChange={e => setFormData({ ...formData, vciRegistrationNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Upload Clinic License / Clinic Signboard Photo
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-teal-500 transition-colors bg-slate-50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-700 font-semibold">Click to select file or drag and drop</p>
                  <p className="text-[11px] text-slate-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-all min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-sm min-h-[44px]"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md min-h-[44px]"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving to Database...' : 'Submit for Verification'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
