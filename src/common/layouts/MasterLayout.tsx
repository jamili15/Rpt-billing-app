import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Url } from "next/dist/shared/lib/router/router";

interface HomeProps {
  children: React.ReactNode;
  lgucaption?: string | undefined;
  lguLogo: string;
  href?: Url;
}

const MasterLayout: React.FC<HomeProps> = ({
  children,
  lgucaption,
  lguLogo,
  href,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header lguLogo={lguLogo} lgucaption={lgucaption} href={href} />
      <div className="flex flex-col flex-1 pt-20">
        <main className="w-full flex justify-center items-start py-5 flex-1">
          {children}
        </main>
      </div>
      <Footer copyright={"@Copyright 2024 Filipizen"} />
    </div>
  );
};

export default MasterLayout;
