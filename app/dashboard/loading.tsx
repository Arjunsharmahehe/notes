import { PageWrapper } from "@/components/page-wrapper";
import { Skeleton } from "@/components/ui/skeleton";


export default function DashboardPageLoader() {

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]} title="Dashboard">
        <div className="flex items-center w-full justify-between gap-2">
            <p className="font-semibold text-xl w-full md:text-2xl">Your Notebooks</p>
            <Skeleton className="h-8 w-8 md:w-16 lg:w-24" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {[1, 2, 3].map((note) => (
                <Skeleton key={note} className="h-28" />
            ))}
        </div>
    </PageWrapper>
  );
}