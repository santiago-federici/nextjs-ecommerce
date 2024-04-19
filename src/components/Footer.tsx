import Link from "next/link";
import { InstagramLogo, XLogo, YoutubeLogo } from "./Icons";

const navLinks = [
  {
    title: 'Home'
  },
  {
    title: 'Products'
  },
  {
    title: 'About'
  }
]

const socialLinks = [
  {
    icon: <InstagramLogo />
  },
  {
    icon: <YoutubeLogo />
  },
  {
    icon: <XLogo />
  }
]

export function Footer () {
  return (
    <footer className="bg-footer-surface py-20">
      <div className="wrapper text-gray-200 grid gap-8 place-items-center text-lg lg:text-xl">
        <ul className="flex gap-4">
          {
            navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={`/${link.title === 'Home' ? '' : link.title.toLowerCase()}`}
                  className="hover:text-custom-accent cursor-pointer transition duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))
          }
        </ul>

        <ul className="flex gap-4">
          {
            socialLinks.map((link, index) => (
              <li key={index} className="hover:bg-slate-700 p-1 rounded-xl cursor-pointer transition duration-200">{link.icon}</li>
            ))
          }
        </ul>

        <p className="text-sm text-center hover:text-custom-accent cursor-pointer transition duration-200">Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  )
}