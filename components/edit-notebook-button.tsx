"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Edit2, Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { FieldGroup } from "./ui/field"
import { Spinner } from "./ui/spinner"
import { createNotebook, updateNotebook } from "@/server/notebook"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Notebook } from "@/db/schema"

const RenameNotebookSchema = z.object({
    name: z.string().min(1, "You need to name your notebook").max(36, "Notebook name cannot exceed 36 characters"),
})

export function EditNotebookButton({ notebook }: { notebook: Notebook }) {

    const [open, setOpen] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof RenameNotebookSchema>>({
        resolver: zodResolver(RenameNotebookSchema),
        defaultValues: {
            name: notebook.name,
        },
    })

    async function onSubmit(data: z.infer<typeof RenameNotebookSchema>) {
        // Fetch the user
        const userId = (await authClient.getSession()).data?.user?.id;
        if (!userId) {
            toast.error("You must be logged in to edit a notebook.");
            return;
        }
        // Create the notebook
        try {
            const response = await updateNotebook(notebook.id, { name: data.name });
            if (response.success) {
                toast.success("Notebook updated successfully.");
                router.refresh();
                setOpen(false);
                form.reset();
            } else {
                toast.error(`Failed to update notebook`);
            }
        } catch (error) {
            const e = error as Error;
            toast.error(`Unexpected error occurred: ${e.message}`);
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="update-notebook-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger className="opacity-100 lg:opacity-0 group-hover:opacity-100 duration-100 transition-opacity ease-in" asChild>
            <Edit2 className="size-3 text-muted-foreground hover:text-foreground" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Notebook</DialogTitle>
            <DialogDescription>
              {`Change the name from ${notebook.name} to something else.`}
            </DialogDescription>
          </DialogHeader>
            <FieldGroup>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1 relative">
                            <Input
                                id="name-1"
                                aria-invalid={!!fieldState.error}
                                {...field}
                                placeholder="My Notebook"
                            />
                            {fieldState.error && (
                                <p className="text-sm text-red-400" role="alert">
                                    {fieldState.error.message}
                                </p>
                            )}
                            <p className={`text-muted-foreground absolute right-2 text-sm top-1.5 ${field.value.length > 36 ? "text-red-400" : ""}`}>{field.value.length}/36</p>
                        </div>
                    )}
                />
            </FieldGroup>
          <DialogFooter>
            <Button type="submit" form="update-notebook-form" disabled={form.formState.isSubmitting}>
                { form.formState.isSubmitting && <Spinner />}
                {form.formState.isSubmitting ? "Changing" : "Change"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}