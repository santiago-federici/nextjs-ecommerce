import { wixClientServer } from "@lib/WixClientServer";

import { Wrapper } from "@components/Wrapper";

export async function NewSection() {
  const wixClient = await wixClientServer();
  const res = await wixClient.products.queryProducts().find();
  const products = res.items;

  return <Wrapper className="w-full py-24 lg:py-32"></Wrapper>;
}
