import { Button } from "./Button";
import { Card } from "./Card";

export function Trending () {
  return(
    <article className="wrapper grid gap-20 place-content-center mb-60 ">
      <h3 className="text-3xl md:text-4xl underline underline-offset-4 uppercase">Trending</h3>


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