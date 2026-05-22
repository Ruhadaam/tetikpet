import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatNumber(value: number | string) {
  const num = typeof value === "string" ? parseFloat(value) : value
  if (isNaN(num)) return "0"
  return new Intl.NumberFormat("tr-TR").format(num)
}
