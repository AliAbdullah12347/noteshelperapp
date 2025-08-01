"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input"; 
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  type: "login" | "SignUp";
};

function AuthForm({ type }: Props) {
    const isLoginForm = type === "login";   
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
 
    const handleSubmit = (formData: FormData) => {
        
        // Handle form submission logic here
        console.log(`${isLoginForm ? "Logging in" : "Registering"}...`);
        // Simulate a successful login or registration
        router.push("/"); // Redirect to dashboard after successful login/registration
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