export default function HorizontalMarquee() {
  const items = [
    "AI-POWERED ROUTING",
    "99.9% UPTIME",
    "150+ COUNTRIES",
    "REAL-TIME TRACKING",
    "CUSTOMS AUTOMATION",
    "24/7 SUPPORT",
    "BORDERLESS FULFILLMENT",
    "PREDICTIVE DEMAND",
  ];

  return (
    <div className="w-full overflow-hidden py-20 border-y border-white/5 relative">
      {/* Mask edges */}
      <div className="absolute inset-0 pointer-events-none z-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />

      {/* Track 1 — forward */}
      <div className="flex mb-8">
        <div className="marquee-track flex">
          {[...Array(3)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-12">
              {items.map((item, i) => (
                <span
                  key={i}
                  className="text-[11px] uppercase tracking-[0.4em] text-white/25 font-bold flex items-center gap-3 cursor-default"
                >
                  <span className="text-[#00ff87] text-base opacity-40">⬡</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Track 2 — reverse */}
      <div className="flex">
        <div className="marquee-track-reverse flex">
          {[...Array(3)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-12">
              {items.map((item, i) => (
                <span
                  key={i}
                  className="text-[11px] uppercase tracking-[0.4em] text-white/20 font-bold flex items-center gap-3 cursor-default"
                >
                  <span className="text-[#f97316] text-base opacity-40">⬡</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
