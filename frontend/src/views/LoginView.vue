<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ArrowRight, Leaf } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    const redirectPath = route.query.redirect || '/chat'
    router.push(redirectPath)
  } catch (error) {
    // Error is handled by store
  }
}
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col md:flex-row">
    <!-- Left panel - illustrative -->
    <div class="hidden md:flex md:w-1/2 bg-primary text-white flex-col justify-between p-12 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary to-primary-light"></div>
      
      <!-- Logo -->
      <div class="relative z-10 flex items-center gap-2 cursor-pointer" @click="router.push('/')">
        <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary">
          <span class="font-serif font-bold text-xl">BW</span>
        </div>
        <span class="text-2xl font-bold font-serif tracking-tight text-white">BasketWise</span>
      </div>

      <div class="relative z-10 max-w-md">
        <h1 class="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6">
          Welcome back to <span class="text-accent">smarter</span> shopping.
        </h1>
        <p class="text-lg text-white/80 font-light leading-relaxed">
          Log in to access your personalized quick commerce assistant and find the best deals in your area instantly.
        </p>
      </div>

      <div class="relative z-10">
        <div class="flex items-center gap-2 text-white/60 text-sm">
          <Leaf class="w-4 h-4" />
          <span>Organic, real-time, unbiased search.</span>
        </div>
      </div>
      
      <!-- Decorative circle -->
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
    </div>

    <!-- Right panel - form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
      
      <!-- Mobile Logo -->
      <div class="absolute top-8 left-8 flex md:hidden items-center gap-2 cursor-pointer" @click="router.push('/')">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
          <span class="font-serif font-bold text-lg">BW</span>
        </div>
        <span class="text-xl font-bold font-serif tracking-tight text-primary">BasketWise</span>
      </div>

      <div class="w-full max-w-sm mt-12 md:mt-0">
        <div class="mb-10">
          <h2 class="text-3xl font-serif font-bold text-gray-900 mb-2">Log in</h2>
          <p class="text-gray-500">Don't have an account? 
            <router-link to="/signup" class="text-primary font-medium hover:underline">Sign up for free</router-link>
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="authStore.error" class="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 flex items-start gap-2">
            {{ authStore.error }}
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" class="text-sm font-medium text-primary hover:underline">Forgot password?</a>
            </div>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
          >
            <span v-if="authStore.isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <template v-else>
              Log in <ArrowRight class="w-4 h-4" />
            </template>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
