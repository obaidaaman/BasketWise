<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    // Error is handled in store
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center bg-[#f8f9fa] py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Minimal Logo -->
      <div class="flex justify-center cursor-pointer" @click="router.push('/')">
        <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
      <h2 class="mt-6 text-center text-2xl font-semibold tracking-tight text-textMain">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-secondary">
        Or
        <router-link to="/signup" class="font-medium text-primary hover:text-primary/80 transition-colors">
          create a new account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 transition-colors" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="text-sm">
                <a href="#" class="font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password"
                class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 transition-colors" />
            </div>
          </div>

          <div v-if="authStore.error" class="bg-red-50 border-l-4 border-red-400 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  {{ authStore.error }}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" :disabled="authStore.isLoading"
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-75 disabled:cursor-not-allowed">
              <svg v-if="authStore.isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ authStore.isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
      
      <!-- Footer links if needed -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <p>&copy; 2026 QuickCommerce Inc. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
