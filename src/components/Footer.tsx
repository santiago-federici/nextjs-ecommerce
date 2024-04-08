import { InstagramLogo, XLogo, YoutubeLogo } from "./Icons";

export function Footer () {
  return (
    <footer className="footer footer-center p-16 md:p-28 bg-base-200 text-base-content rounded md:text-lg mt-32">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav> 
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="#" className="hover:scale-110 transition duration-200">
            <XLogo />
          </a>
          <a href="#" className="hover:scale-110 transition duration-200">
            <InstagramLogo />
          </a>
          <a href="#" className="hover:scale-110 transition duration-200">
            <YoutubeLogo />
          </a>
        </div>
      </nav> 
      <aside>
        <p>Copyright © 2024 - All right reserved by Ecom Industries Ltd</p>
      </aside>
    </footer>
  )
}