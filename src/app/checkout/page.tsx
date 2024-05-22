import { Wrapper } from "@components/Wrapper";
import CheckoutProds from "./_components/CheckoutProds";
import CheckoutLogic from "./_components/CheckoutLogic";
import { db } from "@db";
import { products } from "@db/schemas/products";

export default async function CheckoutPage() {
  const prods = await db.select().from(products);

  return (
    <Wrapper className="flex gap-8 border rounded-md p-4">
      <CheckoutProds prods={prods} />
      <CheckoutLogic />
    </Wrapper>
  );
}
