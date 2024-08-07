import { phoneNumberFormatter } from "./formatter";

export function required(value: any) {
  return value ? undefined : "Required";
}

export function validateDate(value: any) {
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(value); // YYYY-MM-DD format

  return isValidDate ? undefined : "Please enter a valid date.";
}

export function validateEmail(value: any) {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return isValidEmail ? undefined : "Invalid Email Address";
}

export const validatePhone = (value: string) => {
  // Check if the value is undefined or null
  if (!value) return "Phone number is required"; // Return an error if the value is not provided

  // Remove non-digit characters to check the length
  const numericValue = value.replace(/[^\d]/g, "");

  // Check if the length is exactly 11 digits
  if (numericValue.length !== 11) {
    return "Phone number must be exactly 11 digits";
  }

  // Optionally, format the value
  const formattedValue = phoneNumberFormatter(value);
  const isValid = formattedValue.match(/^\(\d{4}\) \d{3}-\d{4}$/);

  if (!isValid) {
    return "Invalid phone number format";
  }

  return undefined; // No error
};
