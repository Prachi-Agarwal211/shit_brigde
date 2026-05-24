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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: "+=50",
        onUpdate: (self) => {
          if (self.scroll() > 50) {
            gsap.to(headerRef.current, {
              backgroundColor: "rgba(2, 2, 3, 0.8)",
              backdropFilter: "blur(20px)",
              borderBottomColor: "rgba(0, 255, 135, 0.2)",
              paddingTop: "12px",
              paddingBottom: "12px",
              duration: 0.4,
              ease: "power2.out",
            });
          } else {
            gsap.to(headerRef.current, {
              backgroundColor: "transparent",
              backdropFilter: "blur(0px)",
              borderBottomColor: "transparent",
              paddingTop: "24px",
              paddingBottom: "24px",
              duration: 0.4,
              ease: "power2.out",
            });
          }
        },
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  if (pathname === "/chat") return null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Franchise", href: "/franchise" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <ScrollProgress />
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all px-6 md:px-12 border-b border-transparent flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-10 h-10 border border-[#FF9933]/30 rounded-lg flex items-center justify-center bg-black overflow-hidden">
            <Image src={logo} alt="ShipBridge" width={24} height={24} className="object-contain z-10" />
            <div className="absolute inset-0 bg-[#FF9933]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden sm:flex flex-col -gap-1">
            <span className="text-sm font-bold tracking-tighter text-white">SHIPBRIDGE</span>
            <span className="text-[8px] font-mono text-[#FF9933] tracking-[0.2em]">BHARAT_NODE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#FF9933] transition-all relative group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FF9933] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle & Status */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Network Status</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-[#FF9933] animate-pulse" />
              <span className="text-[9px] font-mono text-[#FF9933] font-bold">PAN-INDIA ACTIVE</span>
            </div>
          </div>
          
          <button 
            className="lg:hidden text-white w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="w-full h-[1px] bg-white" />
              <span className="w-2/3 h-[1px] bg-[#FF9933]" />
              <span className="w-full h-[1px] bg-white" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] bg-black transition-transform duration-500 ease-out-expo ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col p-8 md:p-12 logistics-grid overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <span className="text-terminal text-xs">NAVIGATION</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-terminal text-xs">[ CLOSE ]</button>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((item, i) => (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl md:text-4xl font-bold tracking-tighter hover:text-[#FF9933] transition-colors flex items-center gap-4"
              >
                <span className="text-xs font-mono text-[#FF9933]">0{i+1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-12 border-t border-white/10">
            <p className="text-[10px] font-mono text-white/20 leading-relaxed uppercase tracking-[0.2em]">
              ShipBridge // Pan-India Logistics Network<br/>
              Built for Indian Commerce
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
