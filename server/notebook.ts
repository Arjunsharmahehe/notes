"use server"

import { db } from "@/db/drizzle"
import { InsertNotebook, notebooks, notes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { UseEditorOptions } from "@tiptap/react";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

// Create a new notebook for the authenticated user
export const createNotebook = async (values: InsertNotebook) => {
    try {
        await db.insert(notebooks).values(values);
        return { success: true, message: "Notebook created successfully" };

    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to create notebook" };
    }
}

// Retrieve notebooks for the authenticated user
export const getUserNotebooks = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        const userId = session?.user?.id;

        if (!userId) {
            return { success: false, notebooks: [], message: "User not authenticated" };
        }

        const notebooksList = await db.select().from(notebooks).where(eq(notebooks.userId, userId));

        return { success: true, notebooks: notebooksList, message: "Notebooks retrieved successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, notebooks: [], message: e.message || "Failed to retrieve notebooks" };
    }
}

// GET a specific notebook by ID
export const getNotebookById = async (notebookId: string) => {
    try {

        const notebook = await db.select().from(notebooks).where(eq(notebooks.id, notebookId)).limit(1).then(res => res[0]);

        if (!notebook) {
            return { success: false, notebook: null, message: "Notebook not found" };
        }

        return { success: true, notebook, message: "Notebook retrieved successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, notebook: null, message: e.message || "Failed to retrieve notebook" };
    }
}

// Update a notebook by ID
export const updateNotebook = async (notebookId: string, values: Partial<InsertNotebook>) => {
    try {
        await db.update(notebooks).set(values).where(eq(notebooks.id, notebookId));
        return { success: true, message: "Notebook updated successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to update notebook" };
    }
}

// Delete a notebook by ID
export const deleteNotebook = async (notebookId: string) => {
    try {
        await db.delete(notebooks).where(eq(notebooks.id, notebookId));
        return { success: true, message: "Notebook deleted successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to delete notebook" };
    }
}

// GET the notes in a specific notebook
export const getNotesByNotebookId = async (notebookId: string) => {
    try {
        const notesList = await db.select().from(notes).where(eq(notes.notebookId, notebookId));

        return { success: true, notes: notesList, message: "Notes retrieved successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, notes: [], message: e.message || "Failed to retrieve notes" };
    }
}

// GET all user notebooks with their notes
export const getUserNotes = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    const userId = session?.user?.id
    if (!userId) {
      return { success: false, notebooks: [], message: "User not authenticated" }
    }

    const rows = await db
      .select({
        notebookId: notebooks.id,
        notebookName: notebooks.name,
        notebookCreatedAt: notebooks.createdAt,
        notebookUpdatedAt: notebooks.updatedAt,
        noteId: notes.id,
        noteTitle: notes.title,
        noteContent: notes.content,
        noteCreatedAt: notes.createdAt,
        noteUpdatedAt: notes.updatedAt,
      })
      .from(notebooks)
      .leftJoin(notes, eq(notes.notebookId, notebooks.id))
      .where(eq(notebooks.userId, userId))

    const grouped = new Map<
      string,
      {
        id: string
        name: string
        createdAt: Date | null
        updatedAt: Date | null
        notes: Array<{
          id: string
          title: string
          content: UseEditorOptions["content"]
          createdAt: Date | null
          updatedAt: Date | null
        }>
      }
    >()

    for (const row of rows) {
      const bucket =
        grouped.get(row.notebookId) ??
        grouped
          .set(row.notebookId, {
            id: row.notebookId,
            name: row.notebookName,
            createdAt: row.notebookCreatedAt,
            updatedAt: row.notebookUpdatedAt,
            notes: [],
          })
          .get(row.notebookId)!

      if (row.noteId) {
        bucket.notes.push({
          id: row.noteId,
          title: row.noteTitle!,
          content: row.noteContent!,
          createdAt: row.noteCreatedAt,
          updatedAt: row.noteUpdatedAt,
        })
      }
    }

    return {
      success: true,
      notebooks: Array.from(grouped.values()),
      message: "Notebooks with notes retrieved successfully",
    }
  } catch (error) {
    const e = error as Error
    return { success: false, notebooks: [], message: e.message || "Failed to retrieve notes" }
  }
}