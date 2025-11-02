"use client"

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

export function Logout({ className = "", variant = "outline" }: { className?: string, variant?: "outline" | "default" | "ghost" | "link" | "destructive" | "secondary" }) {

    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    }

    return (
        <Button variant={variant} onClick={handleLogout} className={`flex items-center gap-2 ${className}`}>
            Logout
            <LogOutIcon />
        </Button>
    )
}