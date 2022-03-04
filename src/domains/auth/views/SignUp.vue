<template>
  <div>
    <h1>Sign UP</h1>
    <form @submit.prevent="submit">
      <input
        type="email"
        name="email"
        id="email"
        :placeholder="'Email'"
        v-model="email"
      />
      <input
        type="password"
        name="password"
        id="password"
        :placeholder="'Password'"
        v-model="password"
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/domains/auth/composables/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const submit = async (): Promise<void> => {
  try {
    await authStore.register(email.value, password.value);

    router.push({
      name: "home",
    });
  } catch (error) {
    alert(error);
  }
};
</script>

<style scoped></style>
