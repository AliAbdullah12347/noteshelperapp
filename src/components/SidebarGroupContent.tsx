"use client";

import { Note } from "@prisma/client";

type Props = {
  notes: Note[]; // Replace with actual type for notes  
};

function SidebarGroupContent({ notes }: Props) {
  console.log(notes);
return (
    <div>Your notes here</div>
  );
} 

export default SidebarGroupContent;