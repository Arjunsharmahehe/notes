"use server"

import { notes } from "@/db/schema";
import { db } from "@/db/drizzle"
import { InsertNote } from "@/db/schema";
import { eq } from "drizzle-orm";

// Create a new note for a specific notebook
export const createNote = async (values: InsertNote) => {
    try {
        await db.insert(notes).values(values);
        return { success: true, message: "Note created successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to create note" };
    }
}

// GET notes for a specific notebook
export const getNotesByNotebookId = async (notebookId: string) => {
    try {
        const notesList = (await db.select().from(notes).where(eq(notes.notebookId, notebookId))).sort((a, b) => b.updatedAt!.getTime() - a.updatedAt!.getTime());
        return { success: true, notes: notesList, message: "Notes retrieved successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, notes: [], message: e.message || "Failed to retrieve notes" };
    }
}

// GET single note
export const getNoteById = async (noteId: string) => {
  try {
    const note = await db.select().from(notes).where(eq(notes.id, noteId)).limit(1).then(res => res[0]);
    if (!note) {
      return { success: false, note: null, message: "Note not found" };
    }
    return { success: true, note, message: "Note retrieved successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, note: null, message: e.message || "Failed to retrieve note" };
  }
}

// Update a note by ID
export const updateNote = async (noteId: string, values: Partial<InsertNote>) => {
    try {
        await db.update(notes).set(values).where(eq(notes.id, noteId));
        return { success: true, message: "Note updated successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to update note" };
    }
}

// Delete a note by ID
export const deleteNote = async (noteId: string) => {
    try {
        await db.delete(notes).where(eq(notes.id, noteId));
        return { success: true, message: "Note deleted successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to delete note" };
    }
}