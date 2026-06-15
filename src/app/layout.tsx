import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title:
    "Выездной шиномонтаж в Ростове-на-Дону — приедем за 20 минут | ШиноМоменто",
  description:
    "Мобильный шиномонтаж ШиноМоменто в Ростове-на-Дону. Выезд 24/7, сезонная замена резины, ремонт проколов, балансировка. R12-R24, легковые, внедорожники, коммерческий транспорт. Таганрогская 144А.",
  keywords: [
    "выездной шиномонтаж",
    "шиномонтаж Ростов-на-Дону",
    "замена резины",
    "ремонт прокола",
    "мобильный шиномонтаж",
    "ШиноМоменто",
  ],
  authors: [{ name: "ШиноМоменто" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Выездной шиномонтаж ШиноМоменто — приедем за 20 минут",
    description:
      "24/7, от 800₽. 5 экипажей в Ростове. Звоните прямо сейчас!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
