<script setup lang="ts">
import { useAuthStore } from "@/domains/auth/composables/useAuthStore";
const authStore = useAuthStore();
</script>

<template>
  <nav>
    <div v-if="authStore.isAuthenticated()">
      {{ authStore.state.user?.email }}
    </div>
    <div @click="authStore.logout()">Sign out</div>
  </nav>
</template>
