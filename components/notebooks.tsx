import { Notebook } from "@/db/schema";
import DeleteNotebookButton from "./delete-notebook-button";
;
import { EditNotebookButton } from "./edit-notebook-button";

export const Notebooks = ({ notebook }: { notebook: Notebook }) => {
    return (
        <div className="group bg-secondary/60 rounded-md px-4 pt-4 pb-12">
            <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex w-full gap-2 group items-center justify-start">
                    <h2 className="">{notebook.name}</h2>
                    <EditNotebookButton notebook={notebook} />
                </div>
                <DeleteNotebookButton notebookId={notebook.id} notebookName={notebook.name} />
            </div>
        </div>
    )
}
