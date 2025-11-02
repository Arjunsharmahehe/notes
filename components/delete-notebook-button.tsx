"use client"

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
import { deleteNotebook } from "@/server/notebook"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export default function DeleteNotebookButton({notebookId, notebookName}: {notebookId: string, notebookName: string}) {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const router = useRouter();

    async function onConfirm() {
        try {
            setIsDeleting(true);
            const response = await deleteNotebook(notebookId);
            if (response.success) {
                toast.success("Notebook deleted successfully.");
                router.refresh();
            } else {
                toast.error(`Failed to delete notebook`);
            }
        } catch (error) {
            toast.error(`Failed to delete notebook`);
        } finally {
            setIsDeleting(false);
            setIsOpen(false);
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
                <Trash2 className="size-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in text-muted-foreground hover:text-red-400"/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    {`This action cannot be undone. This will permanently delete your Notebook: ${notebookName}`}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                    {isDeleting && <Spinner />}
                    {isDeleting ? "Deleting" : "Continue"}
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}