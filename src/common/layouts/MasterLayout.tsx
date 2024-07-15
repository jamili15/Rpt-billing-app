import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { usePartnerContext } from "../components/Email/PartnerModel";

interface HomeProps {
  children: React.ReactNode;
  lgucaption?: string | undefined;
  lguLogo: string;
}

const MasterLayout: React.FC<HomeProps> = ({
  children,
  lgucaption,
  lguLogo,
}) => {
  const { id } = usePartnerContext();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header
        lguLogo={lguLogo}
        lgucaption={lgucaption}
        href={`/partners/${id}`}
      />
      <div className="flex flex-col flex-1 pt-20">
        <main className="w-full flex justify-center items-start py-5 flex-1">
          {children}
        </main>
      </div>
      <Footer
        copyright={"@Copyright 2024 "}
        filipizen="Filipizen"
        href={`/partners`}
      />
    </div>
  );
};

export default MasterLayout;
