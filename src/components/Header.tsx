"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../../public/logo_new.png";
import ScrollProgress from "./ScrollProgress";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: "+=30",
        onUpdate: (self) => {
          if (self.scroll() > 30) {
            gsap.to(headerRef.current, {
              backgroundColor: "rgba(5, 5, 5, 0.6)",
              backdropFilter: "blur(24px)",
              borderBottomColor: "transparent",
              paddingTop: "6px",
              paddingBottom: "6px",
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12px",
              marginRight: "12px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 30px rgba(0,0,0,0.4)",
              duration: 0.5,
              ease: "power2.out",
            });
          } else {
            gsap.to(headerRef.current, {
              backgroundColor: "rgba(5, 5, 5, 0)",
              backdropFilter: "blur(0px)",
              borderBottomColor: "rgba(255,255,255,0)",
              paddingTop: "24px",
              paddingBottom: "24px",
              paddingLeft: "0px",
              paddingRight: "0px",
              marginLeft: "0px",
              marginRight: "0px",
              borderRadius: "0px",
              border: "0px solid transparent",
              boxShadow: "0 0 0px rgba(0,0,0,0)",
              duration: 0.5,
              ease: "power2.out",
            });
          }
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all px-3 md:px-6 border-b border-transparent bg-transparent flex justify-center"
        style={{ minHeight: 48 }}
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between" style={{ minHeight: 48 }}>

          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-50">
            <div className="relative" style={{ width: 48, height: 48 }}>
              <Image
                src={logo}
                alt="ShipBridge"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 blur-md opacity-0 group-hover:opacity-30 bg-[#00ff87] transition-opacity duration-300" />
            </div>
          </Link>

          {/* Minimal Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/" className="nav-link text-white/60 hover:text-white transition-all text-[10px] tracking-[0.15em] uppercase relative group">
                Home
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/#services" className="nav-link text-white/60 hover:text-white transition-all text-[10px] tracking-[0.15em] uppercase relative group">
                Services
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/about" className="nav-link text-white/60 hover:text-white transition-all text-[10px] tracking-[0.15em] uppercase relative group">
                About
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/franchise" className="nav-link text-white/70 hover:text-[#00ff87] transition-all text-[10px] tracking-[0.15em] uppercase font-medium relative group">
                Franchise
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/contact" className="nav-link text-white/70 hover:text-[#00ff87] transition-all text-[10px] tracking-[0.15em] uppercase font-medium relative group">
                Contact
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white relative w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors z-50"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative w-5 h-5 flex flex-col items-center justify-center gap-1">
              <span className={`w-4 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`w-4 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ease-out-expo ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center gap-8">
          <div className="prismatic-dot">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Home
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              About
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/franchise" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Franchise
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
