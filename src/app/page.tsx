"use client";

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Clock,
  MapPin,
  Star,
  ChevronDown,
  Shield,
  Truck,
  Wrench,
  CircleDot,
  Check,
  AlertTriangle,
  Zap,
  Users,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─────────── Constants ─────────── */
const PHONE = "+7 (863) 200-09-09";
const PHONE_HREF = "tel:+78632000909";

/* ─────────── Animated Counter ─────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
  delayMs = 400,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delayMs?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [target, duration, delayMs]);

  return (
    <span>
      {prefix}
      {count.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

/* ─────────── Reveal on Scroll ─────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────── Sticky CTA Bar (mobile) ─────────── */
function StickyCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handle = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className={`sticky-cta ${show ? "visible" : ""}`}>
      <div className="bg-brand shadow-2xl shadow-brand/30 px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-white text-sm font-medium hidden sm:block">
          ШиноМоменто — приедем за 20 минут
        </div>
        <a href={PHONE_HREF} className="flex-1 sm:flex-none">
          <Button className="w-full sm:w-auto bg-emergency hover:bg-emergency-dark text-white font-bold text-base rounded-xl px-6 py-3 h-auto pulse-call relative">
            <Phone className="w-5 h-5 mr-2" />
            Позвонить сейчас
          </Button>
        </a>
      </div>
    </div>
  );
}

/* ─────────── Navigation ─────────── */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center">
            <CircleDot className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-black text-brand">Шино</span>
            <span className="text-lg font-black text-dark">Моменто</span>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
          <button
            onClick={() => scrollTo("services")}
            className="hover:text-brand transition-colors"
          >
            Услуги
          </button>
          <button
            onClick={() => scrollTo("prices")}
            className="hover:text-brand transition-colors"
          >
            Цены
          </button>
          <button
            onClick={() => scrollTo("how")}
            className="hover:text-brand transition-colors"
          >
            Как работаем
          </button>
          <button
            onClick={() => scrollTo("faq")}
            className="hover:text-brand transition-colors"
          >
            Вопросы
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden sm:flex items-center gap-2 text-brand font-bold text-sm"
          >
            <Phone className="w-4 h-4" />
            {PHONE}
          </a>
          <a href={PHONE_HREF}>
            <Button className="bg-emergency hover:bg-emergency-dark text-white font-bold text-sm rounded-full px-4 sm:px-5 h-9 sm:h-10">
              <Phone className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Позвонить</span>
              <span className="sm:hidden">Звонок</span>
            </Button>
          </a>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1.5">
              <div
                className={`w-6 h-0.5 bg-foreground transition-all ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-foreground transition-all ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-foreground transition-all ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b shadow-lg">
          <div className="px-4 py-4 space-y-3 text-sm">
            {[
              ["Услуги", "services"],
              ["Цены", "prices"],
              ["Как работаем", "how"],
              ["Вопросы", "faq"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left text-foreground hover:text-brand transition-colors py-2 font-medium"
              >
                {label}
              </button>
            ))}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-brand font-bold py-2"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─────────── HERO — Emergency-style, call-focused ─────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand via-brand-light to-blue-500 rounded-b-[2rem] sm:rounded-b-[3rem]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Urgent badge */}
      <div className="absolute top-20 left-0 right-0 flex justify-center z-10 px-4">
        <Reveal>
          <div className="bg-emergency text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 emergency-pulse shadow-lg shadow-emergency/30 text-center justify-center">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Пробили колесо? Стоите на обочине?<br className="sm:hidden" /> Звоните прямо сейчас!</span>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-16 text-center">
        <Reveal delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Выездной шиномонтаж
            <br />
            <span className="text-action">Приедем за 20 минут</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            5 экипажей по всему Ростову. Работаем <strong>24/7</strong>, даже
            ночью. Любые диаметры R12–R24. Легковые, внедорожники, Газели.
          </p>
        </Reveal>

        {/* GIANT call button */}
        <Reveal delay={300}>
          <div className="flex flex-col items-center gap-4 mb-10">
            <a href={PHONE_HREF} className="group">
              <Button className="bg-emergency hover:bg-emergency-dark text-white font-black text-xl sm:text-2xl rounded-2xl px-10 sm:px-14 py-7 sm:py-8 h-auto shadow-2xl shadow-emergency/40 pulse-call relative transition-all group-hover:scale-105">
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 mr-3" />
                {PHONE}
              </Button>
            </a>
            <p className="text-blue-200 text-sm">
              Выезжаем через 1 минуту после звонка
            </p>
          </div>
        </Reveal>

        {/* Trust metrics */}
        <Reveal delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {[
              {
                value: 20,
                suffix: " мин",
                label: "средний выезд",
                icon: <Timer className="w-5 h-5" />,
              },
              {
                value: 5,
                suffix: "",
                label: "экипажей в городе",
                icon: <Truck className="w-5 h-5" />,
              },
              {
                value: 49,
                suffix: "",
                label: "4.9 на Яндекс Картах",
                icon: <Star className="w-5 h-5" />,
                prefix: "",
                displayOverride: "4.9",
              },
              {
                value: 800,
                suffix: " ₽",
                label: "выезд от",
                icon: <Zap className="w-5 h-5" />,
                prefix: "",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 text-white"
              >
                <div className="flex items-center justify-center gap-1 mb-1 text-action">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl font-black">
                  {"displayOverride" in stat && stat.displayOverride
                    ? stat.displayOverride
                    : stat.prefix}
                  {"displayOverride" in stat && stat.displayOverride
                    ? stat.suffix
                    : ""}
                  {!("displayOverride" in stat && stat.displayOverride) && (
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  )}
                </div>
                <div className="text-xs sm:text-sm text-blue-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Pain Triggers Section ─────────── */
function PainSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
              Знакомая ситуация?
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              emoji: "🔧",
              title: "Пробили колесо на трассе",
              desc: "Стоите на обочине, не знаете что делать? Звоните — приедем за 20 минут и всё починим.",
            },
            {
              emoji: "❄️",
              title: "Срочно нужна зимняя резина",
              desc: "Первый снег, а вы ещё на летней? Заменим резину с выездом к вам — не нужно никуда ехать.",
            },
            {
              emoji: "🌙",
              title: "Прокол ночью — все закрыто",
              desc: "Шиномонтажки не работают, а ехать надо? Мы работаем 24/7, даже в 3 часа ночи.",
            },
            {
              emoji: "🚐",
              title: "Газель встала — работа стоит",
              desc: "Коммерческий транспорт — наша специализация. Газель, Sprinter, Crafter — работаем со спаркой.",
            },
            {
              emoji: "🔒",
              title: "Секретку не открутить",
              desc: "Потеряли ключ от секретных болтов? Снимем без повреждения диска.",
            },
            {
              emoji: "⏰",
              title: "Нет времени ехать в сервис",
              desc: "Работа, дети, дела — некогда сидеть в очереди? Приедем к вам домой или в офис.",
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA after pain */}
        <Reveal delay={300}>
          <div className="text-center mt-10">
            <a href={PHONE_HREF}>
              <Button className="bg-emergency hover:bg-emergency-dark text-white font-bold text-lg rounded-xl px-8 py-5 h-auto shadow-lg shadow-emergency/20">
                <Phone className="w-5 h-5 mr-2" />
                Звоните — выезжаем через 1 минуту
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Services ─────────── */
function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-brand text-sm font-bold uppercase tracking-widest">
              Что мы делаем
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-foreground">
              Услуги выездного шиномонтажа
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: <Truck className="w-7 h-7" />,
              title: "Выездной шиномонтаж",
              desc: "Приедем в любую точку Ростова за 20 минут. Работаем на месте — не нужно тащить колесо в сервис.",
              hot: true,
            },
            {
              icon: <CircleDot className="w-7 h-7" />,
              title: "Сезонная замена резины",
              desc: "Комплекс: снять/поставить, демонтаж/монтаж, балансировка. Седан, внедорожник, коммерческий транспорт.",
              hot: true,
            },
            {
              icon: <Wrench className="w-7 h-7" />,
              title: "Ремонт проколов и порезов",
              desc: "Жгут, латка, двойной метод — без снятия колеса. Быстро и надёжно.",
              hot: true,
            },
            {
              icon: <Shield className="w-7 h-7" />,
              title: "Балансировка колёс",
              desc: "С учётом грузиков, любые диаметры R12–R24. Включена в сезонную замену.",
              hot: false,
            },
            {
              icon: <Users className="w-7 h-7" />,
              title: "Коммерческий транспорт",
              desc: "Газель, Соболь, Sprinter, Crafter, Porter. Работаем со спаркой — без проблем.",
              hot: false,
            },
            {
              icon: <Zap className="w-7 h-7" />,
              title: "Снятие секреток",
              desc: "Снятие секретных болтов без повреждения диска. Потеряли ключ — не проблема.",
              hot: false,
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className={`relative bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${
                  card.hot ? "border-brand/30" : ""
                }`}
              >
                {card.hot && (
                  <div className="absolute top-3 right-3 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ТОП
                  </div>
                )}
                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {card.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── How It Works ─────────── */
function HowSection() {
  const steps = [
    {
      time: "0 мин",
      num: "01",
      title: "Звоните нам",
      desc: "Наберите +7 (863) 200-09-09. Диспетчер уточнит адрес и услугу. Занимает 30 секунд.",
      icon: <Phone className="w-6 h-6" />,
    },
    {
      time: "1 мин",
      num: "02",
      title: "Экипаж выезжает",
      desc: "Ближайший к вам экипаж выезжает через 1 минуту. 5 бригад по всему Ростову.",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      time: "20 мин",
      num: "03",
      title: "Работаем на месте",
      desc: "Шиномонтаж прямо там, где вы стоите. Профессиональное итальянское оборудование.",
      icon: <Wrench className="w-6 h-6" />,
    },
    {
      time: "Готово!",
      num: "04",
      title: "Можно ехать",
      desc: "Колёса заменены или прокол отремонтирован. Оплачиваете работу и едете дальше.",
      icon: <Check className="w-6 h-6" />,
    },
  ];

  return (
    <section id="how" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-brand text-sm font-bold uppercase tracking-widest">
              Быстро и просто
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-foreground">
              От звонка до готовности — 20 минут
            </h2>
          </div>
        </Reveal>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-black text-lg shadow-lg shadow-brand/20">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-brand/20 mt-2" />
                  )}
                </div>
                <div className="bg-white rounded-xl p-5 border flex-1 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-brand">{step.icon}</span>
                    <span className="text-xs font-bold text-action uppercase tracking-wider">
                      {step.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="text-center mt-10">
            <a href={PHONE_HREF}>
              <Button className="bg-emergency hover:bg-emergency-dark text-white font-bold text-lg rounded-xl px-8 py-5 h-auto shadow-lg shadow-emergency/20">
                <Phone className="w-5 h-5 mr-2" />
                Позвонить — экипаж выедет через минуту
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Prices ─────────── */
function PricesSection() {
  return (
    <section id="prices" className="py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-brand text-sm font-bold uppercase tracking-widest">
              Прозрачные цены
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-foreground">
              Сколько стоит шиномонтаж с выездом
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Most popular */}
          <Reveal delay={100}>
            <div className="bg-white rounded-2xl p-6 border-2 border-brand shadow-lg shadow-brand/10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">
                Выбирают чаще всего
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1 mt-2">
                Сезонная замена (седан)
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                R12–R18, комплект колёс
              </p>
              <div className="text-3xl font-black text-brand mb-4">
                от 2 050 ₽
              </div>
              <ul className="space-y-2">
                {[
                  "Снять/поставить 4 колеса",
                  "Демонтаж и монтаж шин",
                  "Балансировка с грузиками",
                  "Чистка колёс",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Сезонная замена (внедорожник)
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                R15–R24, кроссовер/минивэн
              </p>
              <div className="text-3xl font-black text-brand mb-4">
                от 3 000 ₽
              </div>
              <ul className="space-y-2">
                {[
                  "Снять/поставить 4 колеса",
                  "Демонтаж и монтаж шин",
                  "Балансировка с грузиками",
                  "Чистка колёс",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Выезд по Ростову
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Днём и ночью
              </p>
              <div className="text-3xl font-black text-brand mb-4">
                от 800 ₽
              </div>
              <ul className="space-y-2">
                {[
                  "Выезд в любую точку Ростова",
                  "За город — 90 ₽/км",
                  "Ночной (23:00–07:00) — 1 500 ₽",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Ремонт прокола
              </h3>
              <p className="text-sm text-muted-foreground mb-4">R12–R24</p>
              <div className="text-3xl font-black text-brand mb-4">
                от 800 ₽
              </div>
              <ul className="space-y-2">
                {[
                  "Жгут, латка или двойной метод",
                  "Без снятия колеса",
                  "10–15 минут работа",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5 mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Коммерческий транспорт</strong>{" "}
              (Газель, Sprinter, Crafter) — от 500 ₽/колесо. Точную стоимость
              назовёт мастер по телефону.
            </p>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="text-center mt-8">
            <a href={PHONE_HREF}>
              <Button className="bg-brand hover:bg-brand-light text-white font-bold text-lg rounded-xl px-8 py-5 h-auto">
                <Phone className="w-5 h-5 mr-2" />
                Узнать точную цену по телефону
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-3">
              * Финальная стоимость зависит от ситуации. Точную цену назовём по
              телефону.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Trust / Why Us ─────────── */
function TrustSection() {
  return (
    <section className="py-16 sm:py-20 bg-brand text-white relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] my-6 sm:my-10 mx-2 sm:mx-4 shadow-2xl shadow-brand/20">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black">
              Почему стоит звонить нам
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: <Truck className="w-7 h-7" />,
              title: "5 экипажей в городе",
              desc: "В каждом районе Ростова — ближний экипаж. Не ждёте долго.",
            },
            {
              icon: <Timer className="w-7 h-7" />,
              title: "Выезд за 20 минут",
              desc: "Принимаем заявку и выезжаем через 1 минуту. Реальные 20 минут по городу.",
            },
            {
              icon: <Shield className="w-7 h-7" />,
              title: "Профессиональное оборудование",
              desc: "Итальянское оборудование. Любые диаметры R12–R24, включая RunFlat.",
            },
            {
              icon: <Clock className="w-7 h-7" />,
              title: "Работаем 24/7",
              desc: "Днём и ночью, в выходные и праздники. Ночной выезд — 1 500 ₽.",
            },
            {
              icon: <Star className="w-7 h-7" />,
              title: "4.9 на Яндекс Картах",
              desc: "74 реальных отзыва. Не накрученных, а настоящих — от клиентов, которым мы помогли.",
            },
            {
              icon: <MapPin className="w-7 h-7" />,
              title: "Ростов и область",
              desc: "По городу — от 800 ₽. За город — 90 ₽/км. Выезжаем куда угодно.",
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors">
                <div className="text-action mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-blue-200 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="text-center mt-10">
            <a href={PHONE_HREF}>
              <Button className="bg-action hover:bg-action-dark text-white font-bold text-lg rounded-xl px-8 py-5 h-auto shadow-lg shadow-action/30">
                <Phone className="w-5 h-5 mr-2" />
                Позвонить сейчас — +7 (863) 200-09-09
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── FAQ ─────────── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Как быстро приедет экипаж?",
      a: "В среднем 15–20 минут по Ростову. Выезжаем через 1 минуту после звонка. 5 экипажей в разных районах города — ближайший к вам.",
    },
    {
      q: "Сколько стоит выезд?",
      a: "Выезд по Ростову от 800 ₽. За город — 90 ₽/км. Ночной вызов (23:00–07:00) — 1 500 ₽.",
    },
    {
      q: "Работаете с внедорожниками и Газелями?",
      a: "Да, работаем с любым транспортом: легковые, кроссоверы, внедорожники, коммерческий транспорт (Газель, Sprinter, Crafter и др.). Спарку делаем без проблем.",
    },
    {
      q: "Какие диаметры обслуживаете?",
      a: "R12–R24, включая низкий профиль, RFT (RunFlat), внедорожные шины. Всё оборудование итальянское, профессиональное.",
    },
    {
      q: "Можно вызвать ночью?",
      a: "Да, работаем круглосуточно. Ночной коэффициент +30% на работы. Выезд с 23:00 до 07:00 — 1 500 ₽. Но мы приедем даже в 3 часа ночи.",
    },
    {
      q: "Выезжаете за город?",
      a: "Да, выезжаем в Ростовскую область. Стоимость — 90 ₽ за каждый километр от города. Точную стоимость скажет диспетчер при звонке.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-brand text-sm font-bold uppercase tracking-widest">
              Частые вопросы
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-foreground">
              Ответы на вопросы
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-foreground font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand flex-shrink-0 transition-transform ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Final CTA ─────────── */
function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-emergency to-red-700 text-white relative overflow-hidden rounded-t-[2rem] sm:rounded-t-[3rem]">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Пробили колесо?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-xl mx-auto">
            Не стойте на обочине. Один звонок — и мы уже выехали. 20 минут и
            можно ехать дальше.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <a href={PHONE_HREF} className="inline-block">
            <Button className="bg-white text-emergency hover:bg-red-50 font-black text-2xl sm:text-3xl rounded-2xl px-10 sm:px-14 py-7 sm:py-8 h-auto shadow-2xl transition-transform hover:scale-105">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8 mr-3" />
              {PHONE}
            </Button>
          </a>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-red-200">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Круглосуточно, без выходных
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Ростов-на-Дону, Таганрогская 144А
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 rounded-t-[1.5rem] sm:rounded-t-[2rem]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <CircleDot className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">
              Шино<span className="text-brand-light">Моменто</span>
            </span>
          </div>
          <div className="text-sm text-center sm:text-right">
            <p>
              Выездной шиномонтаж в Ростове-на-Дону. Круглосуточная помощь на
              дороге.
            </p>
            <p className="mt-1">Таганрогская ул., 144А</p>
          </div>
        </div>
        <div className="text-center mt-6 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} ШиноМоменто. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

/* ─────────── Main Page ─────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <main className="flex-1">
        <HeroSection />
        <PainSection />
        <ServicesSection />
        <HowSection />
        <PricesSection />
        <TrustSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
