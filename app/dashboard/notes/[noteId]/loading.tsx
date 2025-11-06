import { PageWrapper } from "@/components/page-wrapper";
import { Skeleton } from "@/components/ui/skeleton";


export default function NotePageLoader() {

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]} title="Note">
        <div className="flex flex-col items-center gap-6">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="w-4/5 h-[70vh]" />
        </div>
    </PageWrapper>
  );
}