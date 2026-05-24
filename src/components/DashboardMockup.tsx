"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DashboardMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate data bars in the mockup
      gsap.from(".mockup-bar", {
        scaleX: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full p-6 flex flex-col gap-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Throughput", val: "1.2k/hr", color: "#FF9933" },
          { label: "Active Nodes", val: "142", color: "#ffffff" },
          { label: "Avg Latency", val: "12ms", color: "#138808" }
        ].map((s, i) => (
          <div key={i} className="holo-glass p-3 rounded-lg border-white/5 flex flex-col gap-1">
            <span className="text-[8px] uppercase tracking-widest text-white/30 font-mono">{s.label}</span>
            <span className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.val}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 holo-glass rounded-xl border-white/10 p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-[10px] font-mono text-[#FF9933]">LIVE_TELEMETRY.STREAM</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>
        </div>
        
        {/* Animated Bars */}
        <div className="space-y-4 py-2">
          {[
            { label: "DELHIVERY_NODE", pct: "w-[92%]", color: "bg-[#FF9933]" },
            { label: "BLUEDART_AIR", pct: "w-[78%]", color: "bg-white/60" },
            { label: "XPRESSBEES_LTL", pct: "w-[85%]", color: "bg-[#138808]" },
            { label: "ECOM_EXPRESS_COD", pct: "w-[64%]", color: "bg-[#FF9933]" }
          ].map((bar, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-[8px] font-mono text-white/40 tracking-tighter">
                <span>{bar.label}</span>
                <span>{bar.pct.replace('w-[', '').replace('%]', '')}% CAP</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`mockup-bar h-full ${bar.color} ${bar.pct} origin-left`} />
              </div>
            </div>
          ))}
        </div>

        {/* Console Log Area */}
        <div className="mt-auto bg-black/40 rounded-lg p-3 font-mono text-[8px] text-[#FF9933]/60 leading-tight">
          <div>[INIT] Synchronizing Carrier_Map_v4...</div>
          <div>[AUTH] BHARAT_NODE_JAIPUR: Verified.</div>
          <div>[EXEC] Routing Order_#42921 via BLUEDART_AIR...</div>
          <div className="animate-pulse">_</div>
        </div>
      </div>
    </div>
  );
}
