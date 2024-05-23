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

// 👇🏽 Pagination (from the nextjs tutorial)
// export const generatePagination = (currentPage: number, totalPages: number) => {
//   // If the total number of pages is 7 or less,
//   // display all pages without any ellipsis.
//   if (totalPages <= 7) {
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   }

//   // If the current page is among the first 3 pages,
//   // show the first 3, an ellipsis, and the last 2 pages.
//   if (currentPage <= 3) {
//     return [1, 2, 3, '...', totalPages - 1, totalPages];
//   }

//   // If the current page is among the last 3 pages,
//   // show the first 2, an ellipsis, and the last 3 pages.
//   if (currentPage >= totalPages - 2) {
//     return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
//   }

//   // If the current page is somewhere in the middle,
//   // show the first page, an ellipsis, the current page and its neighbors,
//   // another ellipsis, and the last page.
//   return [
//     1,
//     '...',
//     currentPage - 1,
//     currentPage,
//     currentPage + 1,
//     '...',
//     totalPages,
//   ];
// };

export function generateRandomString(bytes: number) {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const crypto = require("crypto");
    return crypto.randomBytes(bytes).toString("hex");
  }

  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return Array.from(array, (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
