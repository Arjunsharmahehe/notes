"use client"

import { useEffect, useMemo, useState } from "react"
import { Pin } from "lucide-react"
import { Notebook } from "@/db/schema"
import { Notebooks } from "./notebooks"

type NotebookSerializable = Omit<Notebook, "createdAt" | "updatedAt"> & {
  createdAt: Notebook["createdAt"] | string
  updatedAt: Notebook["updatedAt"] | string
}

const normalizeDate = (value: NotebookSerializable["createdAt"]): Notebook["createdAt"] => {
  if (value instanceof Date) {
    return value
  }

  return new Date(value)
}

const normalizeNotebook = (notebook: NotebookSerializable): Notebook => ({
  ...notebook,
  createdAt: normalizeDate(notebook.createdAt),
  updatedAt: normalizeDate(notebook.updatedAt),
})

type DashboardNotebookListProps = {
  initialNotebooks: NotebookSerializable[]
}

export function DashboardNotebookList({ initialNotebooks }: DashboardNotebookListProps) {
  const [notebooks, setNotebooks] = useState<Notebook[]>(() =>
    initialNotebooks.map(normalizeNotebook)
  )

  useEffect(() => {
    setNotebooks(initialNotebooks.map(normalizeNotebook))
  }, [initialNotebooks])

  const handlePinToggle = (notebookId: string, nextIsPinned: number) => {
    setNotebooks((previous) =>
      previous.map((notebook) =>
        notebook.id === notebookId
          ? { ...notebook, isPinned: nextIsPinned, updatedAt: new Date() }
          : notebook
      )
    )
  }

  const pinnedNotebooks = useMemo(
    () => notebooks.filter((notebook) => notebook.isPinned === 1),
    [notebooks]
  )
  const unpinnedNotebooks = useMemo(
    () => notebooks.filter((notebook) => notebook.isPinned !== 1),
    [notebooks]
  )
  const totalNotebookCount = notebooks.length

  return (
    <div className="space-y-6">
      {pinnedNotebooks.length > 0 && (
        <section className="space-y-2">
          <p className="text-muted-foreground gap-1 flex items-center">
            <Pin className="size-3.5" />
            <span className="hidden md:block text-sm">Pinned</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {pinnedNotebooks.map((notebook) => (
              <Notebooks
                key={notebook.id}
                notebook={notebook}
                onPinToggle={handlePinToggle}
              />
            ))}
          </div>
        </section>
      )}

      {unpinnedNotebooks.length > 0 && (
        <section className="space-y-2">
          <p className="text-muted-foreground gap-1 flex items-center">
            <span className="text-sm">All</span>
            <span className="hidden md:block text-sm">Notebooks</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {unpinnedNotebooks.map((notebook) => (
              <Notebooks
                key={notebook.id}
                notebook={notebook}
                onPinToggle={handlePinToggle}
              />
            ))}
          </div>
        </section>
      )}

      {totalNotebookCount === 0 && <NoNotebooks />}
    </div>
  )
}

function NoNotebooks() {
  return (
    <div className="w-full text-center bg-secondary/60 rounded-md py-6 px-4">
      <p className="text-muted-foreground">You have no notebooks. Start by creating one!</p>
    </div>
  )
}
