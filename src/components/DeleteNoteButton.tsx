"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteNoteAction } from "@/actions/notes";
import { toast } from "sonner";

type Props = {
  noteId: string;
  deleteNoteLocally: (noteId: string) => void;
};

function DeleteNoteButton({ noteId, deleteNoteLocally }: Props) {
  const router = useRouter();
  const noteIdParam = useSearchParams().get("noteId") || "";

  const [isPending, startTransition] = useTransition();

  const handleDeleteNote = () => {
    startTransition(async () => {
      const { errorMessage } = await deleteNoteAction(noteId);

      if (!errorMessage) {
        toast.success("Note deleted successfully!");
        deleteNoteLocally(noteId);

        if (noteId === noteIdParam) {
          router.replace("/");
        }
      } else {
        toast.error(`Error deleting note: ${errorMessage}`);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="absolute right-2 top-2.5 size-6 p-0 opacity-0 group-hover/item:opacity-100 hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all duration-200"
          variant="ghost"
          size="icon"
          title="Delete note"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="glass-card rounded-2xl max-w-md border-border/60">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">
            Delete this note?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-muted-foreground">
            This note will be permanently removed from your account. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0 mt-2">
          <AlertDialogCancel className="rounded-xl text-xs h-9">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteNote}
            className="rounded-xl text-xs h-9 bg-destructive text-destructive-foreground hover:bg-destructive/90 min-w-20"
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteNoteButton;
