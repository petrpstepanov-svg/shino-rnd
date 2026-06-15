import { config } from "@/lib/config";
import { Phone, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Спасибо за заявку — КубаньБурМастер",
  description: "Ваша заявка принята. Мы свяжемся с вами в ближайшее время.",
  robots: { index: false, follow: false },
};

export default function SpasiboPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
        >
          Спасибо за заявку!
        </h1>

        <p className="text-slate-300 text-lg mb-8">
          Мы свяжемся с вами в ближайшее время для бесплатной консультации.
        </p>

        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50 mb-8">
          <p className="text-slate-400 mb-2">Нужна срочная консультация? Позвоните прямо сейчас:</p>
          <a
            href={`tel:${config.phoneRaw}`}
            className="text-green-400 font-bold text-2xl hover:text-green-300 transition-colors"
          >
            {config.phone}
          </a>
        </div>

        <a href={`tel:${config.phoneRaw}`} className="btn-primary inline-flex">
          <Phone className="w-5 h-5" />
          Позвонить
        </a>

        <div className="mt-8">
          <a href="/" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
}
