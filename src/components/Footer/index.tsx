import { config } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {config.company}. {config.footerText}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm">
            <span className="text-slate-500">{config.address}</span>
            <a
              href={`tel:${config.phoneRaw}`}
              className="text-red-400 font-bold hover:text-red-300 transition-colors"
            >
              {config.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
