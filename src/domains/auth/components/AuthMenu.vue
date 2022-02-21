<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink
      :to="{
        name: 'login',
      }"
    >
      Login
    </RouterLink>
    <RouterLink
      :to="{
        name: 'sign-up',
      }"
    >
      SignUp
    </RouterLink>
  </nav>
</template>
