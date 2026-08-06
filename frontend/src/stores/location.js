import { defineStore } from 'pinia'
import axios from 'axios'

export const useLocationStore = defineStore('location', {
  state: () => ({
    currentLocation: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    hasLocation: (state) => !!state.currentLocation,
  },

  actions: {
    // Fetch existing location from backend (called on app init)
    async fetchLocation() {
      try {
        const response = await axios.get('/location')
        const { latitude, longitude } = response.data
        if (latitude && longitude) {
          this.currentLocation = { latitude, longitude }
        }
      } catch (err) {
        // 404 means no location saved yet — that's fine, not an error
        if (err.response?.status !== 404) {
          console.error('Failed to fetch location:', err)
        }
      }
    },

    async setLocation(latitude, longitude) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/location', {
          location: { latitude, longitude }
        })
        
        this.currentLocation = { latitude, longitude }
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to set location'
        throw err
      } finally {
        this.isLoading = false
      }
    },
    
    clearLocation() {
        this.currentLocation = null;
    }
  }
})
