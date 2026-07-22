"use client";

import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchIcon, X, FileQuestion } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId),
    );
  };

  return (
    <SidebarGroupContentShadCN className="space-y-3">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 size-4 text-muted-foreground" />
        <Input
          className="h-9 w-full bg-muted/60 pl-9 pr-8 text-xs rounded-lg border-border/50 focus-visible:ring-1 focus-visible:ring-indigo-500/50 transition-all"
          placeholder="Search notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-2.5 rounded-sm text-muted-foreground hover:text-foreground p-0.5"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground my-2">
          <FileQuestion className="size-8 stroke-[1.5] text-muted-foreground/60 mb-2" />
          <p className="text-xs font-medium">
            {searchText ? "No notes found matching search" : "No notes created yet"}
          </p>
          <p className="text-[11px] text-muted-foreground/80 mt-0.5">
            {searchText ? "Try a different keyword" : "Click 'New Note' to get started"}
          </p>
        </div>
      ) : (
        <SidebarMenu className="space-y-1">
          {filteredNotes.map((note) => (
            <SidebarMenuItem key={note.id} className="group/item relative rounded-lg transition-colors">
              <SelectNoteButton note={note} />

              <DeleteNoteButton
                noteId={note.id}
                deleteNoteLocally={deleteNoteLocally}
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      )}
    </SidebarGroupContentShadCN>
  );
}

export default SidebarGroupContent;
