"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";
import { debounceTimeout } from "@/lib/constants";
import UseNote from "@/hooks/UseNote";
import { updateNoteAction } from "@/actions/notes";
import { Check, Copy, Sparkles, RefreshCw, Trash, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = UseNote();
  const [saveState, setSaveState] = useState<"saved" | "saving">("saved");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
      setSaveState("saved");
    }
  }, [startingNoteText, noteIdParam, noteId, setNoteText]);

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);
    setSaveState("saving");

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(async () => {
      await updateNoteAction(noteId, text);
      setSaveState("saved");
    }, debounceTimeout);
  };

  const handleCopy = () => {
    if (!noteText) return;
    navigator.clipboard.writeText(noteText);
    setCopied(true);
    toast.success("Note copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Word & Character count calculation
  const words = noteText.trim() ? noteText.trim().split(/\s+/).length : 0;
  const chars = noteText.length;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      {/* Note Stats & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-card/60 p-2.5 px-4 backdrop-blur-md border border-border/50 text-xs text-muted-foreground shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            {saveState === "saving" ? (
              <>
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-amber-500"></span>
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Saving...</span>
              </>
            ) : (
              <>
                <span className="size-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Auto-saved</span>
              </>
            )}
          </div>
          <span className="h-3 w-px bg-border/60" />
          <span className="font-mono text-[11px]">
            {words} {words === 1 ? "word" : "words"} · {chars} chars
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono">
            ~{readTimeMinutes} min read
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!noteText}
            className="h-7 text-xs gap-1 px-2.5 hover:bg-muted"
            title="Copy note text"
          >
            {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="relative rounded-2xl border border-border/60 bg-card/80 p-1 backdrop-blur-xl shadow-lg shadow-indigo-500/5 transition-all focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20">
        <Textarea
          value={noteText}
          onChange={handleUpdateNote}
          placeholder="Start typing your note here... Markdown styling and quick thoughts supported!"
          className="custom-scrollbar min-h-[500px] w-full resize-none border-none bg-transparent p-6 text-base font-normal leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}

export default NoteTextInput;