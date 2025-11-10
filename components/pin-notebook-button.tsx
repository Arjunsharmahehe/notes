"use client"

import { updateNotebook } from "@/server/notebook";
import { Button } from "./ui/button"
import { Pin, PinOff, PinOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PinNotebookButton({ notebookId, isPinned }: { notebookId: string; isPinned: number }) {

    const router = useRouter();

    return (
        <Button variant="ghost" size={"sm"} className="size-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in text-muted-foreground hover:text-amber-400"
            onClick={() => {
                updateNotebook(notebookId, { isPinned: isPinned===0?1:0 })
                router.refresh();
            }}
        >
            {isPinned ? <PinOffIcon className="size-4" /> : <Pin className="size-4" />}
        </Button>
    )
}