<template>
  <div>
    <p v-for="note in notes" :key="note.id">
      {{ note }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "../models/Note";
import { useNotesStore } from "@/domains/notes/composables/useNotesStore";

const notesStore = useNotesStore("1");
let notes: Note[];

if (!notesStore.state.isLoaded) {
  await notesStore.fetchNotes();

  notes = notesStore.getList();
}
// TODO: support empty and error cases
</script>

<style scoped></style>
