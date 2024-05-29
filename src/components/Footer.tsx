import Link from "next/link";
import { LogoSVG } from "@components/Icons";
import { InstagramLogo, XLogo, YoutubeLogo } from "./Icons";
import { Separator } from "./ui/separator";

const navLinks = [
  {
    title: "Home",
  },
  {
    title: "Products",
  },
  {
    title: "About",
  },
];

const socialLinks = [
  {
    icon: <InstagramLogo />,
  },
  {
    icon: <YoutubeLogo />,
  },
  {
    icon: <XLogo />,
  },
];

export function Footer() {
  return (
    <footer className="bg-footer-surface py-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 gap-2 rtl:space-x-reverse"
          >
            <span className="bg-white rounded-full p-1 cursor-pointer transition duration-200">
              <LogoSVG width="30" height="30" />
            </span>
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Urban Vogue
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 gap-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={`/${
                    link.title === "Home" ? "" : link.title.toLowerCase()
                  }`}
                  className="hover:text-custom-accent cursor-pointer transition duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-6 lg:my-8 bg-gray-500" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            Urban Vogue™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
