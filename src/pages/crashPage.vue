<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  throw new Error("Forced crash: Component encountered a critical issue.");
});
</script>

<template>
  <div class="text-red-600 font-bold p-6">
    ⚠️ CrashPage — this should not display because it crashes
  </div>
</template>
