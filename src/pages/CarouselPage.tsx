import React, { useState, useRef } from 'react';
import { 
  CAROUSEL_SLIDES, 
  CAROUSEL_CAPTION, 
  REPEATABLE_WORKFLOW_STEPS, 
  TOOL_STACK_COMPARISON, 
  REUSABLE_PROMPTS 
} from '../data/carouselSlides';
import { CarouselSlide } from '../types';
import { exportElementAsPng, exportSlidesToPdf } from '../utils/exportUtils';
import { 
  Download, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  Workflow, 
  Code2, 
  Clock, 
  DollarSign, 
  Sliders, 
  Eye,
  RefreshCw,
  Share2
} from 'lucide-react';

export const CarouselPage: React.FC = () => {
  // State for slides (editable!)
  const [slides, setSlides] = useState<CarouselSlide[]>(CAROUSEL_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [theme, setTheme] = useState<'obsidian' | 'emerald' | 'minimal'>('obsidian');

  // Touch Swipe support
  const touchStartXRef = useRef<number | null>(null);

  // Export progress states
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState({ current: 0, total: 0 });

  // Clipboard copy state
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedPromptKey, setCopiedPromptKey] = useState<string | null>(null);

  // Slide element references for export
  const activeSlideRef = useRef<HTMLDivElement>(null);
  const hiddenSlidesContainerRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[currentSlideIndex];

  // Live slide editing handlers
  const handleHeadlineChange = (text: string) => {
    setSlides(prev => {
      const copy = [...prev];
      copy[currentSlideIndex] = { ...copy[currentSlideIndex], headline: text };
      return copy;
    });
  };

  const handleSubtitleChange = (text: string) => {
    setSlides(prev => {
      const copy = [...prev];
      copy[currentSlideIndex] = { ...copy[currentSlideIndex], subtitle: text };
      return copy;
    });
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50 && currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else if (diff < -50 && currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
    touchStartXRef.current = null;
  };

  // Export handlers
  const handleExportPng = async () => {
    if (!activeSlideRef.current) return;
    setIsExportingPng(true);
    await exportElementAsPng(activeSlideRef.current, `PawPulse-Carousel-Slide-${currentSlideIndex + 1}`);
    setIsExportingPng(false);
  };

  const handleExportPdf = async () => {
    if (!hiddenSlidesContainerRef.current) return;
    setIsExportingPdf(true);
    
    // Find all hidden slide elements
    const elements = Array.from(
      hiddenSlidesContainerRef.current.querySelectorAll('.export-slide-target')
    ) as HTMLElement[];

    await exportSlidesToPdf(elements, 'AI-Animal-Healthcare-Carousel-Full', (cur, tot) => {
      setPdfProgress({ current: cur, total: tot });
    });

    setIsExportingPdf(false);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(CAROUSEL_CAPTION);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleCopyPrompt = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptKey(key);
    setTimeout(() => setCopiedPromptKey(null), 2500);
  };

  // Theme styling configurations
  const getThemeStyles = () => {
    switch (theme) {
      case 'emerald':
        return {
          bg: 'bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#041D17]',
          cardBorder: 'border-emerald-600/40',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          headline: 'text-white',
          accentText: 'text-emerald-400',
          bodyText: 'text-emerald-100',
          calloutBg: 'bg-emerald-900/40 border-emerald-700/50',
          footerTag: 'text-emerald-400',
        };
      case 'minimal':
        return {
          bg: 'bg-[#FAF8F5]',
          cardBorder: 'border-slate-300',
          badgeBg: 'bg-slate-200 text-slate-800 border-slate-300',
          headline: 'text-slate-900',
          accentText: 'text-teal-700',
          bodyText: 'text-slate-700',
          calloutBg: 'bg-white border-slate-200 shadow-sm',
          footerTag: 'text-teal-800',
        };
      case 'obsidian':
      default:
        return {
          bg: 'bg-gradient-to-br from-[#0B0F19] via-[#0D1322] to-[#060911]',
          cardBorder: 'border-slate-800',
          badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          headline: 'text-white',
          accentText: 'text-cyan-400',
          bodyText: 'text-slate-300',
          calloutBg: 'bg-slate-900/80 border-slate-700/70',
          footerTag: 'text-indigo-400',
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Top Header */}
      <div className="border-b border-slate-800 bg-[#0B0F19] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Content Engine • Component & Export Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              AI Carousel Content Automation Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Turn founder thesis ideas into ready-to-post 1080x1350 LinkedIn & Instagram carousels in under 12 minutes without hiring an agency.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportPng}
              disabled={isExportingPng}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 min-h-[44px]"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>{isExportingPng ? 'Exporting PNG...' : `Export Slide ${currentSlideIndex + 1} PNG`}</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow transition-all flex items-center gap-1.5 min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              <span>{isExportingPdf ? `Rendering PDF (${pdfProgress.current}/${pdfProgress.total})...` : 'Export All as Multi-Page PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Carousel Visualizer & Interactive Editor Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Carousel Canvas Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Slide Navigation Bar */}
            <div className="w-full flex items-center justify-between mb-4 bg-[#0B0F19] p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentSlideIndex === 0}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                  Slide {currentSlideIndex + 1} of {slides.length}
                </span>
              </div>

              {/* Theme Selector */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setTheme('obsidian')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    theme === 'obsidian' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Obsidian
                </button>
                <button
                  onClick={() => setTheme('emerald')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    theme === 'emerald' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Emerald
                </button>
                <button
                  onClick={() => setTheme('minimal')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    theme === 'minimal' ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Minimal
                </button>
              </div>
            </div>

            {/* THE LIVE 1080x1350 CANVASES */}
            <div 
              className="w-full max-w-[460px] shadow-2xl rounded-3xl overflow-hidden border border-slate-700/80 transition-all touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                ref={activeSlideRef}
                className={`w-full aspect-[4/5] ${themeStyles.bg} p-8 sm:p-10 flex flex-col justify-between select-none relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Slide Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🐾</span>
                    <span className="font-mono text-xs font-bold tracking-wider uppercase text-white/90">
                      PawPulse Insights
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${themeStyles.badgeBg}`}>
                    {currentSlide.badge}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 space-y-4 my-auto py-2">
                  <h2 className={`text-2xl sm:text-3xl font-black leading-tight ${themeStyles.headline}`}>
                    {currentSlide.headline}
                  </h2>

                  {currentSlide.subtitle && (
                    <p className={`text-sm sm:text-base font-semibold ${themeStyles.accentText} leading-snug`}>
                      {currentSlide.subtitle}
                    </p>
                  )}

                  {/* Bullet points */}
                  {currentSlide.body && (
                    <div className="space-y-2.5 mt-3">
                      {currentSlide.body.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                          <p className={`leading-relaxed ${themeStyles.bodyText}`}>{item}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stat Callout */}
                  {currentSlide.statNumber && (
                    <div className={`mt-4 p-4 rounded-2xl border ${themeStyles.calloutBg}`}>
                      <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400 tracking-tight">
                        {currentSlide.statNumber}
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium mt-1">
                        {currentSlide.statLabel}
                      </div>
                    </div>
                  )}

                  {/* Quote */}
                  {currentSlide.quote && (
                    <div className="mt-4 p-4 rounded-xl bg-white/5 border-l-4 border-amber-400 italic text-xs sm:text-sm text-slate-200">
                      {currentSlide.quote}
                    </div>
                  )}

                  {/* CTA button placeholder */}
                  {currentSlide.actionText && (
                    <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs text-center shadow-lg">
                      {currentSlide.actionText}
                    </div>
                  )}
                </div>

                {/* Bottom Slide Footer */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className={`font-mono font-bold uppercase tracking-wider ${themeStyles.footerTag}`}>
                    {currentSlide.tag}
                  </span>
                  <span className="text-slate-400 font-medium">
                    Swipe Next ➔
                  </span>
                </div>
              </div>
            </div>

            {/* Slide Dots Indicator */}
            <div className="flex items-center gap-1.5 mt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlideIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlideIndex === i ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Jump to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Live Slide Editor & Caption Copy */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Inline Editor */}
            <div className="p-6 rounded-2xl bg-[#0F1422] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  <span>Live Slide Editor</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Real-time Preview</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Slide Headline
                </label>
                <textarea
                  rows={2}
                  value={currentSlide.headline}
                  onChange={(e) => handleHeadlineChange(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Subtitle / Anchor Hook
                </label>
                <input
                  type="text"
                  value={currentSlide.subtitle || ''}
                  onChange={(e) => handleSubtitleChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="text-[11px] text-slate-500 italic">
                * Edits made here immediately update the canvas on the left and will be captured during PNG and PDF exports.
              </div>
            </div>

            {/* LinkedIn & Instagram Caption Box */}
            <div className="p-6 rounded-2xl bg-[#0F1422] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" />
                  <span>Publish-Ready Social Caption</span>
                </div>
                <button
                  onClick={handleCopyCaption}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCaption ? 'Copied to Clipboard!' : 'Copy Caption'}</span>
                </button>
              </div>

              <div className="max-h-48 overflow-y-auto p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-line">
                {CAROUSEL_CAPTION}
              </div>
            </div>
          </div>
        </div>

        {/* Repeatable Workflow Architecture (Visual Flowchart) */}
        <div className="p-8 rounded-3xl bg-[#0B0F19] border border-slate-800 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Workflow className="w-4 h-4" />
              <span>Automated Production Pipeline</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              The 6-Stage Repeatable AI Carousel Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Designed so the founder never has to manually write copy in Canva or manage a designer. Founder inputs 1 sentence ➔ Automated webhook pipeline creates verified research, structured copy, and styled renders.
            </p>
          </div>

          {/* Workflow Sequence Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REPEATABLE_WORKFLOW_STEPS.map((s, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0F1422] border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-white">{s.step}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      ETA: {s.time}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-indigo-400 font-semibold mb-2">{s.tools}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reusable Prompts Library (Research, Copywriting, Design Direction) */}
        <div className="p-8 rounded-3xl bg-[#0B0F19] border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                <span>Founder Reusable Assets</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Battle-Tested System Prompts
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Prompt 1: Research */}
            <div className="p-5 rounded-2xl bg-[#0F1422] border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs">Stage 1: Research & Angle Expansion</span>
                  <button
                    onClick={() => handleCopyPrompt('research', REUSABLE_PROMPTS.research)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                    title="Copy Prompt"
                  >
                    {copiedPromptKey === 'research' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mb-2">Tool: Perplexity API + Claude 3.5 Sonnet</div>
                <pre className="p-3 rounded-xl bg-slate-900 text-[10px] text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {REUSABLE_PROMPTS.research}
                </pre>
              </div>
            </div>

            {/* Prompt 2: Copywriting */}
            <div className="p-5 rounded-2xl bg-[#0F1422] border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs">Stage 2: Slide-by-Slide Copywriting</span>
                  <button
                    onClick={() => handleCopyPrompt('copy', REUSABLE_PROMPTS.copywriting)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                    title="Copy Prompt"
                  >
                    {copiedPromptKey === 'copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mb-2">Tool: Claude 3.5 Sonnet (JSON Schema Mode)</div>
                <pre className="p-3 rounded-xl bg-slate-900 text-[10px] text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {REUSABLE_PROMPTS.copywriting}
                </pre>
              </div>
            </div>

            {/* Prompt 3: Design Direction */}
            <div className="p-5 rounded-2xl bg-[#0F1422] border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs">Stage 3: Design Layout & Typography</span>
                  <button
                    onClick={() => handleCopyPrompt('design', REUSABLE_PROMPTS.designDirection)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                    title="Copy Prompt"
                  >
                    {copiedPromptKey === 'design' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mb-2">Tool: HTML/CSS Renderer / Canva API</div>
                <pre className="p-3 rounded-xl bg-slate-900 text-[10px] text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {REUSABLE_PROMPTS.designDirection}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Stack Matrix & Cost/Time ROI Analysis */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Tool Stack Table */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0B0F19] border border-slate-800">
            <h3 className="font-black text-white text-lg sm:text-xl mb-4">Recommended Tool Stack & Cost Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="pb-3">Tool</th>
                    <th className="pb-3">Purpose</th>
                    <th className="pb-3">Cost</th>
                    <th className="pb-3">Why Chosen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {TOOL_STACK_COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-3 font-bold text-white">{row.tool}</td>
                      <td className="py-3 text-cyan-400">{row.category}</td>
                      <td className="py-3 font-mono text-emerald-400 font-semibold">{row.cost}</td>
                      <td className="py-3 text-slate-300 leading-snug">{row.whyChosen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Time & Cost ROI Card */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#12182D] to-[#0A0D18] border border-indigo-500/40 shadow-glow space-y-6">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Unit Economics</div>
              <h3 className="text-xl font-extrabold text-white mt-1">Manual vs AI Automated</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-rose-900/40">
                <div className="font-bold text-rose-300 uppercase tracking-wide text-[10px]">
                  Traditional Agency / Freelance Designer
                </div>
                <div className="text-xl font-black text-white font-mono mt-1">₹1,800 - ₹3,500</div>
                <div className="text-slate-400 mt-1">Time to publish: <strong>24 - 48 Hours</strong></div>
                <div className="text-slate-500 text-[11px] mt-0.5">High revision friction, creative fatigue.</div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 border border-emerald-500/50">
                <div className="font-bold text-emerald-300 uppercase tracking-wide text-[10px]">
                  Autonomous AI Pipeline
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">~₹15 / carousel</div>
                <div className="text-slate-300 mt-1">Time to publish: <strong>12 Minutes total</strong></div>
                <div className="text-cyan-300 text-[11px] mt-0.5">99% cost reduction • 10x publication frequency.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden container for rendering all slides during PDF export */}
      <div 
        ref={hiddenSlidesContainerRef}
        style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: '1080px' }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="export-slide-target"
            style={{
              width: '1080px',
              height: '1350px',
              backgroundColor: '#0B0F19',
              color: '#FFFFFF',
              padding: '80px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              boxSizing: 'border-box'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '30px' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '2px' }}>🐾 PAWPULSE INSIGHTS</div>
              <div style={{ fontSize: '24px', fontFamily: 'monospace', color: '#67E8F9', backgroundColor: 'rgba(99,102,241,0.2)', padding: '8px 20px', borderRadius: '40px' }}>
                {s.badge}
              </div>
            </div>

            {/* Body */}
            <div style={{ margin: 'auto 0' }}>
              <h1 style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1.15, marginBottom: '25px' }}>
                {s.headline}
              </h1>
              {s.subtitle && (
                <div style={{ fontSize: '32px', color: '#22D3EE', fontWeight: 700, marginBottom: '35px' }}>
                  {s.subtitle}
                </div>
              )}
              {s.body && s.body.map((b, i) => (
                <div key={i} style={{ fontSize: '26px', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <span style={{ color: '#22D3EE' }}>•</span>
                  <span>{b}</span>
                </div>
              ))}
              {s.statNumber && (
                <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#111827', borderRadius: '24px', border: '2px solid #1F2937' }}>
                  <div style={{ fontSize: '64px', fontWeight: 900, color: '#FBBF24', fontFamily: 'monospace' }}>
                    {s.statNumber}
                  </div>
                  <div style={{ fontSize: '24px', color: '#9CA3AF', marginTop: '10px' }}>
                    {s.statLabel}
                  </div>
                </div>
              )}
              {s.quote && (
                <div style={{ marginTop: '40px', padding: '30px', backgroundColor: 'rgba(255,255,255,0.05)', borderLeft: '8px solid #F59E0B', fontSize: '28px', fontStyle: 'italic' }}>
                  {s.quote}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '30px', fontSize: '24px', color: '#818CF8' }}>
              <span style={{ fontWeight: 800 }}>{s.tag}</span>
              <span style={{ color: '#94A3B8' }}>Swipe Next ➔</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
