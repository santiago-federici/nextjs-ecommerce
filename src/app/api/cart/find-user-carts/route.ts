import { db } from "@db";
import { carts } from "@db/schemas/carts";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (request.method === "GET") {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (user) {
      const userCarts = await db
        .select()
        .from(carts)
        .where(eq(carts.userId, user.id));
      return NextResponse.json(userCarts);
    }

    return NextResponse.json({ error: "User not found" });
  } else {
    NextResponse.json({ error: "Method not allowed" });
  }
}
