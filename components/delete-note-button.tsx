"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteNote } from "@/server/note"
import { Spinner } from "@/components/ui/spinner"

export function DeleteNoteButton({ noteId, noteTitle }: { noteId: string; noteTitle?: string }) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function onConfirm() {
    try {
      setIsDeleting(true)
      const response = await deleteNote(noteId)
      if (response.success) {
        toast.success("Note deleted successfully.")
        router.refresh()
      } else {
        toast.error("Failed to delete note.")
      }
    } catch (error) {
      toast.error("Failed to delete note.")
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground transition-opacity duration-100 ease-in hover:text-red-400 opacity-100 lg:opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="size-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your note{noteTitle ? `: ${noteTitle}` : ""}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isDeleting}>
            {isDeleting && <Spinner className="mr-2" />}
            {isDeleting ? "Deleting" : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}