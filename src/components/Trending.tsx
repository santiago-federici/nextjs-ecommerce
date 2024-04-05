import { Button } from "./Button";
import { Carousel } from "./Carousel";
import { SectionTitle } from "./SectionTitle";

export function Trending () {
  return(
    <article className="grid gap-14 place-items-center mt-20 md:mt-28 ">
      <SectionTitle title="Trending" />

      <Carousel />

      <Button as="primary" text="Ir a productos" />
    </article>
  )
}