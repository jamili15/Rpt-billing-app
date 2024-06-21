import React from "react";

interface FooterProps {
  copyright: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ copyright, className }) => {
  return (
    <footer
      className={`${className} bg-gray-200 w-full h-10 text-sm text-gray-400 mt-auto`}
    >
      <div className="flex gap-5 justify-center border-t-2 border-[#2c3e50] items-center h-full pl-20 ">
        <p>{copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
