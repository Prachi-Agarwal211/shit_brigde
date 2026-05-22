"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackgroundPaperShaders from "@/components/BackgroundPaperShaders";
import SectionAurora from "@/components/SectionAurora";
import TextReveal from "@/components/TextReveal";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("shipbridge-auth");
      if (auth === "true") {
        router.push("/chat");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    // Simple validations
    if (!email || !password || (isRegister && !name)) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    // Mock API call
    setTimeout(() => {
      setLoading(false);
      if (isRegister) {
        setSuccessMsg("Account created successfully! You can now log in.");
        setIsRegister(false);
        setPassword("");
      } else {
        // Log in
        sessionStorage.setItem("shipbridge-auth", "true");
        sessionStorage.setItem("shipbridge-user-name", email.split("@")[0]);
        // Trigger event for header component
        window.dispatchEvent(new Event("shipbridge-auth-change"));
        router.push("/chat");
      }
    }, 1200);
  };

  return (
    <main className="relative min-h-screen text-white flex items-center justify-center px-4 overflow-hidden py-24 bg-transparent font-sans">
      <BackgroundPaperShaders />
      <SectionAurora variant="dual" className="opacity-40" />

      {/* Back to Home Button */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/50 hover:text-[#00ff87] text-xs uppercase tracking-widest transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Main glass card */}
      <div 
        className="w-full max-w-md relative z-10 p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden"
        style={{
          boxShadow: "0 0 0 1px rgba(0,255,135,0.15), 0 8px 32px rgba(0,0,0,0.6)"
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/40 to-transparent" />
        
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-[#f97316] text-[9px] tracking-[0.3em] uppercase font-bold mb-2 block">
            ShipBridge Console
          </span>
          <TextReveal 
            text={isRegister ? "Create Account" : "Access Console"} 
            elementType="h2"
            className="text-3xl font-bold tracking-tight text-white mb-2"
          />
          <p className="text-xs text-white/40 leading-relaxed font-light">
            {isRegister 
              ? "Register to start shipping across 29,000+ Indian pin codes." 
              : "Sign in to monitor RTO metrics and run AI shipping routes."}
          </p>
        </div>

        {/* Success/Error Toast */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-400 text-xs leading-normal">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl border border-[#00ff87]/20 bg-[#064e3b]/20 text-[#00ff87] text-xs leading-normal">
            {successMsg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-white/5 mb-6 relative">
          <button 
            type="button"
            onClick={() => { setIsRegister(false); setError(""); setSuccessMsg(""); }}
            className={`flex-1 pb-3 text-xs uppercase tracking-wider font-bold transition-all ${
              !isRegister ? "text-[#00ff87]" : "text-white/30 hover:text-white/60"
            }`}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => { setIsRegister(true); setError(""); setSuccessMsg(""); }}
            className={`flex-1 pb-3 text-xs uppercase tracking-wider font-bold transition-all ${
              isRegister ? "text-[#00ff87]" : "text-white/30 hover:text-white/60"
            }`}
          >
            Register
          </button>
          {/* Slider bar */}
          <div 
            className="absolute bottom-0 h-[2px] bg-[#00ff87] transition-all duration-300"
            style={{
              width: "50%",
              left: isRegister ? "50%" : "0%"
            }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                Company / Contact Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Priya Sharma"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff87]/50 focus:shadow-[0_0_15px_rgba(0,255,135,0.1)] transition-all font-sans"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
              Email Address
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya@mybrand.in"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff87]/50 focus:shadow-[0_0_15px_rgba(0,255,135,0.1)] transition-all font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff87]/50 focus:shadow-[0_0_15px_rgba(0,255,135,0.1)] transition-all font-sans"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                loading
                  ? "bg-white/10 text-white/40 pointer-events-none"
                  : "bg-[#00ff87] text-black hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(0,255,135,0.3)]"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                isRegister ? "Create Account" : "Access AI Console"
              )}
            </button>
          </div>
        </form>

        {/* Disclaimer / Mock note */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/20 leading-relaxed font-light">
            Demo Portal: Enter any credentials to sign in. <br/>
            Passwords are not stored.
          </p>
        </div>
      </div>
    </main>
  );
}
