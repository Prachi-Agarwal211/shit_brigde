"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../../public/logo_new.png";
import ScrollProgress from "./ScrollProgress";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const auth = sessionStorage.getItem("shipbridge-auth");
        setIsAuthenticated(auth === "true");
      }
    };
    checkAuth();
    window.addEventListener("shipbridge-auth-change", checkAuth);
    return () => {
      window.removeEventListener("shipbridge-auth-change", checkAuth);
    };
  }, []);

  // Mobile menu stagger animation
  useEffect(() => {
    const nav = mobileNavRef.current;
    if (!nav) return;
    const links = nav.querySelectorAll('.prismatic-dot');
    if (mobileMenuOpen) {
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, ease: "expo.out", duration: 0.8, overwrite: true }
      );
    } else {
      gsap.to(links, { y: 20, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true });
    }
  }, [mobileMenuOpen]);

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

  if (pathname === "/chat") return null;

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
              <Link href="/how-it-works" className="nav-link text-white/60 hover:text-white transition-all text-[10px] tracking-[0.15em] uppercase relative group">
                How It Works
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/integrations" className="nav-link text-white/60 hover:text-white transition-all text-[10px] tracking-[0.15em] uppercase relative group">
                Integrations
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/faq" className="nav-link text-white/60 hover:text-white transition-all text-[10px] tracking-[0.15em] uppercase relative group">
                FAQ
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/pricing" className="nav-link text-white/60 hover:text-white transition-all text-[10px] tracking-[0.15em] uppercase relative group">
                Pricing
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/franchise" className="nav-link text-white/60 hover:text-white transition-all text-[10px] tracking-[0.15em] uppercase relative group">
                Franchise
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/orders" className="nav-link text-white/70 hover:text-[#00ff87] transition-all text-[10px] tracking-[0.15em] uppercase font-medium relative group">
                Orders Hub
                <div className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
              </Link>
            </div>
            <div className="chromatic-ring rounded-full px-3 py-1">
              <Link href="/about" className="nav-link text-white/70 hover:text-[#00ff87] transition-all text-[10px] tracking-[0.15em] uppercase font-medium relative group">
                About
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

          {/* AI Console CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href={isAuthenticated ? "/chat" : "/login"}
              className="px-5 py-2.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-bold transition-all duration-300 bg-white/5 border border-white/10 hover:border-[#00ff87]/50 hover:bg-[#00ff87]/10 hover:text-[#00ff87] hover:shadow-[0_0_20px_rgba(0,255,135,0.25)] flex items-center gap-1.5"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isAuthenticated ? 'bg-[#00ff87] animate-pulse' : 'bg-white/40'}`} />
              {isAuthenticated ? "AI Console" : "Client Portal"}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white relative w-11 h-11 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors z-50 font-sans"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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
        ref={mobileNavRef}
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ease-out-expo ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center gap-8">
          <div className="prismatic-dot">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Home
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              How It Works
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/integrations" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Integrations
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              FAQ
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Pricing
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/franchise" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Franchise
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Orders Hub
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              About
            </Link>
          </div>
          <div className="prismatic-dot">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-medium text-white hover:text-[#00ff87] transition-colors">
              Contact
            </Link>
          </div>
          <div className="prismatic-dot mt-4">
            <Link href={isAuthenticated ? "/chat" : "/login"} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold text-[#00ff87] hover:text-white transition-colors flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isAuthenticated ? 'bg-[#00ff87] animate-pulse' : 'bg-white/40'}`} />
              {isAuthenticated ? "AI Console" : "Client Portal"}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
