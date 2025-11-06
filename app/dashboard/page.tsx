import { CreateNotebookDialog } from "@/components/create-notebook";
import { Notebooks } from "@/components/notebooks";
import { PageWrapper } from "@/components/page-wrapper";
import { getUserNotebooks, getUserNotes } from "@/server/notebook";


export default async function DashboardPage() {

  const notebooks = await getUserNotebooks();
  // const notebooksWithNotes = await getUserNotes();
  // console.log("Notebooks with notes:", notebooksWithNotes);

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]} title="Dashboard">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-xl md:text-2xl">Your Notebooks</p>
        <CreateNotebookDialog />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {notebooks.success &&
        notebooks.notebooks?.map((notebook) => (
          <Notebooks key={notebook.id} notebook={notebook} />
        ))}
      </div>
      
      {notebooks.success && notebooks.notebooks.length === 0 && (
        <NoNotebooks />
      )}
    </PageWrapper>
  );
}

function NoNotebooks(){
  return (
    <div className="w-full text-center bg-secondary/60 rounded-md py-6 px-4">
      <p className="text-muted-foreground">You have no notebooks. Start by creating one!</p>  
    </div>
  )
}