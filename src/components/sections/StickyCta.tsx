"use client";
import { config } from "@/lib/config";
import { Phone, MessageCircle } from "lucide-react";

export default function StickyCta() {
  const hasWhatsapp = config.whatsapp && config.whatsapp.length > 0;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-slate-900/95 backdrop-blur border-t border-slate-700/50">
      {hasWhatsapp ? (
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${config.phoneRaw}`}
            onClick={() => { if (typeof window !== 'undefined' && window.ym) window.ym(109869067, 'reachGoal', 'tel-click'); }}
            className="btn-primary justify-center py-3 text-base"
          >
            <Phone className="w-5 h-5" />
            Позвонить
          </a>
          <a
            href={`https://wa.me/${config.whatsapp}`}
            onClick={() => { if (typeof window !== 'undefined' && window.ym) window.ym(109869067, 'reachGoal', 'whatsapp-click'); }}
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-base transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      ) : (
        <a
          href={`tel:${config.phoneRaw}`}
          onClick={() => { if (typeof window !== 'undefined' && window.ym) window.ym(109869067, 'reachGoal', 'tel-click'); }}
          className="btn-primary w-full justify-center py-3 text-base"
        >
          <Phone className="w-5 h-5" />
          Позвонить
        </a>
      )}
    </div>
  );
}
