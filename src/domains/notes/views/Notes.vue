<script setup lang="ts">
import NotesList from "../components/NotesList.vue";
</script>

<template>
  <div>
    <h1>NotesList</h1>
    <Suspense>
      <template #default>
        <NotesList />
      </template>
      <template #fallback> ...loading </template>
    </Suspense>
  </div>
</template>
