import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Zap, Shield, ArrowRight, NotebookPen } from "lucide-react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = noteId && user ? await prisma.note.findUnique({
    where: {
      id: noteId,
      authorId: user.id,
    },
  }) : null;

  return (
    <div className="flex h-full min-h-[calc(100vh-6rem)] flex-col items-center justify-start pb-12">
      {/* Workspace Controls Header */}
      <div className="flex w-full max-w-4xl items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <SidebarTriggerWrapper />
        </div>

        <div className="flex items-center gap-2">
          <AskAIButton user={user} />
          <NewNoteButton user={user} />
        </div>
      </div>

      {/* Editor or Hero Welcome Canvas */}
      {noteId && note ? (
        <NoteTextInput noteId={noteId} startingNoteText={note.text || ""} />
      ) : (
        <div className="flex w-full max-w-4xl flex-col items-center justify-center rounded-3xl border border-border/60 bg-card/60 p-8 sm:p-12 text-center backdrop-blur-xl shadow-xl shadow-indigo-500/5 my-auto">
          <div className="relative mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="flex size-full items-center justify-center rounded-[14px] bg-background">
              <Sparkles className="size-8 text-indigo-500 animate-pulse" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Welcome to <span className="gradient-text">NotesHelper AI</span>
          </h2>

          <p className="mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
            Your intelligent personal workspace. Write thoughts, store notes, and query Gemini AI instantly across all your documents.
          </p>

          <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3 w-full max-w-2xl text-left">
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4 shadow-sm backdrop-blur-md">
              <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 mb-3">
                <Sparkles className="size-4" />
              </div>
              <h3 className="text-xs font-bold text-foreground">Ask AI Assistant</h3>
              <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                Query all your notes at once, summarize topics, or extract action items.
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background/60 p-4 shadow-sm backdrop-blur-md">
              <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 mb-3">
                <Zap className="size-4" />
              </div>
              <h3 className="text-xs font-bold text-foreground">Real-Time Sync</h3>
              <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                Instant automatic background saving keeps your data safe and synced.
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background/60 p-4 shadow-sm backdrop-blur-md">
              <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-3">
                <Shield className="size-4" />
              </div>
              <h3 className="text-xs font-bold text-foreground">Supabase Cloud</h3>
              <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                Secure cloud storage backed by PostgreSQL and encrypted sessions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {user ? (
              <NewNoteButton user={user} />
            ) : (
              <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl shadow-md gap-2 px-6">
                <Link href="/login">
                  <span>Sign In to Get Started</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Client helper for sidebar trigger inside server page
function SidebarTriggerWrapper() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Workspace
      </span>
    </div>
  );
}

export default HomePage;