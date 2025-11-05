import { Notebook } from "@/db/schema"
import DeleteNotebookButton from "./delete-notebook-button"
import { EditNotebookButton } from "./edit-notebook-button"
import Link from "next/link"

export const Notebooks = ({ notebook }: { notebook: Notebook }) => {
  return (
    <article className="group flex h-full flex-col justify-between rounded-lg border border-border bg-secondary/60 p-4 transition-colors hover:bg-secondary">
      <header className="flex items-start justify-between gap-4">
        <Link
          href={`/dashboard/notebook/${notebook.id}`}
          className="min-w-0 flex-1 space-y-2"
        >
          <h2 className="truncate text-lg font-semibold mb-4 tracking-tight hover:underline">
            {notebook.name}
          </h2>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <EditNotebookButton notebook={notebook} />
          <DeleteNotebookButton
            notebookId={notebook.id}
            notebookName={notebook.name}
          />
        </div>
      </header>

      <footer className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="truncate">
          Created {notebook.createdAt?.toLocaleDateString() ?? "—"}
        </span>
        <Link
          href={`/dashboard/notebook/${notebook.id}`}
          className="font-medium text-primary hover:underline"
        >
          Open notebook
        </Link>
      </footer>
    </article>
  )
}
