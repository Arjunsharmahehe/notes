"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useQueryState } from "nuqs"

interface SidebarDataProps {
    notebooks: {
            name: string,
            notes: {
                    id: string,
                    title: string
                }[]
        }[]
}

export default function SidebarData({ notebooks }: SidebarDataProps) {

    const [ search ] = useQueryState("search", { defaultValue: "" });

    const filteredNotebooks = notebooks.filter((notebook) =>
        notebook.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredNotebooks.length === 0) {
        return (
            <div className="p-4 text-sm text-center text-sidebar-foreground/60">
                No notebooks found.
            </div>
        );
    }

    return (
        <>
        {filteredNotebooks.map((item) => (
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
        </>
    )
} 