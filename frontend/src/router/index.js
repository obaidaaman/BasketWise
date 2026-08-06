import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ChatView from '../views/ChatView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignupView },
    { 
      path: '/chat', 
      name: 'chat', 
      component: ChatView,
      meta: { requiresAuth: true }
    },
  ],
})

let isRefreshed = false

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // On first load (page refresh), try to restore the session via refresh token
  if (!isRefreshed) {
    isRefreshed = true
    if (!authStore.isAuthenticated) {
      try {
        await authStore.refreshToken()
      } catch (e) {
        // Refresh failed — user is genuinely logged out
      }
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if ((to.name === 'login' || to.name === 'signup') && authStore.isAuthenticated) {
    next({ name: 'chat' })
  } else {
    next()
  }
})

export default router
