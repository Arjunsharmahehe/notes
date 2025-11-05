"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Plus } from "lucide-react"
import { z } from "zod"
import { createNote } from "@/server/note"
import { authClient } from "@/lib/auth-client"
import { InsertNote } from "@/db/schema"
import { useRouter } from "next/navigation"

const NOTE_NAME_LIMIT = 36

const CreateNoteSchema = z.object({
  title: z.string().min(1, "You need to name your note").max(NOTE_NAME_LIMIT, `Note title cannot exceed ${NOTE_NAME_LIMIT} characters`),
})

export function CreateNoteButton({ notebookId }: { notebookId: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: { title: "" },
  })

  async function onSubmit(data: z.infer<typeof CreateNoteSchema>) {
    const session = await authClient.getSession()
    const userId = session.data?.user?.id
    if (!userId) {
      toast.error("You must be logged in to create a note.")
      return
    }

    try {
      const response = await createNote({
        title: data.title,
        notebookId,
        userId,
        content: { type: "doc", content: [] },
      } as InsertNote)
      if (response.success) {
        toast.success("Note created successfully.")
        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        toast.error(`Failed to create note: ${response.message}`)
      }
    } catch (error) {
      const e = error as Error
      toast.error(`Unexpected error occurred: ${e.message}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="" />
            <span className="hidden sm:block">New Note</span>
            <span className="block sm:hidden">New</span>
          </Button>
      </DialogTrigger>
      <form id="create-note-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Note</DialogTitle>
            <DialogDescription>Name your next idea.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1 relative">
                  <Label htmlFor="note-title">Title</Label>
                  <Input
                    {...field}
                    id="note-title"
                    aria-invalid={!!fieldState.error}
                    value={field.value}
                    placeholder="My Note"
                  />
                  <span className={`absolute right-2 top-6.5 text-sm ${field.value.length > NOTE_NAME_LIMIT ? "text-red-400" : "text-muted-foreground"}`}>
                    {field.value.length}/{NOTE_NAME_LIMIT}
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
            <Button type="submit" form="create-note-form" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Spinner className="mr-2" />}
              {form.formState.isSubmitting ? "Creating" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}