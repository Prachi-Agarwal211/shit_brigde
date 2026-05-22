"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionAuroraProps {
  variant?: "green" | "ember" | "dual" | "subtle" | "reverse" | "atmosphere" | "deepOrange" | "spectral";
  className?: string;
}

export default function SectionAurora({ variant = "dual", className = "" }: SectionAuroraProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  const gradients = {
    green: `radial-gradient(ellipse 70% 60% at 80% 30%, rgba(0,255,135,0.03) 0%, transparent 65%),
            radial-gradient(ellipse 50% 80% at 20% 70%, rgba(6,78,59,0.04) 0%, transparent 65%)`,
    ember: `radial-gradient(ellipse 70% 60% at 20% 30%, rgba(249,115,22,0.03) 0%, transparent 65%),
            radial-gradient(ellipse 50% 80% at 80% 70%, rgba(154,52,18,0.04) 0%, transparent 65%)`,
    dual: `radial-gradient(ellipse 60% 70% at 90% 20%, rgba(0,255,135,0.025) 0%, transparent 60%),
           radial-gradient(ellipse 50% 60% at 10% 80%, rgba(249,115,22,0.02) 0%, transparent 60%),
           radial-gradient(ellipse 80% 80% at 50% 50%, rgba(6,78,59,0.02) 0%, transparent 70%)`,
    reverse: `radial-gradient(ellipse 60% 70% at 10% 20%, rgba(249,115,22,0.025) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 90% 80%, rgba(0,255,135,0.02) 0%, transparent 60%),
              radial-gradient(ellipse 80% 80% at 50% 50%, rgba(154,52,18,0.02) 0%, transparent 70%)`,
    subtle: `radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,255,135,0.015) 0%, transparent 70%)`,
    atmosphere: `radial-gradient(ellipse 70% 60% at -10% 50%, rgba(0,255,135,0.03) 0%, transparent 60%),
                 radial-gradient(ellipse 60% 70% at 110% 50%, rgba(249,115,22,0.02) 0%, transparent 60%)`,
    deepOrange: `radial-gradient(ellipse 60% 50% at 80% 20%, rgba(249,115,22,0.03) 0%, transparent 55%),
                 radial-gradient(ellipse 50% 60% at 20% 80%, rgba(234,88,12,0.02) 0%, transparent 55%)`,
    spectral: `radial-gradient(ellipse 60% 60% at 15% 30%, rgba(0,255,135,0.025) 0%, transparent 50%),
               radial-gradient(ellipse 50% 50% at 85% 25%, rgba(249,115,22,0.02) 0%, transparent 50%),
               radial-gradient(ellipse 50% 50% at 50% 80%, rgba(0,255,135,0.015) 0%, transparent 50%)`,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!bgRef.current) return;

      gsap.to(bgRef.current, {
        backgroundPosition: "0% 20%",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        }
      });
    }, bgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        ref={bgRef}
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 aurora-layer ${className}`}
        style={{
          background: gradients[variant],
          backgroundSize: '120% 120%',
          backgroundPosition: '0% 0%',
          filter: 'blur(100px)',
        }}
      />
      <div className="aurora-grain" />
    </div>
  );
}
