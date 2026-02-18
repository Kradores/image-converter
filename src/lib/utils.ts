import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void, 
  delay: number
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
