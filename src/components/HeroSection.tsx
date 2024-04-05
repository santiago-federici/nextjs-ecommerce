import { Button } from "@components/Button";
import Image from "next/image";

export function HeroSection () {
  return (
    <div>
      <section className="mt-14 md:mt-40 grid justify-items-center md:justify-items-start w-full">
        <h1 className="text-white font-bold text-balance text-center lg:text-left lg:w-[500px]">
          Mejora tu estilo con nuestros productos
        </h1>
        <Button as="ghost" text="Ver productos" extraClassName="mt-10" />
      </section>
    </div>
  )
}