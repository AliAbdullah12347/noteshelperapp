"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { debounceTimeout } from "@/lib/constants";
import { createNoteAction } from "@/actions/notes";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);
      toast("Creating a new note...");

      await new Promise((resolve) =>
        setTimeout(resolve, debounceTimeout + 200),
      );

      const uuid = uuidv4();
      await createNoteAction(uuid);

      router.push(`/?noteId=${uuid}`);
      toast.success("New note created!");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant="outline"
      className="h-9 px-4 text-xs font-semibold gap-1.5 rounded-xl border-border/60 hover:bg-muted/80 hover:border-indigo-500/30 transition-all"
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin text-indigo-500" />
      ) : (
        <>
          <Plus className="size-4 text-indigo-500" />
          <span>New Note</span>
        </>
      )}
    </Button>
  );
}

export default NewNoteButton;