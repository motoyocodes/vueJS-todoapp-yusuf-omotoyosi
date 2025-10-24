<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchTodos } from "../lib/todoApi";
import { updateATodo } from "../lib/newTodoApi";
import { useRouter, useRoute } from "vue-router";
import SuggestBox from "../components/suggestBox.vue";
import TodoForm from "../components/TodoForm.vue";
import type { Todo } from "../lib/todotypes";
import { useAuth } from "../composables/useAuth";

// State
const todos = ref<Todo[]>([]);
const page = ref(1);
const editingTodoId = ref<number | null>(null);
const editedTitle = ref("");
const search = ref("");
const isCompleted = ref(true);
const todosPerPage = 10;

const router = useRouter();
const route = useRoute();

const { logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push("/login");
};

// Fetch todos with Vue Query
const { data } = useQuery<Todo[]>({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});

// Sync local todos on mount or when query data changes
const syncTodos = () => {
  if (data.value) todos.value = data.value;
};
onMounted(syncTodos);
watch(data, syncTodos);

// Also resync todos whenever route change
watch(route, () => {
  syncTodos();
});

// Methods
const handleAddTodo = (newTodo: Omit<Todo, "id">) => {
  const id =
    todos.value.length > 0
      ? Math.max(...todos.value.map((t) => t.id ?? 0)) + 1
      : 1;

  const todoWithId: Todo = { ...newTodo, id };
  todos.value = [todoWithId, ...todos.value];
};

const handleToggle = (todo: Todo) => {
  todos.value = todos.value.map((t) =>
    t.id === todo.id ? { ...t, completed: !t.completed } : t
  );
};

const handleDelete = (id: number) => {
  todos.value = todos.value.filter((t) => t.id !== id);
};

const handleEdit = (todo: Todo) => {
  editingTodoId.value = todo.id!;
  editedTitle.value = todo.title;
};

const handleSave = async (todo: Todo) => {
  const updatedTodo: Todo = { ...todo, title: editedTitle.value };
  try {
    const response = await updateATodo(todo.id!, updatedTodo);
    todos.value = todos.value.map((t) => (t.id === todo.id ? response : t));
    editingTodoId.value = null;
    editedTitle.value = "";
  } catch (err) {
    console.error("Error updating todo:", err);
  }
};

// Computed
const filteredTodos = computed(() =>
  todos.value
    .filter((todo) =>
      todo.title.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((todo) => (isCompleted.value ? true : !todo.completed))
);

const pageToShow = computed(() =>
  filteredTodos.value.slice(
    (page.value - 1) * todosPerPage,
    page.value * todosPerPage
  )
);

const goToHome = () => router.push("/");
</script>

<template>
  <main class="relative bg-todos p-4 min-h-screen">
    <div class="absolute inset-0 bg-black/30 backdrop-blur-sm -z-10" />

    <div
      class="max-w-3xl mx-auto p-6 rounded-[15px] border border-white/20 bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-[50px]"
    >
      <TodoForm @add-todo="handleAddTodo" />

      <div class="mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search todos..."
          class="bg-white/20 border border-white/30 text-white placeholder-white/70 font-semibold px-4 py-2 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md shadow-md"
          v-model="search"
        />
        <label class="flex items-center gap-2 text-gray-600">
          <input type="checkbox" v-model="isCompleted" /> Show Completed
        </label>

        <SuggestBox />
      </div>

      <ul class="space-y-4">
        <li
          v-for="todo in pageToShow"
          :key="todo.id"
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border p-3 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div class="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              v-model="todo.completed"
              class="accent-blue-500"
              @change="handleToggle(todo)"
            />
            <template v-if="editingTodoId === todo.id">
              <input
                v-model="editedTitle"
                class="border px-2 py-1 rounded w-full sm:w-auto"
              />
            </template>
            <template v-else>
              <span
                class="text-lg text-blue-700 font-medium cursor-pointer hover:underline"
                @click="router.push(`/todos/${todo.id}`)"
              >
                {{ todo.title }} — {{ todo.completed ? "✅" : "❌" }}
              </span>
            </template>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="handleDelete(todo.id)"
              class="text-red-500 cursor-pointer hover:text-red-700"
            >
              🗑️
            </button>
            <template v-if="editingTodoId === todo.id">
              <button
                @click="handleSave(todo)"
                class="text-green-500 cursor-pointer hover:text-green-700"
              >
                💾 Save
              </button>
            </template>
            <template v-else>
              <button
                @click="handleEdit(todo)"
                class="text-yellow-500 cursor-pointer hover:text-yellow-600"
              >
                Edit
              </button>
            </template>
          </div>
        </li>
      </ul>

      <div class="mt-8 flex items-center justify-between text-gray-600">
        <button
          :disabled="page === 1"
          @click="page--"
          class="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          ← Prev
        </button>
        <span class="font-semibold">Page {{ page }}</span>
        <button
          :disabled="page * todosPerPage >= filteredTodos.length"
          @click="page++"
          class="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      <button
        @click="goToHome"
        class="block mt-6 w-full px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        ← Back to HomePage
      </button>

      <div class="flex items-center mt-5 justify-center">
        <button
          @click="handleLogout"
          class="px-6 py-3 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </main>
</template>
