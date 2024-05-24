import Link from "next/link";

import { Wrapper } from "@components/Wrapper";
import { CartSheet } from "./CartSheet";
import { NavbarComponent } from "./NavbarComponent";
import { ProfileDropdown } from "./ProfileDropdown";

import { LogoSVG } from "@components/Icons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@db";
import { eq } from "drizzle-orm";
import { products } from "@db/schemas/products";
import { users } from "@db/schemas/users";

const headerInfo = {
  logo: <LogoSVG />,
};

export async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user && user !== null) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id));

    if (existingUser.length <= 0) {
      await db.insert(users).values({ id: user.id }).returning();
    }
  }

  // getting the prods from the database to use them in the cart. The import is here and not in the CartSheet or the CartCard component
  // because those are client components, and getting the prods from the DB requires async/await functions, which are not
  // available in client components (at least for now).
  const prods = await db.select().from(products);

  return (
    <header className="w-full">
      <Wrapper className="py-4 flex justify-between items-center">
        <NavbarComponent user={user} />

        <Link href={"/"} className="order-2 lg:order-1">
          <div
            className={
              "bg-white rounded-full p-1 cursor-pointer transition duration-200"
            }
          >
            {headerInfo.logo}
          </div>
        </Link>

        <span className="flex gap-4 order-3">
          <ProfileDropdown user={user} />

          <CartSheet prods={prods} userId={user?.id!} />
        </span>
      </Wrapper>
    </header>
  );
}
