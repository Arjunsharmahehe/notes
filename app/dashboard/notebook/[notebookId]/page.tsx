
import { CreateNoteButton } from "@/components/create-note-button";
import { PageWrapper } from "@/components/page-wrapper";
import { DashboardNotesList } from "@/components/dashboard-notes-list";
import { getNotesByNotebookId } from "@/server/note";


export default async function NotebooksPage({ params }: { params: Promise<{ notebookId: string }> }) {

  const {notebookId} = await params;
  const notes = await getNotesByNotebookId(notebookId);

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Notebook", href: "#" }]} title="Notebooks">
      <div className="flex items-center w-full justify-between gap-2">
        <p className="font-semibold text-xl w-full md:text-2xl">Your Notes</p>
        <CreateNoteButton notebookId={notebookId} />
      </div>

      {!notes.success && (
        <p className="text-sm text-destructive">{notes.message}</p>
      )}

      {notes.success && <DashboardNotesList initialNotes={notes.notes} />}
    </PageWrapper>
  );
}