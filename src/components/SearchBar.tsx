"use client";

import { useState, useRef } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Enter your tracking number (e.g. SB-100294-IN)...",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`search-conic-border ${focused ? "focused" : ""} flex items-center w-full max-w-2xl mx-auto border border-white/[0.08] transition-all duration-300 ${
        focused ? "shadow-[0_0_30px_rgba(0,255,135,0.15)] border-transparent" : "shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      } ${className}`}
    >
      <div className="relative flex items-center w-full min-h-[52px] px-4 rounded-full overflow-hidden">
        {/* Search Icon */}
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${focused ? "text-[#00ff87]" : "text-white/40"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none px-3 text-sm md:text-base text-white placeholder-white/30 min-h-[48px] font-sans"
        />

        {/* Submit Arrow Button */}
        <button
          type="submit"
          aria-label="Submit search"
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 cursor-pointer ${
            query.trim()
              ? "bg-[#00ff87] text-black shadow-[0_0_15px_rgba(0,255,135,0.4)] hover:scale-105 active:scale-95"
              : "bg-white/5 text-white/20 pointer-events-none"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </form>
  );
}
