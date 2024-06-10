import Link from "next/link";

import { Wrapper } from "@components/Wrapper";
import { CartSheet } from "./CartSheet";
import { NavbarComponent } from "./NavbarComponent";
import { ProfileDropdown } from "./ProfileDropdown";

import { LogoSVG } from "@components/Icons";

import { wixClientServer } from "@lib/WixClientServer";

const headerInfo = {
  logo: <LogoSVG />,
};

export async function Header() {
  const wixClient = await wixClientServer();
  const isUserLoggedIn = await wixClient.auth.loggedIn();

  // getting the prods from the database to use them in the cart. The import is here and not in the CartSheet or the CartCard component
  // because those are client components, and getting the prods from the DB requires async/await functions, which are not
  // available in client components (at least for now).

  return (
    <header className="w-full">
      <Wrapper className="py-4 flex justify-between items-center">
        <NavbarComponent isUserLoggedIn={isUserLoggedIn} />

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
          <ProfileDropdown isUserLoggedIn={isUserLoggedIn} />

          {/* <CartSheet prods={prods} userId={user?.id!} /> */}
        </span>
      </Wrapper>
    </header>
  );
}
