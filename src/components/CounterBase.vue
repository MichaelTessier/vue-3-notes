<template>
  <div>
    CounterBase

    <p>Message: {{ message }}</p>

    <p>
      Count: {{ count }}

      <button @click="increment">Increment</button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";

interface Props {
  message: string;
  limit?: number;
}

const props = defineProps<Props>();

const count = ref<number>(0);

const canIncrement = computed((): boolean => {
  return !!props.limit && count.value < props.limit;
});

const increment = (): void => {
  if (!canIncrement.value) return;
  count.value++;
};
</script>

<style scoped></style>
