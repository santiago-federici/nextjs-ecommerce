import { Button } from "@components/Button";
import '../styles/HeroSection.css'

export function HeroSection () {
  return (
    <section className="hero-bg mt-6 md:mt-14 w-full h-[200px] md:h-[400px] lg:h-[600px] flex flex-col justify-start items-start p-4 md:p-12 rounded-3xl special-shadow border border-slate-400">
      <h1 className="text-white text-2xl md:text-5xl lg:text-6xl font-bold text-left w-[210px] md:w-[320px] lg:w-[450px]">
        Mejora tu estilo con nuestros productos
      </h1>
      <Button as="ghost" text="Ver productos" extraClassName="mt-4 md:mt-10" />
    </section>
  )
}

