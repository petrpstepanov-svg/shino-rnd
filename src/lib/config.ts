// ⚠️ AUTO-GENERATED from config-site.json — DO NOT EDIT MANUALLY
// Run: python generate-config.py

export interface SocialProofStats { value: string; label: string }
export interface SocialProofReview { name: string; source: string; rating: number; text: string }
export interface SocialProof { rating: number; reviewCount: number; sources: string; stats: SocialProofStats[]; reviews: SocialProofReview[] }
export interface ServiceItem { icon: string; title: string; desc: string; featured?: boolean }
export interface StepItem { num: string; title: string; desc: string; time: string }
export interface PricingItem { type: string; depth: string; price: string; includes: string[]; popular?: boolean }
export interface GuaranteeItem { icon: string; title: string; desc: string }
export interface FaqItem { q: string; a: string }
export interface SectionTitles { [key: string]: string }

export interface SiteConfig {
  company: string;
  companyShort: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  telegram: string;
  address: string;
  priceFrom: string;
  workHours: string;
  metrikaId: string;
  niche: string;
  nicheShort: string;
  city: string;
  cityPrepositional: string;
  region: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBgImage: string;
  heroAlt: string;
  heroBadge: string;
  heroEmoji: string;
  ctaButtonText: string;
  domain: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  socialProof: SocialProof;
  services: ServiceItem[];
  steps: StepItem[];
  pricing: PricingItem[];
  guarantees: GuaranteeItem[];
  faq: FaqItem[];
  sectionTitles: SectionTitles;
  contactFormOptions: string[];
}

export const config: SiteConfig = {
  company: "ШиноМоменто",
  companyShort: "ШиноМоменто",
  phone: "+7 (863) 200-09-09",
  phoneRaw: "+78632000909",
  whatsapp: "",
  telegram: "",
  address: "Ростов-на-Дону, Таганрогская ул., 144А",
  priceFrom: "от 800 ₽",
  workHours: "Круглосуточно, без выходных",
  metrikaId: "",
  niche: "Выездной шиномонтаж",
  nicheShort: "Шиномонтаж",
  city: "Ростов-на-Дону",
  cityPrepositional: "в Ростове-на-Дону",
  region: "Ростовская область",
  heroTitle: "Выездной шиномонтаж",
  heroSubtitle: "Приедем за 20 минут · Работаем 24/7 · Любые диаметры R12-R24",
  heroBgImage: "/images/hero/bg.webp",
  heroAlt: "Выездной шиномонтаж ШиноМоменто в Ростове-на-Дону",
  heroBadge: "Круглосуточно · Ростов и область · 5 экипажей",
  heroEmoji: "🚐",
  ctaButtonText: "Позвонить",
  domain: "",
  footerText: "Выездной шиномонтаж ШиноМоменто в Ростове-на-Дону. Круглосуточная помощь на дороге. Таганрогская 144А.",
  seoTitle: "Выездной шиномонтаж в Ростове-на-Дону — выезд от 800₽ | ШиноМоменто",
  seoDescription: "Мобильный шиномонтаж ШиноМоменто в Ростове-на-Дону. Выезд 24/7, сезонная замена резины, ремонт проколов, балансировка. R12-R24, легковые, внедорожники, коммерческий транспорт. Таганрогская 144А.",
  seoKeywords: [
    "выездной шиномонтаж Ростов",
    "мобильный шиномонтаж Ростов-на-Дону",
    "шиномонтаж на дому Ростов",
    "выездной шиномонтаж",
    "ШиноМоменто",
  ],
  socialProof: {
    rating: 4.9,
    reviewCount: 74,
    sources: "Яндекс Карты, 2ГИС",
    stats: [
      { value: "5", label: "экипажей в городе" },
      { value: "20 мин", label: "средний выезд" },
      { value: "R12-R24", label: "любые диаметры" },
      { value: "24/7", label: "круглосуточно" },
    ],
    reviews: [

    ],
  },
  services: [
    { icon: "Truck", title: "Выездной шиномонтаж", desc: "Приедем в любую точку Ростова за 20 минут", featured: true },
    { icon: "RefreshCw", title: "Сезонная замена резины", desc: "Комплекс: снять/поставить, демонтаж/монтаж, балансировка", featured: true },
    { icon: "Wrench", title: "Ремонт проколов и порезов", desc: "Жгут, латка, двойной метод — без снятия колеса", featured: true },
    { icon: "Scale", title: "Балансировка колёс", desc: "С учётом грузиков, любые диаметры R12-R24", featured: false },
    { icon: "Bus", title: "Коммерческий транспорт", desc: "Газель, Соболь, Sprinter, Crafter, Porter — спарка", featured: false },
    { icon: "Lock", title: "Снятие секреток", desc: "Снятие секретных болтов без повреждения диска", featured: false },
  ],
  steps: [
    { num: "01", title: "Звонок", desc: "Звоните — диспетчер уточнит адрес и услугу", time: "0 мин" },
    { num: "02", title: "Выезд", desc: "Экипаж выезжает через 1 минуту", time: "1 мин" },
    { num: "03", title: "Работа", desc: "Шиномонтаж прямо на месте", time: "20 мин" },
    { num: "04", title: "Готово", desc: "Колёса заменены/отремонтированы, можно ехать", time: "Итог" },
  ],
  pricing: [
    { type: "Выезд по Ростову", depth: "днём и ночью", price: "от 800 ₽", includes: ["Выезд экипажа по городу", "Работы на месте", "Консультация по шинам"], popular: true },
    { type: "Сезонная замена (седан/хэтчбек)", depth: "R12-R18, комплект колёс", price: "от 2,050 ₽", includes: ["Снять/поставить 4 колеса", "Демонтаж и монтаж шин", "Балансировка с грузиками", "Чистка колёс"], popular: false },
    { type: "Сезонная замена (внедорожник)", depth: "R15-R24, кроссовер/минивэн", price: "от 3,000 ₽", includes: ["Снять/поставить 4 колеса", "Демонтаж и монтаж шин", "Балансировка с грузиками", "+50% к седану"], popular: false },
    { type: "Ремонт прокола", depth: "R12-R24", price: "от 800 ₽", includes: ["Жгут или двойной метод", "Проверка давления", "Подкачка всех колёс"], popular: false },
    { type: "Коммерческий транспорт", depth: "Газель, Sprinter, Crafter", price: "от 500 ₽/колесо", includes: ["Снять/поставить (спарка 650₽)", "Демонтаж/монтаж покрышки", "Балансировка"], popular: false },
  ],
  guarantees: [
    { icon: "Truck", title: "5 экипажей в городе", desc: "В каждом районе Ростова — ближний выезд" },
    { icon: "Timer", title: "Выезд за 20 минут", desc: "Принимаем заявку и выезжаем через 1 минуту" },
    { icon: "Settings", title: "Профессиональное оборудование", desc: "Итальянское оборудование, любые диаметры" },
    { icon: "Moon", title: "Работаем 24/7", desc: "Днём и ночью, в выходные и праздники" },
  ],
  faq: [
    { q: "Как быстро приедет экипаж?", a: "В среднем 15-20 минут по Ростову. Выезжаем через 1 минуту после звонка." },
    { q: "Сколько стоит выезд?", a: "Выезд по Ростову от 800₽. За город — 90₽/км. Ночной вызов (23:00-07:00) — 1,500₽." },
    { q: "Работаете с внедорожниками и Газелями?", a: "Да, работаем с любым транспортом: легковые, кроссоверы, внедорожники, коммерческий транспорт (Газель, Sprinter, Crafter и др.)." },
    { q: "Какие диаметры обслуживаете?", a: "R12-R24, включая низкий профиль, RFT (RunFlat), внедорожные шины." },
    { q: "Можно вызвать ночью?", a: "Да, работаем круглосуточно. Ночной коэффициент +30% на работы (выезд — 1,500₽ с 23:00 до 07:00)." },
  ],
  sectionTitles: {
    services: "Что мы делаем на месте",
    servicesBadge: "Услуги",
    steps: "От звонка до новых шин — 20 минут",
    stepsBadge: "Как это работает",
    pricing: "Цены на шиномонтаж",
    pricingBadge: "Прайс",
    guarantees: "Почему стоит звонить нам",
    guaranteesBadge: "Гарантии",
    faq: "Частые вопросы по выездному шиномонтажу",
    faqBadge: "Вопросы",
    contacts: "Звоните — выезжаем через 1 минуту",
    contactsBadge: "Контакты",
    socialProofBadge: "Почему нам стоит позвонить",
  },
  contactFormOptions: [
    "Сезонная замена",
    "Ремонт прокола",
    "Коммерческий транспорт",
    "Нужна консультация",
  ],
};
