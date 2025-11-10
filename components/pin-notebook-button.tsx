"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { updateNotebook } from "@/server/notebook"
import { Button } from "./ui/button"
import { Pin, PinOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"

type PinNotebookButtonProps = {
    notebookId: string
    isPinned: number
    onToggle?: (nextIsPinned: number) => void
}

export default function PinNotebookButton({ notebookId, isPinned, onToggle }: PinNotebookButtonProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleToggle = () => {
        const nextIsPinned = isPinned === 0 ? 1 : 0

        startTransition(async () => {
            try {
                const result = await updateNotebook(notebookId, { isPinned: nextIsPinned })

                if (!result.success) {
                    toast.error(result.message ?? "Failed to update notebook pin state.")
                    return
                }

                toast.success(nextIsPinned === 1 ? "Notebook pinned." : "Notebook unpinned.")

                if (onToggle) {
                    onToggle(nextIsPinned)
                } else {
                    router.refresh()
                }
            } catch (error) {
                console.error("Failed to toggle notebook pin state", error)
                toast.error("Failed to update notebook pin state.")
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