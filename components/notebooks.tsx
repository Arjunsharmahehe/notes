import { Notebook } from "@/db/schema";

export const Notebooks = ({ notebooks }: { notebooks: Notebook[] }) => {
    return (
        <div>
            {notebooks.map((notebook) => (
                <div key={notebook.id}>{notebook.name}</div>
            ))}
        </div>
    )
}