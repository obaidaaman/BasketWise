import { defineStore } from 'pinia'
import axios from 'axios'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [], // Array of { role: 'user' | 'assistant', content: '', data?: {} }
    isLoading: false,
    error: null,
    hasMore: false,
    page: 1,
    historyLoaded: false,
  }),

  actions: {
    async loadHistory(page = 1) {
      try {
        const response = await axios.get(`/chat?page=${page}&limit=30`)

        const formattedMessages = response.data.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          data: msg.data // Include the products and structured data!
        }))

        if (page === 1) {
          this.messages = formattedMessages
        } else {
          // Prepend older messages to the beginning
          this.messages = [...formattedMessages, ...this.messages]
        }

        this.hasMore = response.data.hasMore
        this.page = page
        this.historyLoaded = true
      } catch (err) {
        console.error('Failed to load chat history:', err)
      }
    },

    async loadOlderMessages() {
      if (!this.hasMore || this.isLoading) return
      await this.loadHistory(this.page + 1)
    },

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
      this.hasMore = false
      this.page = 1
      this.historyLoaded = false
    }
  }
})
