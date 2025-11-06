
import { CreateNoteButton } from "@/components/create-note-button";
import { Notes } from "@/components/notes";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotesByNotebookId } from "@/server/note";


export default async function NotebooksPage({ params }: { params: Promise<{ notebookId: string }> }) {

  const {notebookId} = await params;
  const notes = await getNotesByNotebookId(notebookId);
  // const notebooksWithNotes = await getUserNotes();
  // console.log("Notebooks with notes:", notebooksWithNotes);

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Notebook", href: "#" }]} title="Notebooks">
      <div className="flex items-center w-full justify-between gap-2">
        <p className="font-semibold text-xl w-full md:text-2xl">Your Notes</p>
        <CreateNoteButton notebookId={notebookId} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {notes.success &&
        notes.notes?.map((note) => (
          <Notes key={note.id} note={note} />
        ))}
      </div>

      {notes.success && notes.notes.length === 0 && (
        <NoNotes />
      )}
    </PageWrapper>
  );
}

function NoNotes(){
  return (
    <div className="w-full text-center bg-secondary/60 rounded-md py-6 px-4">
      <p className="text-muted-foreground">You have no notes. Start by creating one!</p>  
    </div>
  )
}