"use client";

import Link from "next/link";
import SectionAurora from "@/components/SectionAurora";
import TextReveal from "@/components/TextReveal";

export default function NotFound() {
  return (
    <main className="relative min-h-screen text-white flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-transparent">
      <SectionAurora variant="dual" className="opacity-40" />
      <div className="relative z-10">
        <span className="text-[#00ff87] text-[10px] tracking-[0.4em] uppercase font-bold mb-6 block">
          Error 404
        </span>
        
        <TextReveal 
          text="Lost at sea." 
          elementType="h1"
          className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10" 
        />
        
        <p className="text-lg text-white/50 max-w-md mx-auto mb-12 font-light leading-relaxed">
          The page you are looking for has been redirected or does not exist. Let us help you find what you need.
        </p>

        <div className="button-wrap mx-auto">
          <Link href="/" className="uiverse-button group">
            <span>Return to Hub</span>
          </Link>
          <div className="button-shadow" />
        </div>
      </div>

      {/* Decorative overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.012] bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />
    </main>
  );
}
