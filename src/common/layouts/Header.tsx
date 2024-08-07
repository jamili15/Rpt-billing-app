import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  lgucaption?: string;
  lguLogo: string;
  className?: string;
  href?: Url;
}

const Header: React.FC<HeaderProps> = ({
  lgucaption,
  lguLogo,
  className,
  href,
}) => {
  const logoSrc = lguLogo ? lguLogo : "/assets/partner/lgu-logo.png";

  return (
    <header
      className={`${className} bg-[#2c3e50] w-full h-14 fixed top-0 z-10`}
    >
      <div className="flex gap-5 items-center h-full pl-16 text-xl text-white font-bold">
        <div>
          <Link href={href || ""}>
            <Image
              src={logoSrc}
              height={45}
              width={45}
              quality={100}
              alt={"lgu-logo"}
              className="bg-white rounded-full"
              loading="eager"
              priority
              unoptimized
            />
          </Link>
        </div>
        <p>{lgucaption}</p>
      </div>
    </header>
  );
};

export default Header;
