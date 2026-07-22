import Link from "next/link";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import LogOutButton from "@/components/LogOutButton";
import { getUser } from "@/auth/server";
import { Sparkles, NotebookPen, LogIn, UserPlus } from "lucide-react";

async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl transition-all duration-200">
      <Link href="/" className="group flex items-center gap-3">
        <div className="relative flex size-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
          <div className="flex size-full items-center justify-center rounded-[10px] bg-background">
            <NotebookPen className="size-5 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              NotesHelper
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 border border-indigo-500/20">
              <Sparkles className="size-3" />
              AI
            </span>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Smart AI Workspace
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="max-w-[150px] truncate">{user.email}</span>
            </div>
            <LogOutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex gap-1.5 text-muted-foreground hover:text-foreground">
              <Link href="/login">
                <LogIn className="size-4" />
                Login
              </Link>
            </Button>

            <Button asChild size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/20 gap-1.5">
              <Link href="/Sign-up">
                <UserPlus className="size-4" />
                Get Started
              </Link>
            </Button>
          </div>
        )}

        <div className="h-6 w-px bg-border/60 mx-1 hidden sm:block" />
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;