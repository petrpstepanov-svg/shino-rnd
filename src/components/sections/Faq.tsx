"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { config } from "@/lib/config";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const t = config.sectionTitles;

  return (
    <section id="faq" className="section-pad bg-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-badge">{t.faqBadge}</span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
          >
            {t.faq}
          </h2>
        </div>

        <div className="space-y-4">
          {config.faq.map((faq, i) => (
            <div
              key={i}
              className="premium-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-white font-semibold text-base md:text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-green-400 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
