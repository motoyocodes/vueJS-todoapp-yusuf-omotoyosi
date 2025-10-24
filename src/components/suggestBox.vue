<script setup lang="ts">
import { ref } from "vue";
import { getSuggestions } from "../api/suggestions";

const topic = ref("");
const ideas = ref<string[]>([]);
const loading = ref(false);
const error = ref("");
const mock = ref(false);

const handleSuggest = async () => {
  if (!topic.value.trim()) return;

  loading.value = true;
  error.value = "";
  ideas.value = [];
  mock.value = false;

  const currentTopic = topic.value.trim();
  topic.value = "";

  try {
    const data = await getSuggestions(currentTopic); // call directly
    ideas.value = data.items || [];
    mock.value = data.mock || false;
  } catch (err: any) {
    error.value = err.message || "Failed to get suggestions";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="bg-white shadow-lg rounded-2xl p-8 mt-10 text-center max-w-lg mx-auto"
  >
    <h2 class="text-2xl font-bold text-blue-600 mb-6">
      Get your AI Todo Suggestions
    </h2>

    <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <input
        type="text"
        v-model="topic"
        placeholder="Enter a topic (e.g. studying, fitness, cleaning)"
        class="border border-gray-400 rounded-lg px-4 py-2 w-full sm:w-80 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-800 placeholder-gray-400"
      />
      <button
        @click="handleSuggest"
        :disabled="loading"
        class="relative flex items-center justify-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        <span
          v-if="loading"
          class="absolute left-4 w-4 h-4 border-2 cursor-pointer border-white border-t-transparent rounded-full animate-spin"
        ></span>
        {{ loading ? "Thinking..." : "Suggest Todos" }}
      </button>
    </div>

    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>

    <ul
      v-if="ideas.length > 0"
      class="mt-6 text-left max-w-md mx-auto list-disc list-inside space-y-2 text-gray-800"
    >
      <li v-for="(idea, i) in ideas" :key="i">{{ idea }}</li>
    </ul>
  </div>
</template>
