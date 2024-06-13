// import { redirect } from "next/navigation";

// import { MercadoPagoConfig, Preference } from "mercadopago";

import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";

// const client = new MercadoPagoConfig({
//   accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
// });

export default function CheckoutLogic() {
  // async function pay() {
  //   "use server";

  //   const preference = await new Preference(client).create({
  //     body: {
  //       items: [
  //         {
  //           id: "1",
  //           title: "testing prod",
  //           quantity: 1,
  //           unit_price: 1005,
  //         },
  //       ],
  //       back_urls: {
  //         failure: "http://localhost:3000/payment/failure",
  //         success: "http://localhost:3000/payment/success",
  //         pending: "http://localhost:3000/payment/pending",
  //       },
  //     },
  //   });

  //   redirect(preference.sandbox_init_point!);
  // }

  return (
    <section className="bg-gray-50 w-full h-full px-4 py-12 flex flex-col items-center">
      <form /*action={pay}*/ className="w-full max-w-72 flex flex-col gap-4">
        <div>
          <Label>
            Card information<span className="text-red-500">*</span>
          </Label>
          <Input type="number" placeholder="1234 1234 1234 1234" required />
          <div className="flex">
            <Input type="number" placeholder="MM / YY" required />
            <Input type="number" placeholder="CVC" required />
          </div>
        </div>

        <div>
          <Label>
            Name on card<span className="text-red-500">*</span>
          </Label>
          <Input type="text" placeholder="John Doe" required />
        </div>

        <div>
          <Label>
            Country<span className="text-red-500">*</span>
          </Label>
          <Input type="text" placeholder="Argentina" required />
          <Input type="text" placeholder="Postal code - 5570" required />
        </div>
        <Button>Confirm</Button>
      </form>
    </section>
  );
}
