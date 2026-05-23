"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../../public/logo_new.png";

// Components
import HorizontalMarquee from "@/components/HorizontalMarquee";
import VideoReveal from "@/components/VideoReveal";
import DashboardMockup from "@/components/DashboardMockup";
import MagneticButton from "@/components/MagneticButton";
import CircularTestimonials from "@/components/CircularTestimonials";
import StoryGallery from "@/components/StoryGallery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refreshST = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshST);
    window.addEventListener("resize", refreshST);
    return () => {
      window.removeEventListener("load", refreshST);
      window.removeEventListener("resize", refreshST);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General fade up for all sections
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.fromTo(section, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen text-white bg-transparent">
      
      {/* ========== HERO ========== */}
      <VideoReveal />

      {/* ========== SECTION 2: THE OPERATING SYSTEM (Bento Grid) ========== */}
      <section className="reveal-section relative py-32 px-6 md:px-12 bg-transparent">
        <div className="logistics-grid-fine absolute inset-0 opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-terminal text-[10px] font-bold tracking-[0.4em] mb-4">SYSTEM ARCHITECTURE</span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
              The AI Operating System <br/>for <span className="text-[#00ff87]">Indian Commerce</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl font-light">
              We replaced legacy courier management with a high-frequency automation engine. Built for 19,000+ pincodes and the unique complexity of the Indian market.
            </p>
          </div>

          <div className="bento-grid min-h-[800px]">
            {/* Main Feature - 8/12 cols */}
            <div className="bento-item holo-glass col-span-12 lg:col-span-8 flex flex-col justify-between group bg-white/[0.01]">
              <div className="max-w-md">
                <span className="text-[10px] text-[#00ff87] font-bold tracking-[0.2em] mb-2 block">MODULE 01</span>
                <h3 className="text-2xl font-bold mb-4">Dynamic Carrier Orchestration</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Our neural engine analyzes courier performance, cost, and RTO probability in milliseconds to select the optimal partner for every single shipment.
                </p>
              </div>
              <div className="mt-8 relative h-64 w-full rounded-xl overflow-hidden border border-white/5 bg-black/20">
                <DashboardMockup />
              </div>
            </div>

            {/* Side Feature - 4/12 cols */}
            <div className="bento-item holo-glass col-span-12 lg:col-span-4 flex flex-col justify-between bg-white/[0.01]">
              <div>
                <span className="text-[10px] text-[#f97316] font-bold tracking-[0.2em] mb-2 block">MODULE 02</span>
                <h3 className="text-2xl font-bold mb-4">RTO Mitigation Engine</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Predict and prevent returns before they happen. Our AI identifies high-risk COD orders and automates verification protocols.
                </p>
              </div>
              <div className="mt-12 flex flex-col gap-4">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f97316] w-[84%] shadow-[0_0_10px_#f97316]" />
                </div>
                <span className="text-terminal text-[10px]">SUCCESS RATE: 84.2%</span>
              </div>
            </div>

            {/* Bottom 3 Cols */}
            {[
              { title: "Smart NDR Resolution", desc: "Automated re-attempt orchestration with AI-driven communication.", code: "M-03" },
              { title: "Hyper-Local Integration", desc: "Last-mile delivery networks for 60-minute commerce cycles.", code: "M-04" },
              { title: "Bulk Manifesting", desc: "Process 10,000 labels in one terminal cycle with OCR validation.", code: "M-05" }
            ].map((item, i) => (
              <div key={i} className="bento-item holo-glass col-span-12 lg:col-span-4 group hover:bg-[#00ff87]/[0.05] bg-white/[0.01]">
                <span className="text-[10px] text-white/20 font-bold tracking-[0.2em] mb-4 block">{item.code}</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#00ff87] transition-colors">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: DATA VISUAL (Marquee) ========== */}
      <section className="reveal-section border-y border-white/5 bg-transparent py-12">
        <HorizontalMarquee />
      </section>

      {/* ========== SECTION 4: STORY GALLERY ========== */}
      <StoryGallery />

      {/* ========== SECTION 6: LEADERSHIP (Terminal Style) ========== */}
      <section className="reveal-section py-32 px-6 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center mb-20">
          <span className="text-terminal text-[10px] font-bold tracking-[0.4em] mb-4 uppercase">Leadership Node</span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Command & Control</h2>
        </div>
        <CircularTestimonials
          testimonials={[
            {
              quote: "The Indian pincode system is an 19,000-node graph. Our job is to find the path of least resistance through that graph using real-time telemetry.",
              name: "Anurag Singh",
              designation: "Chief Technology Officer",
              src: "/directors/anurag.svg",
            },
            {
              quote: "Logistics is no longer a physical challenge; it's a compute challenge. ShipBridge is the infrastructure layer for the next decade of D2C growth.",
              name: "Prachi Agarwal",
              designation: "Chief Executive Officer",
              src: "/directors/prachi.svg",
            },
            {
              quote: "We don't just move boxes. We move data that optimizes liquidity, reduces capital lock-up in COD, and stabilizes the supply chain.",
              name: "Ashish Joshi",
              designation: "Founder & CFO",
              src: "/directors/ashish.svg",
            },
          ]}
          autoplay={true}
        />
      </section>

      {/* ========== SECTION 6: FINAL CTA (Hyper-Logistics Terminal) ========== */}
      <section className="reveal-section py-48 px-6 relative overflow-hidden bg-transparent">
        <div className="logistics-grid absolute inset-0 opacity-20 pointer-events-none" />
        <div className="scanning-line" />
        <div className="max-w-4xl mx-auto holo-glass p-12 md:p-24 rounded-[3rem] text-center border-[#00ff87]/30 bg-white/[0.01]">
          <span className="text-terminal text-[10px] font-bold tracking-[0.4em] mb-8 block uppercase">Finalize Initialization</span>
          <h2 className="heading-huge mb-12" style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}>
            Initialize Your <br/><span className="text-[#00ff87]">Shipping Engine</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-precision px-12">Connect API Node</button>
            <Link href="/contact" className="btn-outline px-12 flex items-center justify-center">Contact Terminal</Link>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-32 px-6 md:px-12 border-t border-white/10 bg-transparent relative">
        <div className="logistics-grid-fine absolute inset-0 opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <Image src={logo} alt="ShipBridge" width={140} height={46} className="mb-8 opacity-90" />
              <p className="text-white/30 text-xs font-mono max-w-sm leading-relaxed mb-10">
                SYSTEM_ID: SHIPBRIDGE_OS_v2.4<br/>
                DEPLOYMENT: BHARAT_NODE_CLUSTER<br/>
                STATUS: ENCRYPTED_STABLE
              </p>
              
              <div className="flex gap-4">
                {[
                  { label: "LINKEDIN_NODE", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", href: "https://linkedin.com/company/shipbridge" },
                  { label: "INSTAGRAM_NODE", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.66.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", href: "https://instagram.com/shipbridge" }
                ].map((node, i) => (
                  <a 
                    key={i} 
                    href={node.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 holo-glass rounded-lg flex items-center justify-center text-white/30 group-hover:text-[#00ff87] group-hover:border-[#00ff87]/50 transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={node.icon}/></svg>
                    </div>
                    <span className="text-[8px] font-mono text-white/20 group-hover:text-[#00ff87] tracking-widest">{node.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h5 className="text-terminal text-[10px] font-bold uppercase tracking-[0.3em]">Network_Nodes</h5>
              <ul className="flex flex-col gap-4">
                {['Tracking', 'Intelligence', 'Terminal'].map(item => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-white/30 hover:text-[#00ff87] font-mono text-xs transition-colors">
                      // {item.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-8">
              <h5 className="text-terminal text-[10px] font-bold uppercase tracking-[0.3em]">Operational_Access</h5>
              <ul className="flex flex-col gap-4">
                {['About', 'Franchise', 'Contact'].map(item => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-white/30 hover:text-[#00ff87] font-mono text-xs transition-colors">
                      // {item.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-white/5">
            <div className="text-[10px] font-mono text-white/20 tracking-tighter">
              © 2026 SHIPBRIDGE_TECHNOLOGIES. ALL_RIGHTS_RESERVED. [AES_256_ENCRYPTED]
            </div>
            <div className="flex gap-12 text-[10px] font-mono text-[#00ff87] uppercase tracking-[0.2em]">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy_Protocol</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms_of_Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
