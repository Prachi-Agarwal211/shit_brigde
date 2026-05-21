"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// SVG Icons matching site style
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);
const AiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <path d="M9 9h6v6H9z" />
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
  </svg>
);
const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16v-4M8 16v-4M3 9l9-6 9 6v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path d="M12 12v6" />
    <path d="M21 9l-9 3-9-3" />
  </svg>
);
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
  </svg>
);

const steps = [
  {
    number: "01",
    title: "Connect Your Store",
    desc: "Integrate your Shopify, WooCommerce, Magento store or use our API. Sync orders in real time with one click. Our setup takes under 15 minutes.",
    icon: <LinkIcon />,
  },
  {
    number: "02",
    title: "AI Selects the Best Courier",
    desc: "Our AI engine analyzes pincode, weight, dimensions, delivery speed, and cost to select the optimal courier — Delhivery, Blue Dart, DTDC, XpressBees, Ecom Express, India Post, and more.",
    icon: <AiIcon />,
  },
  {
    number: "03",
    title: "Generate Labels & Ship",
    desc: "Generate shipping labels, manifests, and forward orders to the courier with one click. Batch processing supports hundreds of orders at once.",
    icon: <PackageIcon />,
  },
  {
    number: "04",
    title: "Real-Time Tracking",
    desc: "Your customers receive tracking links via SMS and email. You monitor all shipments from a unified dashboard with live updates across every courier network.",
    icon: <MapPinIcon />,
  },
  {
    number: "05",
    title: "COD & NDR Automation",
    desc: "COD remittance tracking is handled automatically. NDRs are resolved with smart retry logic, WhatsApp notifications, and actionable insights to reduce RTO.",
    icon: <ZapIcon />,
  },
  {
    number: "06",
    title: "Returns & Reconciliation",
    desc: "Automated reverse pickup scheduling, RTO tracking, and financial reconciliation. Everything you need in one dashboard with export-ready reports.",
    icon: <RefreshIcon />,
  },
];

const features = [
  {
    title: "Multi-Courier Network",
    desc: "Access 10+ courier partners across 29,000+ pincodes. No separate contracts or logins needed.",
  },
  {
    title: "AI-Powered Optimization",
    desc: "Machine learning models predict RTO risk, optimize courier selection, and suggest delivery preferences based on historical data.",
  },
  {
    title: "COD Made Simple",
    desc: "End-to-end COD management — from order capture to remittance tracking and reconciliation. Real-time visibility into your collections.",
  },
  {
    title: "One Dashboard",
    desc: "Orders, tracking, labels, NDR, returns, and reports — all in one place. No more switching between courier portals.",
  },
];

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".steps-grid",
          start: "top 80%",
        },
      });
      gsap.from(".feature-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden text-center">
        <SectionAurora variant="dual" className="opacity-40" />
        <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block relative z-10">
          How It Works
        </span>
        <TextReveal
          text="Ship smarter in minutes"
          elementType="h1"
          className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display relative z-10"
        />
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
          From store connection to doorstep delivery — ShipBridge automates every step of your shipping workflow with AI.
        </p>
      </section>

      {/* Steps */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 bg-[#0a0a0a] overflow-hidden">
        <SectionAurora variant="ember" className="opacity-20" />
        <div className="max-w-5xl mx-auto steps-grid relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card bento-card p-8 relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-6xl opacity-[0.04] font-black select-none pointer-events-none">
                {step.number}
              </div>
              <div className="text-3xl mb-6 text-[#00ff87] w-12 h-12">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-display">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 overflow-hidden">
        <SectionAurora variant="subtle" className="opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 font-display text-center">
            Everything you need
          </h2>
          <p className="text-white/50 text-center mb-16 max-w-lg mx-auto font-light">
            ShipBridge replaces multiple tools and courier portals with one AI-powered platform.
          </p>
          <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card bento-card p-8">
                <h3 className="text-lg font-bold text-white mb-3 font-display">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-32 px-5 md:px-12 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 text-center p-12 md:p-16 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 font-display">
            Ready to simplify shipping?
          </h2>
          <p className="text-white/60 font-light mb-8 max-w-lg mx-auto">
            Join Indian D2C brands and SMEs using ShipBridge to ship smarter every day.
          </p>
          <div className="button-wrap mx-auto inline-flex">
            <Link href="/contact" className="uiverse-button group">
              <span>Book a Demo →</span>
            </Link>
            <div className="button-shadow" />
          </div>
        </div>
      </section>
    </main>
  );
}
