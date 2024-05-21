import { Wrapper } from "@components/Wrapper";
import { Button } from "@components/ui/button";
import { db } from "@db";
import { products } from "@db/schemas/products";
import { formatPrice } from "@lib/utils";
import { eq } from "drizzle-orm";
import { MercadoPagoConfig, Preference } from "mercadopago";
import Image from "next/image";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

interface ProdProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  offerPercentage: number;
  stock: number;
}

export default async function CheckoutPage() {
  async function pay() {
    "use server";

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "donacion",
            title: "testing prod",
            quantity: 1,
            unit_price: 1005,
          },
        ],
        back_urls: {
          failure: "http://localhost:3000/payment/failure",
          success: "http://localhost:3000/payment/success",
          pending: "http://localhost:3000/payment/pending",
        },
      },
    });

    redirect(preference.sandbox_init_point!);
  }

  return (
    <Wrapper>
      <form action={pay}>
        <Button>Enviar</Button>
      </form>
    </Wrapper>
  );
}
