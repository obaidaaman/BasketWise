<script setup>
import { ref } from 'vue'
import { MapPin, Target, X, CheckCircle2 } from 'lucide-vue-next'
import { useLocationStore } from '@/stores/location'

const emit = defineEmits(['close'])
const locationStore = useLocationStore()

const latitude = ref(locationStore.currentLocation?.latitude || '')
const longitude = ref(locationStore.currentLocation?.longitude || '')
const isDetecting = ref(false)
const successMessage = ref('')

const handleDetectLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    return
  }

  isDetecting.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude
      longitude.value = position.coords.longitude
      isDetecting.value = false
    },
    (error) => {
      console.error(error)
      alert('Unable to retrieve your location')
      isDetecting.value = false
    }
  )
}

const handleSave = async () => {
  if (!latitude.value || !longitude.value) return
  
  try {
    await locationStore.setLocation(Number(latitude.value), Number(longitude.value))
    successMessage.value = 'Location updated successfully!'
    setTimeout(() => {
      emit('close')
    }, 1500)
  } catch (err) {
    console.error('Error saving location', err)
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">
    <div class="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-serif font-semibold text-textMain flex items-center gap-2">
          <MapPin class="w-5 h-5 text-accent" />
          Set Delivery Location
        </h3>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <p class="text-sm text-textMuted mb-6">
          We need your location to find the best quick-commerce deals and delivery times for your area.
        </p>

        <div v-if="successMessage" class="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 class="w-5 h-5" />
          {{ successMessage }}
        </div>

        <button 
          @click="handleDetectLocation"
          :disabled="isDetecting"
          class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-primary font-medium hover:bg-gray-100 transition-colors mb-6 disabled:opacity-50"
        >
          <Target class="w-4 h-4" :class="{ 'animate-spin': isDetecting }" />
          {{ isDetecting ? 'Detecting...' : 'Detect my location automatically' }}
        </button>

        <div class="relative flex items-center py-2 mb-6">
          <div class="flex-grow border-t border-gray-200"></div>
          <span class="flex-shrink-0 mx-4 text-gray-400 text-sm">or enter coordinates</span>
          <div class="flex-grow border-t border-gray-200"></div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Latitude</label>
            <input 
              v-model="latitude" 
              type="number" 
              step="any"
              placeholder="e.g. 28.6139"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            >
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Longitude</label>
            <input 
              v-model="longitude" 
              type="number" 
              step="any"
              placeholder="e.g. 77.2090"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            >
          </div>
        </div>
        
        <div v-if="locationStore.error" class="mb-4 text-sm text-red-500">
          {{ locationStore.error }}
        </div>

        <button 
          @click="handleSave"
          :disabled="!latitude || !longitude || locationStore.isLoading"
          class="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
        >
          <span v-if="locationStore.isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          Save Location
        </button>
      </div>
    </div>
  </div>
</template>
