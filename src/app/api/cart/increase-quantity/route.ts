import { increaseQuantity } from "@app/products/details/_lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const { id, stock } = await request.json();

      if (!id || !stock) {
        return NextResponse.json({
          error: "Missing required fields (id, stock)",
        });
      }

      const response = await increaseQuantity(id, stock);

      return NextResponse.json(response);
    } catch (err) {
      console.error("Error adding to cart:", err);
      return NextResponse.json({ error: "Failed to add to cart" });
    }
  } else {
    NextResponse.json({ error: "Method not allowed" });
  }
}
