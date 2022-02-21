<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import UserMenu from "@/domains/auth/components/UserMenu.vue";
import AuthMenu from "@/domains/auth/components/AuthMenu.vue";
import { useAuthState } from "@/domains/auth/use/useAuthState";

const { isAuthenticated } = useAuthState();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>

    <UserMenu v-if="isAuthenticated" />
    <AuthMenu v-if="!isAuthenticated" />
  </header>

  <RouterView />
</template>

<style></style>
