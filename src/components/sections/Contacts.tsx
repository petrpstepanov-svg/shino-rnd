"use client";
import { config } from "@/lib/config";
import { Phone, MapPin, Clock } from "lucide-react";

export default function Contacts() {
  const t = config.sectionTitles;

  return (
    <section id="contacts" className="section-pad bg-slate-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <span className="section-badge">{t.contactsBadge}</span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
          >
            {t.contacts}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact info */}
          <div className="premium-card p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Телефон</div>
                  <a
                    href={`tel:${config.phoneRaw}`}
                    onClick={() => { if (typeof window !== 'undefined' && window.ym) window.ym(109869067, 'reachGoal', 'tel-click'); }}
                    className="text-white font-bold text-xl hover:text-green-400 transition-colors"
                  >
                    {config.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Адрес</div>
                  <div className="text-white">{config.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Время работы</div>
                  <div className="text-white">{config.workHours}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={`tel:${config.phoneRaw}`}
                onClick={() => { if (typeof window !== 'undefined' && window.ym) window.ym(109869067, 'reachGoal', 'tel-click'); }}
                className="btn-primary w-full justify-center flex-col items-center"
              >
                <span className="flex items-center gap-2 font-bold">
                  <Phone className="w-5 h-5" />
                  Позвонить сейчас
                </span>
                <span className="text-sm font-medium opacity-90 mt-1">{config.phone}</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="premium-card p-8">
            <h3 className="text-xl font-bold text-white mb-6">Оставить заявку</h3>
            <form action="/spasibo/" method="GET" className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Ваше имя *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Иван"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Тип обращения</label>
                <select
                  name="type"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                >
                  {config.contactFormOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                onClick={() => { if (typeof window !== 'undefined' && window.ym) window.ym(109869067, 'reachGoal', 'contact-form-submit'); }}
                className="btn-primary w-full justify-center"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
