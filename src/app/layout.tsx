import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "ПРОДА — Сайт + Яндекс Директ под ключ. Платите только за результат",
  description:
    "Разработка премиум лендинга и настройка Яндекс Директ. Без предоплаты. Платите только если устроит результат. от 25 000 ₽. Работаем по РФ.",
  keywords: [
    "лендинг",
    "Яндекс Директ",
    "контекстная реклама",
    "сайт под ключ",
    "оплата за результат",
    "без предоплаты",
    "ПРОДА",
  ],
  authors: [{ name: "ПРОДА" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "ПРОДА — Сайт + Яндекс Директ под ключ",
    description:
      "Без предоплаты. Платите только если устроит результат. от 25 000 ₽",
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
