<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { fetchTodoById } from "../../lib/todoApi";
import type { Todo } from "../../lib/todotypes";

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);

const {
  data: todo,
  isLoading,
  error,
} = useQuery<Todo>({
  queryKey: ["todo", id],
  queryFn: () => fetchTodoById(id),
  enabled: !!id,
});

const goBack = () => router.push("/todos");
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 via-white"
  >
    <div class="max-w-md w-full bg-white p-6 rounded-xl shadow-md text-center">
      <template v-if="isLoading">
        <p>Loading todo...</p>
      </template>

      <template v-else-if="error">
        <p>Failed to load todo.</p>
      </template>

      <template v-else-if="!todo">
        <p>Todo not found.</p>
      </template>

      <template v-else>
        <h2 class="text-2xl font-bold text-blue-700 mb-2">{{ todo.title }}</h2>
        <p class="text-gray-600 mb-4">
          Status:
          <span :class="todo.completed ? 'text-green-600' : 'text-red-600'">
            {{ todo.completed ? "✅ Completed" : "❌ Not completed" }}
          </span>
        </p>
        <button
          @click="goBack"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          ← Back to Todos
        </button>
      </template>
    </div>
  </div>
</template>
