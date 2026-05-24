"use client";

import Image from "next/image";
import TextReveal from "@/components/TextReveal";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white bg-black logistics-grid">
      <div className="scanning-line" />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="w-full">
          <span className="text-terminal text-[10px] font-bold tracking-[0.4em] mb-4 block uppercase">
            System_Initialization // 2024
          </span>
          <h1 className="heading-huge mb-8">Intelligence Layer</h1>
          <p className="text-xl md:text-2xl text-white/50 tracking-tight font-light max-w-3xl mb-12 italic">
            Architecting the future of <span className="text-[#FF9933]">automated logistics</span> for the Indian subcontinent.
          </p>
          
          <div className="holo-glass p-8 md:p-12 rounded-3xl border-[#FF9933]/20 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
              ShipBridge is a high-frequency logistics operating system designed to eliminate the friction between commerce and fulfillment.
            </h2>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "19,000+", label: "Active_Nodes" },
            { value: "20+", label: "Carrier_APIs" },
            { value: "500+", label: "Enterprise_Clusters" },
            { value: "99.8%", label: "System_Uptime" }
          ].map((stat, idx) => (
            <div key={idx} className="holo-glass p-8 rounded-2xl text-center group border-white/5">
              <div className="text-3xl md:text-5xl font-black text-[#FF9933] mb-2 font-mono tracking-tighter group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <span className="text-terminal text-[10px] font-bold tracking-[0.4em] mb-4 block uppercase">The_Mission</span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Solving Graph Complexity at Scale.</h3>
            </div>
            
            <div className="space-y-8 text-white/50 text-lg font-light leading-relaxed">
              <p>
                The Indian logistics landscape is an 19,000-node graph with infinite variables. Legacy systems struggle with the latency of manual reconciliation and static routing.
              </p>
              <p className="border-l-2 border-[#FF9933] pl-8 italic">
                ShipBridge acts as the intelligence layer, utilizing real-time telemetry to find the path of least resistance for every single shipment.
              </p>
              <p>
                From predicting RTO probability to automating NDR protocols, we provide the compute power that allows D2C brands and enterprises to scale without the weight of traditional logistics overhead.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative aspect-square holo-glass rounded-3xl flex items-center justify-center p-12 border-[#FF9933]/30">
               <div className="absolute inset-0 bg-[#FF9933]/5 animate-pulse" />
               <Image src="/og-image.svg" alt="ShipBridge OS" fill className="object-contain p-12 opacity-80" />
               <div className="absolute bottom-6 left-6 right-6">
                <span className="text-terminal text-[9px] font-bold block mb-1">CORE_KERNEL_v2.4</span>
                <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Encryption_Enabled</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="relative py-48 px-6 md:px-12 text-center overflow-hidden">
        <div className="scanning-line" />
        <div className="max-w-4xl mx-auto holo-glass p-12 md:p-24 rounded-[4rem] border-[#FF9933]/20">
          <p className="text-xl md:text-3xl leading-tight font-bold tracking-tighter text-white">
            &quot;We don&apos;t just move boxes. We move data that optimizes liquidity, reduces capital lock-up, and stabilizes the global supply chain grid.&quot;
          </p>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-12 h-px bg-[#FF9933] mb-6" />
            <span className="text-terminal text-[10px] font-bold uppercase tracking-[0.3em]">ShipBridge OS Core</span>
          </div>
        </div>
      </section>
    </main>
  );
}
