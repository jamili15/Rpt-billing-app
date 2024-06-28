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
