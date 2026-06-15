"use client";

import { useState } from "react";
import { config } from "@/lib/config";
import { Phone, ChevronDown, Check } from "lucide-react";

export default function Pricing() {
  const [openRow, setOpenRow] = useState<number | null>(1);
  const t = config.sectionTitles;

  return (
    <section id="prices" className="section-pad bg-slate-800 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[300px] bg-green-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <span className="section-badge">{t.pricingBadge}</span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
          >
            {t.pricing}
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          {config.pricing.map((row, i) => {
            const popular = (row as any).popular;
            return (
              <div
                key={i}
                className={`premium-card overflow-hidden ${popular ? 'pricing-popular' : ''}`}
              >
                {popular && (
                  <div className="bg-green-500/10 py-1.5 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-green-400">
                      ⭐ Выбирают чаще всего
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setOpenRow(openRow === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex-1">
                    <div className="font-bold text-white text-base md:text-lg">{row.type}</div>
                    <div className="text-slate-500 text-sm">{row.depth}</div>
                  </div>
                  <div
                    className="font-extrabold text-xl md:text-2xl whitespace-nowrap text-green-400"
                    style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
                  >
                    {row.price}
                  </div>
                  {row.includes && row.includes.length > 0 && (
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${openRow === i ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {openRow === i && row.includes && row.includes.length > 0 && (
                  <div className="px-6 pb-5 border-t border-slate-700/30 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {row.includes.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-slate-300">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-slate-500 text-sm text-center mb-8 italic">
          * Финальная стоимость зависит от ситуации. Точную цену назовём по телефону.
        </p>

        <div className="text-center">
          <a href={`tel:${config.phoneRaw}`} className="btn-primary inline-flex">
            <Phone className="w-5 h-5" />
            Узнать точную цену
          </a>
        </div>
      </div>
    </section>
  );
}
