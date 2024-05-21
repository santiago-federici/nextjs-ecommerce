import { MercadoPagoConfig, Preference } from "mercadopago";

import { redirect } from "next/navigation";

import { Wrapper } from "@components/Wrapper";
import { Button } from "@components/ui/button";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export default async function CheckoutPage() {
  async function pay() {
    "use server";

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "1",
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
