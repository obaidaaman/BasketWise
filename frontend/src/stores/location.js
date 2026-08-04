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
