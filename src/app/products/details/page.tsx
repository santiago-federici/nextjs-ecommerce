import { Wrapper } from "@components/Wrapper";
import { Button } from "@components/ui/button";
import { db } from "@db";
import { products } from "@db/schemas/products";
import { eq } from "drizzle-orm";
import Image from "next/image";

interface ProdProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  offerPercentage: number;
  stock: number;
}

export default async function DetailsPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const prods = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(searchParams.id)));

  // Checking that the product actually exists
  const prod = prods.find(
    (prod: ProdProps) => prod.id === Number(searchParams.id)
  );

  // TODO: create a nice looking 404 here
  if (!prod) {
    return <div>Product not found</div>;
  }

  const { name, imageUrl, price, description, offerPercentage, stock } = prod!;

  return (
    <Wrapper className="mt-6 grid lg:flex gap-6 overflow-hidden bg-[#ffffff] p-4 rounded-md">
      <h2 className="lg:hidden">{name}</h2>

      <section className="hidden lg:flex md:flex-col gap-4">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover border border-zinc-400 rounded-sm"
        />
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover border border-zinc-400 rounded-sm"
        />
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover border border-zinc-400 rounded-sm"
        />
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover border border-zinc-400 rounded-sm"
        />
      </section>

      <div className="w-full lg:max-w-[40%] bg-[#f0f0f0] grid place-items-center rounded-sm overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={600}
          className="sm:max-lg:w-full md:max-h-[600px] object-contain"
        />
      </div>

      <section className="w-full grid lg:flex gap-6 text-base">
        <section className="w-full p-2">
          <h2 className="hidden lg:block">{name}</h2>
          <p>{description}</p>
          <h2>${price}</h2>
        </section>

        <section className="flex flex-col gap-6 w-full lg:border lg:border-zinc-400 lg:rounded-md p-2 lg:p-4">
          <div className="grid gap-1">
            <p>
              <span className="text-green-500 font-semibold">Envio gratis</span>{" "}
              a todo el pais
            </p>
            <p>Conoce los tiempos y las formas de envio.</p>
            <p className="text-blue-400 cursor-pointer">
              Calcular cuando llega
            </p>
          </div>

          <div className="grid gap-1">
            <p className="font-semibold text-lg">Stock disponible</p>
            <p>
              Almacenado y enviado por{" "}
              <span className="uppercase text-green-500 italic font-bold">
                Full
              </span>
            </p>
          </div>

          <p>
            Cantidad: <span className="font-semibold">1 unidad</span>{" "}
            <span className="text-gray-400">(+20 disponibles)</span>
          </p>

          <div className="grid gap-1">
            <p className="mb-2 text-gray-400 text-sm">
              Podes comprar solo 1 unidad
            </p>
            <Button className="mb-1">Buy now</Button>
            <Button variant={"outline"} className="bg-[#fafafa]">
              Add to cart
            </Button>
          </div>
        </section>
      </section>
    </Wrapper>
  );
}
