import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "./ui/sidebar";
import { Logout } from "./logout";

type PageWrapperProps = {
    children: React.ReactNode;
    title: string;
    breadcrumbs: Array<{ label: string; href: string }>;
};

export function PageWrapper({ children, title, breadcrumbs }: PageWrapperProps) {
    return (
        <div className="flex flex-col gap-4">
            <header className="flex items-center justify-between w-full px-4 py-2 gap-4">
                <SidebarTrigger />
                <div className="flex-1 items-center gap-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs?.map((crumb, index) => (
                                    <>
                                    <BreadcrumbItem key={index}>
                                        <BreadcrumbLink href={crumb.href}>
                                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                    </>
                                ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <Logout />
            </header>
            <div className="flex flex-1 flex-col gap-4  p-4 pt-0">
                {children}
            </div>
        </div>
    
    )
}