"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { Pin, PinOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { updateNote } from "@/server/note"
import { Button } from "./ui/button"

type PinNoteButtonProps = {
  noteId: string
  isPinned: number
  onToggle?: (nextIsPinned: number) => void
}

export default function PinNoteButton({ noteId, isPinned, onToggle }: PinNoteButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    const nextIsPinned = isPinned === 0 ? 1 : 0

    startTransition(async () => {
      try {
        const result = await updateNote(noteId, { isPinned: nextIsPinned })

        if (!result.success) {
          toast.error(result.message ?? "Failed to update note pin state.")
          return
        }

        toast.success(nextIsPinned === 1 ? "Note pinned." : "Note unpinned.")

        if (onToggle) {
          onToggle(nextIsPinned)
        } else {
          router.refresh()
        }
      } catch (error) {
        console.error("Failed to toggle note pin state", error)
        toast.error("Failed to update note pin state.")
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="size-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in text-muted-foreground hover:text-amber-400"
      disabled={isPending}
      onClick={handleToggle}
    >
      {isPinned === 1 ? <PinOffIcon className="size-4" /> : <Pin className="size-4" />}
    </Button>
  )
}
