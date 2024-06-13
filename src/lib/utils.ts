import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// method to test if emails are valid
export const isValidEmail = (email: any) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function generateRandomString(bytes: number) {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const crypto = require("crypto");
    return crypto.randomBytes(bytes).toString("hex");
  }

  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return Array.from(array, (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
