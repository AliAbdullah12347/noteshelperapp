"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input"; 
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { error } from "console";
import { toast } from "sonner";
import { LoginAction, SignUpAction } from "@/actions/users"; // Assuming these actions are defined in your project

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
            const result = (await LoginAction(email, password));
            errorMessage = result?.errorMessage;
            title = "Logged in";
            description = "You have successfully logged in.";
          }
          else {
            const result = (await SignUpAction(email, password));
            errorMessage = result?.errorMessage;
            title = "Signed up";
            description = "Check your email for a confirmation link.";
          }

          if (!errorMessage) {
            toast.success(title + description);
            router.replace("/");
          } else {
            toast.error("Error " + errorMessage);
          }
        })
    };

    return (
    <form action={handleSubmit} className="space-y-4"> 
    <CardContent className="grid w-full items-center gap-4 space-y-4">
        <div className="space-y-2 flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                disabled={isPending}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>
        <div className="space-y-2 flex flex-col">
            <Label htmlFor="password">Password</Label>
            <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                disabled={isPending}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>
        </CardContent>

        <CardFooter className="mt-4 flex flex-col gap-6 justify-end">   
            <Button className="w-full">
                {isPending ?
                    (<Loader2 className="animate-spin"></Loader2>) 
                : isLoginForm ? 
                    ("Login") 
                    : ("Register")
                }
            </Button>
            <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm 
                ? ("/Sign-up") 
                : ("/login")}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
        </CardFooter>    
    </form> 
  );
}
export default AuthForm;