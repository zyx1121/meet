import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from 'nanoid'
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCode(length: number) {
  return customAlphabet('0123456789', length)()
}
