import { config } from "@/lib/config";
import { Star, ExternalLink } from "lucide-react";

export default function SocialProof() {
  const { stats, rating, reviewCount } = config.socialProof;
  const t = config.sectionTitles;

  return (
    <section id="social-proof" className="section-pad bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="section-badge">{t.socialProofBadge || "Почему нам стоит позвонить"}</span>
        </div>

        {/* Rating + Reviews + Yandex Maps link */}
        <div className="flex flex-col items-center gap-4 mb-14">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">{rating}</span>
            <span className="text-slate-400 text-sm">
              {reviewCount} отзывов на{" "}
              <a
                href="https://shinomomento.clients.site/#rating"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors font-medium"
              >
                <span className="font-bold">Я</span> Яндекс Карты
                <ExternalLink className="w-3 h-3" />
              </a>
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="premium-card p-6 md:p-8 text-center">
              <div
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-400 mb-2"
                style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs md:text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
