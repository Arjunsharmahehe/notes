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
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { FieldGroup } from "./ui/field"
import { Spinner } from "./ui/spinner"
import { createNotebook } from "@/server/notebook"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const createNotebookSchema = z.object({
    name: z.string().min(1, "You need to name your notebook").max(36, "Notebook name cannot exceed 36 characters"),
})

export function CreateNotebookDialog() {

    const [open, setOpen] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof createNotebookSchema>>({
        resolver: zodResolver(createNotebookSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(data: z.infer<typeof createNotebookSchema>) {
        // Fetch the user
        const userId = (await authClient.getSession()).data?.user?.id;
        if (!userId) {
            toast.error("You must be logged in to create a notebook.");
            return;
        }
        // Create the notebook
        try {
            const response = await createNotebook({ name: data.name, userId });
            if (response.success) {
                toast.success("Notebook created successfully.");
                router.refresh();
                setOpen(false);
                form.reset();
            } else {
                toast.error(`Failed to create notebook: ${response.message}`);
            }
        } catch (error) {
            const e = error as Error;
            toast.error(`Unexpected error occurred: ${e.message}`);
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="create-new-notebook-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="" />
            <span className="hidden sm:block">New Notebook</span>
            <span className="block sm:hidden">New</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Notebook</DialogTitle>
            <DialogDescription>
              What should we call this notebook?
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
                            <p className={`text-muted-foreground absolute right-2 text-sm top-1.5 ${field.value.length >= 36 ? "text-red-400" : ""}`}>{field.value.length}/36</p>
                        </div>
                    )}
                />
            </FieldGroup>
          <DialogFooter>
            <Button type="submit" form="create-new-notebook-form" disabled={form.formState.isSubmitting}>
                { form.formState.isSubmitting && <Spinner />}
                {form.formState.isSubmitting ? "Creating" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
