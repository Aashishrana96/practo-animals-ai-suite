import React from 'react';
import { 
  FileText, 
  Download, 
  Layers, 
  CheckCircle2, 
  Target, 
  Smartphone, 
  Zap, 
  Calendar, 
  ShieldCheck, 
  Workflow, 
  Compass,
  ArrowRight
} from 'lucide-react';

interface WrittenBriefProps {
  navigate: (route: string) => void;
}

export const WrittenBrief: React.FC<WrittenBriefProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-mono font-bold uppercase mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Submission Brief • 2-Page Strategy Document</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Product Development, Design & AI Systems Internship Strategy
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            A practical roadmap for scaling "Practo for Animals", launching the AI Education ecosystem, and automating high-signal content operations.
          </p>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-slate-800 leading-relaxed text-sm">
        {/* Section 1: Recommended Tools & Architecture */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-teal-800 font-extrabold text-lg">
            <Layers className="w-5 h-5 text-teal-600" />
            <h2>1. Recommended Tools & Technology Stack</h2>
          </div>
          <p className="text-xs text-slate-600">
            To achieve high development velocity without technical debt or enterprise bloat, we recommend an agile, edge-native architecture:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 uppercase text-[11px] text-teal-700">Frontend & Prototype Layer</div>
              <ul className="mt-2 space-y-1.5 text-slate-600">
                <li>• <strong>React 18 + Vite:</strong> Instant HMR, sub-second production builds, tiny bundle size.</li>
                <li>• <strong>Tailwind CSS 3.4:</strong> Strict utility tokens, zero runtime CSS overhead, accessible color contrast.</li>
                <li>• <strong>Lucide Icons:</strong> Consistent 24px iconography with crisp stroke rendering.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 uppercase text-[11px] text-indigo-700">Automation & AI Backend</div>
              <ul className="mt-2 space-y-1.5 text-slate-600">
                <li>• <strong>Self-Hosted n8n:</strong> Webhook orchestration without per-task execution fees.</li>
                <li>• <strong>Claude 3.5 Sonnet:</strong> Industry-standard JSON schema adherence and structured extraction.</li>
                <li>• <strong>WhatsApp Cloud API:</strong> High-open-rate triage and instant demo confirmations in India.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: MVP Feature Prioritization (MoSCoW Matrix) */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg">
            <Target className="w-5 h-5 text-teal-600" />
            <h2>2. Practo for Animals: MVP Feature Prioritization (MoSCoW)</h2>
          </div>
          <p className="text-xs text-slate-600">
            To prevent scope creep and launch a functional product within 14 days, features are strictly segmented:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="font-bold text-emerald-900 uppercase text-[11px]">Must Have (V1 - Current Delivery)</div>
              <ul className="mt-2 space-y-1 text-slate-700">
                <li>✔ Geolocation-based discovery & distance sorting</li>
                <li>✔ 24/7 Emergency trauma and animal ambulance filter</li>
                <li>✔ Transparent verified consultation fees</li>
                <li>✔ 1-tap direct contact (Call, WhatsApp, Google Maps)</li>
                <li>✔ Crowdsourced "Submit a Correction" loop</li>
                <li>✔ 3-step "List Your Business" provider onboarding</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
              <div className="font-bold text-rose-900 uppercase text-[11px]">Won't Have in V1 (Deliberate Trade-Offs)</div>
              <ul className="mt-2 space-y-1 text-slate-700">
                <li>✖ In-app prepayment & escrow (causes booking drops)</li>
                <li>✖ Synchronous video teleconsultation backend</li>
                <li>✖ Heavy SaaS calendar inventory management for clinics</li>
                <li>✖ E-commerce pet medicine / kibble store</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Conversion & CTA Strategy */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2>3. Conversion & CTA Architecture</h2>
          </div>
          <div className="space-y-3 text-xs text-slate-600">
            <p>
              Both products demand distinct conversion psychology:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">🐾 Animal Discovery (High Urgency, Low Trust):</div>
              <p>When a dog has heat stroke, pet parents have zero patience for registration walls. The primary CTA is <strong>"Call Now"</strong> and <strong>"Emergency Ambulances"</strong> in high-visibility crimson. We eliminated user logins for basic search, maximizing trust.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">⚡ AI Education (High Consideration, Proof Seeking):</div>
              <p>Students and professionals need risk reversal. We pair a <strong>"Free 45-Min Live Demo"</strong> low-commitment CTA with a <strong>7-Day 100% Money-Back Guarantee</strong>, backed by concrete portfolio capstone displays rather than vague syllabus bullets.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Mobile-First Ergonomics & Accessibility */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg">
            <Smartphone className="w-5 h-5 text-indigo-600" />
            <h2>4. Mobile-First & Accessibility Approach</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong>Touch Targets &ge; 48px:</strong> All critical CTAs (Call, WhatsApp, Filter chips) strictly adhere to mobile touch guidelines.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong>Bottom-Sheet Filter:</strong> On mobile screens, complex multi-facet filtering pulls up as a thumb-friendly bottom drawer.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong>High Color Contrast:</strong> WCAG AA compliance with dark slate text against warm sand, and vivid emergency accents.
            </div>
          </div>
        </section>

        {/* Section 5: First 30 Days Founder Roadmap */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg">
            <Calendar className="w-5 h-5 text-teal-600" />
            <h2>5. What I'd Build With the Founder in the First 30 Days</h2>
          </div>
          
          <div className="space-y-3 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="font-mono font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">WEEK 1</span>
              <div>
                <strong className="text-slate-900">Cold-Start Supply Seeding & Verification Moat:</strong>
                <p className="text-slate-600 mt-0.5">Scrape and manually verify 500 top-rated veterinary clinics and animal hospitals across Bangalore & Mumbai; deploy the crowdsourced correction loop to active local animal welfare WhatsApp groups.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">WEEK 2</span>
              <div>
                <strong className="text-slate-900">AI WhatsApp Triage Bot Prototype:</strong>
                <p className="text-slate-600 mt-0.5">Deploy an n8n + Claude 3.5 Sonnet WhatsApp assistant that takes pet parent symptom descriptions and suggests whether they need immediate 24/7 ICU vs morning OPD.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="font-mono font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded">WEEK 3</span>
              <div>
                <strong className="text-slate-900">AI Education Cohort 1 Pre-Sale & Webinar Funnel:</strong>
                <p className="text-slate-600 mt-0.5">Host a live Sunday 60-minute masterclass ("Build a 2-Way WhatsApp AI Agent in 45 Mins") using the lead capture flow, targeting 30 paid registrations.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">WEEK 4</span>
              <div>
                <strong className="text-slate-900">Autonomous Content & SEO Pipeline:</strong>
                <p className="text-slate-600 mt-0.5">Automate 3 carousels/week on LinkedIn and publish programmatic SEO landing pages (e.g. "Best 24/7 Vets in Koramangala", "Pet Ambulance Whitefield") to generate free organic discovery traffic.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Interactive Navigation */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate('/animals')}
            className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2"
          >
            <span>Explore Animal Care Prototype</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/carousel')}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
          >
            <span>Inspect AI Carousel Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
