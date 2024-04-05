import { Button } from "./Button";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";

export function Trending () {
  return(
    <article className="grid gap-20 place-items-center mt-32 md:mt-44 ">
      <SectionTitle title="Trending" />

      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 ">
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
      </section>

      <Button as="primary" text="Ir a productos" />
    </article>
  )
}