import { PageWrapper } from "@/components/page-wrapper";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { getNoteById } from "@/server/note";
import { UseEditorOptions } from "@tiptap/react";

export default async function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;
  const response = await getNoteById(noteId);
  const note = response.note;

  if (!response.success) {
    return (
      <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Notebook", href: "#" }]} title="Notebooks">
        <div className="flex flex-col items-center justify-center py-6">
          <p className="text-muted-foreground font-medium">{response.message}</p>
        </div>  
      </PageWrapper>
    );
  }

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" },{label: "...", href: `/dashboard/notebook/${note?.notebookId}`}, { label: note?.title || "Note", href: "#" }]} title="Note">
        <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-center mt-2">
              {note?.title || "Note"}
            </h1>
            <SimpleEditor content={note?.content as UseEditorOptions["content"]} noteId={noteId} />
        </div>
    </PageWrapper>
  );
}