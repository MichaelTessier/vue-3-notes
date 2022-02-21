<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "@/domains/auth/use/useAuthState";

const { user } = useAuthState();

const auth = getAuth();

const userLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error);
  }
};
</script>

<template>
  <nav>
    <div v-if="user">{{ user.email }}</div>
    <div @click="userLogout">Sign out</div>

  </nav>
</template>
