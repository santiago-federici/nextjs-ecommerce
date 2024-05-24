import { removeProd } from "@lib/cartUtils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const { prodId, userId } = await request.json();

      if (!prodId || !userId) {
        return NextResponse.json({
          error: "Missing required fields",
        });
      }

      const response = await removeProd(prodId, userId);

      return NextResponse.json(response);
    } catch (err) {
      console.error("Error adding to cart:", err);
      return NextResponse.json({ error: "Failed to add to cart" });
    }
  } else {
    NextResponse.json({ error: "Method not allowed" });
  }
}