<template>
  <div class="text-center mt-10 space-y-4">
    <h1 class="text-2xl font-bold text-red-600" v-if="hasError">
      Something went wrong.
    </h1>
    <p v-if="hasError">{{ errorMessage }}</p>

    <div v-else>
      <slot />
    </div>

    <button
      class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      @click="triggerCrash = true"
    >
      Force Crash
    </button>

    <CrashComponent v-if="triggerCrash" @errorCaptured="onErrorCaptured" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const CrashComponent = {
  template: `<div>Crash happening...</div>`,
  mounted() {
    throw new Error("Forced crash inside CrashComponent!");
  },
};

const hasError = ref(false);
const errorMessage = ref("");
const triggerCrash = ref(false);

function onErrorCaptured(err: unknown) {
  console.error("Error captured:", err);
  hasError.value = true;
  errorMessage.value = err instanceof Error ? err.message : String(err);
  return false;
}
</script>

<style scoped>
button {
  transition: background 0.2s;
}
</style>
