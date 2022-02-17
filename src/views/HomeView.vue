<template>
  <div>
    <CounterBase :message="'mon message'" :limit="10" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CounterBase from "@/components/CounterBase.vue";

export default defineComponent({
  name: "ViewHome",
  components: {
    CounterBase,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
