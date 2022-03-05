<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/domains/auth/composables/useAuthStore";
import UserMenu from "@/domains/auth/components/UserMenu.vue";
import AuthMenu from "@/domains/auth/components/AuthMenu.vue";

const authStore = useAuthStore();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink
        :to="{
          name: 'notes',
        }"
      >
        Notes
      </RouterLink>
      <RouterLink
        :to="{
          name: 'new-note',
        }"
      >
        New Note
      </RouterLink>
    </nav>

    <UserMenu v-if="authStore.state.isAuthenticated" />
    <AuthMenu v-else />
  </header>
  <RouterView />
</template>

<style></style>
