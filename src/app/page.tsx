"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../../public/logo_new.png";

// Components
import TextReveal from "@/components/TextReveal";
import HorizontalMarquee from "@/components/HorizontalMarquee";
import VideoReveal from "@/components/VideoReveal";
import DashboardMockup from "@/components/DashboardMockup";
import MagneticButton from "@/components/MagneticButton";
import CircularTestimonials from "@/components/CircularTestimonials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icons with path animations
const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="animate-path" d="M8 19h8m-8 0a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm-8-4H5a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v2m4 0h-3v4.5M17 9h4l1 4v4h-2"/>
  </svg>
);
const WarehouseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="animate-path" d="M3 21h18M4 21V8l8-5 8 5v13M9 21V12h6v9"/>
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path className="animate-path" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="animate-path" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="animate-path" d="M18 20V10M12 20V4M6 20v-6"/>
  </svg>
);
const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="animate-path" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandSectionRef = useRef<HTMLDivElement>(null);
  const erpSectionRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const visionSectionRef = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refreshST = () => ScrollTrigger.refresh();
    const timerId = setTimeout(refreshST, 500);
    window.addEventListener("resize", refreshST);

    // Bento card mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      document.querySelectorAll('.bento-card').forEach((card: any) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", refreshST);
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Stats counter
      statsRefs.current.forEach((stat) => {
        if (!stat) return;
        const target = parseFloat(stat.getAttribute("data-target") || "0");
        const isPercentage = stat.getAttribute("data-target")?.includes('.');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: brandSectionRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            if (stat) {
              stat.textContent = isPercentage ? obj.val.toFixed(1) : Math.ceil(obj.val).toString();
            }
          }
        });
      });

      // 2. Section fade-up
      const sections = [brandSectionRef.current, erpSectionRef.current, servicesGridRef.current, visionSectionRef.current];
      sections.forEach((section) => {
        if (!section) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true,
          }
        });
        tl.fromTo(section,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );
      });

      // 3. Service cards stagger reveal
      if (serviceCardsRef.current.length > 0) {
        gsap.from(serviceCardsRef.current, {
          y: 50,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesGridRef.current,
            start: "top 75%",
            once: true,
          }
        });
      }

      // 4. Floating CTA card animation
      if (ctaCardRef.current) {
        gsap.to(ctaCardRef.current, {
          y: -12,
          duration: 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // 5. Ghost text parallax
      gsap.to(".ghost-text-parallax", {
        x: "-15%",
        scrollTrigger: {
          trigger: brandSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // 6. Volumetric orb drift
      gsap.to(".orb-drift", {
        y: -80,
        scrollTrigger: {
          trigger: erpSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen text-white overflow-x-hidden">
      {/* ========== SECTION 1: HERO ========== */}
      <VideoReveal />

      {/* ========== SECTION 2: BRAND STATEMENT / INFRASTRUCTURE ========== */}
      <section ref={brandSectionRef} className="relative z-20 -mt-[1px] py-24 md:py-40 px-6 md:px-12 overflow-hidden bg-transparent">

        {/* Ghost text parallax — bigger */}
        <div className="ghost-text-parallax absolute top-1/2 left-0 -translate-y-1/2 text-[clamp(8rem,20vw,25rem)] font-black text-white/[0.012] whitespace-nowrap pointer-events-none select-none z-0 leading-none tracking-tighter">
          SHIPPING · LOGISTICS · INDIA · SHIPPING · LOGISTICS · INDIA ·
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-[55%]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#00ff87]/60" />
                <span className="text-[#00ff87] text-[9px] tracking-[0.45em] uppercase font-bold">
                  Built for Indian Commerce
                </span>
              </div>

              {/* Main heading — huge, thin, gradient */}
              <h2
                className="text-[clamp(3rem,8vw,7rem)] font-[200] leading-[0.95] tracking-[-0.04em] mb-10"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 50%, rgba(0,255,135,0.4) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI-powered shipping<br />
                <span className="text-ghost-outline text-white/40" style={{ WebkitTextFillColor: 'transparent' }}>
                  built for India.
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/50 max-w-[540px] font-light leading-relaxed">
                ShipBridge uses AI to help Indian D2C brands, SMEs, and marketplace sellers ship smarter. Multi-courier allocation, COD management, real-time tracking, and returns — automated from one dashboard.
              </p>
            </div>

            {/* 2×2 Stat Grid — more prominent */}
            <div className="lg:w-[45%] grid grid-cols-2 gap-5 w-full">
              {[
                { target: "0", label: "AI-Powered Shipping Platform", suffix: "", accent: true, text: "ShipBridge" },
                { target: "0", label: "Multi-Courier Automation", suffix: "", accent: false, text: "COD" },
                { target: "0", label: "Real-Time Tracking Dashboard", suffix: "", accent: false, text: "NDR" },
                { target: "0", label: "Smart Returns & RTO Management", suffix: "", accent: true, text: "RTO" },
              ].map((stat, i) => (
                <div key={i} className="card-glow-brand p-6 rounded-xl relative overflow-hidden group backdrop-blur-xl">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,135,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white mb-1 tracking-tight">
                      <span ref={el => { statsRefs.current[i] = el; }} data-target={stat.target}>
                        {stat.text}
                      </span>
                      {stat.suffix}
                    </div>
                    <div className="text-[9px] text-white/30 uppercase tracking-[0.22em] font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section spacer */}
      <div className="relative z-20 h-24" />

      {/* ========== SECTION 3: ERP / AI PLATFORM ========== */}
      <section ref={erpSectionRef} className="relative z-20 py-24 md:py-40 px-6 md:px-12 overflow-hidden bg-transparent">

        {/* Volumetric orbs */}
        <div className="volumetric-orb volumetric-orb-green orb-drift top-[15%] right-[-10%]" />
        <div className="volumetric-orb volumetric-orb-orange orb-drift bottom-[10%] left-[-5%]" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
          <div className="lg:w-1/2">
            <span className="text-[#00ff87] text-[10px] tracking-[0.4em] uppercase font-bold mb-8 block">
              ShipBridge Platform
            </span>
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] font-[200] leading-[1.0] tracking-[-0.04em] mb-8"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 50%, rgba(0,255,135,0.3) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              One dashboard.<br/>Every shipment.
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed max-w-lg font-light">
              Manage every aspect of your shipping from a single AI-powered dashboard — courier selection, label generation, COD tracking, returns, and NDR management. Built for Indian ecommerce.
            </p>
            <ul className="space-y-6 mb-12">
              {[
                "Multi-courier selection and rate comparison",
                "COD order management and remittance tracking",
                "Automated RTO and NDR resolution",
                "Returns and reverse pickup workflow"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white/80 group bg-white/[0.02] px-4 py-3 rounded-xl border border-white/5 backdrop-blur-lg">
                  <div className="w-6 h-6 rounded-full bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] group-hover:bg-[#00ff87]/20 transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-sm tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
            <div className="button-wrap">
              <button className="uiverse-button group">
                <span>Book a Demo</span>
              </button>
              <div className="button-shadow" />
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: MARQUEE ========== */}
      <section className="relative z-20">
        <HorizontalMarquee />
      </section>

      {/* ========== SECTION 6: VISION ========== */}
      <section ref={visionSectionRef} className="relative z-20 py-24 md:py-40 px-6 md:px-12 overflow-hidden bg-transparent">

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <span className="text-[#f97316] text-[10px] tracking-[0.4em] uppercase font-bold mb-8 block text-center">
              Our Mission
            </span>

            <div className="relative">
              {/* Ghost text behind */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[clamp(8rem,20vw,20rem)] font-black text-white/[0.015] select-none whitespace-nowrap leading-none">
                  VISION
                </span>
              </div>

              <div className="relative z-10 text-center">
                <h2
                  className="text-[clamp(2.5rem,5vw,4.5rem)] font-[200] leading-[1.0] tracking-[-0.04em] mb-12"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 50%, rgba(249,115,22,0.3) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  One platform<br/>
                  for Indian commerce.
                </h2>
                <div className="w-24 h-[2px] bg-gradient-to-r from-[#f97316] via-[#00ff87] to-[#f97316] mx-auto mb-12" />
                <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-3xl mx-auto">
                  Shipping in India is complex. Multiple couriers, pincode-level rules, COD reconciliation, and NDR management eat hours every day. ShipBridge uses AI to simplify it — automating courier selection, reducing RTO, and giving your customers real tracking from order to delivery.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section spacer */}
      <div className="relative z-20 h-24" />

      {/* ========== SECTION 7: BOARD OF DIRECTORS ========== */}
      <section className="relative z-20 py-24 md:py-40 px-6 md:px-12 overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto relative z-10 mb-16">
          <span className="text-[#00ff87] text-[10px] tracking-[0.4em] uppercase font-bold mb-6 block text-center">
            Leadership
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text uppercase text-center"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.4))',
            }}
          >
            Board of Directors
          </h2>
        </div>
        <CircularTestimonials
          testimonials={[
            {
              quote: "Shipping in India is fundamentally different. With 19,000+ pin codes, dozens of courier partners, and complex COD reconciliation, Indian D2C brands need a platform built for this reality — not a global solution retrofitted for India.",
              name: "Ashish Joshi",
              designation: "Founder & CFO",
              src: "/directors/ashish.svg",
            },
            {
              quote: "Our AI models are trained on Indian shipping data — pincode-level courier performance, RTO patterns by region, and COD success rates. The result is a platform that doesn't just process shipments: it intelligently decides which courier to use for every single order.",
              name: "Anurag Singh",
              designation: "Chief Technology Officer",
              src: "/directors/anurag.svg",
            },
            {
              quote: "Indian ecommerce is projected to grow to $350B by 2030, but logistics remains the biggest bottleneck. ShipBridge exists to remove that friction — so a D2C brand in Jaipur can ship to a customer in Kohima as easily as they ship within their own city.",
              name: "Prachi Agarwal",
              designation: "Chief Executive Officer",
              src: "/directors/prachi.svg",
            },
          ]}
          autoplay={true}
        />
      </section>

      {/* Section spacer */}
      <div className="relative z-20 h-24" />

      {/* ========== SECTION 8: CTA ========== */}
      <section className="relative z-20 py-24 md:py-48 px-6 md:px-12 overflow-hidden bg-transparent">

        {/* Volumetric orbs */}
        <div className="volumetric-orb volumetric-orb-green" style={{ top: '20%', left: '-10%' }} />
        <div className="volumetric-orb volumetric-orb-orange" style={{ bottom: '20%', right: '-10%' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div ref={ctaCardRef} className="max-w-3xl mx-auto text-center p-12 md:p-20 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,255,135,0.08),transparent)] pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[#00ff87] text-[10px] tracking-[0.4em] uppercase font-bold mb-6 block">
                Get Started
              </span>
              <h2
                className="text-[clamp(2.5rem,5vw,4.5rem)] font-[200] leading-[1.0] tracking-[-0.04em] mb-8"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 50%, rgba(0,255,135,0.3) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ready to simplify<br/>
                shipping across India?
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto mb-12 font-light leading-relaxed">
                Join Indian D2C brands, SMEs, and marketplace sellers using ShipBridge to automate shipping, reduce returns, and delight customers with every delivery.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="button-wrap">
                  <MagneticButton>
                    <Link href="/contact" className="flex items-center">
                      Start Shipping in India <span className="ml-2">→</span>
                    </Link>
                  </MagneticButton>
                </div>
                <div className="button-wrap">
                  <MagneticButton strength={0.2}>
                    <Link href="/franchise" className="flex items-center text-white/60">
                      Become a Delivery Partner <span className="ml-2">→</span>
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: FOOTER ========== */}
      <footer className="relative z-20 py-20 px-6 md:px-12 border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto" style={{ mixBlendMode: 'screen' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block mb-10 opacity-90 hover:opacity-100 transition-opacity" style={{ mixBlendMode: 'unset' }}>
                <Image src={logo} alt="ShipBridge" width={110} height={36} style={{ height: 'auto' }} />
              </Link>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-10 font-light">
                Simplifying shipping for Indian brands. AI-powered multi-courier automation, COD management, real-time tracking, and returns — built for India.
              </p>
              <div className="flex gap-4">
                {[
                  "M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                ].map((d, i) => (
                  <a key={i} href={i === 0 ? "https://linkedin.com/company/shipbridge" : "https://x.com/shipbridge"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-[#00ff87] hover:border-[#00ff87]/30 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={d}/></svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/45 mb-8 font-bold">Platform</h5>
              <ul className="space-y-4">
                {['How It Works', 'Integrations', 'Tracking', 'Pricing'].map(item => (
                  <li key={item}><Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-white/45 hover:text-white/80 transition-colors text-sm font-light">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/45 mb-8 font-bold">Company</h5>
              <ul className="space-y-4">
                {['About', 'Franchise', 'Careers', 'Contact'].map(item => (
                  <li key={item}><Link href={`/${item.toLowerCase()}`} className="text-white/45 hover:text-white/80 transition-colors text-sm font-light">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/40 uppercase tracking-widest font-medium">
            <div>© 2026 ShipBridge. AI-Powered Shipping for Indian Commerce.</div>
            <div className="flex gap-10">
              <Link href="/privacy" className="text-white/40 hover:text-white/80 transition-colors">Privacy</Link>
              <Link href="/terms" className="text-white/40 hover:text-white/80 transition-colors">Terms</Link>
              <Link href="/faq" className="text-white/40 hover:text-white/80 transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
