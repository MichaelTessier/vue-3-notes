<script setup lang="ts">
import { useNotesStore } from "@/domains/notes/composables/useNotesStore";
import NoteEditor from "../components/NoteEditor.vue";
import type { Note } from "../models/Note";

const notesStore = useNotesStore();

const notePost = async (note: Note) => {
  await notesStore.notePost(note);
};
</script>

<template>
  <div>
    <h1>New Note</h1>

    <NoteEditor @save="notePost" />
  </div>
</template>
