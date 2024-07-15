import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

interface FooterProps {
  copyright: string;
  className?: string;
  filipizen: string;
  href?: Url;
}

const Footer: React.FC<FooterProps> = ({
  copyright,
  className,
  filipizen,
  href,
}) => {
  return (
    <footer
      className={`${className} bg-gray-200 w-full h-[35px] text-[12px] text-gray-400 mt-auto`}
    >
      <div className="flex gap-5 justify-center border-t-2 border-[#2c3e50] items-center h-full pl-20 ">
        <p>
          {copyright}
          <Link
            href={href || ""}
            className=" hover:border-b hover:border-black"
          >
            <span>{filipizen}</span>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
