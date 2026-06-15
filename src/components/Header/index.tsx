"use client";

import { useState } from "react";
import { config } from "@/lib/config";
import { Phone } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-white font-bold text-base md:text-xl whitespace-nowrap" style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}>
            <span className="text-red-500 text-lg md:text-xl">{config.heroEmoji}</span>
            {config.company}
          </a>

          {/* Desktop phone */}
          <div className="hidden md:flex items-center gap-6">
            <span className="text-slate-400 text-sm">{config.workHours}</span>
            <a
              href={`tel:${config.phoneRaw}`}
              className="text-white font-bold text-lg hover:text-red-400 transition-colors"
            >
              {config.phone}
            </a>
          </div>

          {/* Mobile phone button */}
          <a
            href={`tel:${config.phoneRaw}`}
            className="md:hidden inline-flex items-center gap-1.5 text-white font-bold text-sm whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-red-500" />
            Позвонить
          </a>
        </div>
      </div>
    </header>
  );
}
