import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return <LoginForm />;
}
