import Link from "next/link";
import { Note } from "@/db/schema";
import { EditNoteButton } from "./edit-note-button";
import { DeleteNoteButton } from "./delete-note-button";

export const Notes = ({ note }: { note: Note }) => {
  const title = note.title?.trim() || "Untitled note";

  return (
    <div className="group rounded-md bg-secondary/60 px-4 pt-4 pb-12">
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full items-center gap-2">
          <Link href={`/dashboard/notes/${note.id}`} className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold hover:underline">{title}</h2>
          </Link>
          <EditNoteButton note={note} />
        </div>
        <DeleteNoteButton noteId={note.id} noteTitle={title} />
      </div>
    </div>
  );
};