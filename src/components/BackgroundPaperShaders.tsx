"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export default function BackgroundPaperShaders() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);

    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
      style={{ isolation: "isolate" }}
    >
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#020202]" />

      {/* MeshGradient — Gemini-style soft ambient bloom */}
      {mounted && isVisible && (
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={[
            "#00ff87", // ShipBridge Green
            "#000000",
            "#ff6b35", // ShipBridge Orange
            "#000000",
            "#00ff87",
            "#000000",
            "#ff6b35",
            "#000000"
          ]}
          distortion={0.25}
          swirl={0.3}
          grainMixer={0}
          grainOverlay={0}
          speed={0.1}
          scale={3.0}
          fit="cover"
        />
      )}

      {/* Soft radial vignette — focuses the glow in the center and fades to pure black at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.6)_60%,#020202_100%)] pointer-events-none" />
    </div>
  );
}
