# ShipBridge Website — Complete Optimization Audit & Fix Plan

> **Status:** Full codebase audit completed | **Date:** May 2026 | **Focus:** India-first repositioning, SEO overhaul, content strategy, new sections, modern template upgrades

---

## 1. THE CORE PROBLEM (Read This First)

The website says **"global AI logistics platform"** but the business is **India-first domestic shipping/logistics software**. This mismatch runs through every page, every component, and every line of copy.

### What this costs:
| Problem | Impact |
|---------|--------|
| Indian merchants leave immediately | Nothing speaks to their needs: pincode, COD, RTO, Shopify, Indian couriers |
| SEO is zero | No India-specific keywords on any page |
| Trust is broken | Inconsistent claims (50+ vs 150+ countries), placeholder links, unverified metrics |
| Conversion is near-zero | No India-relevant CTAs, no FAQ, no product clarity |

### What current competitors (Shiprocket, Delhivery, ClickPost) do that we don't:
- Clear India-first positioning from hero section
- Pincode coverage messaging (Shiprocket: "19,000+ unique pin codes")
- Specific audience targeting (D2C, SME, marketplace sellers)
- Feature-led pages for every use case
- FAQ pages with Indian shipping questions
- Integration logos (Shopify, WooCommerce, Meesho, etc.)
- Blog/resource hub for SEO
- Multi-level navigation with Products → Platform → Pricing → Partners → Resources
- Demo CTAs everywhere

---

## 2. THE VISUAL STRUCTURE: WHAT'S ON THE SITE NOW vs WHAT WE NEED

### Current Site Structure:
```
NAV: Home | Services(#) | About | Franchise | Contact

HOMEPAGE:
  1. VideoReveal Hero → "SHIP BRIDGE" wordmark, "// AI-Powered / Global Logistics"
  2. Brand Statement → "We are building the future of trade"
  3. ERP Section → "One platform. Complete control."
  4. HorizontalMarquee → "150+ COUNTRIES", "CUSTOMS AUTOMATION", etc.
  5. Vision → "One operating system for global trade"
  6. Leadership → 3 directors with SVG placeholders
  7. CTA → "Ready to ship beyond borders?"
  8. Footer → Placeholder links everywhere

ABOUT → Global messaging, fake milestones
CONTACT → US phone number, "globally distributed"
FRANCHISE → USD amounts, "global network"

EXISTING PAGES: Home, About, Contact, Franchise, 404
MISSING PAGES: FAQ, Privacy, Terms, How It Works, Integrations, Pricing, Services, Blog, Tracking, Security, Careers
```

### What We Need to Build:
```
NAV: Home | Services | Products | About | Franchise | Contact | FAQ

HOMEPAGE:
  1. Hero → India-first: "Pan-India Shipping Software", stats fixed
  2. Trust Bar / Partner Logos → NEW
  3. Who We Serve → D2C, SME, Marketplace, B2B → NEW
  4. Core Features Grid → 8 India-specific feature cards → NEW
  5. How It Works → 5-step flow → NEW
  6. Integration Logos → Shopify, WooCommerce, courier partners → NEW
  7. Dashboard Preview → Updated India metrics
  8. Coverage / Pincode Section → NEW
  9. FAQ Accordion → 6-8 questions → NEW
  10. Marquee → India-specific terms
  11. CTA → "Book a Demo"
  12. Footer → Real links

NEW PAGES: FAQ, Privacy, Terms, How It Works, Integrations, Blog
```

---

## 3. EXACT FILE-BY-FILE CHANGES NEEDED

### src/app/layout.tsx — Global Metadata (Line 18-50)

**Change these:**
```typescript
// Line 20: Change domain if different
metadataBase: new URL("https://shipbridge.com"), // or .in domain

// Line 21: REPLACE this
title: "ShipBridge — Global Logistics Solutions"
// WITH
title: "ShipBridge — Pan-India Shipping & Logistics Software"

// Line 22: REPLACE this
description: "Bridging the gap in global logistics..."
// WITH
description: "ShipBridge helps Indian D2C brands, SMEs and marketplace sellers ship faster with multi-courier automation, COD, real-time tracking, returns management and Shopify integration. Built for India."

// Line 24-25: REPLACE openGraph
openGraph: {
  title: "ShipBridge — Pan-India Shipping & Logistics Software",
  description: "Same as above",
  ...
}

// Line 40-42: REPLACE twitter
twitter: {
  card: "summary_large_image",
  title: "ShipBridge — Pan-India Shipping & Logistics Software",
  description: "Same as above",
  ...
}

// ADD after icons (around line 50):
keywords: [
  "logistics software India",
  "pan-India shipping",
  "courier aggregator India",
  "D2C shipping India",
  "COD shipping India",
  "ecommerce shipping platform",
  "multi-courier shipping software",
  "Shopify shipping India",
  "shipment tracking India",
  "logistics platform for SMEs",
],
robots: {
  index: true,
  follow: true,
},
```

### src/components/VideoReveal.tsx — Hero Section

**Line 162 (pill):**
```
CURRENT: "AI · Logistics · Platform · 2026"
REPLACE: "Shipping Software · Pan-India · D2C · SME · COD"
```

**Lines 198-204 (descriptor box):**
```
CURRENT:
  "// AI-Powered"
  "Global Logistics"
REPLACE:
  "// Built for India"
  "Pan-India Shipping"
```

**Lines 212-217 (stats box):**
```
CURRENT:
  "Scope"
  "50+ Countries"
  "AI-Native Platform"
REPLACE:
  "Coverage"
  "Pan-India Shipping"
  "D2C · SME · Marketplace"
```

### src/components/HorizontalMarquee.tsx — Lines 2-11

**Replace ENTIRE items array:**
```typescript
const items = [
  "PAN-INDIA SHIPPING",
  "COD & PREPAID ORDERS",
  "MULTI-COURIER ROUTING",
  "REAL-TIME TRACKING",
  "NDR MANAGEMENT",
  "RETURNS & RTO",
  "SHOPIFY INTEGRATION",
  "24/7 SUPPORT",
];
```

### src/app/page.tsx — Homepage Main (Multiple Sections)

**Section 2 — Brand Statement (Lines 193-253):**

Line 202-204: `"The Infrastructure of Commerce"` → `"Built for Indian Commerce"`
Line 218-221: `"We are building the future of trade."` → `"We are building the shipping layer for Indian commerce."`
Line 224-226: Body copy about "global supply chain, AI-powered routing, predictive demand, borderless fulfillment" → Replace with:
```
ShipBridge connects Indian D2C brands, SMEs, and marketplace sellers to a unified logistics platform. Multi-courier allocation, COD management, real-time tracking, and returns — automated, from one dashboard.
```

Lines 231-250 — **Stats Cards** (Replace ALL):
```
CURRENT: 50+ Countries | 99.9% Uptime | 14k Shipments | 34 Min savings
REPLACE EITHER (a) Remove entirely and show features, or (b) Replace with honest copy:
  "Pan-India" + "Coverage across Indian pincodes"
  "99.9% Uptime" → SLA available on request
  "14k+" → Growing network — join our early partners
  "34 Min" → Faster order processing
```

**Section 3 — ERP/Platform (Lines 260-312):**

Line 268: `"ShipBridge OS"` → `"ShipBridge Platform"`
Line 271-279: `"One platform. Complete control."` → `"One dashboard. Every shipment. Across all your couriers."`
Line 282-284: Body about "ERP suite, high-performance dashboard, Built for scale" → Replace:
```
Manage every aspect of your shipping from a single dashboard — courier selection, label generation, COD tracking, returns, and analytics.
```

Lines 286-293 — **4 feature bullets** Replace:
```
CURRENT:
  "AI-driven route optimization"
  "Automated customs & tax filing"
  "Real-time inventory synchronization"
  "Predictive demand analytics"
REPLACE:
  "Multi-courier selection and rate comparison"
  "COD order management and remittance tracking"
  "Automated RTO and NDR management"
  "Returns and reverse pickup workflow"
```

Line 301: `"Request Early Access"` → `"Book a Demo"`

**Section 5 — Vision (Lines 320-358):**

Lines 345-348: `"One operating system for global trade."` → `"One platform for Indian commerce."`
Lines 350-352: Vision copy → Replace entire paragraph:
```
Shipping in India is complex. Multiple couriers, pincode-level rules, COD reconciliation, return fraud, and NDR management eat hours every day. ShipBridge makes it simple — automate your shipping decisions, reduce RTO, and give your customers real tracking from order to delivery.
```

**Section 7 — CTA/Card (Lines 407-456):**

Line 431-432: `"Ready to ship beyond borders?"` → `"Ready to simplify shipping across India?"`
Lines 434-436: Body → `"Join Indian D2C brands, SMEs, and marketplace sellers already using ShipBridge to automate their shipping, reduce returns, and delight customers."`
Line 441: `"Start Shipping"` → `"Start Shipping in India"`
Line 447: `"Become a Partner"` → `"Become a Delivery Partner"`

**Section 8 — Footer (Lines 458-511):**

Line 467-468: Footer tagline → `"Simplifying shipping for Indian brands. Multi-courier automation, COD management, real-time tracking, and returns — built for India."`
Line 483-488: Platform links → Replace with: `["How It Works", "Integrations", "Tracking", "Pricing"]`
Line 504-508: Legal links → Link to real pages
Line 503: `"© 2026 ShipBridge Inc. Precision Global Logistics."` → `"© 2026 ShipBridge. Simplifying shipping for Indian brands."`
Lines 470-477: Social links — Link to real profiles or remove

### src/app/about/page.tsx — About Page

**Line 25-35 — Hero Copy:**
```
CURRENT: "We are building the critical infrastructure that empowers modern commerce..."
REPLACE: "We are building the logistics layer that Indian brands deserve. ShipBridge started with one question: why is shipping in India still so hard? We set out to fix it — smarter courier selection, automated returns, real tracking, and a platform that grows with your business."
```

**Line 39-45 — Image Placeholder:**
Replace `"GLOBAL ROUTE NETWORK / CONNECTING THE WORLD"` with a real product screenshot or India coverage map.

**Lines 63-68 — Timeline Milestones:**
```
CURRENT → REPLACE WITH:
  "2026: Founded" → "2026: Founded — built to fix Indian domestic shipping"
  "Q2 2026: AI Platform Launch" → "Q2 2026: Beta launch for Indian D2C brands"
  "Q3 2026: 50+ Countries" → "Q3 2026: Pan-India courier network integration"
  "Q4 2026: ShipBridge ERP" → "Q4 2026: Full platform with COD, RTO, NDR"
  "2027+: Global Expansion" → "2027+: Deep India coverage + franchise expansion"
```

**Lines 93-109 — Leadership:**
Replace `"Coming Soon"` placeholders with real names/photos.

### src/app/contact/page.tsx — Contact Page

**Line 35:** `"We operate remotely across the globe."` → `"Our support team is available during Indian business hours to help you ship smarter."`

**Line 54:**
```
href="tel:+18007447273" → href="tel:+91XXXXXXXXXX"
"+1 (800) SHIP-BRD" → "+91 XXXX-XXXXXX"
```

**Line 62-63:**
```
"Remote-first, globally distributed"
"Operating in 50+ countries"
→
"India-based operations"
"Serving D2C brands, SMEs, and sellers across India"
```

**Lines 68-93:** Replace "Global Network" visual with India map or remove.

### src/app/franchise/page.tsx — Franchise Page

**Line 70:** `"Franchise with ShipBridge"` → `"Become a ShipBridge Delivery Partner in India"`
**Line 76:** `"Join a global network of logistics entrepreneurs..."` → `"Own a delivery franchise in your city. We provide the technology, training, and courier network. You run the operations."`

**Line 85:** `"200+ active franchise locations globally"` → Use honest India-specific language.

**Line 166-169 — Investment amounts:**
```
CURRENT:
  "$50K - $100K"
  "$100K - $250K"
  "$250K+"
REPLACE:
  "₹5L - ₹10L"
  "₹10L - ₹25L"
  "₹25L+"
```

**Line 138:** `placeholder="+1 (555) 000-0000"` → `placeholder="+91 XXXXX XXXXX"`
**Line 140:** `"City / Country"` → `"City / State"`
**Line 143:** `placeholder="London, UK"` → `placeholder="Mumbai, Maharashtra"`

**ADD new form fields:**
- GST Number (optional)
- Business Type (dropdown: Individual / Partnership / Pvt Ltd / LLP)
- Years in logistics in India

---

## 4. NEW SECTIONS TO ADD TO HOMEPAGE (page.tsx)

### 4a. Integration Logos (insert after hero or after brand section)

```tsx
// NEW COMPONENT: src/components/IntegrationLogos.tsx
// Simple row of partner logos: Shopify, WooCommerce, Meesho, Amazon, Flipkart
// For now use grayscale SVG placeholders with labels
// Label planned integrations as "Coming Soon"
```

Place this after the VideoReveal hero (before Section 2).

### 4b. Who We Serve (insert after Integration Logos)

```tsx
// NEW COMPONENT: src/components/WhoWeServe.tsx
// 4-5 cards for: D2C Brands, SMEs, Marketplace Sellers, B2B, Franchise Partners
// Each card: audience label + 1-2 sentences of benefit copy
```

**Copy for each card:**
| Audience | Copy |
|----------|------|
| D2C Brands | Ship directly to your customers across India. COD, prepaid, tracking, and returns from one dashboard. |
| SMEs & Growing | Affordable multi-courier shipping without minimum volume. Scale as you grow. |
| Marketplace Sellers | Manage Meesho, Amazon, Flipkart orders in one place. Bulk label printing included. |
| Wholesale & B2B | Multi-city bulk dispatch, weight-based pricing, COD reconciliation, GST invoicing. |
| Franchise Partners | Run a ShipBridge franchise in your city. Technology + training + exclusive territory. |

### 4c. Core Features Grid (replace or supplement current ERP section)

```tsx
// NEW COMPONENT: src/components/FeaturesGrid.tsx
// 8-card grid: Multi-Courier, COD, Tracking, Returns, NDR, Labels, API, Analytics
```

| Feature | Benefit |
|---------|---------|
| Multi-Courier Allocation | Compare rates across couriers, auto-assign best per order |
| COD Order Management | Accept COD orders, track remittance to your account |
| Real-Time Tracking | All orders on one screen. Customers get SMS/email updates |
| Returns & Reverse Pickup | Process returns without calling each courier separately |
| NDR Management | Handle non-delivery reports in bulk — reattempt or RTO in one click |
| Label Generation | Bulk shipping labels, print-ready PDFs for all couriers |
| Shopify & API Integration | Connect store in minutes, orders sync automatically |
| Analytics & Reports | Delivery rates, RTO %, COD vs prepaid split, courier performance |

### 4d. How It Works (insert after features grid)

```tsx
// NEW COMPONENT: src/components/HowItWorksFlow.tsx
// 5 steps: Connect Store → Import Orders → Assign Courier → Ship & Track → Manage Returns
```

**Desktop:** Horizontal flow with scroll animation
**Mobile:** Vertical stack

### 4e. FAQ Accordion (insert after vision or before CTA)

```tsx
// NEW COMPONENT: src/components/FAQAccordion.tsx
// Server-rendered HTML, CSS-controlled show/hide (not JS-hidden from crawlers)
// 8 questions on homepage, full 15 on /faq page
```

**8 Homepage Questions:**
1. Do you support pan-India shipping?
2. Which courier partners does ShipBridge work with?
3. Do you offer COD shipping?
4. How are returns and RTO handled?
5. Can I integrate my Shopify store?
6. Do you support bulk order upload and label generation?
7. Is customer support available during Indian business hours?
8. Can small businesses and startups use ShipBridge?

### 4f. Pincode Serviceability Widget (future, Month 2)

A form where visitor enters pickup pincode + delivery pincode → shows if serviceable. Even a basic "Contact us for serviceability" version builds trust. This is one of the highest-converting elements on Indian logistics sites.

---

## 5. NEW PAGES TO BUILD

### 5a. /faq — FAQ Page (CRITICAL, do first after link fixes)

Full page with 15+ India-specific shipping questions using FAQPage schema markup.

**Questions (SEO-optimized):**
1. Do you support pan-India shipping and delivery?
2. Which courier partners does ShipBridge work with?
3. Do you offer COD (Cash on Delivery) shipping?
4. How are returns and RTO handled?
5. Can I integrate my Shopify store with ShipBridge?
6. Do you support WooCommerce and custom API integration?
7. How do pickup requests work — do you come to my warehouse?
8. Can I track all shipments from a single dashboard?
9. Do you support bulk order upload and label generation?
10. What KYC documents are needed to start shipping?
11. How are shipping charges calculated?
12. What is NDR management and do you support it?
13. Is customer support available during Indian business hours?
14. Can small businesses and startups use ShipBridge?
15. Do you offer franchise or delivery partner opportunities in India?
16. Do you support GST invoices and COD remittance reports?

### 5b. /privacy — Privacy Policy (CRITICAL — link exists but goes to #)

Write a real privacy policy covering: data collection, usage, cookies, third-party sharing, user rights, India IT Act compliance, GDPR if relevant, contact info.

### 5c. /terms — Terms of Service (CRITICAL — link exists but goes to #)

Write real ToS covering: service description, user obligations, payment terms, liability, dispute resolution, India jurisdiction.

### 5d. /how-it-works — How It Works (HIGH)

Full 5-step flow page with detailed explanations. Each step gets its own section with screenshot/illustration.

### 5e. /integrations — Integration Partners (HIGH)

List all integrations: Shopify, WooCommerce, custom API, marketplace connectors. For each: logo, description, setup guide link.

### 5f. /services — Services Page (HIGH — nav link exists but goes to #)

A proper services overview page with all service categories and links to detail pages.

### 5g. /blog — Blog/Resources (MEDIUM — for SEO)

Start with 8 articles (see SEO section below).

---

## 6. SEO COMPLETE PLAN

### 6a. Per-Page Metadata (Every page needs unique metadata)

| Page | Title Tag | Meta Description |
|------|-----------|-----------------|
| Home / | ShipBridge — Pan-India Shipping & Logistics Software | ShipBridge helps Indian D2C brands, SMEs and marketplace sellers... |
| About /about | About ShipBridge — Pan-India Shipping Platform | Learn how ShipBridge is building the logistics layer for Indian brands... |
| Contact /contact | Contact ShipBridge — Get in Touch | Reach out to ShipBridge for pan-India shipping software, COD solutions... |
| Franchise /franchise | ShipBridge Franchise — Delivery Partner India | Become a ShipBridge delivery partner in India. Own a logistics franchise... |
| FAQ /faq | Shipping FAQ India — COD, RTO, Tracking Answers | Find answers about pan-India shipping, COD management, RTO handling... |
| How It Works /how-it-works | How ShipBridge Works — 5-Step Shipping Platform | Learn how to connect your store, import orders, assign couriers... |
| Integrations /integrations | Shop & Courier Integrations — ShipBridge | Connect Shopify, WooCommerce and more to ShipBridge for automated... |

### 6b. Keyword Targets by Page

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| / | logistics software India, pan-India shipping platform | shipping aggregator India, D2C shipping India |
| /faq | shipping FAQ India, COD shipping India | RTO meaning, NDR management, reverse pickup India |
| /how-it-works | how to ship products online India | courier booking software, multi-courier dashboard |
| /integrations | Shopify shipping integration India | WooCommerce courier plugin, shipping API India |
| /blog/rto-guide | how to reduce RTO in India | ecommerce RTO management, return to origin rate |
| /blog/cod-guide | COD shipping India | cash on delivery management, COD remittance |
| /blog/ndr-guide | NDR management ecommerce India | non delivery report logistics |

### 6c. Schema Markup to Add

**Organization Schema** — on homepage:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ShipBridge",
  "url": "https://shipbridge.com",
  "description": "Pan-India shipping software for D2C brands, SMEs and marketplace sellers.",
  "areaServed": "India",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  }
}
```

**FAQPage Schema** — on /faq page — include all 15+ questions/answers as structured data.

**BreadcrumbList** — on every sub-page.

### 6d. Content Plan — 8 Blog Articles

| # | Title | Target Keyword | Search Intent |
|---|-------|---------------|---------------|
| 1 | Best Shipping Solution for D2C Brands in India (2026) | D2C shipping India | Comparison/buyer intent |
| 2 | How to Reduce RTO in COD Orders — Complete Guide | reduce RTO India | High volume, pain point |
| 3 | Shopify Shipping Integration in India — Step by Step | Shopify shipping India | Tutorial/how-to |
| 4 | What is NDR Management in Ecommerce Logistics? | NDR management India | Explainer |
| 5 | How to Choose a Courier Aggregator in India | courier aggregator India | Comparison |
| 6 | Pan-India Shipping Challenges for Growing Brands | domestic shipping India | Awareness |
| 7 | COD Shipping in India — Everything Sellers Need | COD shipping India | Explainer |
| 8 | What is Pincode Serviceability and Why It Matters | pincode serviceability India | Educational |

### 6e. Technical SEO Fixes

- [ ] Add sitemap.xml (Next.js auto-generates — verify it includes all pages)
- [ ] Add robots.txt
- [ ] Add Google Analytics 4 or Plausible
- [ ] Submit to Google Search Console
- [ ] Verify all pages return 200, not 404
- [ ] Check Core Web Vitals (MeshGradient shader may hurt LCP)
- [ ] Each page must have exactly ONE H1
- [ ] Image alt text on every image

---

## 7. DESIGN UPGRADE NOTES (Modern + New Age)

### What to KEEP:
- MeshGradient animated background (distinctive, modern)
- GSAP scroll animations + text reveal effects
- Lenis smooth scroll (premium feel)
- Bento card glass UI style
- Floating pill header that becomes rounded on scroll
- Preloader animation

### What to CHANGE:
| Element | Change |
|---------|--------|
| Video Hero | Keep video, change text overlay |
| Stats Counters | Remove or make honest |
| Dashboard Mockup | Change metrics from "Customs Clearance" → "COD Orders", "RTO Rate" |
| Marquee Ticker | Already covered — replace all items |
| Leader Images | Replace SVG placeholders with real photos |
| Social Links | Link to real profiles |
| Color accent | #00ff87 is fine, consider #00E67A for body text |

### New "New Age" Elements to Add:
1. **Sticky section navigation** — as user scrolls through features, a nav shows current section
2. **Animated metric counters** — only for REAL metrics, scroll-triggered
3. **Interactive product mockup** — scrolling through features triggers changes in a sticky dashboard preview
4. **Integration carousel** — auto-scrolling logo strip
5. **Testimonial cards** — once real customers exist, use real quotes with photos
6. **Case study cards** — problem → solution → results format
7. **Live demo calendar embed** — Calendly or similar for booking demos
8. **WhatsApp chat widget** — common on Indian ecommerce sites

### Don't Do:
- Flashy abstract tech visuals without substance
- Repeating ticker buzzwords that mean nothing
- "Future of trade" copy that doesn't explain the product
- Fake metrics

---

## 8. IMPLEMENTATION ROADMAP

### Week 1 — Critical Fixes (Trust Damage Control)
1. Fix metadata in layout.tsx — India-first title/description
2. Fix 50+ vs 150+ countries contradiction in VideoReveal + Marquee
3. Fix all placeholder footer links (#) — either build pages or remove
4. Remove or qualify ALL unverified metrics from stats cards and DashboardMockup
5. Fix "Request Early Access" → "Book a Demo" (removes maturity conflict)
6. Fix US phone number in contact page → Indian format
7. Fix USD amounts in franchise page → INR
8. Create /privacy page with real Privacy Policy
9. Create /terms page with real Terms of Service

### Week 2 — Content Repositioning
1. Rewrite VideoReveal.tsx descriptor and stats to India-first
2. Rewrite brand section copy (page.tsx lines 218-226)
3. Rewrite ERP section copy and feature bullets (page.tsx lines 268-301)
4. Rewrite vision section copy (page.tsx lines 345-352)
5. Rewrite CTA section copy (page.tsx lines 431-447)
6. Rewrite HorizontalMarquee.tsx items array
7. Rewrite About page hero, timeline (about/page.tsx)
8. Rewrite Contact page location, phone (contact/page.tsx)
9. Rewrite Franchise page headline, form, investment (franchise/page.tsx)
10. Update footer tagline and links

### Week 3 — New Sections & Pages
1. Build Integration Logos section on homepage
2. Build Who We Serve cards section on homepage
3. Build Core Features Grid (8 cards) on homepage
4. Build How It Works 5-step flow on homepage
5. Build FAQ accordion section on homepage (6 questions)
6. Build full /faq page with 15+ questions + FAQPage schema
7. Build /services section or page

### Week 4 — SEO Infrastructure
1. Create src/app/sitemap.ts
2. Create src/app/robots.ts
3. Add per-page metadata to all pages
4. Add Organization + FAQPage schema markup
5. Set up Google Search Console + submit sitemap
6. Add Google Analytics 4
7. Build /how-it-works page
8. Build /integrations page
9. Write + publish first 2 blog articles (RTO guide, D2C guide)

### Month 2 — Growth
1. Build Pincode Serviceability checker widget
2. Build Courier Partner section with real logos
3. Build /pricing page
4. Add D2C, SME, Marketplace solution pages
5. Publish remaining 6 blog articles
6. Add real client testimonials/logos (once onboarded)
7. Replace director SVGs with real photos
8. Fix social media links to real profiles
9. Add live chat / WhatsApp widget

---

## 9. PINCODE EXPLANATION

**Why pincode matters for an India logistics site:**

- Shipping in India is sold at the **pincode level**, not city/state level
- One city may have varying serviceability by pincode for pickup, delivery, COD
- Major competitors (Shiprocket: "19,000+ unique pin codes", Delhivery: pincode checker) make this a core feature
- Buyers think: "Can you pick up from MY pincode? Deliver to MY customer's pincode?"
- A pincode checker widget is one of the highest-converting elements on Indian logistics sites

**What to show (at minimum):**
- "Check serviceability by pincode" form
- "Coverage across 10,000+ pincodes" (if true)
- "COD availability varies by pincode — check yours"
- Mention in FAQ: "How do I check if my pincode is serviceable?"

---

## 10. KEY PHRASES — STOP/START USING

| STOP Using | START Using |
|------------|-------------|
| Global Logistics | Pan-India Shipping |
| 50+ Countries / 150+ Countries | Coverage across Indian pincodes |
| Borderless Fulfillment | Domestic shipping automation |
| Customs Automation | COD and prepaid order management |
| Predictive Demand Modeling | Smart courier allocation |
| AI-Native Platform | Logistics software built for India |
| The Future of Global Trade | Smarter shipping for Indian businesses |
| Infrastructure of Commerce | Shipping for Indian brands |
| Request Early Access | Book a Demo |
| Globally Distributed | India-based operations |
| +1 (800) SHIP-BRD | +91 XXXX-XXXXXX |
| $50K - $100K Investment | ₹5L - ₹10L Investment |
| Global Route Network | Pan-India Courier Network |

---

## 11. NEW FILES TO CREATE

```
src/components/IntegrationLogos.tsx     — Logo carousel strip
src/components/WhoWeServe.tsx           — Audience cards
src/components/FeaturesGrid.tsx         — 8 feature cards
src/components/HowItWorksFlow.tsx       — 5-step animated flow
src/components/FAQAccordion.tsx         — Expandable FAQ (server-rendered)
src/components/PincodeChecker.tsx       — Serviceability widget (future)
src/app/faq/page.tsx                    — FAQ page with full schema
src/app/privacy/page.tsx                — Privacy Policy page
src/app/terms/page.tsx                  — Terms of Service page
src/app/how-it-works/page.tsx           — How It Works page
src/app/integrations/page.tsx           — Integrations page
src/app/services/page.tsx               — Services page
src/app/blog/page.tsx                   — Blog hub (future)
src/app/sitemap.ts                      — Dynamic sitemap
src/app/robots.ts                       — Robots configuration
```
