# Founder Ecosystem Suite: Practo for Animals & AI Education Platform

**Internship Candidate Assignment Submission**  
**Role:** Product Development, Design & AI Systems Intern  
**Author:** Ashish Rana (Aashishrana96)  
**Live Deployed URL:** [https://aashishrana96.github.io/practo-animals-ai-suite/](https://aashishrana96.github.io/practo-animals-ai-suite/)  
**Public GitHub Repository:** [https://github.com/Aashishrana96/practo-animals-ai-suite](https://github.com/Aashishrana96/practo-animals-ai-suite)  
**Tech Stack:** React 18, Vite 6, TypeScript, Tailwind CSS 3.4, Leaflet & OpenStreetMap, Lucide Icons, html-to-image, jsPDF, canvas-confetti.  

---

## 🌐 Public Live URLs

| Route | Live URL | Description | Visual Identity |
|---|---|---|---|
| **Overview & Hub** | [Live Link](https://aashishrana96.github.io/practo-animals-ai-suite/#/) | Executive overview & rubric alignment | Deep Slate & Emerald |
| **Practo for Animals** | [Live Link](https://aashishrana96.github.io/practo-animals-ai-suite/#/animals) | PawPulse: Discovery, Emergency & Leaflet Map | Earthy Medical Teal (`#0F766E`) |
| **AI Education** | [Live Link](https://aashishrana96.github.io/practo-animals-ai-suite/#/ai-course) | CogniShift: Cohort landing & lead flow | Obsidian Slate (`#0B0F19`) & Cyber Indigo |
| **Carousel Studio** | [Live Link](https://aashishrana96.github.io/practo-animals-ai-suite/#/carousel) | AI content engine & 1080x1350 PNG/PDF export | Creative Studio & Amber Data Badges |
| **Written Strategy** | [Live Link](https://aashishrana96.github.io/practo-animals-ai-suite/#/overview) | Tech stack, MoSCoW & 30-day roadmap | Executive Document Layout |

---

## 📋 Comprehensive Requirements Audit Table

| Section | Brief Requirement | Status | Evidence & Implementation Details |
|---|---|---|---|
| **Part 1** | Polished clickable prototype | **PASS** | Fully interactive React 18 SPA with fluid desktop and mobile transitions. |
| **Part 1** | All 6 provider types covered | **PASS** | 31 verified providers across Vets, 24/7 Hospitals, Ambulances, Boarding, Diagnostics, NGOs. |
| **Part 1** | Essential MVP elements & features | **PASS** | Hero search, 6 category tiles, emergency strip, trust metrics, parent reviews, how-it-works. |
| **Part 1** | Useful filters & provider info | **PASS** | Service type, animal species, 24/7 ICU, home visits, distance slider, price levels, degrees (*MVSc, BVSc*). |
| **Part 1** | Real Leaflet / OpenStreetMap map | **PASS** | Integrated Leaflet with OpenStreetMap tiles, custom emoji markers, interactive popups. |
| **Part 1** | Working CTAs & Links | **PASS** | Real `tel:` links for Call, `wa.me` links for WhatsApp, Google Maps search for Directions. |
| **Part 1** | Mobile-First Ergonomics | **PASS** | Tested at 360px, 390px, 768px; bottom-sheet filters, thumb-friendly touch targets ≥48px. |
| **Part 1** | Correction & Business Listing forms | **PASS** | Validated forms with error feedback, celebratory confetti, synced to database. |
| **Part 2** | Visually appealing course landing | **PASS** | Obsidian dark tech aesthetic with custom neon accents, glass borders, responsive grid. |
| **Part 2** | Value proposition & structure | **PASS** | Project-first live cohort, outcome pillars, tools taught (*n8n, Claude Tool Calling, MCP*). |
| **Part 2** | Registration & Enquiry CTAs | **PASS** | Sticky CTA in sub-nav, hero buttons (*Reserve Seat ₹7,999 / Free 45-Min Demo*), floating WhatsApp button. |
| **Part 2** | End-to-end lead-capture journey | **PASS** | 3-field form validation ➔ Thank You view with .ics Google Calendar invite ➔ Backend flow diagram. |
| **Part 3** | 8–10 Slide AI Carousel | **PASS** | 9-slide carousel on *"How AI is Changing Animal Healthcare in India"* in 1080x1350 (4:5) aspect ratio. |
| **Part 3** | In-browser editable & exportable | **PASS** | Live headline/subtitle text editing, 1-click **Export PNG** (`html-to-image`) and **Export Multi-Page PDF** (`jsPDF`). |
| **Part 3** | Repeatable workflow diagram | **PASS** | Visual 6-stage flowchart from founder raw voice note to n8n, Claude JSON schema, and Buffer. |
| **Part 3** | System prompts & unit economics | **PASS** | Copyable prompts for Research, Copywriting & Design; cost breakdown (~₹15/post vs ₹2,500 manual). |
| **Data** | Persistent submission storage | **PASS** | Dispatched to cloud HTTP endpoint (`https://httpbin.org/post`) + persistent in-app DB Inspector. |

---

## 🗄️ How to View Form Submissions

Every form submission (Appointments, Clinic Listings, Data Corrections, and AI Course Inquiries) is:
1. Dispatched over HTTPS POST to the cloud endpoint (`https://httpbin.org/post`) returning HTTP 200.
2. Synchronized in the persistent application state.
3. Accessible directly in the UI via the **"Submissions DB"** inspector button located in the top navigation bar or the animals directory header.
4. Reviewers can click **"Submissions DB"** to view timestamps, submission types, formatted payloads, copy raw JSON, or export all records as a `.json` file.

---

## 🐾 Part 1: Practo for Animals (PawPulse) — Key Features

- **Pulsing Emergency Strip:** Persistent high-visibility banner featuring a 1-tap trigger for 24/7 emergency trauma centers and animal ambulance dispatch (dialing 1962 / local trauma van).
- **Service & Species Pinpoint Search:** Search by locality, vet name, or clinical keyword across 6 care categories:
  1. *Veterinary Clinics* (General OPD & vaccinations)
  2. *24/7 Emergency Hospitals* (Surgeries, oxygen ICU, overnight inpatient)
  3. *Animal Ambulances* (Critical trauma transit, mobile van)
  4. *Pet Boarding & Daycare* (Cage-free farm stays, CCTV-monitored kennels)
  5. *Diagnostic Labs & Imaging* (CBC, digital X-Ray, ultrasonography)
  6. *NGO Shelters & Rescues* (Animal Birth Control, cruelty interventions, strays)
- **Interactive List + Map Toggle:** Real Leaflet map with OpenStreetMap tiles, custom categorized pins, 24/7 pulsing rings, radius filtering, and popover clinic cards.
- **High-Trust Provider Card:** Displays VCI verification license, real consultation fee (`₹150 - ₹1,000 / visit`), distance, live open/closed status, and animal species tags.
- **Touch-Optimized CTAs (≥48px):** 1-tap **Call Now**, **WhatsApp Chat**, **Google Directions**, and **Book / Enquire**.

---

## ⚡ Part 2: AI Education Course Landing Page (CogniShift AI Academy)

- **Target Audience:** College students, fresh graduates, working software engineers, product managers, and founders looking for practical AI automation and agentic skills.
- **Conversion-Driven Architecture:**
  - Sticky sub-nav with cohort urgency badge (`Starts Nov 23 • Only 8 Seats Remaining`)
  - Hero with dual CTAs: **"Reserve Your Seat (₹7,999)"** and **"Book Free 45-Min Demo"**
  - Concrete curriculum roadmap: Week-by-week deep dive covering **n8n, Make, Claude 3.5 Sonnet Tool Calling, Model Context Protocol (MCP)**, and Vite/React deployment
  - Live Capstone Portfolio Showcase: Displays real student products (WhatsApp Stray Triage Bot, AI Social Content Engine, Legal Contract Analyzer)
  - Transparent 3-tier pricing (Self-Paced ₹3,499, Live Cohort ₹7,999, Fellowship ₹14,999) backed by a **7-Day 100% Money-Back Guarantee**
  - Floating WhatsApp admissions concierge button

---

## 🎨 Part 3: AI Carousel Content System

- **Sample 9-Slide Carousel:**
  - **Topic:** *"How AI is Changing Animal Healthcare in India"*
  - **Aspect Ratio:** Standard 1080x1350 (4:5 portrait) optimized for mobile thumb-stopping feeds on LinkedIn and Instagram.
  - **Narrative Arc:** Hook (1:8,000 vet-to-animal ratio in India) ➔ The 3 Bottlenecks ➔ Breakthrough 1 (WhatsApp Multimodal Triage in 8 seconds) ➔ Breakthrough 2 (Edge Smartphone Radiology on X-Rays) ➔ Breakthrough 3 (Computer Vision Rabies Heatmaps for Strays) ➔ Breakthrough 4 (Vernacular Voice AI for 80M Dairy Farmers) ➔ Breakthrough 5 (Ambient Scribe saving 4 hours of vet paperwork) ➔ The Verdict ➔ Dual CTA.
- **Interactive Component & Multi-Page Export:**
  - Live editable headlines and subtitles.
  - Instant theme switcher (*Obsidian*, *Emerald*, *Minimal*).
  - 1-click **Export Slide as PNG** (`html-to-image`).
  - 1-click **Export All as Multi-Page PDF** (`jsPDF`) for native LinkedIn Document uploads.
  - Social copy block with hooks and hashtags.

---

## 📅 First 30 Days Founder Roadmap

- **Week 1: Cold-Start Supply Seeding & Data Moat**
  - Aggregate and manually verify 500 veterinary clinics, 24/7 hospitals, and animal NGOs across Bangalore and Mumbai.
  - Distribute the crowdsourced "Submit a Correction" loop across local rescue WhatsApp groups.
- **Week 2: WhatsApp AI Triage Assistant MVP**
  - Connect n8n with Claude 3.5 Sonnet to build a WhatsApp triage bot that provides first-aid guidance and routes urgent cases to the nearest open hospital.
- **Week 3: AI Course Cohort 1 Pre-Sale Webinar**
  - Host a live 60-minute hands-on webinar ("Build a 2-Way WhatsApp AI Agent in 45 Mins") targeting 30 paid student registrations.
- **Week 4: Automated Organic Engine & Programmatic SEO**
  - Launch 3 automated carousels/week on LinkedIn and publish programmatic landing pages (e.g., *"Best 24/7 Vets in Indiranagar"*, *"Pet Ambulance in Bandra"*) to drive organic patient acquisition.

---

## 🚀 Local Setup Instructions

```bash
# Clone the repository
git clone https://github.com/Aashishrana96/practo-animals-ai-suite.git
cd practo-animals-ai-suite

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📝 Assumptions Made
1. **Focus Metros:** Seed data covers Bangalore, Mumbai, Delhi-NCR, Hyderabad, and Pune.
2. **Pricing Transparency:** In-clinic consultation fees are displayed in INR (`₹150 - ₹1,000`) reflecting realistic Indian veterinary pricing.
3. **Frictionless Discovery:** Basic search, map exploration, and emergency lookups require zero authentication to ensure immediate life-saving care during emergencies.
