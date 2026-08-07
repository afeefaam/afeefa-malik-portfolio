import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merges class strings, letting a later Tailwind utility safely override
 * an earlier conflicting one (e.g. a caller's className overriding an
 * internal padding class) instead of both landing in the string and
 * fighting on source order. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
