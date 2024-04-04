import { Button } from "@components/Button";
import Image from "next/image";

export function HeroSection () {
  return (
    <div className="h-[85dvh]">
      <div className="hero">
        <Image
          src="/heroGlasses.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          />
      </div>

      <section className="wrapper mt-14 md:mt-40 grid justify-items-center md:justify-items-start w-full">
        <h1 className="text-white font-bold text-5xl md:text-6xl text-balance text-center lg:text-left lg:w-[500px]">
          Mejora tu estilo con nuestros productos
        </h1>
        <Button as="ghost" text="Ver productos" extraClassName="mt-10" />
      </section>
    </div>
  )
}