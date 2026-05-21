"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if already visited this session
    if (typeof window !== "undefined" && sessionStorage.getItem("shipbridge-loaded")) {
      setLoading(false);
      return;
    }

    // Animate in the text on mount
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
    }

    // Shorter delay then exit
    const timeout = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("shipbridge-loaded", "true");
          setLoading(false);
        },
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(".preloader-bg", {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      }, "+=0.1");
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader-bg fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center overflow-hidden">
      <div ref={textRef} className="preloader-text text-center relative z-10">
        <div className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-3">
          <span className="inline-block">Ship</span>
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#00ff87] to-[#f97316] ml-3">Bridge</span>
        </div>
        <div className="text-xs text-white/30 tracking-[0.2em] uppercase font-light">
          Logistics · Reimagined
        </div>
      </div>
    </div>
  );
}
