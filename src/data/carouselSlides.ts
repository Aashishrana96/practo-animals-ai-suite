import { CarouselSlide } from '../types';

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    type: 'hook',
    badge: '01 / 09 • DEEP DIVE',
    headline: 'India has only 1 vet for every 8,000 animals.',
    subtitle: 'Here is how AI is finally closing the fatal care gap.',
    body: [
      'In human healthcare, India has 1 doctor per 834 citizens.',
      'In veterinary care, the ratio collapses tenfold.',
      'For rural farmers and urban pet parents alike, emergency animal triage has always been a game of Russian roulette.',
      'Until now.'
    ],
    statNumber: '1 : 8,000',
    statLabel: 'Veterinarian-to-animal ratio in India vs 1:1,000 WHO recommended benchmark',
    tag: 'THE CRISIS & THE SHIFT'
  },
  {
    id: 2,
    type: 'problem',
    badge: '02 / 09 • THE BOTTLENECK',
    headline: 'The 3 Fatal Bottlenecks in Traditional Pet & Livestock Care',
    body: [
      '1. Panic Triage Blindness: 78% of pet parents cannot identify early symptoms of GDV (bloat), feline urinary blockage, or parvovirus until organs fail.',
      '2. The Nighttime Black Hole: Over 90% of Indian veterinary clinics close by 8:30 PM. 24/7 trauma hospitals exist only in Tier-1 pockets.',
      '3. Diagnostic Delay: High-end ultrasound and blood chemistry machines sit underutilized because trained veterinary radiologists are rare.'
    ],
    quote: '"By the time a rural dairy cow or an urban dog reaches the clinic, 60% of the critical therapeutic window has already elapsed."',
    tag: 'SYSTEMIC FRICTION'
  },
  {
    id: 3,
    type: 'insight',
    badge: '03 / 09 • BREAKTHROUGH 1',
    headline: 'Instant 24/7 AI Triage via WhatsApp Multimodal Models',
    subtitle: 'From panic at 2 AM to a clinical urgency score in 8 seconds.',
    body: [
      'Pet parents take a 5-second video of an animal breathing heavily or snap a photo of a skin laceration on WhatsApp.',
      'A fine-tuned vision model analyzes chest excursions, gum color (detecting cyanosis/pale shock), and wound depth.',
      'The system returns a triage color code: 🟢 Home Watch, 🟡 Morning OPD, or 🔴 Rush to 24/7 Emergency immediately—with nearest open trauma clinics mapped.'
    ],
    statNumber: '8 Seconds',
    statLabel: 'Average time to triage critical shock on WhatsApp vs 45 min drive to clinic',
    tag: 'PRE-HOSPITAL TRIAGE'
  },
  {
    id: 4,
    type: 'insight',
    badge: '04 / 09 • BREAKTHROUGH 2',
    headline: 'Edge AI Radiology on Smartphone X-Ray Captures',
    subtitle: 'Democratizing ₹50 Lakh veterinary imaging for neighborhood clinics.',
    body: [
      'Most standalone clinics have basic analog X-ray machines but no full-time veterinary radiologist to read tricky bone micro-fractures or heart enlargement.',
      'With computer-vision edge models, vets take a smartphone photo of the illuminated film view-box.',
      'AI detects Canine Hip Dysplasia (Norberg angle calculation) and feline cardiomegaly with 96.2% radiologist concordance in under 30 seconds.'
    ],
    statNumber: '96.2%',
    statLabel: 'Diagnostic concordance between edge computer vision and board-certified vet radiologists',
    tag: 'ACCESSIBLE DIAGNOSTICS'
  },
  {
    id: 5,
    type: 'insight',
    badge: '05 / 09 • BREAKTHROUGH 3',
    headline: 'Predictive Outbreak Heatmaps for Stray & Community Dogs',
    subtitle: 'Eliminating rabies and parvovirus through street-level computer vision.',
    body: [
      'Municipal animal birth control (ABC) and rabies drives have suffered from paper registries and duplicate ear-notch counts.',
      'NGO rescue vans equipped with dashboard cameras run facial recognition on street dogs (analyzing whisker spot patterns and muzzle pigmentation).',
      'Municipal teams instantly see dynamic GIS heatmaps: which ward has low vaccination coverage before an epidemic erupts.'
    ],
    statNumber: 'Zero Rabies',
    statLabel: 'Target achievable across Tier-1 metros when community vaccination density reaches 70%',
    tag: 'COMMUNITY HEALTH MOATS'
  },
  {
    id: 6,
    type: 'insight',
    badge: '06 / 09 • BREAKTHROUGH 4',
    headline: 'Vernacular Voice AI for 80 Million Indian Dairy Farmers',
    subtitle: 'Giving rural livestock owners an expert vet speaking their mother tongue.',
    body: [
      'India is the world’s largest milk producer, yet cattle mortality due to mastitis and foot-and-mouth disease bleeds ₹12,000 Crore annually.',
      'Farmers don’t type text queries. They use voice notes in Hindi, Kannada, Punjabi, and Marathi.',
      'Speech-to-text models parse rural dialects, detect cattle distress vocalizations, and guide farmers on first-aid while alerting local Gomitra paravets.'
    ],
    statNumber: '₹12,000 Cr',
    statLabel: 'Annual livestock economic loss preventable through early vocalization & symptom detection',
    tag: 'RURAL BHARAT IMPACT'
  },
  {
    id: 7,
    type: 'insight',
    badge: '07 / 09 • BREAKTHROUGH 5',
    headline: 'The Ambient AI Scribe: Killing 4 Hours of Vet Burnout',
    subtitle: 'Returning human doctors to what matters: healing animals.',
    body: [
      'The average Indian veterinarian sees 35+ patients per day while wrestling with unstandardized paper records and messy prescriptions.',
      'Ambient microphones listen to the consultation, filtering out barking and meowing.',
      'The AI auto-generates structured SOAP notes (Subjective, Objective, Assessment, Plan), checks drug dosages by animal weight, and sends digital WhatsApp prescriptions to the pet parent.'
    ],
    statNumber: '70% Less',
    statLabel: 'Reduction in paperwork time per patient, letting vets dedicate 8 extra minutes to clinical examination',
    tag: 'CLINICAL PRODUCTIVITY'
  },
  {
    id: 8,
    type: 'future',
    badge: '08 / 09 • THE VERDICT',
    headline: 'AI will not replace Indian veterinarians.',
    subtitle: 'It will empower the top 10% to treat 10x more lives.',
    body: [
      'Healing an animal requires physical palpation, surgical intuition, and profound cross-species empathy that silicon can never replicate.',
      'What AI does replace is the friction: the 2 AM confusion, the missing radiologist, the language barrier, and the admin overhead.',
      'The founders who unite discovery platforms, emergency dispatch, and AI triage will build the definitive healthcare backbone for India’s 300M+ animals.'
    ],
    quote: '"Technology is not here to substitute human empathy; it is here to remove the barriers that prevent empathy from reaching every creature."',
    tag: 'STRATEGIC VISION'
  },
  {
    id: 9,
    type: 'cta',
    badge: '09 / 09 • WHAT TO DO NEXT',
    headline: 'Building or Loving Animals? Join the Movement.',
    subtitle: 'Two ways you can be part of India\'s animal health revolution:',
    body: [
      '🐾 1. Discover verified care on PawPulse: Find 24/7 vets, emergency ambulances, and boarding near you in Bangalore, Mumbai & Delhi.',
      '⚡ 2. Learn to build AI systems like this: Join our Practical AI & Agentic Systems Bootcamp (Cohort 7 starts Nov 23).',
      '📌 Save this carousel for your next pet emergency or AI product brainstorm.',
      '💬 What’s your biggest frustration with pet healthcare in India? Drop your thoughts below!'
    ],
    actionText: 'Swipe back to explore • Bookmark this post • Share with a pet parent',
    tag: 'CALL TO ACTION'
  }
];

export const CAROUSEL_CAPTION = `India has 1 veterinarian for every 8,000 animals. In rural India and busy metros alike, animal healthcare has long been constrained by one brutal factor: emergency response time.

Over the last 12 months, we’ve witnessed a massive inflection point. AI is quietly solving three of the hardest problems in animal care:
1. 24/7 Emergency Triage on WhatsApp (reducing panic response from 45 min to 8 seconds)
2. Edge Radiology for neighborhood clinics without in-house specialists
3. Vernacular Voice Agents enabling dairy farmers in Kannada, Marathi & Hindi to save cattle from mastitis

Here is the truth: AI will never replace a veterinarian's hands or empathy. But veterinary practices and health networks that leverage AI are going to scale care to millions of underserved animals.

Swipe through all 9 slides for the full breakdown! ➡️

What is the single biggest bottleneck you’ve experienced with pet care or veterinary clinics in your city? Let’s discuss in the comments below.

---
#VeterinaryAI #PetTech #PractoForAnimals #IndianStartups #AnimalWelfare #ProductDesign #AIInHealthcare #BuildInPublic #AIEducation #Founders`;

export const REPEATABLE_WORKFLOW_STEPS = [
  {
    step: 'Step 1: Raw Idea Capture',
    tools: 'Telegram Bot / Notion Quick Capture / Audio Memo',
    time: '2 mins',
    description: 'Founder records a 60-second voice note or types a raw thesis (e.g. "Why Indian dairy farmers need vernacular AI triage"). Webhook triggers n8n pipeline immediately.'
  },
  {
    step: 'Step 2: Research & Angle Expansion',
    tools: 'Perplexity API + Claude 3.5 Sonnet',
    time: '3 mins',
    description: 'Perplexity retrieves 3 verified statistical benchmarks (animal ratios, economic loss figures). Claude generates 3 contrarian hook variations and outlines an 8-slide logical narrative arc.'
  },
  {
    step: 'Step 3: Slide Copywriting & Schema Validation',
    tools: 'Claude 3.5 Sonnet (Structured JSON mode)',
    time: '3 mins',
    description: 'Generates strict JSON schema: headline (<45 chars), subheadline, 3 bite-sized bullet points, metric callout, and bottom tag for each slide. Ensures 1080x1350 mobile readability.'
  },
  {
    step: 'Step 4: Layout & Visual Generation',
    tools: 'HTML/CSS Headless Canvas / Canva Bulk Create API',
    time: '2 mins',
    description: 'Hydrates a standardized brand design template (1080x1350px) with high-contrast typography, brand accents, and automatic text-wrap scaling. Generates PNGs and unified PDF.'
  },
  {
    step: 'Step 5: Founder Review & One-Tap Approval',
    tools: 'Slack / Telegram Approval Webhook + Interactive Web UI',
    time: '2 mins',
    description: 'Founder gets a carousel preview carousel on their phone. They can click "Approve" or make a 10-second inline text tweak in the web studio.'
  },
  {
    step: 'Step 6: Multi-Platform Auto-Scheduling',
    tools: 'Buffer / Metricool API',
    time: 'Instant',
    description: 'Approved carousel PDF is scheduled to LinkedIn as a document carousel and PNGs to Instagram Carousel with generated caption and hashtags.'
  }
];

export const TOOL_STACK_COMPARISON = [
  {
    tool: 'Claude 3.5 Sonnet',
    category: 'LLM & Copywriting',
    cost: '$0.03 / carousel (~₹2.50)',
    whyChosen: 'Best-in-class reasoning, superior adherence to character constraints and JSON formatting without robotic cliché language.'
  },
  {
    tool: 'Perplexity Search API',
    category: 'Factual Research',
    cost: '$0.01 / query (~₹0.85)',
    whyChosen: 'Retrieves verified real-time Indian statistics, governmental reports, and citations rather than hallucinating metrics.'
  },
  {
    tool: 'n8n (Self-Hosted on VPS / Cloud)',
    category: 'Workflow Automation',
    cost: '$5 - $20 / month flat',
    whyChosen: 'Visual canvas, zero per-operation execution fees compared to Zapier, full webhook and native code node flexibility.'
  },
  {
    tool: 'HTML5 Canvas / html-to-image',
    category: 'Render Engine',
    cost: 'Free & Open Source ($0)',
    whyChosen: 'Pixel-perfect CSS control, instant browser-side export to PNG/PDF, zero dependency on Canva subscription or API rate limits.'
  },
  {
    tool: 'Metricool / Buffer',
    category: 'Social Scheduling',
    cost: 'Free tier / $18 mo',
    whyChosen: 'Native LinkedIn PDF carousel support, automated first-comment scheduling, and comprehensive engagement analytics.'
  }
];

export const REUSABLE_PROMPTS = {
  research: `You are an elite investigative tech journalist and product strategist specializing in Indian technology ecosystems, healthcare, and animal welfare.

TASK:
Take the founder's raw idea below and conduct rigorous research to uncover 3 contrarian angles and 3 verified quantitative data points.

FOUNDER RAW IDEA:
"{FOUNDER_IDEA}"

OUTPUT REQUIREMENTS:
1. Core Conflict: What is the unseen economic or emotional friction?
2. 3 Verified Statistics: Find or derive real data points (e.g. vet-to-animal ratios, market losses, smartphone penetration).
3. 3 Contrarian Hook Angles:
   - Angle A (Data Shock): Lead with an arresting statistical disparity.
   - Angle B (Emotional Triage): Lead with a high-stakes life-or-death emergency scenario.
   - Angle C (Paradigm Shift): Frame AI not as a replacement, but as an operational multiplier.
4. Target Audience: Urban pet parents vs rural dairy farmers vs early-stage tech founders.`,

  copywriting: `You are the world's top LinkedIn & Instagram carousel copywriter for founders. Your style is punchy, high-signal, zero fluff, and formatted for rapid thumb-stopping engagement on mobile screens.

INPUT RESEARCH:
{RESEARCH_OUTPUT}

TASK:
Write an 8-to-9 slide educational carousel in STRICT JSON format following this exact schema:
[
  {
    "id": 1,
    "type": "hook",
    "badge": "01 / 09 • DEEP DIVE",
    "headline": "Under 48 chars, bold assertion",
    "subtitle": "Clear secondary promise",
    "body": ["Line 1", "Line 2", "Line 3"],
    "statNumber": "Short stat (e.g. 1 : 8,000)",
    "statLabel": "Explanation under 12 words",
    "tag": "Category Tag"
  },
  ...
]

RULES:
- Slide 1: Unignorable hook + visual stat.
- Slide 2: The systemic bottleneck / villain of the story.
- Slides 3-7: 5 concrete, actionable breakdowns (name real tools, mechanisms, workflows).
- Slide 8: The philosophical insight / future outlook.
- Slide 9: Dual Call to Action (Engagement + Platform discovery).
- NO jargon words: eliminate "delve", "testament", "tapestry", "game-changer". Keep sentences under 14 words.`,

  designDirection: `You are an art director specializing in high-converting mobile typography and visual hierarchy for technical carousels (1080x1350 px portrait aspect ratio).

INPUT SLIDE JSON:
{SLIDE_JSON}

TASK:
Provide visual layout rules for rendering this carousel in HTML/CSS:
1. Palette:
   - Background: Deep Obsidian Slate (#0B0F19) or Clean Editorial Cream (#FAF8F5)
   - Primary Text: #FFFFFF or #0F172A (95%+ contrast ratio)
   - Accent 1 (Healthcare Trust): Emerald Mint (#10B981)
   - Accent 2 (Urgency & Data): Vibrant Coral/Amber (#F59E0B)
2. Typography Scale:
   - Headline: Clamp(28px, 4.5vw, 40px), Bold, line-height 1.15
   - Body text: 17px - 19px, line-height 1.5, slate-300
   - Number Callouts: 48px - 64px, Extra Bold JetBrains Mono
3. Spacing & Touch targets:
   - Minimum 64px safe margins on all 4 sides for Instagram UI overlays
   - Generous whitespace: 40% negative space on every slide.`
};

