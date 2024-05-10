import Link from "next/link";

import { Wrapper } from "@components/Wrapper";
import { CartSheet } from "./CartSheet";
import { NavbarComponent } from "./NavbarComponent";
import { ProfileDropdown } from "./ProfileDropdown";

import { LogoSVG } from "@components/Icons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const headerInfo = {
  logo: <LogoSVG />,
};

export async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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

          <CartSheet />
        </span>
      </Wrapper>
    </header>
  );
}
