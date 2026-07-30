import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const location = ref(null)

  function login(email) {
    user.value = { email }
    isAuthenticated.value = true
  }

  function signup(email) {
    user.value = { email }
    isAuthenticated.value = true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    location.value = null
  }

  function setLocation(loc) {
    location.value = loc
  }

  return { user, isAuthenticated, location, login, signup, logout, setLocation }
})
