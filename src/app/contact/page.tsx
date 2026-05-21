"use client";

import { useState } from "react";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden">
        <SectionAurora variant="dual" className="opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block">
            Get in Touch
          </span>
          <TextReveal 
            text="Contact ShipBridge" 
            elementType="h1"
            className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tighter mb-16 md:mb-24 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10" 
          />

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <section className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6 font-display">Get in Touch</h2>
              <p className="text-white/60 leading-relaxed mb-12 max-w-md">
                Ready to simplify your shipping? Reach out to our team for a personalised consultation. Our team is available during Indian business hours to help you ship smarter.
              </p>
              
              <div className="space-y-8 mb-16">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:contact@shipbridge.com" className="text-xl text-white hover:text-[#00ff87] transition-colors">contact@shipbridge.com</a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Phone</p>
                    <a href="tel:+911800XXX123" className="text-xl text-white hover:text-[#00ff87] transition-colors">1800-XXX-123</a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-xl text-white leading-snug">India-based operations<br />Serving D2C brands, SMEs and sellers across India</p>
                  </div>
                </div>
              </div>

              {/* India Map Visual */}
              <div className="rounded-2xl bg-[#0f1a14] border border-[#00ff87]/20 h-[300px] w-full flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,135,0.05),transparent_70%)]" />
                {/* Decorative dot grid */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSgwLDI1NSwxMzUsMC4yKSIvPjwvc3ZnPg==')] opacity-40" />
                {/* Animated connection dots representing Indian cities */}
                <div className="absolute w-full h-full">
                  <div className="absolute top-[25%] left-[45%] w-2 h-2 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_10px_rgba(0,255,135,0.6)]" />
                  <div className="absolute top-[50%] left-[50%] w-2 h-2 rounded-full bg-[#00ff87]/60 animate-pulse shadow-[0_0_10px_rgba(0,255,135,0.4)]" style={{animationDelay: '0.5s'}} />
                  <div className="absolute top-[65%] left-[55%] w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.6)]" style={{animationDelay: '1s'}} />
                  <div className="absolute top-[40%] left-[60%] w-2 h-2 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_10px_rgba(0,255,135,0.6)]" style={{animationDelay: '0.3s'}} />
                  <div className="absolute top-[55%] left-[35%] w-2 h-2 rounded-full bg-[#f97316]/60 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.4)]" style={{animationDelay: '0.8s'}} />
                  <div className="absolute top-[70%] left-[45%] w-2 h-2 rounded-full bg-[#00ff87]/60 animate-pulse shadow-[0_0_10px_rgba(0,255,135,0.4)]" style={{animationDelay: '1.2s'}} />
                </div>
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300" fill="none">
                  <line x1="180" y1="75" x2="200" y2="150" stroke="#00ff87" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="200" y1="150" x2="220" y2="195" stroke="#00ff87" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="220" y1="195" x2="240" y2="160" stroke="#f97316" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="180" y1="75" x2="140" y2="165" stroke="#00ff87" strokeWidth="0.3" strokeDasharray="3 6" />
                  <line x1="140" y1="165" x2="200" y2="210" stroke="#00ff87" strokeWidth="0.3" strokeDasharray="3 6" />
                  <line x1="200" y1="210" x2="180" y2="150" stroke="#f97316" strokeWidth="0.3" strokeDasharray="3 6" />
                </svg>
                <div className="relative z-10 text-center">
                  <span className="text-[#00ff87] font-display text-xl font-bold tracking-wide">Pan-India Coverage</span>
                  <span className="block text-white/40 text-xs font-mono mt-2">Multi-Courier · AI-Routed · PAN India</span>
                </div>
              </div>
            </section>

            <section className="order-1 lg:order-2">
              <div className="bento-card p-8 md:p-12 relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-8 font-display">Send a Message</h2>
                
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-[#00ff87]/20 flex items-center justify-center text-[#00ff87] mx-auto mb-6">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60">We&apos;ll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40">Your Name</label>
                      <input required type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00ff87]/50 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40">Your Email</label>
                      <input required type="email" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00ff87]/50 transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40">Subject</label>
                      <input required type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00ff87]/50 transition-colors" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40">Message</label>
                      <textarea required rows={5} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00ff87]/50 transition-colors resize-none" placeholder="Your message..." />
                    </div>
                    <div className="button-wrap w-full mt-4">
                      <button type="submit" className="uiverse-button w-full">
                        <span>Send Message</span>
                      </button>
                      <div className="button-shadow"></div>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
