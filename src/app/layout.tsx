import type { Metadata } from "next";

import { Onest } from "next/font/google";
import { Work_Sans } from "next/font/google";

import { CartProvider } from "@contexts/CartContext";
import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer";

import "@styles/globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-worksans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-surface">
      <body className={`${onest.variable} ${workSans.variable}`}>
        <CartProvider>
          <Header />
          <main className="realtive flex flex-col min-h-screen w-full">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
