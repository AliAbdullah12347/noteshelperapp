import { getUser } from "@/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";
import { FileText, LogIn, Sparkles } from "lucide-react";

async function AppSidebar() {
  const user = await getUser();
  let notes: Note[] = [];

  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  return (
    <Sidebar className="border-r border-border/50 bg-sidebar/80 backdrop-blur-md">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <FileText className="size-4" />
            </div>
            <span className="font-semibold text-sm tracking-tight">Your Library</span>
          </div>
          {user && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/50">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup className="p-0">
          {!user ? (
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-muted/40 border border-dashed border-border/60 my-4 gap-3">
              <div className="size-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Sparkles className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Access your notes</p>
                <p className="text-xs text-muted-foreground">Sign in to save and organize notes with AI power.</p>
              </div>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline pt-1"
              >
                <LogIn className="size-3.5" />
                Log in to account
              </Link>
            </div>
          ) : (
            <SidebarGroupContent notes={notes} />
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;