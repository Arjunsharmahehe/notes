import { PageWrapper } from "@/components/page-wrapper";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { getNoteById } from "@/server/note";
import { UseEditorOptions } from "@tiptap/react";

export default async function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
    const { noteId } = await params;
    const { note } = await getNoteById(noteId);

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: note?.title || "Note", href: "#" }]} title="Note">
        <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-center mt-2">
              {note?.title || "Note"}
            </h1>
            <SimpleEditor content={note?.content as UseEditorOptions["content"]} noteId={noteId} />
        </div>
    </PageWrapper>
  );
}