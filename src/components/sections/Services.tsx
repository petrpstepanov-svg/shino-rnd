import { config } from "@/lib/config";
import * as Icons from "lucide-react";

export default function Services() {
  const t = config.sectionTitles;
  const services = config.services;

  return (
    <section id="services" className="section-pad bg-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-badge">{t.servicesBadge}</span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
          >
            {t.services}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const IconComp = (Icons as any)[service.icon] || Icons.Circle;
            const featured = (service as any).featured;

            return (
              <div
                key={i}
                className={`premium-card p-7 flex flex-col ${featured ? 'ring-1 ring-green-500/20 lg:row-span-1' : ''}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${featured ? 'bg-green-500/15' : 'bg-slate-700/40'}`}>
                    <IconComp className={`w-6 h-6 ${featured ? 'text-green-400' : 'text-slate-300'}`} />
                  </div>
                  {featured && (
                    <span className="text-[10px] uppercase tracking-wider text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">
                      Топ
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
