import { reactive, readonly } from "vue";
import type { Note } from "../models/Note";

import { createCollection } from "@/config/firebase";
import {
  getDocs,
  query,
  where,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

interface NotesState {
  ids: string[];
  all: Map<string, Note>;
  isLoaded: boolean;
  isError: boolean;
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

  async fetchNotes(userId: string) {
    try {
      const notesQuery = query(notesCollection, where("userId", "==", userId));

      const notes = await getDocs(notesQuery);

      notes.docs.forEach((doc) => {
        this.state.ids.push(doc.id);

        this.state.all.set(doc.id, {
          ...doc.data(),
          id: doc.id,
        });
      });
    } catch (error) {
      this.state.isError = true;
    } finally {
      this.state.isLoaded = true;
    }
  }

  async notePost(note: Note) {
    await setDoc(doc(notesCollection), {
      ...note,
      createdAt: Timestamp.fromDate(new Date()),
    });
  }
}

export function useNotesStore() {
  const noteStore = new NotesStore({
    ids: [],
    all: new Map<string, Note>(),
    isLoaded: false,
    isError: false,
  });

  return noteStore;
}
