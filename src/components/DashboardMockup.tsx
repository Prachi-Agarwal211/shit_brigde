"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DashboardMockup() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger progress bar animation when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.querySelectorAll('.db-progress-bar')
            .forEach(el => el.classList.add('animate'));
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    
    // Mouse tracking for reflection
    const onMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !glareRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      
      glareRef.current.style.setProperty('--x', `${px}%`);
      glareRef.current.style.setProperty('--y', `${py}%`);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={cardRef} className="card-glow-brand p-6 md:p-8 w-full max-w-xl mx-auto lg:mx-0 relative overflow-hidden group">
      {/* Moving Glass Reflection */}
      <div 
        ref={glareRef}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        style={{
          background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06) 0%, transparent 60%)`
        }}
      />
      
      {/* Window bar */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-white/30 tracking-widest ml-2 uppercase">ShipBridge OS · Beta</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-[10px] text-[#00ff87]">Live</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-5 mb-6">
        {[
          { label: "AI Route Efficiency", value: "94%", width: "0.94" },
          { label: "On-time Delivery", value: "99.2%", width: "0.992" },
          { label: "Customs Clearance", value: "87%", width: "0.87" },
        ].map((metric, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-white/40 uppercase tracking-wider">{metric.label}</span>
              <span className="text-xs text-[#00ff87] font-bold font-mono">{metric.value}</span>
            </div>
            <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div 
                className="db-progress-bar h-full rounded-full"
                style={{ '--target-scale': metric.width } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline SVG */}
      <div className="bg-white/2 rounded-xl p-4 mb-4 border border-white/5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">Route Efficiency</span>
          <span className="text-[10px] text-[#00ff87] font-mono">↑ 12.4%</span>
        </div>
        <svg viewBox="0 0 200 50" className="w-full h-12">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff87" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#00ff87" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,40 L20,35 L40,38 L60,28 L80,30 L100,20 L120,22 L140,15 L160,10 L180,12 L200,5" 
                fill="none" stroke="#00ff87" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0,40 L20,35 L40,38 L60,28 L80,30 L100,20 L120,22 L140,15 L160,10 L180,12 L200,5 L200,50 L0,50 Z"
                fill="url(#sparkGrad)" opacity="0.5"/>
        </svg>
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/3 rounded-xl p-4 border border-white/5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Active Shipments</p>
          <p className="text-xl font-bold text-white font-mono">14,892</p>
        </div>
        <div className="bg-white/3 rounded-xl p-4 border border-[#00ff87]/10">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">AI Time Saved</p>
          <p className="text-xl font-bold text-[#00ff87] font-mono">34 min</p>
        </div>
      </div>
    </div>
  );
}
