import { config } from "@/lib/config";

export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.company,
    telephone: config.phoneRaw,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.city,
      addressRegion: config.region || config.city,
      addressCountry: "RU",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: config.priceFrom,
    description: config.seoDescription,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: config.socialProof.rating,
      reviewCount: config.socialProof.reviewCount,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
