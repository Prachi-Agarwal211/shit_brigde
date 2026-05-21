"use client";

import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden text-center">
        <SectionAurora variant="dual" className="opacity-40" />
        <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block relative z-10">
          Tracking
        </span>
        <TextReveal
          text="Track every shipment"
          elementType="h1"
          className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display relative z-10"
        />
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
          Real-time tracking across all courier partners. One dashboard, every shipment, live updates.
        </p>
      </section>

      {/* Tracking Features */}
      <section className="relative py-24 px-5 md:px-12 bg-[#0a0a0a] overflow-hidden">
        <SectionAurora variant="ember" className="opacity-20" />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 font-display text-center">
            Enterprise-grade tracking
          </h2>
          <p className="text-white/50 text-center mb-16 max-w-lg mx-auto font-light">
            Built for Indian ecommerce — real-time visibility across every courier network.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Real-Time Updates", desc: "Live tracking status from every courier partner. No more checking multiple portals." },
              { title: "Customer Notifications", desc: "Automatic SMS and email tracking links. Keep your customers informed at every step." },
              { title: "NDR Alerts", desc: "Instant notifications when a delivery attempt fails. Resolve issues before they become RTO." },
            ].map((item, idx) => (
              <div key={idx} className="bento-card p-8">
                <h3 className="text-lg font-bold text-white mb-3 font-display">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-32 px-5 md:px-12 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 text-center p-12 md:p-16 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 font-display">
            Want live tracking on every order?
          </h2>
          <p className="text-white/60 font-light mb-8 max-w-lg mx-auto">
            Start shipping with ShipBridge and get real-time tracking across 10+ courier partners.
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
