export const phoneNumberFormatter = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, "");

  if (numericValue.length === 0) {
    return "";
  } else if (numericValue.length <= 4) {
    return `(${numericValue}`;
  } else if (numericValue.length <= 7) {
    return `(${numericValue.slice(0, 4)}) ${numericValue.slice(4)}`;
  } else {
    return `(${numericValue.slice(0, 4)}) ${numericValue.slice(
      4,
      7
    )}-${numericValue.slice(7, 11)}`;
  }
};
