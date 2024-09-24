"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/schemas";
import { FormState } from "@/lib/utils";
import { AuthError } from "next-auth";

export async function login(
  state: FormState<typeof loginSchema>,
  formData: FormData
): Promise<FormState<typeof loginSchema>> {
  const validatedFields = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Invalid credentials",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await signIn("credentials", { ...validatedFields.data });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        status: "error",
        message: "Invalid credentials",
      };
    }
  }
  return {
    status: "success",
    message: "User logged in.",
  };
}
