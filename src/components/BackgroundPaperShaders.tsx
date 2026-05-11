"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MeshGradient } from "@paper-design/shaders-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BackgroundPaperShaders() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => st.kill();
  }, []);

  const speed = 0.3 + scrollProgress * 1.0;
  const distortion = 0.4 + scrollProgress * 0.35;
  const swirl = 0.35 + scrollProgress * 0.4;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ isolation: "isolate" }}
    >
      {/* Dark gradient base (SSR fallback) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030303] via-[#080808] to-[#030303]" />

      {/* Single MeshGradient — client only, zero grain */}
      {mounted && (
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={[
            "#030303",
            "#0a1a10",
            "#001a0a",
            "#0d2818",
            "#00ff87",
            "#030303",
            "#ff6b35",
            "#0a1a10",
          ]}
          distortion={distortion}
          swirl={swirl}
          grainMixer={0}
          grainOverlay={0}
          speed={speed}
          scale={1.5}
          fit="cover"
        />
      )}
    </div>
  );
}
