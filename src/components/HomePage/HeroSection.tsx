import Link from "next/link";

import { Wrapper } from "@components/Wrapper";
import { Button } from "@components/ui/button";

const sectionInfo = {
  title: "Dress to Impress. Enter Our Fashion Wonderland",
  btn: {
    text: "Shop now",
    href: "/products",
  },
};

export function HeroSection() {
  return (
    <Wrapper className="py-[180px] lg:py-[200px] flex flex-col justify-center items-center lg:items-start gap-8">
      <div className="hero-bg"></div>
      <h1 className="text-white text-center lg:text-left lg:max-w-xl">
        {sectionInfo.title}
      </h1>

      <Link href={sectionInfo.btn.href}>
        <Button
          variant="outline"
          className="relative bg-transparent text-white uppercase border border-white hero-btn-effect z-10 hover:bg-transparent"
        >
          {sectionInfo.btn.text}
        </Button>
      </Link>
    </Wrapper>
  );
}
