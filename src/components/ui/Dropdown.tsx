import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface DropdownProps {
  caption?: string;
  options: number[] | string[];
  className?: string;
  onChange: (option: number | string) => void; // Add the onChange prop
}

const Dropdown: React.FC<DropdownProps> = ({
  caption,
  options,
  className,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | string | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: number | string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`inline-flex justify-between w-[150px] h-[20px] items-center px-4 py-4 text-[10px] font-medium text-gray-700 bg-white border border-gray-500 shadow-sm  ${
          isOpen ? "rounded-t-md" : "rounded-sm"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption || caption}
        <AiFillCaretDown aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0  space-y-2 bg-white border z-[1] border-gray-300 rounded-b-md shadow-lg w-full text-[10px]"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 relative z-[1] ${className}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={option === selectedOption}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
