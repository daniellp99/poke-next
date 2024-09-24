"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "@/app/actions/login";
import { cn } from "@/lib/utils";

function ErrorList({ errors }: { errors: string[] | undefined }) {
  if (!errors) return null;
  return (
    <ul className="w-full grid items-center text-destructive">
      {errors.map((error) => (
        <li key={error}>
          <p className="text-sm">{error}</p>
        </li>
      ))}
    </ul>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      Login
    </Button>
  );
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action] = useFormState(login, {
    status: "initial",
    message: "",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      redirect("/dashboard");
    }
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex h-full items-center justify-center py-12">
        <form action={action} className="mx-auto grid w-fit gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="username"
                className={cn(state?.errors?.username && "text-destructive")}
              >
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Pokemon Trainer"
              />
              <ErrorList errors={state?.errors?.username} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className={cn(state.errors?.password && "text-destructive")}
                >
                  Password
                </Label>
              </div>
              <div className="flex gap-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-6" />
                  ) : (
                    <EyeIcon className="size-6" />
                  )}
                </Button>
              </div>
              <ErrorList errors={state?.errors?.password} />
            </div>
            <SubmitButton />
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/pokemon-trainer.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="size-full object-fill"
        />
      </div>
    </div>
  );
}
