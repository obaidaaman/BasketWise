import { defineStore } from 'pinia'
import axios from 'axios'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [], // Array of { role: 'user' | 'assistant', content: '', data?: {} }
    isLoading: false,
    error: null,
  }),

  actions: {
    async sendMessage(text) {
      // Optimistically add user message
      this.messages.push({
        role: 'user',
        content: text
      })

      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.post('/chat', { message: text })
        
        // Push AI response containing structured data
        this.messages.push({
          role: 'assistant',
          content: response.data.message || '',
          data: response.data // Contains type, products[], platforms[] etc.
        })
        
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to send message'
        
        // Push error message to chat
        this.messages.push({
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          isError: true
        })
        throw err
      } finally {
        this.isLoading = false
      }
    },
    
    clearChat() {
      this.messages = []
    }
  }
})
