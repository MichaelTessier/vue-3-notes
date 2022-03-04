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
import { useAuthStore } from "@/domains/auth/composables/useAuthStore";
import { watch, ref } from "vue";

const authStore = useAuthStore();

const notesStore = useNotesStore();

let notes = ref<Note[]>([]);

watch(
  authStore.state,
  async (state) => {
    if (!notesStore.state.isLoaded && state.user?.uid) {
      await notesStore.fetchNotes(state.user.uid);
      notes.value = notesStore.getList();
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
