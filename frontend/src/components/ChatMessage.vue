<script setup>
import { computed } from 'vue'
import { Sparkles, User } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'
import { marked } from 'marked'

// Configure marked to be safe and format nicely
marked.setOptions({
  breaks: true,
  gfm: true,
})

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const isUser = computed(() => props.message.role === 'user')
const isError = computed(() => props.message.isError || props.message.data?.type === 'error')
const hasProducts = computed(() => props.message.data?.products && props.message.data.products.length > 0)

const formattedContent = computed(() => {
  if (!props.message.content) return ''
  // Only parse markdown for AI messages, keep user messages plain
  if (isUser.value) {
    return props.message.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')
  }
  return marked.parse(props.message.content)
})
</script>

<template>
  <div class="flex w-full mb-6" :class="isUser ? 'justify-end' : 'justify-start'">
    
    <!-- Avatar (AI only) -->
    <div v-if="!isUser" class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center mr-3 mt-1 shadow-sm">
      <Sparkles class="w-4 h-4 text-accent" />
    </div>

    <div class="max-w-[85%] sm:max-w-[75%]">
      <!-- Message Bubble -->
      <div 
        class="px-5 py-3.5 shadow-sm inline-block"
        :class="[
          isUser 
            ? 'bg-primary text-white rounded-[20px] rounded-tr-sm' 
            : isError 
              ? 'bg-red-50 border border-red-100 text-red-800 rounded-[20px] rounded-tl-sm'
              : 'bg-white border border-gray-100 text-gray-800 rounded-[20px] rounded-tl-sm'
        ]"
      >
        <div class="text-[15px] leading-relaxed markdown-content" v-html="formattedContent"></div>
        
        <!-- Platforms listed -->
        <div v-if="message.data?.platforms?.length > 0" class="mt-3 flex flex-wrap gap-2">
          <span 
            v-for="platform in message.data.platforms" 
            :key="platform"
            class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200"
          >
            {{ platform }}
          </span>
        </div>
      </div>

      <!-- Product Grid (if applicable) -->
      <div v-if="hasProducts" class="mt-4 w-full">
        <!-- Horizontal scroll on mobile, grid on desktop -->
        <div class="flex overflow-x-auto pb-4 -mx-1 px-1 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 snap-x">
          <div 
            v-for="product in message.data.products" 
            :key="product.id || product.name" 
            class="w-[75vw] max-w-[260px] sm:w-auto flex-none snap-center"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style>
/* Markdown styling */
.markdown-content p {
  margin-bottom: 0.75em;
}
.markdown-content p:last-child {
  margin-bottom: 0;
}
.markdown-content strong {
  font-weight: 600;
}
.markdown-content ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}
.markdown-content ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}
.markdown-content li {
  margin-bottom: 0.25em;
}
.markdown-content a {
  color: #1B4332; /* Primary color */
  text-decoration: underline;
  font-weight: 500;
}
/* Hide duplicate images in text since we have beautiful product cards below */
.markdown-content img {
  display: none !important;
}
</style>
