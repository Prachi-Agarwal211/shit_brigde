"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icons
const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>;
const MapIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const TechIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6v6H9z"/></svg>;
const BookIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const SpeakerIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const CoinsIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"/><path d="M12 18V6"/></svg>;

export default function FranchisePage() {
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 80%",
        }
      });

      gsap.from(".form-section", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".form-section",
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  return (
    <main ref={containerRef} className="relative min-h-screen text-white overflow-hidden bg-transparent">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 flex flex-col items-center text-center overflow-hidden">
        <SectionAurora variant="subtle" />
        <span className="text-[#FF9933] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block relative z-10">
          Become a Partner
        </span>
        <TextReveal 
          text="Franchise with ShipBridge" 
          elementType="h1"
          className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display relative z-10" 
        />
        <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed relative z-10">
          Own a delivery franchise in your city. We provide the AI-powered technology platform, courier network access, training, and support. You run the operations.
        </p>
      </section>

      {/* Benefits Grid */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 overflow-hidden bg-transparent">
        <SectionAurora variant="dual" className="opacity-30" />
        <div className="max-w-7xl mx-auto benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {[
            { title: "Proven Model", icon: <CheckIcon />, desc: "Scalable franchise model designed for Indian logistics — from metro cities to tier-2 and tier-3 towns." },
            { title: "Full Tech Stack", icon: <TechIcon />, desc: "Access to the ShipBridge AI-powered shipping platform, dashboard, and courier network from day one." },
            { title: "Training & Support", icon: <BookIcon />, desc: "8-week onboarding + dedicated account manager." },
            { title: "Territory Protection", icon: <MapIcon />, desc: "Exclusive geographic zones for your operations." },
            { title: "Marketing Assets", icon: <SpeakerIcon />, desc: "Full brand kit and managed digital campaigns." },
            { title: "Revenue Sharing", icon: <CoinsIcon />, desc: "Transparent and highly competitive margins." },
          ].map((benefit, idx) => (
            <div key={idx} className="bento-card group flex flex-col items-start text-left p-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF9933]/20 to-transparent border border-[#FF9933]/20 flex items-center justify-center text-[#FF9933] mb-6 transition-transform group-hover:scale-110 group-hover:-rotate-3">
                <div className="w-6 h-6">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white font-display">{benefit.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm font-light">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form Section */}
      <section className="relative py-24 md:py-40 px-5 md:px-12 form-section bg-transparent overflow-hidden">
        <SectionAurora variant="ember" className="opacity-20" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
          
          {/* Left: Form */}
          <div className="lg:w-3/5 w-full">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 font-display">
              Apply for a Franchise
            </h2>
            
            {submitted ? (
              <div className="bento-card border-[#FF9933]/30 bg-[#064e3b]/10 text-center py-16">
                <div className="w-20 h-20 rounded-full bg-[#FF9933]/20 flex items-center justify-center text-[#FF9933] mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                <p className="text-white/60">We&apos;ll be in touch within 48 hours to discuss your next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Full Name</label>
                    <input required type="text" className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#FF9933]/50 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
                    <input required type="email" className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#FF9933]/50 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Phone</label>
                    <input required type="tel" className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#FF9933]/50 transition-colors" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">City / State</label>
                    <input required type="text" className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#FF9933]/50 transition-colors" placeholder="Mumbai, Maharashtra" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Company Name</label>
                  <input type="text" className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#FF9933]/50 transition-colors" placeholder="Doe Logistics Pvt Ltd (Optional)" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">GST Number (Optional)</label>
                  <input type="text" className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#FF9933]/50 transition-colors" placeholder="22AAAAA0000A1Z5" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Business Type</label>
                  <select className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FF9933]/50 transition-colors appearance-none">
                    <option value="" className="bg-[#0a0a0a]">Select business type...</option>
                    <option value="individual" className="bg-[#0a0a0a]">Individual / Sole Proprietor</option>
                    <option value="partnership" className="bg-[#0a0a0a]">Partnership</option>
                    <option value="pvt-ltd" className="bg-[#0a0a0a]">Private Limited</option>
                    <option value="llp" className="bg-[#0a0a0a]">LLP</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Years in Logistics (India)</label>
                    <select required className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FF9933]/50 transition-colors appearance-none">
                      <option value="" className="bg-[#0a0a0a]">Select experience...</option>
                      <option value="<1" className="bg-[#0a0a0a]">&lt; 1 Year</option>
                      <option value="1-3" className="bg-[#0a0a0a]">1-3 Years</option>
                      <option value="3-10" className="bg-[#0a0a0a]">3-10 Years</option>
                      <option value="10+" className="bg-[#0a0a0a]">10+ Years</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Investment Capacity</label>
                    <select required className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FF9933]/50 transition-colors appearance-none">
                      <option value="" className="bg-[#0a0a0a]">Select capacity...</option>
                      <option value="5-10" className="bg-[#0a0a0a]">₹5L - ₹10L</option>
                      <option value="10-25" className="bg-[#0a0a0a]">₹10L - ₹25L</option>
                      <option value="25-50" className="bg-[#0a0a0a]">₹25L - ₹50L</option>
                      <option value="50+" className="bg-[#0a0a0a]">₹50L+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Message</label>
                  <textarea required rows={5} className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#FF9933]/50 transition-colors resize-none" placeholder="Tell us about yourself and why you want to partner with ShipBridge..." />
                </div>

                <div className="button-wrap w-full mt-8">
                  <button type="submit" className="uiverse-button w-full">
                    <span>Submit Application</span>
                  </button>
                  <div className="button-shadow" />
                </div>
              </form>
            )}
          </div>

          {/* Right: Details / FAQ */}
          <div className="lg:w-2/5 w-full">
            <div className="sticky top-32">
              <h3 className="text-2xl font-bold mb-8 font-display">What happens next?</h3>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {[
                  { step: "1", title: "Application Review", desc: "Our team will review your application within 2-3 business days." },
                  { step: "2", title: "Discovery Call", desc: "An introductory meeting with our franchise team." },
                  { step: "3", title: "Due Diligence", desc: "Financial review and territory mapping." },
                  { step: "4", title: "Onboarding", desc: "Franchise agreement signing and 8-week training." },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF9933] flex items-center justify-center text-[#0a0a0a] font-bold text-xs shadow-[0_0_15px_rgba(0,255,135,0.4)] z-10 mt-1">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1 font-display">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#064e3b]/20 to-transparent border border-white/5">
                <h4 className="font-bold text-white mb-2">Questions?</h4>
                <p className="text-white/60 text-sm mb-4 font-light">Reach out to our dedicated franchise development team.</p>
                <a href="mailto:franchise@shipbridge.com" className="text-[#FF9933] font-medium hover:underline underline-offset-4 transition-all">franchise@shipbridge.com</a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
