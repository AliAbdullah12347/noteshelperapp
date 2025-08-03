"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import { debounceTimeout } from "@/lib/constants";
import UseNote from "@/hooks/UseNote";
import { updateNoteAction } from "@/actions/notes";

type Props = {
    noteId: string;
    startingNoteText: string; 
};

let updateTimeout: NodeJS.Timeout;


function NoteTextInput({ noteId, startingNoteText }: Props) {
    const noteIdParam = useSearchParams().get("noteId") || "";
    const {noteText, setNoteText} = UseNote();

    useEffect(() => {

        if (noteIdParam === noteId) {
            setNoteText(startingNoteText);
        }   
    }, [startingNoteText, noteIdParam, noteId, setNoteText]);
    
    //To update note text in real time
    const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // Logic to update note text
        const text = e.target.value;

        setNoteText(text)

        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            updateNoteAction(noteId, text);
        }, debounceTimeout);

    }

    return (
        <Textarea 
        value={noteText}
        onChange={handleUpdateNote} 
        placeholder="Type your notes here..."
        className="custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholer: text-muted-foreground focus-visible: ring-0 focus-visible:ring-offset-0"/>
    );
}

export default NoteTextInput;  