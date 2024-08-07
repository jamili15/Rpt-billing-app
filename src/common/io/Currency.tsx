import React from "react";

interface CurrencyComponentProps {
  amount: number | string;
  currency?: string;
  caption?: string;
  classname?: string;
  decimal?: number;
}

const Currency: React.FC<CurrencyComponentProps> = ({
  amount,
  currency,
  caption,
  classname,
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

    const locale = "en-US"; // You can change this to any locale you prefer

    const formattedValue = new Intl.NumberFormat(locale, options).format(
      numericAmount
    );

    return formattedValue;
  };

  return (
    <>
      {caption && (
        <span className={`pr-5 uppercase font-bold ${classname}`}>
          {caption} :
        </span>
      )}
      <div className={classname}>{formattedAmount()}</div>
    </>
  );
};

export default Currency;
