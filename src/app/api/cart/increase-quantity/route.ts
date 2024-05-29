import { increaseQuantity } from "@lib/cartUtils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const { prodId, userId, stock } = await request.json();

      if (!userId) {
        return NextResponse.json({
          warning: "Cant save data to DB because user is not logged in",
        });
      }

      if (!prodId || !stock) {
        return NextResponse.json({
          error: "Missing required fields",
        });
      }

      const response = await increaseQuantity(prodId, userId, stock);

      return NextResponse.json(response);
    } catch (err) {
      return NextResponse.json({ error: "Failed to add to cart" });
    }
  } else {
    NextResponse.json({ error: "Method not allowed" });
  }
}
