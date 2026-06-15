import { config } from "@/lib/config";

export default function Steps() {
  const t = config.sectionTitles;

  return (
    <section id="steps" className="section-pad bg-slate-900 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <div className="text-center mb-14">
          <span className="section-badge">{t.stepsBadge}</span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
          >
            {t.steps}
          </h2>
        </div>

        <div className="relative">
          {/* Линия таймлайна (десктоп) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(34,197,94,0.25) 50%, rgba(255,255,255,0) 100%)' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Точка на линии */}
                <div className="hidden lg:flex absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-green-500 border-4 border-slate-900 z-10 items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <div className="premium-card p-7 text-center lg:mt-16">
                  {/* Время */}
                  <div className="inline-block text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-3 py-1 rounded-full mb-4">
                    {(step as any).time || step.num}
                  </div>

                  <div
                    className="text-4xl font-extrabold text-white/10 mb-2"
                    style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
