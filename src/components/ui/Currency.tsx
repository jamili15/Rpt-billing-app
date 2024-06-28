import React from "react";

interface CurrencyComponentProps {
  amount: number | string;
  currency?: string;
  caption?: string;
  className?: string;
  decimal?: number;
}

const Currency: React.FC<CurrencyComponentProps> = ({
  amount,
  currency,
  caption,
  className,
  decimal = 2,
}) => {
  const formattedAmount = () => {
    const numericAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) {
      return "Invalid Amount";
    }

    const options: Intl.NumberFormatOptions = {
      style: currency ? "currency" : "decimal",
      currency: currency === "Php" || currency === "USD" ? currency : undefined,
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    };

    const formattedValue = numericAmount.toLocaleString(undefined, options);

    return formattedValue;
  };

  return (
    <>
      {caption && (
        <span className={`pr-5 uppercase font-bold ${className}`}>
          {caption} :
        </span>
      )}
      <div className={`${className}`}>{formattedAmount()}</div>
    </>
  );
};

export default Currency;
