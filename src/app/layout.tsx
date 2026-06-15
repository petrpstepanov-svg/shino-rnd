import type { Metadata } from "next";
import Script from "next/script";
import { Unbounded, Inter } from "next/font/google";
import "../styles/index.css";
import { config } from "@/lib/config";
import JsonLd from "@/components/seo/JsonLd";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-unbounded",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: config.seoTitle,
  description: config.seoDescription,
  keywords: config.seoKeywords,
  openGraph: {
    title: config.seoTitle,
    description: config.seoDescription,
    type: "website",
    locale: "ru_RU",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <head>
        <JsonLd />
      </head>
      <body className={`${unbounded.variable} ${inter.variable} bg-slate-900 text-slate-300`}>
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(109869067, {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            trackHash:true,
            ecommerce:"dataLayer"
          });
        `}</Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/109869067"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
