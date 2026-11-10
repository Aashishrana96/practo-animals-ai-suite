import React, { useState } from 'react';
import { 
  COURSE_DETAILS, 
  CURRICULUM_MODULES, 
  STUDENT_PROJECTS, 
  MENTORS, 
  PRICING_TIERS, 
  TESTIMONIALS, 
  FAQS 
} from '../data/courseData';
import { LeadSubmission } from '../types';
import { submitToBackend } from '../utils/dataStore';
import { SubmissionsViewerModal } from '../components/SubmissionsViewerModal';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  ChevronDown, 
  MessageSquare, 
  Code, 
  ExternalLink,
  Laptop,
  Check,
  Zap,
  Target,
  Send,
  X,
  Workflow,
  Download,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AICoursePage: React.FC = () => {
  // Modal State for Lead Capture
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'demo' | 'reserve'>('demo');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState(false);
  
  // Lead Form State
  const [formData, setFormData] = useState<LeadSubmission>({
    fullName: '',
    phone: '',
    email: '',
    interestRole: 'Working Professional / Tech',
    preferredBatch: 'Cohort 7 (Starts Nov 23)',
    source: 'Website Landing Page'
  });

  const [selectedDemoSlot, setSelectedDemoSlot] = useState('Saturday 4 PM IST');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active Curriculum Week Tab
  const [activeWeek, setActiveWeek] = useState(1);

  const handleOpenLeadModal = (mode: 'demo' | 'reserve') => {
    setModalMode(mode);
    setErrorMessage('');
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter both your full name and WhatsApp number.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    await submitToBackend('course_lead', {
      ...formData,
      modalMode,
      selectedDemoSlot,
      submittedAt: new Date().toISOString()
    });

    setIsSubmitting(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsSubmitted(true);
  };

  // Generate calendar invite .ics download
  const downloadCalendarInvite = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CogniShift AI Academy//Live Demo//EN
BEGIN:VEVENT
SUMMARY:Practical AI & Agentic Systems Live Masterclass Demo
DESCRIPTION:Join lead instructors for a 45-min live demo on building autonomous WhatsApp agents and LLM production pipelines.
LOCATION:https://zoom.us/j/sample-cognishift-demo
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CogniShift_AI_Live_Demo.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative pb-24">
      {/* Sticky Top Sub-Navigation Bar */}
      <div className="sticky top-16 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-glow">
              ⚡
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-2">
                <span>CogniShift AI Academy</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                  COHORT 7
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#curriculum" className="hover:text-indigo-400 transition-colors">Curriculum</a>
            <a href="#outcomes" className="hover:text-indigo-400 transition-colors">Projects</a>
            <a href="#mentors" className="hover:text-indigo-400 transition-colors">Instructors</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Tuition</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDatabaseModalOpen(true)}
              className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 flex items-center gap-1"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">DB Inspector</span>
            </button>

            <button
              onClick={() => handleOpenLeadModal('demo')}
              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 min-h-[44px]"
            >
              Free 45-Min Demo
            </button>
            <button
              onClick={() => handleOpenLeadModal('reserve')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow transition-all min-h-[44px] flex items-center gap-1.5"
            >
              <span>Reserve Seat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Cohort Urgency Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white font-semibold">{COURSE_DETAILS.nextBatchDate}</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300 font-bold">Only {COURSE_DETAILS.seatsLeft} of {COURSE_DETAILS.totalSeats} Seats Remaining</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Stop Playing with Prompts. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">
              Build Autonomous AI Systems.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A 4-week, project-first live masterclass for students and young professionals. Master <strong className="text-white">n8n, Claude Tool Calling, WhatsApp AI Agents</strong>, and full-stack AI deployment.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenLeadModal('reserve')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base shadow-glow transition-all hover:scale-105 flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Reserve Your Seat (₹7,999)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleOpenLeadModal('demo')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Book Free Live Demo & Syllabus</span>
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">820+</div>
              <div className="text-xs text-slate-400 mt-1">Alumni Trained</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">4.94 ★</div>
              <div className="text-xs text-slate-400 mt-1">Average Cohort Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">3 Systems</div>
              <div className="text-xs text-slate-400 mt-1">Shipped to Your Portfolio</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-1">7-Day Money-Back Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Core Pillars / Outcomes-Focused Benefits */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Concrete Outcomes</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              Why Traditional AI Courses Fail (And What We Do Differently)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Most courses teach you 20 prompt tricks for ChatGPT. We teach you how to build production systems that run while you sleep.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: '⚡',
                title: 'No-Code Autonomous Agents',
                desc: 'Deploy self-hosted n8n and Make pipelines connecting WhatsApp, Airtable, and Google Sheets into autonomous 24/7 worker bots.'
              },
              {
                icon: '🧠',
                title: 'Deterministic LLM APIs',
                desc: 'Stop random hallucinations. Master JSON schema outputs, system prompt architectures, and structured evaluation with Claude 3.5 Sonnet.'
              },
              {
                icon: '🛠️',
                title: 'MCP & Tool Calling',
                desc: 'Connect AI models directly to SQL databases, web scraping engines, and live email servers via Anthropic Model Context Protocol.'
              },
              {
                icon: '💼',
                title: 'Proof-of-Work Portfolio',
                desc: 'Graduate with 3 live, clickable systems on your GitHub & resume. Pitch your working capstone directly to founders on Demo Day.'
              }
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0F1422] border border-slate-800/80 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="font-extrabold text-white text-base">{p.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Overview (Week-by-Week Accordion/Tabs) */}
        <div id="curriculum" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Curriculum Roadmap</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              4 Weeks. Zero Fluff. Pure Production Code.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every weekend is split into high-density architecture theory and hands-on live coding labs.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Week Selector Tabs */}
            <div className="lg:col-span-4 space-y-2">
              {CURRICULUM_MODULES.map((mod) => (
                <button
                  key={mod.week}
                  onClick={() => setActiveWeek(mod.week)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between min-h-[64px] ${
                    activeWeek === mod.week
                      ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-glow'
                      : 'bg-[#0B0F19] border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono text-cyan-400 font-bold">WEEK {mod.week}</div>
                    <div className="font-bold text-sm text-white mt-0.5 line-clamp-1">{mod.title}</div>
                  </div>
                  <ArrowRight className={`w-4 h-4 flex-shrink-0 ml-2 ${activeWeek === mod.week ? 'text-cyan-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>

            {/* Active Week Detail Card */}
            <div className="lg:col-span-8 bg-[#0F1422] border border-slate-800 rounded-2xl p-6 sm:p-8">
              {(() => {
                const current = CURRICULUM_MODULES.find(m => m.week === activeWeek) || CURRICULUM_MODULES[0];
                return (
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                        <span>{current.duration}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{current.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 italic">{current.tagline}</p>
                    </div>

                    {/* Topics Covered */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Deep-Dive Topics</h4>
                      <ul className="space-y-2">
                        {current.topics.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools taught */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tool Stack Mastered</h4>
                      <div className="flex flex-wrap gap-2">
                        {current.tools.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800 text-cyan-300 font-mono text-xs font-semibold border border-slate-700">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hands-on Project */}
                    <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60">
                      <div className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5 mb-1">
                        <Code className="w-3.5 h-3.5" />
                        <span>Hands-on Week Project</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                        {current.project}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Student Capstone Showcase */}
        <div id="outcomes" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Proof of Work</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              What Students Actually Build
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Real projects shipped by alumni in past cohorts that secured promotions, freelance retainers, and job offers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STUDENT_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl bg-[#0F1422] border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {proj.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-base leading-snug">{proj.title}</h3>
                  <div className="text-xs text-cyan-400 mt-1 font-semibold">{proj.creator}</div>
                  <div className="text-[11px] text-slate-500">{proj.role}</div>

                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">{proj.description}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800">
                  <div className="text-[11px] text-emerald-400 font-bold mb-2">
                    🎯 Impact: {proj.metrics}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {proj.stack.map((s, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentors / Instructors */}
        <div id="mentors" className="scroll-mt-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Learn From Practitioners</span>
            <h2 className="text-2xl font-extrabold text-white mt-1">Lead Instructors & Mentors</h2>
            <p className="text-xs text-slate-400 mt-1">
              No theoretical academics. You are mentored by founders who run production systems daily.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {MENTORS.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0F1422] border border-slate-800 flex flex-col items-center text-center">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/50 mb-4"
                />
                <h3 className="font-extrabold text-white text-lg">{m.name}</h3>
                <div className="text-xs text-cyan-400 font-semibold">{m.role}</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.bio}</p>
                <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                  {m.credentials.map((c, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Tiers & Batches */}
        <div id="pricing" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Transparent Tuition</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              Invest in Practical Skills That Pay For Themselves
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Full 7-day 100% money-back guarantee. If you don't love the first live weekend, get an instant refund.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative transition-all ${
                  tier.isPopular
                    ? 'bg-gradient-to-b from-[#12182D] to-[#0A0D18] border-indigo-500 shadow-glow'
                    : 'bg-[#0F1422] border-slate-800'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{tier.name}</div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">{tier.price}</span>
                    <span className="text-sm text-slate-500 line-through font-mono">{tier.originalPrice}</span>
                    <span className="text-xs font-bold text-emerald-400">{tier.discount}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tier.description}</p>

                  <div className="mt-6 space-y-2.5">
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button
                    onClick={() => handleOpenLeadModal('reserve')}
                    className={`w-full py-3.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all min-h-[44px] ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-glow'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Capture Architecture Flow Diagram */}
        <div className="p-8 rounded-3xl bg-[#0B0F19] border border-indigo-900/50 relative overflow-hidden">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Workflow className="w-4 h-4" />
              <span>Full-Stack Lead Automation Architecture</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              How the Registration & Lead-Capture Engine Works
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Every lead submitted triggers a zero-lag backend automation orchestrated via webhooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
            {[
              {
                step: '1. User Submits Form',
                actor: 'Frontend React Modal',
                desc: '3-field submission with instant client-side validation.'
              },
              {
                step: '2. CRM Sync',
                actor: 'n8n / Airtable Webhook',
                desc: 'Lead logged, tagged with cohort batch & UTM source.'
              },
              {
                step: '3. Instant WhatsApp',
                actor: 'WhatsApp Cloud API',
                desc: 'Sends welcome text + Zoom demo invite in < 4 seconds.'
              },
              {
                step: '4. Calendar Invite',
                actor: 'Google Calendar API',
                desc: 'Auto-generates Google Meet link and sends .ics invite.'
              },
              {
                step: '5. T-24h & T-1h Alert',
                actor: 'Cron Scheduler Node',
                desc: 'Sends automated SMS & WhatsApp reminders prior to demo.'
              }
            ].map((node, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#121829] border border-slate-800 text-left relative">
                <div className="text-[10px] font-mono text-cyan-400 font-bold">{node.step}</div>
                <div className="text-xs font-extrabold text-white mt-1">{node.actor}</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="scroll-mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Frequently Asked</span>
            <h2 className="text-2xl font-extrabold text-white mt-1">Got Questions? We Have Answers.</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="rounded-xl bg-[#0F1422] border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white min-h-[44px]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIndex === idx ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final Conversion CTA Section */}
        <div className="text-center bg-gradient-to-tr from-indigo-950 via-slate-900 to-[#0B0F19] p-8 sm:p-14 rounded-3xl border border-indigo-500/40 relative overflow-hidden shadow-glow">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Transform From an AI Consumer into an AI Builder.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-3">
            Next batch starts {COURSE_DETAILS.nextBatchDate}. Join 820+ engineers and operators building the future of software.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleOpenLeadModal('reserve')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-glow transition-all min-h-[44px]"
            >
              Reserve Seat for Next Cohort
            </button>
            <button
              onClick={() => handleOpenLeadModal('demo')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold min-h-[44px]"
            >
              Book a Free Live Demo
            </button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Admissions CTA */}
      <a
        href={COURSE_DETAILS.whatsappDemoLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-transform hover:scale-105 min-h-[48px]"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold hidden sm:inline">Chat with Admissions</span>
      </a>

      {/* Lead Capture Modal / Thank You View */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0F1422] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold">
                {errorMessage}
              </div>
            )}

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{modalMode === 'reserve' ? 'Cohort Seat Reservation' : 'Book 45-Min Live Demo'}</span>
                </div>

                <h3 className="text-2xl font-black text-white">
                  {modalMode === 'reserve' ? 'Lock Your Cohort 7 Seat' : 'Schedule Your Free Live Demo'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Get full syllabus breakdown, preview course capstones, and ask the lead instructor questions.
                </p>

                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Field 2: WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">WhatsApp Number (For demo link)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Field 3: Current Background / Goal */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Current Role & Goal</label>
                    <select
                      value={formData.interestRole}
                      onChange={e => setFormData({ ...formData, interestRole: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Working Professional / Tech">Working Professional / Tech Engineer</option>
                      <option value="College Student / Fresh Graduate">College Student / Fresh Graduate</option>
                      <option value="Product Manager / Designer">Product Manager / UX Designer</option>
                      <option value="Founder / Solopreneur">Founder / Solopreneur</option>
                    </select>
                  </div>

                  {/* Demo Slot Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Preferred Demo Slot</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Saturday 4 PM IST', 'Sunday 11 AM IST'].map(slot => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedDemoSlot(slot)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                            selectedDemoSlot === slot
                              ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                              : 'border-slate-800 bg-slate-900 text-slate-400'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-glow transition-all min-h-[48px] flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Saving to Database...' : 'Confirm & Get Access'}</span>
                    </button>
                    <p className="text-[11px] text-center text-slate-500 mt-2">
                      Zero spam. Stored in cloud database with instant webhook dispatch.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Thank You State */
              <div className="text-center py-4 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">You're on the Priority List!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. Your registration has been saved to the database. We've reserved your slot for <span className="font-mono text-cyan-300">{selectedDemoSlot}</span>.
                </p>

                {/* Immediate Next Step CTAs */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-2.5 mt-4">
                  <div className="text-xs font-bold text-white">Recommended Next Steps:</div>
                  <button
                    onClick={downloadCalendarInvite}
                    className="w-full py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[44px]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Add Demo Slot to Google Calendar (.ics)</span>
                  </button>
                  <a
                    href="https://chat.whatsapp.com/sample-community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center transition-all min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Join Private WhatsApp Prep Group</span>
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="block w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold text-center transition-all"
                  >
                    Back to Curriculum
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submissions Viewer Modal */}
      <SubmissionsViewerModal
        isOpen={isDatabaseModalOpen}
        onClose={() => setIsDatabaseModalOpen(false)}
      />
    </div>
  );
};
