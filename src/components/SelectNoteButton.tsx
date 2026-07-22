"use client";

import UseNote from "@/hooks/UseNote";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";
import { Calendar, FileText } from "lucide-react";

type Props = {
  note: Note;
};

function SelectNoteButton({ note }: Props) {
  const noteId = useSearchParams().get("noteId") || "";

  const { noteText: selectedNoteText } = UseNote();
  const [shouldUseGlobalNoteText, setShouldUseGlobalNoteText] = useState(false);
  const [localNoteText, setLocalNoteText] = useState(note.text);

  useEffect(() => {
    if (noteId === note.id) {
      setShouldUseGlobalNoteText(true);
    } else {
      setShouldUseGlobalNoteText(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldUseGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, shouldUseGlobalNoteText]);

  const blankNoteText = "Untitled Note";
  let fullText = localNoteText || blankNoteText;
  if (shouldUseGlobalNoteText) {
    fullText = selectedNoteText || blankNoteText;
  }

  // Extract first line as title, rest as preview
  const lines = fullText.trim().split("\n");
  const title = lines[0] || blankNoteText;
  const preview = lines.slice(1).join(" ").trim() || (lines.length === 1 ? "" : "No additional text");

  const isSelected = note.id === noteId;

  // Format date nicely
  const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <SidebarMenuButton
      asChild
      className={`relative flex w-full items-start gap-2.5 rounded-lg p-2.5 transition-all duration-150 ${
        isSelected
          ? "bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-950 dark:text-indigo-100 font-medium border border-indigo-500/30"
          : "hover:bg-muted/70 text-muted-foreground hover:text-foreground border border-transparent"
      }`}
    >
      <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col w-full pr-7">
        <div className="flex items-center justify-between w-full mb-0.5">
          <span className="font-semibold text-xs text-foreground truncate max-w-[130px]">
            {title}
          </span>
          <span className="text-[10px] text-muted-foreground/70 flex items-center gap-1 font-mono">
            {formattedDate}
          </span>
        </div>
        
        <p className="w-full text-[11px] text-muted-foreground/80 line-clamp-1 truncate font-normal leading-normal">
          {preview || fullText}
        </p>
      </Link>
    </SidebarMenuButton>
  );
}

export default SelectNoteButton;
