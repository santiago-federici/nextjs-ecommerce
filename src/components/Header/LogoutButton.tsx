import { Button } from "@components/ui/button";
import { useContext } from "react";
import Cookies from "js-cookie";
import { WixClientContext } from "@contexts/WixContext";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const wixClient = useContext(WixClientContext);

  const router = useRouter();

  const handleLogoutCLick = async () => {
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    router.push(logoutUrl);
  };

  return (
    <Button
      variant={"link"}
      className={"text-red-600 p-0 m-0 h-fit w-fit"}
      onClick={() => handleLogoutCLick()}
    >
      Logout
    </Button>
  );
}
