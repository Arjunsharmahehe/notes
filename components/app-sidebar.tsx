import * as React from "react"
import { ChevronRight, NotebookIcon } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getUserNotes } from "@/server/notebook"
import Link from "next/link"

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
        {data.notebooks.map((item) => (
          <Collapsible
            key={item.name}
            title={item.name}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.name}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.notes.map((note) => (
                      <SidebarMenuItem key={note.id} className="ml-3 ">
                        <SidebarMenuButton asChild>
                          <Link href={`/dashboard/notes/${note.id}`}>{note.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
