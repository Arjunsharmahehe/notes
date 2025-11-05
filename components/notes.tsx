import Link from "next/link";
import { Note } from "@/db/schema";
import { EditNoteButton } from "./edit-note-button";
import { DeleteNoteButton } from "./delete-note-button";

export const Notes = ({ note }: { note: Note }) => {
  const title = note.title?.trim() || "Untitled note";

  return (
    <article className="group flex h-full flex-col justify-between rounded-lg border border-border bg-secondary/60 p-4 transition-colors hover:bg-secondary">
      <header className="flex items-start justify-between gap-4">
        <Link
          href={`/dashboard/notes/${note.id}`}
          className="min-w-0 flex-1 space-y-1"
        >
          <h2 className="truncate text-lg font-semibold mb-4 tracking-tight hover:underline">
            {title}
          </h2>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <EditNoteButton note={note} />
          <DeleteNoteButton noteId={note.id} noteTitle={title} />
        </div>
      </header>

      <footer className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="truncate">
          Updated {note.updatedAt?.toLocaleDateString?.() ?? "—"}
        </span>
        <Link
          href={`/dashboard/notes/${note.id}`}
          className="font-medium text-primary hover:underline"
        >
          Open note
        </Link>
      </footer>
    </article>
  );
};