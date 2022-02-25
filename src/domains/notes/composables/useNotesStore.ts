import { reactive, readonly } from "vue";
import type { Note } from "../models/Note";

import { createCollection } from "@/config/firebase";
import { getDocs, query, where } from "firebase/firestore";

interface NotesState {
  ids: string[];
  all: Map<string, Note>;
  isLoaded: boolean;
  isError: boolean;
  userId: string;
}

export const notesCollection = createCollection<Note>("notes");

export class NotesStore {
  state: NotesState;

  constructor(initial: NotesState) {
    this.state = reactive(initial);
  }

  getState() {
    return readonly(this.state);
  }

  getList() {
    return [...this.state.all.values()];
  }

  async fetchNotes() {
    try {
      const notesQuery = query(
        notesCollection,
        where("userId", "==", this.state.userId)
      );

      const notes = await getDocs(notesQuery);

      notes.docs.forEach((doc) => {
        this.state.ids.push(doc.id);

        const { title, content, createdAt, updatedAt, userId } = doc.data();

        this.state.all.set(doc.id, {
          id: doc.id,
          title,
          content,
          createdAt,
          updatedAt,
          userId,
        });
      });
    } catch (error) {
      this.state.isError = true;
    } finally {
      this.state.isLoaded = true;
    }
  }
}

export function useNotesStore(userId: string) {
  const noteStore = new NotesStore({
    ids: [],
    all: new Map<string, Note>(),
    isLoaded: false,
    isError: false,
    userId,
  });

  return noteStore;
}
