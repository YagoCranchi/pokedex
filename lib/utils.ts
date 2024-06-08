import { type ClassValue, clsx } from "clsx"
import { RefObject, useEffect } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useKey(key: string, ref: RefObject<HTMLElement>) {
  useEffect(() => {
    function hotkeyPress(e: KeyboardEvent) {
      if (e.key === key && e.ctrlKey) {
        e.preventDefault();
        ref.current?.focus();
        return;
      }
    }

    document.addEventListener('keydown', hotkeyPress);
    return () => document.removeEventListener('keydown', hotkeyPress);
  }, [key]);
}