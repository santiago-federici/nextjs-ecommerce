import type { Metadata } from "next";

import { Onest } from "next/font/google";
import { Work_Sans } from "next/font/google";

import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer";

import { WixClientProvider } from "@contexts/WixContext";

import "@styles/globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-worksans",
});

export const metadata: Metadata = {
  title: "Urban Vogue",
  description: "Created by Santiago Federici",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-surface">
      <body className={`${onest.variable} ${workSans.variable}`}>
        <WixClientProvider>
          <Header />
          <main className="realtive flex flex-col min-h-screen w-full">
            {children}
          </main>
          <Footer />
        </WixClientProvider>
      </body>
    </html>
  );
}
