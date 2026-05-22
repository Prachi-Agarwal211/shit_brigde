"use client";

import { useState } from "react";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";
import SearchBar from "@/components/SearchBar";

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    if (!query) return;
    setLoading(true);
    setTrackingId(null);
    setTimeout(() => {
      setTrackingId(query);
      setLoading(false);
    }, 800);
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent">
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-5 md:pt-52 md:pb-24 md:px-12 overflow-hidden text-center">
        <SectionAurora variant="dual" className="opacity-40" />
        <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block relative z-10">
          Tracking
        </span>
        <TextReveal
          text="Track every shipment"
          elementType="h1"
          className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display relative z-10"
        />
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-12 relative z-10">
          Real-time tracking across all courier partners. One dashboard, every shipment, live updates.
        </p>

        {/* Search Bar */}
        <div className="relative z-20 max-w-2xl mx-auto mb-16">
          <SearchBar onSearch={handleSearch} />
          {loading && (
            <div className="mt-8 flex justify-center items-center gap-3 text-[#00ff87]">
              <svg className="animate-spin h-5 w-5 text-[#00ff87]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-sans tracking-wide text-white/70">Fetching parcel status...</span>
            </div>
          )}
        </div>

        {/* Tracking Results Simulator */}
        {trackingId && !loading && (
          <div className="relative z-10 max-w-2xl mx-auto text-left bento-card p-6 md:p-8 border border-white/10 animate-pulse">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-6 gap-4">
              <div>
                <span className="text-white/40 text-[10px] uppercase tracking-widest block mb-1">Tracking ID</span>
                <span className="text-white font-mono text-base md:text-lg font-bold tracking-wide">{trackingId}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/25">
                  IN TRANSIT
                </span>
                <span className="text-white/50 text-xs md:text-sm font-sans">Est. Delivery: <b className="text-white">Tomorrow, 5:00 PM</b></span>
              </div>
            </div>

            <div className="flex flex-col gap-8 relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10 font-sans">
              {[
                { time: "Today, 10:15 AM", status: "Arrived at Delivery Hub", loc: "Mumbai West Hub", current: true },
                { time: "Yesterday, 04:30 PM", status: "In Transit to Destination Hub", loc: "National Highway Hub" },
                { time: "Yesterday, 09:00 AM", status: "Sorted & Dispatched", loc: "Delhi Central Sorting Facility" },
                { time: "May 20, 02:15 PM", status: "Parcel Received & Scanned", loc: "Delhi Hub - Merchant Warehouse" },
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-col gap-1">
                  <div className={`absolute -left-[21px] top-1 w-[12px] h-[12px] rounded-full border-2 ${
                    step.current 
                      ? "bg-[#00ff87] border-[#00ff87] scale-125 shadow-[0_0_10px_rgba(0,255,135,0.6)]" 
                      : "bg-[#09090b] border-white/30"
                  }`} />
                  <span className={`text-xs ${step.current ? "text-[#00ff87] font-semibold" : "text-white/40"}`}>{step.time}</span>
                  <span className={`text-sm md:text-base font-bold ${step.current ? "text-white" : "text-white/80"}`}>{step.status}</span>
                  <span className="text-xs text-white/50">{step.loc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Tracking Features */}
      <section className="relative py-24 px-5 md:px-12 bg-transparent overflow-hidden">
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
