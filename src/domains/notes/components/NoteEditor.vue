<script setup lang="ts">
import { useAuthStore } from "@/domains/auth/composables/useAuthStore";
import { ref } from "vue";
import type { Note } from "../models/Note";

const emit = defineEmits<{
  (event: "save", note: Note): void;
}>();

const authStore = useAuthStore();

const title = ref("");
const content = ref("");

const save = async () => {
  if (!authStore.state.user?.uid) return;

  emit("save", {
    title: title.value,
    content: content.value,
    userId: authStore.state.user.uid,
  });

  // await notesStore.addNote({
  //   title: title.value,
  //   content: content.value,
  //   userId: authStore.state.user.uid,
  // });
};
</script>

<template>
  <div>Note Editor</div>

  <input type="text" v-model="title" placeholder="Add your title" />

  <input type="text" v-model="content" placeholder="Add your title" />

  <button @click="save">Save</button>
</template>

<style lang="scss" scoped></style>
