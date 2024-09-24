import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormState<TSchemaType extends z.ZodType> = {
  status: "success" | "error" | "initial";
  message: string;
  errors?: z.inferFlattenedErrors<TSchemaType>["fieldErrors"];
};
