<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LogOut, User, MapPin } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const emit = defineEmits(['openLocation'])

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="glass-nav sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <span class="font-serif font-bold text-lg">BW</span>
          </div>
          <span class="text-xl font-bold font-serif tracking-tight text-primary">BasketWise</span>
        </div>

        <!-- Navigation Links / Actions -->
        <div class="flex items-center gap-6">
          <template v-if="isAuthenticated">
            <button 
              @click="emit('openLocation')"
              class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              <MapPin class="w-4 h-4" />
              <span>Location</span>
            </button>
            <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div class="flex items-center gap-2 text-sm font-medium text-gray-800">
                <div class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-primary">
                  <User class="w-4 h-4" />
                </div>
                <span class="hidden sm:inline">{{ user?.username || 'User' }}</span>
              </div>
              <button 
                @click="handleLogout"
                class="text-gray-400 hover:text-red-500 transition-colors ml-2"
                title="Logout"
              >
                <LogOut class="w-5 h-5" />
              </button>
            </div>
          </template>
          <template v-else>
            <button @click="router.push('/login')" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Log in
            </button>
            <button @click="router.push('/signup')" class="px-5 py-2 text-sm font-medium bg-primary text-white rounded-full hover:bg-primary-light transition-colors shadow-sm">
              Sign up
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
