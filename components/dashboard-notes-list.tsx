"use client"

import { useEffect, useMemo, useState } from "react"
import { Pin } from "lucide-react"
import { Note } from "@/db/schema"
import { Notes } from "./notes"

type NoteSerializable = Omit<Note, "createdAt" | "updatedAt"> & {
  createdAt: Note["createdAt"] | string
  updatedAt: Note["updatedAt"] | string
}

const normalizeDate = (value: NoteSerializable["createdAt"]): Note["createdAt"] => {
  if (value instanceof Date) {
    return value
  }

  return new Date(value)
}

const normalizeNote = (note: NoteSerializable): Note => ({
  ...note,
  createdAt: normalizeDate(note.createdAt),
  updatedAt: normalizeDate(note.updatedAt),
})

type DashboardNotesListProps = {
  initialNotes: NoteSerializable[]
}

export function DashboardNotesList({ initialNotes }: DashboardNotesListProps) {
  const [notes, setNotes] = useState<Note[]>(() => initialNotes.map(normalizeNote))

  useEffect(() => {
    setNotes(initialNotes.map(normalizeNote))
  }, [initialNotes])

  const handlePinToggle = (noteId: string, nextIsPinned: number) => {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === noteId
          ? { ...note, isPinned: nextIsPinned, updatedAt: new Date() }
          : note
      )
    )
  }

  const pinnedNotes = useMemo(
    () => notes.filter((note) => note.isPinned === 1),
    [notes]
  )
  const unpinnedNotes = useMemo(
    () => notes.filter((note) => note.isPinned !== 1),
    [notes]
  )
  const totalNotesCount = notes.length

  return (
    <div className="space-y-6">
      {pinnedNotes.length > 0 && (
        <section className="space-y-2">
          <p className="text-muted-foreground gap-1 flex items-center">
            <Pin className="size-3.5" />
            <span className="hidden md:block text-sm">Pinned</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {pinnedNotes.map((note) => (
              <Notes key={note.id} note={note} onPinToggle={handlePinToggle} />
            ))}
          </div>
        </section>
      )}

      {unpinnedNotes.length > 0 && (
        <section className="space-y-2">
          <p className="text-muted-foreground gap-1 flex items-center">
            <span className="text-sm">All</span>
            <span className="hidden md:block text-sm">Notes</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {unpinnedNotes.map((note) => (
              <Notes key={note.id} note={note} onPinToggle={handlePinToggle} />
            ))}
          </div>
        </section>
      )}

      {totalNotesCount === 0 && <NoNotes />}
    </div>
  )
}

function NoNotes() {
  return (
    <div className="w-full text-center bg-secondary/60 rounded-md py-6 px-4">
      <p className="text-muted-foreground">You have no notes. Start by creating one!</p>
    </div>
  )
}
