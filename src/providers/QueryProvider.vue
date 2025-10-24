<script setup lang="ts">
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { provide } from "vue";

const queryClient = new QueryClient();

// make it globally
provide(VueQueryPlugin, queryClient);
</script>

<template>
  <slot />
</template>
