import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <Suspense>
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1">
                    {children}
                </main>
            </SidebarProvider>
        </Suspense>
    )
}