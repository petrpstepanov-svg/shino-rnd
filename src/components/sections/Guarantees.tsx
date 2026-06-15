import { config } from "@/lib/config";
import * as Icons from "lucide-react";

export default function Guarantees() {
  const t = config.sectionTitles;

  return (
    <section id="guarantees" className="section-pad bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <span className="section-badge">{t.guaranteesBadge}</span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
          >
            {t.guarantees}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {config.guarantees.map((item, i) => {
            const IconComp = (Icons as any)[item.icon] || Icons.ShieldCheck;
            return (
              <div key={i} className="premium-card p-7 text-center">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <IconComp className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
