import { wixClientServer } from "@lib/WixClientServer";

import { Wrapper } from "@components/Wrapper";
import { Card } from "@components/Card";

export async function NewestAdditionsSection() {
  const wixClient = await wixClientServer();
  const res = await wixClient.products
    .queryProducts()
    .descending("lastUpdated")
    .limit(4)
    .find();
  const products = res.items;

  return (
    <Wrapper className="py-16 overflow-hidden grid gap-8 place-items-center">
      <h3 className="text-4xl font-bold uppercase mb-4 text-center">
        Newest additions
      </h3>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((prod) => (
          <Card key={prod._id} prod={prod} />
        ))}
      </section>
    </Wrapper>
  );
}
