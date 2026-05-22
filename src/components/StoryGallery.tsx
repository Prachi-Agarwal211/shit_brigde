"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
  { 
    id: "dashboard",
    src: "/gallery/shipbridge-dashboard.jpg", 
    alt: "ShipBridge AI Control Center", 
    title: "AI Unified Control Center",
    desc: "Monitor shipping across 20+ national couriers in one premium glass interface."
  },
  { 
    id: "warehouse",
    src: "/gallery/warehouse-operations.jpg", 
    alt: "Automated fulfillment & sorting hubs", 
    title: "Smart Fulfillment Hubs",
    desc: "Same-day dispatch enabled by automated sorting and packaging technology."
  },
  { 
    id: "network",
    src: "/gallery/delivery-network.jpg", 
    alt: "India shipping and transit routes map", 
    title: "Pan-India Shipping Network",
    desc: "Connecting 29,000+ pin codes with reliable courier integration."
  },
  { 
    id: "analytics",
    src: "/gallery/analytics-view.jpg", 
    alt: "Fulfillment and delivery statistics screen", 
    title: "Real-Time Tracking & Analytics",
    desc: "Predictive analytics to reduce RTO rates and improve shipping success."
  },
  { 
    id: "mobile",
    src: "/gallery/mobile-tracking.jpg", 
    alt: "Customer mobile tracking app mock", 
    title: "End-to-End Tracking",
    desc: "Stunning WhatsApp updates and tracking portals customized with your brand."
  },
  { 
    id: "team",
    src: "/gallery/team-operations.jpg", 
    alt: "24/7 client operations dashboard", 
    title: "Dedicated Operational Support",
    desc: "Automated NDR management and instant customer issue resolution."
  },
  { 
    id: "cod",
    src: "/gallery/cod-management.jpg", 
    alt: "Fast COD remittance interface", 
    title: "Instant COD Remittance",
    desc: "Receive your Cash on Delivery cashflow in 2 days to maintain SME liquidity."
  },
  { 
    id: "courier",
    src: "/gallery/courier-partners.jpg", 
    alt: "Courier cost and rating metrics", 
    title: "AI-Powered Carrier Engine",
    desc: "Instantly compare prices, delivery times, and SLA history for every order."
  },
];

interface GalleryItemProps {
  id: string;
  src: string;
  alt: string;
  title: string;
  desc: string;
}

function GalleryItem({ id, src, alt, title, desc }: GalleryItemProps) {
  const [imageError, setImageError] = useState(false);

  const renderFallback = () => {
    switch (id) {
      case "dashboard":
        return (
          <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" rx="16" fill="black" fillOpacity="0.3" />
            <rect x="20" y="20" width="360" height="50" rx="8" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.1" />
            <circle cx="50" cy="45" r="12" fill="#00ff87" fillOpacity="0.2" stroke="#00ff87" strokeWidth="1.5" />
            <rect x="75" y="38" width="80" height="6" rx="3" fill="white" fillOpacity="0.4" />
            <rect x="75" y="48" width="120" height="4" rx="2" fill="white" fillOpacity="0.2" />
            <circle cx="350" cy="45" r="8" fill="#f97316" />
            
            <rect x="20" y="90" width="170" height="190" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <path d="M40 230 C 70 200, 100 250, 130 180 C 150 160, 170 180, 180 150" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" />
            <path d="M40 230 C 70 200, 100 250, 130 180 C 150 160, 170 180, 180 150" stroke="white" strokeOpacity="0.2" strokeWidth="8" strokeLinecap="round" />
            
            <rect x="210" y="90" width="170" height="85" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <circle cx="295" cy="132" r="24" stroke="white" strokeOpacity="0.1" strokeWidth="4" />
            <circle cx="295" cy="132" r="24" stroke="#f97316" strokeWidth="4" strokeDasharray="150" strokeDashoffset="45" strokeLinecap="round" />
            
            <rect x="210" y="195" width="170" height="85" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <line x1="230" y1="225" x2="360" y2="225" stroke="white" strokeOpacity="0.1" strokeWidth="4" strokeLinecap="round" />
            <line x1="230" y1="225" x2="330" y2="225" stroke="#00ff87" strokeWidth="4" strokeLinecap="round" />
            <line x1="230" y1="250" x2="360" y2="250" stroke="white" strokeOpacity="0.1" strokeWidth="4" strokeLinecap="round" />
            <line x1="230" y1="250" x2="280" y2="250" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case "warehouse":
        return (
          <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" rx="16" fill="black" fillOpacity="0.3" />
            <g opacity="0.3">
              <line x1="50" y1="0" x2="50" y2="300" stroke="white" strokeWidth="1" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="white" strokeWidth="1" />
              <line x1="250" y1="0" x2="250" y2="300" stroke="white" strokeWidth="1" />
              <line x1="350" y1="0" x2="350" y2="300" stroke="white" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="1" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="1" />
            </g>
            <rect x="70" y="40" width="60" height="40" rx="6" fill="#00ff87" fillOpacity="0.15" stroke="#00ff87" strokeWidth="1.5" />
            <path d="M85 50 H 115 M 85 60 H 105" stroke="#00ff87" strokeWidth="2" strokeLinecap="round" />
            
            <rect x="270" y="140" width="60" height="40" rx="6" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="1.5" />
            <path d="M285 150 H 315 M 285 160 H 305" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
            
            <circle cx="200" cy="150" r="16" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="150" r="4" fill="#00ff87" />
          </svg>
        );
      case "network":
        return (
          <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" rx="16" fill="black" fillOpacity="0.3" />
            <circle cx="160" cy="80" r="4" fill="#f97316" />
            <circle cx="140" cy="140" r="4" fill="#00ff87" />
            <circle cx="220" cy="180" r="4" fill="#00ff87" />
            <circle cx="180" cy="240" r="4" fill="#f97316" />
            
            <path d="M160 80 Q 150 110, 140 140" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M140 140 Q 180 160, 220 180" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M220 180 Q 200 210, 180 240" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M160 80 Q 200 160, 180 240" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 3" />
            
            <circle cx="140" cy="140" r="12" stroke="#00ff87" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx="220" cy="180" r="16" stroke="#00ff87" strokeOpacity="0.3" strokeWidth="1" />
          </svg>
        );
      case "analytics":
        return (
          <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" rx="16" fill="black" fillOpacity="0.3" />
            <path d="M 40 240 L 360 240" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
            <path d="M 40 40 L 40 240" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
            
            <path d="M 40 200 C 90 120, 140 220, 190 140 C 240 60, 290 120, 340 80" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            
            <path d="M 40 180 C 90 160, 140 100, 190 90 C 240 80, 290 50, 340 40" fill="none" stroke="#00ff87" strokeWidth="4" strokeLinecap="round" />
            <path d="M 40 180 C 90 160, 140 100, 190 90 C 240 80, 290 50, 340 40 L 340 240 L 40 240 Z" fill="url(#gradient-green-gallery)" fillOpacity="0.05" />
            
            <defs>
              <linearGradient id="gradient-green-gallery" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff87" />
                <stop offset="100%" stopColor="#00ff87" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "mobile":
        return (
          <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" rx="16" fill="black" fillOpacity="0.3" />
            <rect x="130" y="20" width="140" height="260" rx="18" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.15" strokeWidth="2" />
            <rect x="175" y="27" width="50" height="8" rx="4" fill="white" fillOpacity="0.2" />
            <circle cx="200" cy="265" r="8" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
            
            <circle cx="160" cy="70" r="6" fill="#00ff87" />
            <rect x="175" y="66" width="60" height="8" rx="3" fill="white" fillOpacity="0.6" />
            <line x1="160" y1="76" x2="160" y2="194" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
            
            <circle cx="160" cy="115" r="6" fill="#00ff87" />
            <rect x="175" y="111" width="70" height="8" rx="3" fill="white" fillOpacity="0.6" />
            
            <circle cx="160" cy="160" r="6" fill="#f97316" />
            <rect x="175" y="156" width="50" height="8" rx="3" fill="white" fillOpacity="0.6" />
            
            <circle cx="160" cy="205" r="6" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.2" />
            <rect x="175" y="201" width="55" height="8" rx="3" fill="white" fillOpacity="0.3" />
          </svg>
        );
      case "team":
        return (
          <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" rx="16" fill="black" fillOpacity="0.3" />
            <circle cx="100" cy="150" r="40" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <circle cx="300" cy="150" r="40" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <circle cx="200" cy="150" r="48" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            
            <circle cx="200" cy="150" r="28" fill="#00ff87" fillOpacity="0.1" stroke="#00ff87" strokeWidth="1.5" strokeDasharray="3 3" />
            
            <path d="M170 150 H 230 M 200 120 V 180" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="150" r="6" fill="#f97316" />
          </svg>
        );
      case "cod":
        return (
          <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" rx="16" fill="black" fillOpacity="0.3" />
            <circle cx="200" cy="130" r="50" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <circle cx="200" cy="130" r="35" stroke="#00ff87" strokeWidth="3" strokeDasharray="180" strokeDashoffset="40" />
            
            <path d="M120 180 C 150 140, 250 140, 280 180" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
            
            <text x="200" y="137" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">₹</text>
            <rect x="135" y="210" width="130" height="32" rx="16" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
            <circle cx="155" cy="226" r="6" fill="#00ff87" />
            <rect x="170" y="222" width="75" height="8" rx="4" fill="white" fillOpacity="0.7" />
          </svg>
        );
      case "courier":
        return (
          <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" rx="16" fill="black" fillOpacity="0.3" />
            <rect x="40" y="40" width="90" height="90" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <circle cx="85" cy="85" r="16" stroke="#00ff87" strokeWidth="2" />
            
            <rect x="155" y="40" width="90" height="90" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <path d="M180 85 L 220 85" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
            
            <rect x="270" y="40" width="90" height="90" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <rect x="295" y="75" width="40" height="20" rx="4" fill="#00ff87" fillOpacity="0.2" />
            
            <rect x="40" y="170" width="90" height="90" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <rect x="155" y="170" width="90" height="90" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
            <rect x="270" y="170" width="90" height="90" rx="12" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.05" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="gallery-img-wrap flex-shrink-0 relative overflow-hidden rounded-3xl group border border-white/[0.08] w-full h-[320px] sm:h-[360px] md:w-[40vw] md:h-full md:max-w-[700px]"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover transition-all duration-700 group-hover:scale-105"
          style={{ filter: "grayscale(0.2) brightness(0.7)" }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950/80 transition-all duration-500">
          {renderFallback()}
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col gap-2 z-10">
        <h3 className="text-white text-base md:text-lg font-bold tracking-wide font-sans group-hover:text-[#00ff87] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed font-sans max-w-md translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out-expo">
          {desc}
        </p>
      </div>

      <div className="absolute top-0 right-0 w-24 h-24 bg-radial-gradient from-[#00ff87]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-radial-gradient from-[#f97316]/5 to-transparent pointer-events-none" />
    </div>
  );
}

export default function StoryGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.to(track, {
          xPercent: -50,
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });

        const images = track.querySelectorAll(".gallery-img-wrap");
        images.forEach((img) => {
          gsap.fromTo(img,
            { scale: 1.08 },
            {
              scale: 1.0,
              scrollTrigger: {
                trigger: img,
                start: "left 90%",
                end: "left 20%",
                scrub: 2,
              },
            }
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 py-16 md:py-32 overflow-hidden bg-transparent md:h-screen flex flex-col justify-center">
      <div className="px-6 md:px-12 mb-10 md:mb-0 md:absolute md:top-12 md:left-12 z-10">
        <span className="text-[#00ff87] text-[10px] tracking-[0.4em] uppercase font-bold">
          In Action
        </span>
        <h2 className="text-white text-3xl font-bold tracking-tight mt-2 font-sans md:hidden">
          Seamless Logistics Operations
        </h2>
      </div>

      <div className="overflow-visible w-full">
        <div
          ref={trackRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-6 md:gap-8 px-6 md:px-12 w-full md:w-[400vw] h-auto md:h-[65vh]"
          style={{ willChange: "transform" }}
        >
          {galleryImages.map((img, i) => (
            <GalleryItem
              key={i}
              id={img.id}
              src={img.src}
              alt={img.alt}
              title={img.title}
              desc={img.desc}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#09090b] to-transparent pointer-events-none z-10" />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#09090b] to-transparent pointer-events-none z-10" />
    </section>
  );
}
