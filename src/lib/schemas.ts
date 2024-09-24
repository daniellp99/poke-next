import { PASSWORD, USERNAME } from "@/constants";
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "username is required" })
    .trim()
    .refine((val) => val === USERNAME, {
      message: "Hey, you're not the best pokemon trainer. Try again.",
    }),
  password: z
    .string()
    .min(1, { message: "password is required" })
    .trim()
    .refine((val) => val === PASSWORD, {
      message: "Remember your favorite pokemon.",
    }),
});
