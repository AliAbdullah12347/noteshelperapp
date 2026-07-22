import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

function SignUpPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-1 flex-col items-center justify-center py-12">
      {/* Background Glow Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-3xl pointer-events-none" />

      <Card className="glass-card relative z-10 w-full max-w-md rounded-3xl border-border/60 p-2 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="size-6 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create Your Account</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Start organizing thoughts and notes with Gemini AI power
          </CardDescription>
        </CardHeader>

        <AuthForm type="SignUp" />
      </Card>
    </div>
  );
}

export default SignUpPage;
