<script setup>
import { computed } from 'vue'
import { ExternalLink, Clock, Package, PackageX, TrendingDown } from 'lucide-vue-next'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)
}

const hasSavings = computed(() => props.product.price?.savings > 0)
const discountPercent = computed(() => {
  if (!hasSavings.value) return 0
  const { mrp, offerPrice } = props.product.price
  return Math.round(((mrp - offerPrice) / mrp) * 100)
})

</script>

<template>
  <div class="premium-card overflow-hidden group flex flex-col h-full bg-white relative">
    <!-- Image Section -->
    <div class="aspect-square w-full bg-gray-50 relative overflow-hidden p-4 flex items-center justify-center">
      <img 
        v-if="product.image" 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-20 h-20 text-gray-200">
        <Package class="w-full h-full" />
      </div>
      
      <!-- Badges overlay -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span 
          v-if="discountPercent > 0"
          class="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1"
        >
          <TrendingDown class="w-3 h-3" />
          {{ discountPercent }}% OFF
        </span>
      </div>
      
      <!-- Platform badge -->
      <div class="absolute top-3 right-3">
        <span class="bg-white/90 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm border border-gray-100 text-primary flex items-center gap-1.5">
          {{ product.platform.name }}
        </span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Brand & Title -->
      <div class="mb-3 flex-grow">
        <span v-if="product.brand" class="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
          {{ product.brand }}
        </span>
        <h4 class="font-medium text-gray-900 leading-snug line-clamp-2">
          {{ product.name }}
        </h4>
        <span v-if="product.quantity" class="text-xs text-gray-500 mt-1 block">
          {{ product.quantity }}
        </span>
      </div>

      <!-- Price & Status section -->
      <div class="mt-auto">
        <div class="flex items-end gap-2 mb-3">
          <span class="text-xl font-bold text-gray-900 leading-none">
            {{ formatPrice(product.price.offerPrice || product.price.mrp) }}
          </span>
          <span v-if="hasSavings" class="text-sm text-gray-400 line-through leading-none mb-0.5">
            {{ formatPrice(product.price.mrp) }}
          </span>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-gray-100">
          <div class="flex items-center gap-1.5 text-xs font-medium" 
               :class="product.inStock ? 'text-green-600' : 'text-red-500'">
            <Package v-if="product.inStock" class="w-3.5 h-3.5" />
            <PackageX v-else class="w-3.5 h-3.5" />
            {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
          </div>
          
          <div v-if="product.platform.deliveryTime" class="flex items-center gap-1 text-xs font-medium text-accent">
            <Clock class="w-3.5 h-3.5" />
            {{ product.platform.deliveryTime }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Hover Action Overlay (Desktop) -->
    <div v-if="product.deeplink" class="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none"></div>
    
    <div v-if="product.deeplink" class="absolute bottom-4 right-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md z-10 pointer-events-none">
      <ExternalLink class="w-4 h-4" />
    </div>

    <!-- Full Card Clickable Overlay -->
    <a v-if="product.deeplink" :href="product.deeplink" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-20" aria-label="View Product"></a>
  </div>
</template>
