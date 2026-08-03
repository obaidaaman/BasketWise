import { defineStore } from 'pinia'
import axios from 'axios'

// Configure global axios defaults
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true // Important for sending/receiving refresh token in cookies

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    setAccessToken(token) {
      this.accessToken = token
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        delete axios.defaults.headers.common['Authorization']
      }
    },

    async login(email, password) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/auth/login', { email, password })
        this.setAccessToken(response.data.accessToken)
        await this.fetchUser()
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async signup(email, password, name) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/auth/signup', { email, password, name })
        this.setAccessToken(response.data.accessToken)
        await this.fetchUser()
      } catch (err) {
        this.error = err.response?.data?.message || 'Signup failed'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get('/auth/me')
        this.user = response.data
      } catch (err) {
        this.user = null
        this.setAccessToken(null)
      }
    },

    async refreshToken() {
      try {
        const response = await axios.get('/auth/refresh')
        this.setAccessToken(response.data.accessToken)
        await this.fetchUser()
      } catch (err) {
        this.user = null
        this.setAccessToken(null)
      }
    },

    logout() {
      this.user = null
      this.setAccessToken(null)
      // Ideally call a backend endpoint to clear the refresh token cookie
    }
  }
})
