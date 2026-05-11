"use client";

import Image from "next/image";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden">
        <SectionAurora variant="subtle" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block">
            Our Story
          </span>
          <TextReveal 
            text="About ShipBridge" 
            elementType="h1"
            className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tighter mb-16 md:mb-24 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10" 
          />

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
            <section className="space-y-8">
              <p className="text-2xl md:text-4xl text-white font-display leading-tight">
                We are building the critical infrastructure that empowers modern commerce, giving businesses the confidence to operate on a truly global scale.
              </p>
              <div className="w-12 h-1 bg-[#00ff87] rounded-full" />
              <p className="text-lg text-white/60 leading-relaxed font-light">
                ShipBridge combines AI-driven routing, real-time tracking, and a global network of trusted partners to deliver your cargo — anywhere, anytime.
              </p>
              <p className="text-lg text-white/60 leading-relaxed font-light">
                We aren&apos;t just moving boxes. Our platform transforms complex supply chains into seamless, trackable journeys — making global logistics as simple as a single API call.
              </p>
            </section>
            
            <section className="flex items-center">
              <div className="w-full aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-[#064e3b]/20 to-[#0a0a0a] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 transition-transform duration-1000 group-hover:scale-110" />
                <span className="text-[#00ff87]/60 text-sm tracking-widest font-bold z-10">
                  GLOBAL ROUTE NETWORK
                  <span className="block text-[8px] text-white/30 tracking-[0.5em] mt-2">CONNECTING THE WORLD</span>
                </span>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 overflow-hidden bg-[#0a0a0a]">
        <SectionAurora variant="dual" className="opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block text-center md:text-left">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 font-display text-center md:text-left">The Road So Far</h2>
          
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative">
            <div className="absolute top-0 bottom-0 left-[11px] w-px bg-white/10 md:hidden" />
            <div className="hidden md:block absolute top-[15px] left-0 right-0 h-px bg-white/10" />
            
            {[
              { year: "2026", title: "Founded (Apr)", desc: "ShipBridge incorporated with a vision to reimagine global logistics." },
              { year: "Q2 2026", title: "AI Platform Launch", desc: "Beta release of our AI-native logistics operating system." },
              { year: "Q3 2026", title: "50+ Countries", desc: "Scaled our route intelligence network globally." },
              { year: "Q4 2026", title: "ShipBridge ERP", desc: "Full platform launch with routing, customs, and analytics." },
              { year: "2027+", title: "Global Expansion", desc: "Extending our network to every major trade corridor." },
            ].map((milestone, idx) => (
              <div key={idx} className="relative pl-12 md:pl-0 md:pt-12 md:w-1/5 flex flex-col md:items-center md:text-center group">
                <div className="absolute left-0 top-0 w-[32px] h-[32px] md:left-1/2 md:-translate-x-1/2 bg-[#0a0a0a] border-4 border-white/10 rounded-full flex items-center justify-center transition-colors group-hover:border-[#00ff87] group-hover:shadow-[0_0_20px_rgba(0,255,135,0.4)] z-10">
                  <div className="w-2 h-2 rounded-full bg-[#00ff87] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-3xl font-black text-white font-display mb-2">{milestone.year}</div>
                <div className="text-[#00ff87] text-sm font-bold mb-2">{milestone.title}</div>
                <div className="text-white/50 text-sm leading-relaxed">{milestone.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 overflow-hidden">
        <SectionAurora variant="ember" className="opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block text-center">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 font-display text-center">Our Leadership</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Coming Soon", title: "Chief Executive Officer", initials: "?" },
              { name: "Coming Soon", title: "Chief Technology Officer", initials: "?" },
              { name: "Coming Soon", title: "Head of Global Operations", initials: "?" },
            ].map((leader, idx) => (
              <div key={idx} className="bento-card group flex flex-col items-center text-center p-10">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#064e3b] to-[#1c0a00] border border-[#00ff87]/20 flex items-center justify-center mb-6 shadow-xl relative overflow-hidden">
                  <span className="text-3xl font-display font-bold text-white/50 group-hover:text-white transition-colors">{leader.initials}</span>
                  <div className="absolute inset-0 bg-[#00ff87]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">{leader.name}</h3>
                <p className="text-[#00ff87] text-sm font-medium tracking-wide mb-6">{leader.title}</p>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#00ff87]/20 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
