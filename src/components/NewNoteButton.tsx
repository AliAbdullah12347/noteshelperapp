"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from "uuid"; // Assuming you want to generate a unique ID for the new note
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
        }
        else {
            setLoading(true);
            // Logic to create a new note goes here
            await new Promise((resolve) => setTimeout(resolve, debounceTimeout + 500)); // Simulating a delay for note creation
            const uuid = uuidv4(); // Generate a unique ID for the new note
            await createNoteAction(uuid); // Assuming createNoteAction is defined to handle note creation
            router.push(`/?noteId=${uuid}`); // Redirect to the new note page

            toast.success("New note created successfully!");
            setLoading(false);
        }
    }
        
    console.log(user?.email);
    return (
        <Button
        onClick={handleClickNewNoteButton}
        variant="secondary"
        className="w-24"
        disabled={loading}>

        {loading ? <Loader2 className="animate-spin" /> : "New Note"}
        
        </Button>
    );
}

export default NewNoteButton;