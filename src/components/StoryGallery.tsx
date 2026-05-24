"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stories = [
  {
    title: "D2C Scaling Node",
    metric: "40% RTO REDUCTION",
    description: "How a Jaipur-based lifestyle brand automated their carrier selection to achieve 98% delivery success across North India.",
    tags: ["AUTOMATION", "RTO_ENGINE"],
    color: "var(--green)"
  },
  {
    title: "Enterprise Grid",
    metric: "12ms API LATENCY",
    description: "Synchronizing 50,000 daily shipments through our high-frequency terminal for a national retail chain.",
    tags: ["SCALABILITY", "API_NODE"],
    color: "#ffffff"
  },
  {
    title: "Hyper-Local Mesh",
    metric: "60-MIN DELIVERY",
    description: "Implementing real-time node orchestration for rapid last-mile fulfillment in Tier-1 metro clusters.",
    tags: ["LAST_MILE", "PRECISION"],
    color: "var(--orange)"
  }
];

export default function StoryGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-terminal text-[10px] font-bold tracking-[0.4em] mb-4 block uppercase">Operational Logs</span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Success Telemetry</h2>
          </div>
          <div className="text-right">
            <p className="text-white/30 text-xs font-mono mb-2">// GLOBAL_NETWORK_SYNC: ACTIVE</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-sm bg-[#FF9933]" />
              <div className="w-2 h-2 rounded-sm bg-white/20" />
              <div className="w-2 h-2 rounded-sm bg-white/20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="story-card holo-glass p-8 rounded-2xl group hover:border-[#FF9933]/40 transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-white/40 mb-1">NODE_ID</span>
                  <span className="text-xs font-bold font-mono text-[#FF9933]">0{i+1}_SUCCESS</span>
                </div>
                <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-lg">
                  {i === 0 ? "⚡" : i === 1 ? "📡" : "📦"}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#FF9933] transition-colors uppercase tracking-wider">{story.title}</h3>
              <div className="text-3xl font-black mb-6 font-mono tracking-tighter" style={{ color: story.color }}>
                {story.metric}
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-8 font-light italic">
                &quot;{story.description}&quot;
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {story.tags.map(tag => (
                  <span key={tag} className="text-[8px] font-mono border border-white/10 px-2 py-1 rounded text-white/30 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
