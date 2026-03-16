import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { Noto_Sans_Arabic } from "next/font/google";

const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto-arabic", display: "swap" });

export const metadata: Metadata = {
  title: "Coptic Hymns",
  description: "Browse and search Coptic Christian hymns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoArabic.variable} min-h-screen bg-stone-50 text-stone-900 antialiased`}>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
