// import MercadoPagoConfig, { Payment } from "mercadopago";
// import { NextRequest } from "next/server";

// const client = new MercadoPagoConfig({
//   accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
// });

// export async function POST(req: NextRequest) {
//   const body = await req
//     .json()
//     .then((data) => data as { data: { id: string } });

//   // const secret = req.headers.get("x-signature-id");

//   // This if statement is for production. It chekcs that the payment is valid. The secret is found in Webhooks. --> https://www.mercadopago.com.ar/developers/panel/app/2654287895346889/webhooks
//   // if (secret !== process.env.MERCADOPAGO_SECRET)
//   // return Response.json({ success: false });

//   const payment = await new Payment(client).get({ id: body.data.id });

//   const receivedPayment = {
//     id: payment.id!,
//     amount: payment.transaction_amount!,
//     message: payment.description!,
//     createdAt: payment.date_created!,
//   };

//   // await db.insert(payments).values(receivedPayment);

//   return Response.json({ success: true });
// }
