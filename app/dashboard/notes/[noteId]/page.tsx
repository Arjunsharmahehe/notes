import { PageWrapper } from "@/components/page-wrapper";
import { getNoteById } from "@/server/notebook";

export default async function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
    const { noteId } = await params;
    const { note } = await getNoteById(noteId);

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: note?.title || "Note", href: "#" }]} title="Note">
        <div>
            <h1>{note?.title || "Note"}</h1>
            <p>This is where the note content will be displayed.</p>
        </div>
    </PageWrapper>
  );
}