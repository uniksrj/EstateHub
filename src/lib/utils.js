import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function deleteP(id){
    if(!id){
      console.error("Invalid ID");
      return;
    }

    
}