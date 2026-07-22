import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";

function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-1 flex-col items-center justify-center py-12">
      {/* Background Glow Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 blur-3xl pointer-events-none" />

      <Card className="glass-card relative z-10 w-full max-w-md rounded-3xl border-border/60 p-2 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25">
            <NotebookPen className="size-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Sign in to access your notes and AI assistant
          </CardDescription>
        </CardHeader>

        <AuthForm type="login" />
      </Card>
    </div>
  );
}

export default LoginPage;