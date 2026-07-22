"use client";

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { LoginAction, SignUpAction } from "@/actions/users";

type Props = {
  type: "login" | "SignUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        const result = await LoginAction(email, password);
        errorMessage = result?.errorMessage;
        title = "Logged in! ";
        description = "Welcome back to your Notes workspace.";
      } else {
        const result = await SignUpAction(email, password);
        errorMessage = result?.errorMessage;
        title = "Account created! ";
        description = "Check your email for a confirmation link.";
      }

      if (errorMessage === null || errorMessage === undefined) {
        toast.success(title + description);
        router.replace("/");
        router.refresh();
      } else {
        toast.error(`Authentication error: ${errorMessage}`);
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <CardContent className="grid w-full items-center gap-5 p-6 pb-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-semibold text-foreground/90">
            Email Address
          </Label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 size-4 text-muted-foreground" />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              disabled={isPending}
              className="h-11 w-full pl-9 pr-3 text-sm rounded-xl border-border/60 bg-muted/40 focus-visible:ring-2 focus-visible:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-semibold text-foreground/90">
            Password
          </Label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 size-4 text-muted-foreground" />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              disabled={isPending}
              className="h-11 w-full pl-9 pr-3 text-sm rounded-xl border-border/60 bg-muted/40 focus-visible:ring-2 focus-visible:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 p-6 pt-2">
        <Button
          disabled={isPending}
          className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 gap-2"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <span>{isLoginForm ? "Sign In" : "Create Account"}</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          {isLoginForm ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/Sign-up" : "/login"}
            className={`font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline ${
              isPending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {isLoginForm ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;