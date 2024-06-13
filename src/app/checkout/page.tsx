import { Wrapper } from "@components/Wrapper";
import CheckoutProds from "./_components/CheckoutProds";
import CheckoutLogic from "./_components/CheckoutLogic";

export default async function CheckoutPage() {
  return (
    <Wrapper className="flex border rounded-md overflow-hidden h-fit mt-8">
      <CheckoutProds />
      <CheckoutLogic />
    </Wrapper>
  );
}
