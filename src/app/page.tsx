"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { BlackSection } from "@components/HomePage/BlackSection";
import { HeroSection } from "@components/HomePage/HeroSection";
import { OffersSection } from "@components/HomePage/OffersSection";

import "@styles/HomePage.css";

export default function HomePage() {
  const { user, error, isLoading } = useUser();

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  console.log("user from getSession(): ", user && user);

  return (
    <section>
      <HeroSection />

      <BlackSection />

      <OffersSection />
    </section>
  );
}
