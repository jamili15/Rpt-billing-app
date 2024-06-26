import { TextField } from "@mui/material";
import React, { useState } from "react";

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
    <TextField
      value={inputValue}
      onChange={handleChange}
      onBlur={onBlur}
      id="accountNo"
      label="Tax Declaration No."
      variant="standard"
      className="!w-full"
      error={!!error}
      helperText={error ? helperText : ""}
    />
  );
};

export default RefAccount;
