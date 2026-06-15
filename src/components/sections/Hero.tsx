"use client";
import { config } from "@/lib/config";
import { Phone } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.heroBgImage}
          alt={config.heroAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/35" />
      </div>

      {/* Content on semi-transparent plate */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 w-full py-20">
        <div className="bg-slate-900/55 backdrop-blur-sm rounded-2xl p-6 sm:p-10 md:p-14 text-center border border-slate-700/30">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight"
            style={{
              fontFamily: 'var(--font-unbounded), sans-serif',
              background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 50%, #22c55e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {config.heroTitle}<br />{config.cityPrepositional}
          </h1>

          <p className="text-lg md:text-xl text-white mb-3 font-semibold drop-shadow-lg">
            {config.heroSubtitle} {config.priceFrom}
          </p>

          <p className="text-sm md:text-base text-slate-100 mb-8 max-w-xl mx-auto font-medium drop-shadow">
            {config.heroBadge}
          </p>

          <a
            href={`tel:${config.phoneRaw}`}
            onClick={() => { if (typeof window !== 'undefined' && window.ym) window.ym(109869067, 'reachGoal', 'tel-click'); }}
            className="btn-primary inline-flex flex-col items-center text-center px-8 py-4 md:px-10 md:py-5"
          >
            <span className="flex items-center gap-2 text-base md:text-lg font-bold">
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
              {config.ctaButtonText}
            </span>
            <span className="text-sm md:text-base font-medium opacity-90 mt-1">
              {config.phone}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
