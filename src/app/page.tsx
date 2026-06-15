"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone,
  ArrowDown,
  Check,
  X,
  Zap,
  Shield,
  Car,
  Gauge,
  Globe,
  Smartphone,
  Search,
  Code2,
  ChevronDown,
  MessageCircle,
  Star,
  Clock,
  Users,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─────────── Animated Counter ─────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  delayMs = 500,
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────── Nav ─────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl border-b border-dark-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button
          onClick={() => scrollTo("hero")}
          className="text-2xl font-black tracking-tight"
        >
          <span className="text-neon">ПРО</span>
          <span className="text-white">ДА</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <button
            onClick={() => scrollTo("offer")}
            className="hover:text-neon transition-colors"
          >
            Что даём
          </button>
          <button
            onClick={() => scrollTo("how")}
            className="hover:text-neon transition-colors"
          >
            Как работаем
          </button>
          <button
            onClick={() => scrollTo("why")}
            className="hover:text-neon transition-colors"
          >
            Почему мы
          </button>
          <button
            onClick={() => scrollTo("compare")}
            className="hover:text-neon transition-colors"
          >
            Сравнение
          </button>
          <button
            onClick={() => scrollTo("price")}
            className="hover:text-neon transition-colors"
          >
            Цена
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+79217040966"
            className="hidden sm:flex items-center gap-2 text-sm text-neon hover:text-neon/80 transition-colors"
          >
            <Phone className="w-4 h-4" />
            +7 (921) 704-09-66
          </a>
          <Button
            onClick={() => scrollTo("cta")}
            className="bg-neon text-dark hover:bg-neon/90 font-bold text-sm rounded-full px-5"
          >
            Оставить заявку
          </Button>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1.5">
              <div
                className={`w-6 h-0.5 bg-white transition-all ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-white transition-all ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-white transition-all ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-card/95 backdrop-blur-xl border-b border-dark-border">
          <div className="px-4 py-4 space-y-3 text-sm">
            {[
              ["Что даём", "offer"],
              ["Как работаем", "how"],
              ["Почему мы", "why"],
              ["Сравнение", "compare"],
              ["Цена", "price"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left text-muted-foreground hover:text-neon transition-colors py-2"
              >
                {label}
              </button>
            ))}
            <a
              href="tel:+79217040966"
              className="flex items-center gap-2 text-neon py-2"
            >
              <Phone className="w-4 h-4" />
              +7 (921) 704-09-66
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─────────── Hero Section ─────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 pb-10">
        {/* Badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            <span className="text-sm text-neon font-medium">
              Без предоплаты. Платите только за результат.
            </span>
          </div>
        </Reveal>

        {/* Main headline */}
        <Reveal delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="text-white">Сайт + реклама.</span>
            <br />
            <span className="text-glow-cyan text-neon">
              Платишь — только если работает
            </span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={200}>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Делаем сайт. Настраиваем Яндекс Директ. Несём ответственность за
            всю связку. Если звонков нет — вы ничего не платите. Никаких
            подвохов.
          </p>
        </Reveal>

        {/* CTA buttons */}
        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              onClick={() =>
                document
                  .getElementById("cta")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-neon text-dark hover:bg-neon/90 font-bold text-lg rounded-full px-8 py-6 h-auto glow-cyan"
            >
              <Zap className="w-5 h-5 mr-2" />
              Начать без предоплаты
            </Button>
            <a href="tel:+79217040966">
              <Button
                variant="outline"
                className="border-neon/30 text-neon hover:bg-neon/10 font-bold text-lg rounded-full px-8 py-6 h-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Позвонить
              </Button>
            </a>
          </div>
        </Reveal>

        {/* Key stats */}
        <Reveal delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: 10, suffix: " лет", label: "опыта в разработке" },
              { value: 90, suffix: "%", label: "клиентов платят за результат" },
              { value: 0, suffix: " ₽", label: "предоплата" },
              { value: 3, suffix: "–5", label: "дней на сайт" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-dark-card/60 border border-dark-border rounded-2xl p-4 backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-black text-neon">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Scroll hint */}
        <Reveal delay={600}>
          <div className="mt-12 animate-bounce">
            <ArrowDown className="w-6 h-6 text-neon/50 mx-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Offer Section (The Golden Deal) ─────────── */
function OfferSection() {
  return (
    <section
      id="offer"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/30 to-dark pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-neon-pink text-sm font-bold uppercase tracking-widest">
              Ваше золотое предложение
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-white">
              Что вы <span className="text-neon-pink">получаете</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Один вопрос, который вас интересует: &laquo;Что я получу и сколько
              это стоит?&raquo; Отвечаем честно и просто.
            </p>
          </div>
        </Reveal>

        {/* The car analogy - big visual */}
        <Reveal delay={100}>
          <div className="gradient-border p-6 sm:p-10 mb-16">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-neon-orange/10 border border-neon-orange/20 flex items-center justify-center">
                  <Car className="w-12 h-12 sm:w-16 sm:h-16 text-neon-orange" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  Аналогия с машиной
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Мы строим вам дорогую, качественную машину — сайт и рекламу. За
                  неё вы можете заплатить{" "}
                  <span className="text-neon-orange font-bold">
                    после того, как покатаетесь
                  </span>
                  . Или не платить, если не понравится. Бензин (рекламный бюджет)
                  заливаете сами — это ваши расходы на ваш бизнес. Мы гарантируем,
                  что машина качественная. И готовы доказать это на деле, прежде
                  чем попросить оплату.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Three main offers */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Code2 className="w-8 h-8" />,
              color: "neon",
              title: "Премиум лендинг",
              subtitle: "Не Tilda. Не конструктор.",
              points: [
                "Современный стек: Next.js, TypeScript",
                "Страница как TikTok — цепляет с первой секунды",
                "Мгновенная загрузка даже на слабом интернете",
                "Работает с VPN и без VPN",
                "В белых списках Яндекса — SEO с первого дня",
                "Адаптирован под мобильные — 80% ваших клиентов там",
              ],
            },
            {
              icon: <Search className="w-8 h-8" />,
              color: "neon-pink",
              title: "Яндекс Директ профи",
              subtitle: "Не базовая настройка. Профессиональная.",
              points: [
                "Полная семантика и минус-фразы",
                "Текст объявлений, который продаёт",
                "A/B тесты — постоянно улучшаем",
                "Выводим на 1 место максимально дешево",
                "Без агентских комиссий с бюджета",
                "Ваш кабинет — мы не имеем доступа к деньгам",
              ],
            },
            {
              icon: <Shield className="w-8 h-8" />,
              color: "neon-green",
              title: "Ответственность за всё",
              subtitle: "Мы несём риск, а не вы.",
              points: [
                "Полная ответственность за рекламную связку",
                "Нет звонков — вы не платите, мы откатываем работу",
                "Никаких скрытых платежей и мутных схем",
                "Без предоплаты — ноль рублей до результата",
                "90% клиентов получают звонки и оплачивают",
                "Нам невыгодно делать плохо — мы не получим денег",
              ],
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="gradient-border p-6 h-full flex flex-col">
                <div
                  className={`w-14 h-14 rounded-xl bg-${card.color}/10 border border-${card.color}/20 flex items-center justify-center mb-5 text-${card.color}`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {card.subtitle}
                </p>
                <ul className="space-y-3 flex-1">
                  {card.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 text-${card.color} mt-0.5 flex-shrink-0`}
                      />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Capabilities Section ─────────── */
function CapabilitiesSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-neon-green text-sm font-bold uppercase tracking-widest">
              Мы можем гораздо больше
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-white">
              Начнём с лендинга. Но это{" "}
              <span className="text-neon-green">не всё</span>, что мы умеем.
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Мы профессиональная команда с 10 годами опыта. Начинаем с того,
              что принесёт вам результат быстрее всего.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <Globe className="w-6 h-6" />,
              label: "SEO-оптимизация",
              desc: "Белые списки Яндекса. Ваши сайты находят.",
            },
            {
              icon: <Code2 className="w-6 h-6" />,
              label: "Сайты любой сложности",
              desc: "Не только лендинги. Корпоративные, каталоги, порталы.",
            },
            {
              icon: <Smartphone className="w-6 h-6" />,
              label: "Работает везде",
              desc: "Без VPN, на слабом интернете, на любом устройстве.",
            },
            {
              icon: <Gauge className="w-6 h-6" />,
              label: "Мгновенная скорость",
              desc: "Next.js — не Tilda. Страницы летают.",
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-dark border border-dark-border rounded-2xl p-5 hover:border-neon-green/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center mb-4 text-neon-green group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
      day: "День 1",
      num: "01",
      title: "Заявка и разведка",
      desc: "Вы оставляете заявку. Мы изучаем вашу нишу, конкурентов, ваш текущий сайт. Это база, с которой начнём работу. Бесплатно и без обязательств.",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      day: "Дни 2–5",
      num: "02",
      title: "Создаём сайт",
      desc: "Строим премиум лендинг под вашу нишу. TikTok-style — цепляет с первой секунды, не заставляет напрягаться, интересно изучать. Одновременно это полноценный лендинг, который продаёт.",
      icon: <Code2 className="w-6 h-6" />,
    },
    {
      day: "День 6",
      num: "03",
      title: "Запускаем рекламу",
      desc: "Настраиваем Яндекс Директ профессионально. Вы пополняете свой кабинет сами — от 15 000 до 30 000 ₽ в зависимости от ниши. Мы не имеем доступа к вашим деньгам.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      day: "Дни 7–14",
      num: "04",
      title: "Пошёл результат — платите",
      desc: "Звонки и заявки идут всегда, если ниша рабочая. 2 недели работы рекламы. Если результат устраивает — оплачиваете нашу работу. Нет — мы откатываем свою работу, вы ничего не платите.",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-bold uppercase tracking-widest">
              Прозрачно и просто
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-white">
              Как <span className="text-neon">это работает</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon/50 via-neon-pink/50 to-neon-green/50 hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="flex gap-5 sm:gap-8">
                  {/* Step marker */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-dark-card border-2 border-neon flex items-center justify-center z-10 relative">
                      <span className="text-neon font-black text-sm sm:text-base">
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="flex-1 bg-dark-card border border-dark-border rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-neon">{step.icon}</div>
                      <span className="text-xs font-bold text-neon/70 uppercase tracking-wider">
                        {step.day}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Why No Prepayment ─────────── */
function WhySection() {
  return (
    <section id="why" className="relative py-20 sm:py-28 bg-dark-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-neon-yellow text-sm font-bold uppercase tracking-widest">
              Главный вопрос
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-white">
              Почему{" "}
              <span className="text-neon-yellow">без предоплаты?</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Это не благотворительность. Это наша бизнес-модель. И она
              работает.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Reveal delay={100}>
            <div className="gradient-border p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Почему мы можем
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "10 лет опыта — мы знаем, что делаем",
                  "Чётко слаженная команда, обученная годами",
                  "Работаем на современных стеках с профессиональными инструментами",
                  "Узкая специализация — только B2B услуги, мы знаем эти ниши",
                  "В 90% случаев звонки есть всегда — мы получаем выплату",
                  "Нам выгодно сделать хорошо — иначе мы без дохода",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="gradient-border p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Почему другие не могут
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Крупные агентства — предоплата 50-100%, вода, нарисованные кейсы",
                  "Средние студии — шаблонные решения, не гарантируют результат",
                  "Фрилансеры — пропадают, низкое качество, нет команды",
                  "Директологи «за результат» — часто скам, льют бот-трафик",
                  "Все берут предоплату и не несут ответственности",
                  "Никто не даёт комплекс: сайт + реклама + ответственность",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-neon-pink mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Key insight */}
        <Reveal delay={300}>
          <div className="bg-dark border border-neon-yellow/20 rounded-2xl p-6 sm:p-8 text-center">
            <Sparkles className="w-8 h-8 text-neon-yellow mx-auto mb-4" />
            <p className="text-xl sm:text-2xl font-bold text-white mb-2">
              Наш риск — наш мотиватор
            </p>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Если мы не выполним свои обещания — мы останемся без дохода. Поэтому
              в наших интересах получить результат, чтобы получить оплату. Нам
              нужно, чтобы вы захотели с нами работать и захотели платить. И для
              этого мы делаем всё качественно с первого раза.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Comparison Section ─────────── */
function CompareSection() {
  return (
    <section id="compare" className="relative py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-neon-orange text-sm font-bold uppercase tracking-widest">
              Честное сравнение
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-white">
              Мы vs <span className="text-neon-orange">рынок</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-4 px-3 text-muted-foreground font-medium">
                    Параметр
                  </th>
                  <th className="text-center py-4 px-3 text-neon font-bold">
                    ПРОДА
                  </th>
                  <th className="text-center py-4 px-3 text-muted-foreground font-medium">
                    Крупные агентства
                  </th>
                  <th className="text-center py-4 px-3 text-muted-foreground font-medium">
                    Фрилансеры
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    param: "Предоплата",
                    us: "0 ₽",
                    big: "50–100%",
                    free: "50–100%",
                  },
                  {
                    param: "Оплата за результат",
                    us: "Да",
                    big: "Нет",
                    free: "Почти никогда",
                  },
                  {
                    param: "Сайт + реклама",
                    us: "Комплекс",
                    big: "Разные подрядчики",
                    free: "Только что-то одно",
                  },
                  {
                    param: "Ответственность",
                    us: "Полная",
                    big: "Ограничена договором",
                    free: "Никакой",
                  },
                  {
                    param: "Цена",
                    us: "от 25 000 ₽",
                    big: "80–300 000 ₽",
                    free: "10–40 000 ₽",
                  },
                  {
                    param: "Качество сайта",
                    us: "Next.js премиум",
                    big: "Среднее",
                    free: "Tilda / шаблон",
                  },
                  {
                    param: "Доступ к бюджету",
                    us: "Только ваш аккаунт",
                    big: "Берут % от бюджета",
                    free: "Просят доступ",
                  },
                  {
                    param: "Вода и псевдокейсы",
                    us: "Нет",
                    big: "Много",
                    free: "Бывает",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-dark-border/50 hover:bg-dark-card/30 transition-colors"
                  >
                    <td className="py-3 px-3 text-white font-medium">
                      {row.param}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-neon font-bold bg-neon/10 px-3 py-1 rounded-full">
                        {row.us}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-muted-foreground">
                      {row.big}
                    </td>
                    <td className="py-3 px-3 text-center text-muted-foreground">
                      {row.free}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Who We Take Section ─────────── */
function FilterSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-bold uppercase tracking-widest">
              Прозрачные условия
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-white">
              Кого <span className="text-neon-green">берём</span>, а кого{" "}
              <span className="text-neon-pink">нет</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal delay={100}>
            <div className="bg-dark border border-neon-green/20 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold text-white">Берём в работу</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "B2B услуги: эвакуаторы, ремонт, строительство, шиномонтаж",
                  "Аварийные комиссары, клининг, юриспруденция",
                  "Те, кто знает, что такое контекстная реклама",
                  "Те, кто понимает, что такое рекламный бюджет",
                  "Те, кто готов пополнять свой кабинет Яндекс Директ",
                  "Готовы работать удалённо по всей России",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-dark border border-neon-pink/20 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Не берём в работу
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Товарный бизнес — интернет-магазины",
                  "Те, кто не понимает, что такое рекламный бюджет",
                  "Те, кто возмущён тем, что мы не пополняем за них кабинет",
                  "Те, кто ждёт, что мы будем платить за их рекламу",
                  "Ниши, в которых мы точно не сможем дать результат",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-neon-pink mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 bg-neon-orange/5 border border-neon-orange/20 rounded-xl p-4">
                <p className="text-sm text-neon-orange">
                  <strong>Пожалуйста,</strong> не тратьте наше время, если вы
                  возмущены тем, что мы не пополняем за вас рекламный кабинет. Мы
                  собираем вам дорогостоящую машину — за бензин платите вы.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Pricing Section ─────────── */
function PriceSection() {
  return (
    <section id="price" className="relative py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-bold uppercase tracking-widest">
              Простой прайс
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-white">
              Сколько <span className="text-neon">это стоит</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="gradient-border p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-4 right-4 bg-neon-pink text-white text-xs font-bold px-3 py-1 rounded-full">
              Выбирают чаще всего
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Сайт + Яндекс Директ под ключ
            </h3>
            <p className="text-muted-foreground mb-8">
              Одна ниша, один город — всё включено
            </p>

            <div className="mb-8">
              <span className="text-5xl sm:text-6xl font-black text-neon">
                от 25 000 ₽
              </span>
              <p className="text-muted-foreground mt-2">
                оплата только после результата
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-left mb-8">
              {[
                "Премиум лендинг на Next.js",
                "Профессиональная настройка Директ",
                "Яндекс Метрика и цели",
                "Отслеживание звонков и заявок",
                "Корректировка рекламы после запуска",
                "WhatsApp и формы на сайте",
                "Адаптация под мобильные",
                "SEO-оптимизация с первого дня",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neon flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-dark/50 border border-dark-border rounded-xl p-4 mb-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-white">Что НЕ входит:</strong>{" "}
                Рекламный бюджет Яндекс Директ (15 000 — 30 000 ₽) — пополняете
                сами в свой кабинет. Дополнительные города и РСЯ — по
                договорённости.
              </p>
            </div>

            <Button
              onClick={() =>
                document
                  .getElementById("cta")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-neon text-dark hover:bg-neon/90 font-bold text-lg rounded-full px-8 py-6 h-auto glow-cyan"
            >
              Узнать точную цену
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              * Финальная стоимость зависит от ситуации. Точную цену назовём по
              телефону.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── No BS Section ─────────── */
function NoBsSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark-card/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Чего здесь <span className="text-neon-pink">НЕ будет</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              Мы устали от того, как продают услуги на рынке. Поэтому мы делаем
              иначе.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { title: "Воды", desc: "Каждое слово на сайте — по делу. Мы ценим ваше время." },
            { title: "Пустых обещаний", desc: "Мы обещаем только то, что можем выполнить и доказываем делом." },
            { title: "Псевдокейсов", desc: "Мы не рисуем красивые кейсы с выдуманными цифрами. У нас — честность." },
            { title: "Псевдодоказательств", desc: "Никаких накрученных отзывов и поддельных скриншотов." },
            { title: "Громких слов", desc: "Мы не говорим «инновационный», «уникальный», «эксклюзивный». Мы просто делаем." },
            { title: "Скрытых платежей", desc: "Без агентских комиссий, без доплат, без мутных схем. Всё прозрачно." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex items-start gap-4 bg-dark border border-dark-border rounded-xl p-5 hover:border-neon-pink/20 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-neon-pink" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── FAQ Section ─────────── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "В чём подвох? Почему без предоплаты?",
      a: "Подвоха нет. Мы уверены в своей работе: 90% клиентов получают звонки и платят. Нам выгодно сделать хорошо, чтобы получить оплату. Если не справимся — останемся без дохода. Всё просто.",
    },
    {
      q: "А если результат не устроит?",
      a: "Вы ничего не платите. Мы откатываем свою работу. Но за 10 лет такое случалось крайне редко — звонки есть почти всегда, если ниша рабочая.",
    },
    {
      q: "Почему я должен пополнять кабинет сам?",
      a: "Это ваш бизнес и ваш рекламный бюджет. Мы не берём комиссий с бюджета и не имеем доступа к вашим деньгам. Аналогия: вы покупаете машину, но бензин заливаете сами. Мы гарантируем, что машина качественная.",
    },
    {
      q: "С какими нишами вы работаете?",
      a: "Только B2B услуги: эвакуаторы, ремонт, строительство, шиномонтаж, аварийные комиссары и подобные. Не берём товарный бизнес — интернет-магазины.",
    },
    {
      q: "Сколько времени занимает запуск?",
      a: "Сайт — 3–5 дней. Настройка Директ — 1 день после сайта. Первые звонки обычно идут в течение 2–3 дней после запуска рекламы.",
    },
    {
      q: "Что мне нужно для старта?",
      a: "Понимать, что такое контекстная реклама и рекламный бюджет. Быть готовым пополнить свой кабинет Яндекс Директ. И всё — остальное делаем мы.",
    },
    {
      q: "Вы работаете по всей Россию?",
      a: "Да, работаем удалённо по всей РФ. Но берём не всех: если видим, что не сможем помочь — честно говорим и не берём.",
    },
    {
      q: "Какие гарантии, что это не обман?",
      a: "Мы не имеем доступа к вашему рекламному бюджету. Вы пополняете кабинет сами с личным доступом. Без агентских комиссий, без скрытых платежей, без каких-либо мутовок. Только профессиональная работа. Мы несём полную ответственность — если не дадим результат, мы останемся без денег.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-bold uppercase tracking-widest">
              Ответы
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-white">
              Частые <span className="text-neon">вопросы</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-dark-border/30 transition-colors"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neon flex-shrink-0 transition-transform ${
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

/* ─────────── CTA / Contact Section ─────────── */
function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "new",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, this would submit to an API
  };

  return (
    <section id="cta" className="relative py-20 sm:py-28 bg-dark-card/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Готовы <span className="text-neon">начать?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Оставьте заявку. Мы разберёмся в вашей нише и скажем, чем можем
              помочь. Без обязательств, без предоплаты.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="gradient-border p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-neon-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-muted-foreground">
                  Мы перезвоним в рабочее время (Пн–Сб, 9:00–20:00).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:border-neon/50 focus:outline-none transition-colors"
                      placeholder="Как к вам обращаться?"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:border-neon/50 focus:outline-none transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Тип обращения
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "new", label: "Нужен сайт + реклама" },
                      { value: "ads", label: "Только реклама" },
                      { value: "consult", label: "Консультация" },
                      { value: "other", label: "Другое" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: option.value })
                        }
                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                          formData.type === option.value
                            ? "border-neon bg-neon/10 text-neon"
                            : "border-dark-border text-muted-foreground hover:border-dark-border/80"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-neon text-dark hover:bg-neon/90 font-bold text-lg rounded-xl py-6 h-auto glow-cyan"
                >
                  Отправить заявку
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  Мы не передаём ваши данные третьим лицам.
                </p>
              </form>
            )}
          </div>
        </Reveal>

        {/* Phone CTA */}
        <Reveal delay={200}>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-3">Или позвоните прямо сейчас:</p>
            <a
              href="tel:+79217040966"
              className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-black text-neon text-glow-cyan hover:text-neon/80 transition-colors"
            >
              <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              +7 (921) 704-09-66
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Пн–Сб, 9:00–20:00
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="border-t border-dark-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black">
              <span className="text-neon">ПРО</span>
              <span className="text-white">ДА</span>
            </span>
            <span className="text-sm text-muted-foreground">
              Сайт + Яндекс Директ под ключ. Оплата только за результат.
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Работаем по РФ</span>
            <a
              href="tel:+79217040966"
              className="text-neon hover:text-neon/80 transition-colors"
            >
              +7 (921) 704-09-66
            </a>
          </div>
        </div>
        <div className="text-center mt-6 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ПРОДА. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

/* ─────────── Main Page ─────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Nav />
      <main className="flex-1">
        <HeroSection />
        <OfferSection />
        <CapabilitiesSection />
        <HowSection />
        <WhySection />
        <CompareSection />
        <FilterSection />
        <PriceSection />
        <NoBsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
