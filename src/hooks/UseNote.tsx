"use client";

import { useContext } from "react";
import { NoteProviderContext } from "@/providers/NoteProvider";

function UseNote() {
    const context = useContext(NoteProviderContext);

    if (!context) {
        throw new Error("UseNote must be used within a NoteProvider");
    };
    return context;
}

export default UseNote;