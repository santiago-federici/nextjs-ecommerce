import { Wrapper } from "@components/Wrapper";
import CheckoutProds from "./_components/CheckoutProds";
import CheckoutLogic from "./_components/CheckoutLogic";

export default async function CheckoutPage() {
  return (
    <Wrapper className="flex gap-8 border rounded-md p-4">
      <CheckoutProds />
      <CheckoutLogic />
    </Wrapper>
  );
}
