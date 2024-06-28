import { TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";

const BouncedTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "showValidation",
})<{ showValidation: boolean }>(({ showValidation }) => ({
  "& .MuiFormLabel-root": {
    transition: "color 0.2s, transform 0.2s",
    ...(showValidation && {
      animation: "bounce 0.2s ease-in-out 1.5",
      color: "#b00020",
    }),
  },
}));

interface RefAccountProps {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean | string | null;
  helperText?: React.ReactNode;
}

const RefAccount: React.FC<RefAccountProps> = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uppercaseValue = e.target.value.toUpperCase();
    setInputValue(uppercaseValue);
    onChange(uppercaseValue);
  };

  return (
    <div>
      <BouncedTextField
        value={inputValue}
        onChange={handleChange}
        onBlur={onBlur}
        id="accountNo"
        label="Tax Declaration No."
        variant="standard"
        className="!w-full"
        error={!!error}
        helperText={error ? helperText : ""}
        showValidation={!!error}
      />
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-2px);
          }
          50% {
            transform: translateX(2px);
          }
        }
      `}</style>
    </div>
  );
};

export default RefAccount;
