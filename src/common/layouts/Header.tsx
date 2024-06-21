import Image from "next/image";
import React from "react";

interface HeaderProps {
  lgucaption?: string;
  lguLogo: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ lgucaption, lguLogo, className }) => {
  const logoSrc = lguLogo ? lguLogo : "/lgu-logo.png";

  return (
    <header
      className={`${className} bg-[#2c3e50] w-full h-14 fixed top-0 z-10`}
    >
      <div className="flex gap-5 items-center h-full pl-16 text-xl text-white font-bold">
        <div>
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
        </div>
        <p>{lgucaption}</p>
      </div>
    </header>
  );
};

export default Header;
