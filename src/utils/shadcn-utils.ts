import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Generate a class name string based on the provided class values.
 *
 * @param {ClassValue[]} inputs - An array of class values.
 * @return {string} - The generated class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
