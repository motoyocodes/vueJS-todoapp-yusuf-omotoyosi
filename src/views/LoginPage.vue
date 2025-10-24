<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
      <h2 class="text-2xl font-bold mb-6 text-blue-600">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="text-left">
          <label for="username" class="block text-gray-700 mb-1 font-medium"
            >Username</label
          >
          <input
            id="username"
            type="text"
            v-model="username"
            placeholder="Enter your username"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>

        <div class="text-left">
          <label for="password" class="block text-gray-700 mb-1 font-medium"
            >Password</label
          >
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>

        <button
          type="submit"
          class="w-full cursor-pointer px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition relative"
        >
          Login
        </button>

        <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const username = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();
const { login } = useAuth();

const handleLogin = () => {
  if (!username.value.trim() || !password.value.trim()) {
    error.value = "Please enter username and password";
    return;
  }

  const success = login(username.value, password.value);
  if (success) {
    error.value = "";
    router.push("/todos");
  } else {
    error.value = "Invalid username or password";
  }
};
</script>
