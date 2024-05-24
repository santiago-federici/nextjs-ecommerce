import { clearCart } from "@lib/cartUtils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const { userId } = await request.json();

      if (!userId) {
        return NextResponse.json({
          error: "Missing required fields",
        });
      }

      const response = await clearCart(userId);

      return NextResponse.json(response);
    } catch (err) {
      return NextResponse.json({ error: "Failed to add to cart" });
    }
  } else {
    NextResponse.json({ error: "Method not allowed" });
  }
}
