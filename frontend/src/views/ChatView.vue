<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'
import { useLocationStore } from '@/stores/location'
import { Send, MapPinOff, Loader2 } from 'lucide-vue-next'
import AppHeader from '@/components/AppHeader.vue'
import LocationModal from '@/components/LocationModal.vue'
import ChatMessage from '@/components/ChatMessage.vue'

const router = useRouter()
const authStore = useAuthStore()
const chatStore = useChatStore()
const locationStore = useLocationStore()

const messageInput = ref('')
const showLocationModal = ref(false)
const chatContainer = ref(null)
const loadingOlder = ref(false)

const scrollToBottom = (smooth = true) => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      })
    }
  })
}

const handleSend = async () => {
  if (!messageInput.value.trim() || chatStore.isLoading) return
  
  const text = messageInput.value
  messageInput.value = ''
  
  scrollToBottom(true)
  
  try {
    await chatStore.sendMessage(text)
    scrollToBottom(true)
  } catch (e) {
    console.error('Chat error', e)
  }
}

// Load older messages when user scrolls to the top
const handleScroll = async () => {
  if (!chatContainer.value || loadingOlder.value || !chatStore.hasMore) return

  // Trigger when scrolled within 50px of the top
  if (chatContainer.value.scrollTop < 50) {
    loadingOlder.value = true
    const oldHeight = chatContainer.value.scrollHeight

    await chatStore.loadOlderMessages()

    // Keep scroll position stable so it doesn't jump to the top
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight - oldHeight
      }
      loadingOlder.value = false
    })
  }
}

onMounted(async () => {
  // Fetch saved location from backend before deciding to show modal
  await locationStore.fetchLocation()

  // Load chat history
  await chatStore.loadHistory(1)

  // Ensure scroll reaches the bottom after messages render
  nextTick(() => {
    setTimeout(() => {
      scrollToBottom(false) // false = instant scroll
    }, 100)
    // Backup scroll in case images/cards take longer to render
    setTimeout(() => {
      scrollToBottom(false)
    }, 500)
  })

  // If no location is set (even after checking backend), prompt
  if (!locationStore.hasLocation) {
    showLocationModal.value = true
  }

  // Attach scroll listener for loading older messages
  if (chatContainer.value) {
    chatContainer.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (chatContainer.value) {
    chatContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="h-[100dvh] flex flex-col bg-background overflow-hidden">
    <AppHeader @openLocation="showLocationModal = true" />

    <!-- Location Warning Banner -->
    <div v-if="!locationStore.hasLocation" class="bg-accent/10 border-b border-accent/20 px-4 py-3 text-center">
      <p class="text-sm font-medium text-amber-800 flex items-center justify-center gap-2">
        <MapPinOff class="w-4 h-4" />
        Please set your delivery location to search for products.
        <button @click="showLocationModal = true" class="underline hover:text-amber-900 ml-2">Set Location</button>
      </p>
    </div>

    <!-- Main Chat Area -->
    <main class="flex-grow flex flex-col max-w-5xl mx-auto w-full relative min-h-0">
      <!-- Chat Messages -->
      <div 
        ref="chatContainer"
        class="flex-grow overflow-y-auto px-4 py-8"
      >
        <!-- Empty State -->
        <div v-if="chatStore.messages.length === 0" class="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4 mt-20">
          <div class="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
            <span class="font-serif font-bold text-3xl text-primary">BW</span>
          </div>
          <h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">What's on your shopping list?</h2>
          <p class="text-gray-500 mb-8">
            Ask me to find products, compare prices across platforms, or suggest a budget-friendly cart.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <button @click="messageInput = 'Compare Amul Milk on Blinkit and Zepto'" class="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-left text-gray-700 hover:border-primary hover:text-primary transition-colors">
              "Compare Amul Milk on Blinkit and Zepto"
            </button>
            <button @click="messageInput = 'Where can I get the cheapest basmati rice?'" class="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-left text-gray-700 hover:border-primary hover:text-primary transition-colors">
              "Where can I get the cheapest basmati rice?"
            </button>
            <button @click="messageInput = 'Find organic skincare products'" class="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-left text-gray-700 hover:border-primary hover:text-primary transition-colors">
              "Find organic skincare products"
            </button>
            <button @click="messageInput = 'I have 500rs, what snacks can I get?'" class="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-left text-gray-700 hover:border-primary hover:text-primary transition-colors">
              "I have 500rs, what snacks can I get?"
            </button>
          </div>
        </div>

        <!-- Message List -->
        <div v-else class="pb-32">
          <!-- Loading older messages indicator -->
          <div v-if="loadingOlder" class="flex justify-center py-4">
            <Loader2 class="w-5 h-5 text-gray-400 animate-spin" />
          </div>

          <ChatMessage 
            v-for="(msg, idx) in chatStore.messages" 
            :key="idx" 
            :message="msg" 
          />
          
          <!-- Typing Indicator -->
          <div v-if="chatStore.isLoading" class="flex w-full mb-6 justify-start">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mr-3 mt-1 shadow-sm">
              <span class="font-serif font-bold text-sm text-primary">BW</span>
            </div>
            <div class="px-5 py-4 bg-white border border-gray-100 rounded-[20px] rounded-tl-sm flex items-center gap-1.5 shadow-sm">
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pb-8 pt-12">
        <div class="max-w-3xl mx-auto relative group">
          <form @submit.prevent="handleSend" class="relative flex items-center">
            <input 
              v-model="messageInput"
              type="text"
              placeholder="Ask BasketWise anything..."
              class="w-full pl-6 pr-14 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 transition-all placeholder-gray-400"
              :disabled="chatStore.isLoading || !locationStore.hasLocation"
            />
            <button 
              type="submit"
              :disabled="!messageInput.trim() || chatStore.isLoading || !locationStore.hasLocation"
              class="absolute right-2 p-2.5 bg-primary text-white rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:hover:bg-primary"
            >
              <Send class="w-4 h-4" />
            </button>
          </form>
          <div class="text-center mt-2">
            <span class="text-[10px] text-gray-400 font-medium tracking-wide uppercase">AI Assistant can make mistakes. Verify important details.</span>
          </div>
        </div>
      </div>
    </main>

    <LocationModal v-if="showLocationModal" @close="showLocationModal = false" />
  </div>
</template>
