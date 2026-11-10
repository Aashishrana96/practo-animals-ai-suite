export interface CurriculumModule {
  week: number;
  title: string;
  tagline: string;
  duration: string;
  topics: string[];
  tools: string[];
  project: string;
}

export interface StudentProject {
  id: string;
  title: string;
  creator: string;
  role: string;
  description: string;
  stack: string[];
  metrics: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  outcome: string;
  linkedin: string;
}

export const COURSE_DETAILS = {
  name: "Practical AI & Agentic Systems Bootcamp",
  badge: "Live Cohort 7 • Winter 2024",
  nextBatchDate: "Starts Saturday, Nov 23, 2024",
  duration: "4 Weeks • Live Weekends (Sat & Sun 11 AM - 2 PM IST)",
  commitment: "6 hrs live sessions + 4 hrs lab/week",
  seatsLeft: 8,
  totalSeats: 45,
  satisfactionRate: "4.94 / 5.0 (820+ Alumni)",
  guaranteeDays: 7,
  whatsappDemoLink: "https://wa.me/919876543210?text=Hi%20Admissions%20Team!%20I'd%20like%20to%20reserve%20a%20seat%20for%20the%20Practical%20AI%20Cohort."
};

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    week: 1,
    title: "Foundations of Applied LLMs & Production Prompting",
    tagline: "Move beyond ChatGPT party tricks. Engineer deterministic LLM pipelines.",
    duration: "Week 1 • 6 Hours Live",
    topics: [
      "Structured Output Generation (JSON Schema, Pydantic, Zod)",
      "System Prompt Architecture & Guardrailing against Hallucinations",
      "Dynamic Few-Shot Injection & Token Economics Optimization",
      "Context Window Windowing & Long-Context Needle-in-a-Haystack Search"
    ],
    tools: ["Claude 3.5 Sonnet", "GPT-4o", "OpenRouter", "Cursor", "PromptLayer"],
    project: "Ship an automated JSON Extraction & Classification API that processes messy unstructured medical & invoice records."
  },
  {
    week: 2,
    title: "No-Code & Low-Code Autonomous Workflows (n8n & Make)",
    tagline: "Connect LLMs to the real world: WhatsApp, CRMs, Webhooks & APIs.",
    duration: "Week 2 • 6 Hours Live",
    topics: [
      "Setting up self-hosted n8n workflows with webhook ingestion",
      "Building 2-way WhatsApp Cloud API bots with conversational memory",
      "Dynamic data enrichment with Perplexity & Google Search APIs",
      "Error handling, backoff retries, and token cost budgeting in production"
    ],
    tools: ["n8n", "Make.com", "WhatsApp Cloud API", "Airtable", "Perplexity API"],
    project: "Build an Autonomous Social Media Carousel Engine that turns 1-sentence founder ideas into 10 ready-to-post slides + automated buffer scheduling."
  },
  {
    week: 3,
    title: "Autonomous Agents, Function Calling & MCP Protocols",
    tagline: "Build agents that plan, browse the web, execute code, and self-correct.",
    duration: "Week 3 • 6 Hours Live",
    topics: [
      "Model Context Protocol (MCP) server architecture & custom tool creation",
      "Function Calling & Tool Use in Claude & Gemini",
      "Human-in-the-Loop approval gates for high-stakes actions",
      "Agent evaluation benchmarks: latency, reliability & cost tracking"
    ],
    tools: ["Claude Tool Use", "MCP SDK", "LangChain / LangGraph", "Supabase Vector"],
    project: "Deploy an Autonomous Customer Triage Agent with live vector search that answers user inquiries and books meetings directly into Google Calendar."
  },
  {
    week: 4,
    title: "Full-Stack AI Application Ship Week & Demo Day",
    tagline: "Deploy polished React/Next.js frontends with live AI backends.",
    duration: "Week 4 • 6 Hours Live + Demo Day",
    topics: [
      "Pairing Modern Frontend (Vite/React/Tailwind) with Edge AI APIs",
      "Streaming UI responses with Server-Sent Events (SSE)",
      "Authentication, Rate Limiting & User Token Billing with Supabase",
      "Live Demo Day: Pitch your working capstone to hiring founders and VC angels"
    ],
    tools: ["Vite", "React", "Supabase", "Vercel", "Tailwind CSS"],
    project: "Launch a full-stack, deployed AI SaaS product with auth, live payments, and real users."
  }
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'proj-1',
    title: 'VetPulse AI: WhatsApp Triage for Stray Animal Rescues',
    creator: 'Tanmayee Deshmukh',
    role: 'Product Designer @ HealthTech (Class of Cohort 5)',
    description: 'An automated WhatsApp agent built with n8n and Claude 3.5 that analyzes photos of injured animals, grades urgency (1-5), and pings nearby volunteer foster homes.',
    stack: ['WhatsApp Cloud API', 'Claude 3.5 Sonnet', 'n8n', 'Airtable'],
    metrics: 'Triaged 1,400+ cases with 94% accuracy in 2 months',
    badge: 'Cohort 5 Best Capstone'
  },
  {
    id: 'proj-2',
    title: 'Autocast: Multi-Platform AI Carousel & Video Script Engine',
    creator: 'Akash Deep',
    role: 'Growth Marketer @ B2B SaaS (Class of Cohort 6)',
    description: 'End-to-end automation that monitors industry RSS feeds, extracts contrarian insights, generates 1080x1350 carousel PNGs via Puppeteer HTML canvas, and schedules to LinkedIn.',
    stack: ['Perplexity API', 'Make.com', 'Node.js', 'Canva API'],
    metrics: 'Grew personal LinkedIn from 3.2k to 24.8k impressions/week',
    badge: 'Commercialized as Micro-SaaS'
  },
  {
    id: 'proj-3',
    title: 'DocuChat Legal: Enterprise Indian Contract Intelligence',
    creator: 'Sahil Singhal',
    role: 'Final Year CS Undergrad @ NIT Trichy',
    description: 'Self-hosted RAG pipeline processing 200+ page Indian commercial leases and stamp-duty contracts with precise clause citation and risk flags.',
    stack: ['LangChain', 'Supabase Vector', 'Gemini 1.5 Pro', 'React'],
    metrics: 'Landed ₹18 LPA AI Systems Engineer offer at Razorpay',
    badge: 'Direct Placement'
  }
];

export const MENTORS = [
  {
    name: 'Aaditya Vikram',
    role: 'Lead Instructor & Systems Architect',
    bio: 'Ex-Principal Product Engineer, Founder of 2 bootstrapped AI ventures ($250k ARR). Built agentic automations for Fortune 500 supply chains and consulted for top Indian startups.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    credentials: ['Ex-Swiggy Lead', 'Top 1% AI Consultant', 'Trained 1,200+ Engineers']
  },
  {
    name: 'Dr. Priya Namboodiri',
    role: 'Guest Mentor: Evaluation & Guardrails',
    bio: 'AI Research Scientist & LLM Evaluation specialist. Former visiting researcher at Stanford NLP, working on deterministic guarantees for generative models.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    credentials: ['PhD Stanford NLP', '8+ IEEE Publications', 'Angel Investor']
  }
];

export const PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Self-Paced Explorer',
    price: '₹3,499',
    originalPrice: '₹6,999',
    discount: '50% OFF',
    description: 'For curious builders who want full access to curriculum recordings and project codebases.',
    features: [
      'Lifetime access to all 4 weeks of high-definition session recordings',
      'Production-ready GitHub starter templates (n8n, React, Claude API)',
      '12+ Copy-paste prompt libraries & workflow blueprints',
      'Private Discord community access with peer feedback',
      'Certificate of Completion'
    ],
    isPopular: false,
    cta: 'Get Instant Access'
  },
  {
    id: 'cohort',
    name: 'Live Cohort + Mentorship',
    price: '₹7,999',
    originalPrice: '₹15,999',
    discount: '50% OFF',
    description: 'The complete hands-on experience. Build live alongside mentors, get code reviews, and pitch at Demo Day.',
    features: [
      'Everything in Self-Paced, plus:',
      '16 Hours of Live Interactive Weekend Masterclasses',
      'Weekly 1:1 Code Reviews & Architecture Critiques from Mentors',
      'Build 3 Production AI Systems for your public portfolio',
      'Exclusive Access to Paid API Credits (Claude, OpenAI, Perplexity worth $50)',
      'Live Demo Day pitch to 15+ hiring tech founders & VC investors',
      'VIP WhatsApp accountability group with instructor'
    ],
    isPopular: true,
    cta: 'Reserve Live Cohort Seat'
  },
  {
    id: 'career',
    name: 'Career Fellowship & 1:1 Coaching',
    price: '₹14,999',
    originalPrice: '₹29,999',
    discount: '50% OFF',
    description: 'Guaranteed career acceleration. Personal 1:1 roadmap, resume makeover, and direct referrals to hiring partners.',
    features: [
      'Everything in Live Cohort, plus:',
      '3 Dedicated 1:1 Strategy Sessions directly with Lead Instructor',
      'Complete Resume & LinkedIn Profile overhaul for AI Engineer roles',
      'Direct warm introductions to 8+ funded AI startups looking for talent',
      'Personal capstone architecture design tailored to your career goals',
      '30-Day post-bootcamp on-demand emergency debugging support'
    ],
    isPopular: false,
    cta: 'Apply for Fellowship'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Nikhil R.',
    role: 'Associate Product Manager',
    company: 'CRED',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'The n8n and Claude tool-calling module alone paid for the course 10x over. I built an internal meeting summarizer & Jira ticket generator that saves our team 15 hours every week.',
    outcome: 'Promoted to Lead AI Product Initiatives',
    linkedin: '#'
  },
  {
    id: 't-2',
    name: 'Divya M.',
    role: 'Full Stack Developer',
    company: 'PhonePe',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    quote: 'Every other AI tutorial stops at building a toy chatbot with Streamlit. Here we built real production systems with rate limiting, fallbacks, and WhatsApp webhooks. Unbeatable practical depth.',
    outcome: 'Transitioned to GenAI Tech Lead',
    linkedin: '#'
  },
  {
    id: 't-3',
    name: 'Harish Varma',
    role: 'Founder',
    company: 'LegalPulse',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: 'As a non-technical founder, this gave me the exact mental model to direct my tech team and build our own internal marketing agents without hiring a massive agency.',
    outcome: 'Saved ₹1.8L/month in marketing overhead',
    linkedin: '#'
  }
];

export const FAQS = [
  {
    question: "Do I need a Computer Science degree or heavy Python experience?",
    answer: "No. The course is designed for builders. Basic familiarity with logic, APIs, or modern web tools is helpful, but we cover both No-Code/Low-Code agent building (n8n/Make) and developer-first tool-calling (TypeScript/Python). Non-developers frequently build top-tier capstones."
  },
  {
    question: "What happens if I miss a live weekend session?",
    answer: "Every single session is recorded in 4K with timestamped chapters, downloadable slides, full code repositories, and transcription notes available on your student portal within 2 hours of completion."
  },
  {
    question: "Are API credits included, or do I have to pay for OpenAI/Claude?",
    answer: "We provide $50 worth of bundled API credits for Claude, Perplexity, and OpenAI for all students enrolled in the Live Cohort and Career Fellowship, so you will not incur unexpected expenses while building."
  },
  {
    question: "How does the 7-day 100% money-back guarantee work?",
    answer: "Attend the entire first weekend of live sessions. If you don't feel you learned practical, production-level AI skills worth at least 5x your investment, email us before Monday midnight for an immediate, no-questions-asked 100% refund."
  },
  {
    question: "What kind of projects will I have on my resume by the end?",
    answer: "You will build three production systems: 1) An Autonomous Social Media Carousel & Content Engine, 2) A 2-Way Conversational WhatsApp Triage Agent with Memory, and 3) Your custom Capstone Web Application deployed on a live URL with authentication."
  }
];

