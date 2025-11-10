import { CreateNotebookDialog } from "@/components/create-notebook";
import { PageWrapper } from "@/components/page-wrapper";
import { DashboardNotebookList } from "@/components/dashboard-notebook-list";
import { getUserNotebooks } from "@/server/notebook";


export default async function DashboardPage() {

  const notebooks = await getUserNotebooks();

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]} title="Dashboard">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-xl md:text-2xl">Your Notebooks</p>
        <CreateNotebookDialog />
      </div>

      {!notebooks.success && (
        <p className="text-sm text-destructive">{notebooks.message}</p>
      )}

      <DashboardNotebookList
        initialNotebooks={notebooks.success ? notebooks.notebooks : []}
      />
    </PageWrapper>
  );
}