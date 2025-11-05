"use client"

import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Edit2 } from "lucide-react"
import { Note } from "@/db/schema"
import { updateNote } from "@/server/note"
import { useRouter } from "next/navigation"

const RenameNoteSchema = z.object({
  title: z.string().min(1, "You need to name your note").max(60, "Note title cannot exceed 60 characters"),
})

export function EditNoteButton({ note }: { note: Note }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof RenameNoteSchema>>({
    resolver: zodResolver(RenameNoteSchema),
    defaultValues: { title: note.title ?? "" },
  })

  async function onSubmit(data: z.infer<typeof RenameNoteSchema>) {
    try {
      const response = await updateNote(note.id, { title: data.title })
      if (response.success) {
        toast.success("Note updated successfully.")
        router.refresh()
        setOpen(false)
        form.reset({ title: data.title })
      } else {
        toast.error("Failed to update note.")
      }
    } catch (error) {
      const e = error as Error
      toast.error(`Unexpected error occurred: ${e.message}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="update-note-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="opacity-100 transition-opacity duration-100 ease-in text-muted-foreground hover:text-foreground lg:opacity-0 group-hover:opacity-100"
          >
            <Edit2 className="size-3" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Note</DialogTitle>
            <DialogDescription>Give this note a clearer title.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1 relative">
                  <Label htmlFor="rename-note">Title</Label>
                  <Input
                    id="rename-note"
                    aria-invalid={!!fieldState.error}
                    value={field.value}
                    onChange={(event) => {
                      if (event.target.value.length <= 60) {
                        field.onChange(event.target.value)
                      }
                    }}
                    placeholder="My Note"
                  />
                  <span className={`absolute right-2 top-[42px] text-sm ${field.value.length > 60 ? "text-red-400" : "text-muted-foreground"}`}>
                    {field.value.length}/60
                  </span>
                  {fieldState.error && (
                    <p className="text-sm text-red-400" role="alert">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="update-note-form" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Spinner className="mr-2" />}
              {form.formState.isSubmitting ? "Saving" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}