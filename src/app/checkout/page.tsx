import { Wrapper } from "@components/Wrapper";
import CheckoutProds from "./_components/CheckoutProds";
import CheckoutLogic from "./_components/CheckoutLogic";

// If you want to implement Wix's checkout page and management, follow along with this tutorial: https://www.youtube.com/watch?v=I0BOUiFe9WY (4:48:00)
export default async function CheckoutPage() {
  return (
    <Wrapper className="flex border rounded-md overflow-hidden h-fit mt-8">
      <CheckoutProds />
      <CheckoutLogic />
    </Wrapper>
  );
}
