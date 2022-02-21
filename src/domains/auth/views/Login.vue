<template>
  <div>
    <h1>Login</h1>
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const router = useRouter();
const auth = getAuth();

const submit = async (): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);

    router.push({
      name: "home",
    });
  } catch (error) {
    alert(error);
  }
};
</script>

<style scoped></style>
