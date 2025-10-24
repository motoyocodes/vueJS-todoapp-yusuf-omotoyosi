<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "../lib/todotypes";

const title = ref("");

// Emits
const emit = defineEmits<{
  (e: "add-todo", todo: Todo): void;
}>();

const onSubmit = () => {
  if (!title.value.trim()) return;

  const id = Math.floor(Math.random() * 1000000);
  const newTodo: Todo = {
    id,
    title: title.value.trim(),
    completed: false,
  };

  emit("add-todo", newTodo);
  title.value = "";
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="mb-4 space-y-2">
    <input
      placeholder="New todo title"
      v-model="title"
      class="bg-white/20 border border-white/20 text-white placeholder-white/70 font-semibold px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md shadow-md transition-all duration-300"
    />
    <button
      type="submit"
      class="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
    >
      Add A Todo
    </button>
  </form>
</template>
