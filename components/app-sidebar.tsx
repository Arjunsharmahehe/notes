import * as React from "react"
import { NotebookIcon } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getUserNotes } from "@/server/notebook"
import Link from "next/link"
import SidebarData from "./sidebar-data"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const data = await getUserNotes();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex gap-2 items-center px-3 py-3 ">
          <NotebookIcon className="size-5" />
          <span className="font-semibold text-xl">Your notes</span>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        <SidebarData notebooks={data.notebooks}/>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
