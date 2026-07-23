<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const locationStatus = ref('idle')
const locationError = ref('')

const locationLabel = computed(() => {
  if (locationStatus.value === 'requesting') return 'Requesting location…'
  if (locationStatus.value === 'granted' && auth.location) return `📍 ${auth.location}`
  if (locationStatus.value === 'denied') return 'Location denied'
  return 'Share location to compare prices'
})

function shareLocation() {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }
  if (!navigator.geolocation) {
    locationError.value = 'Geolocation is not supported by your browser.'
    locationStatus.value = 'denied'
    return
  }
  locationStatus.value = 'requesting'
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords
      auth.setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
      locationStatus.value = 'granted'
    },
    () => {
      locationStatus.value = 'denied'
      locationError.value = 'Please allow location access to use this feature.'
    },
  )
}
</script>

<template>
  <div class="page">
    <header class="nav">
      <div class="brand">QuickCommerce</div>
      <nav class="links">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signup" class="cta">Sign up</RouterLink>
      </nav>
    </header>

    <section class="hero">
      <h1>Compare prices across Blinkit, Zepto &amp; Instamart</h1>
      <p class="sub">Find the cheapest grocery in seconds, with live ETAs at your doorstep.</p>
      <button class="primary" @click="shareLocation">{{ locationLabel }}</button>
      <p v-if="locationError" class="error">{{ locationError }}</p>
    </section>

    <section class="features">
      <div class="card">
        <h3>Best prices</h3>
        <p>Side-by-side comparison from top quick-commerce apps.</p>
      </div>
      <div class="card">
        <h3>Live ETAs</h3>
        <p>See which store delivers to you first.</p>
      </div>
      <div class="card">
        <h3>Personalized</h3>
        <p>Location-aware results so you only see what&rsquo;s available nearby.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; }
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
}
.brand { font-size: 1.25rem; font-weight: 600; }
.links { display: flex; gap: 1rem; align-items: center; }
.links .cta {
  background: #2563eb;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}
.hero {
  text-align: center;
  padding: 4rem 1.5rem 2rem;
}
.hero h1 { font-size: 2.25rem; max-width: 720px; margin: 0 auto 1rem; }
.sub { color: var(--color-text); opacity: 0.8; margin-bottom: 2rem; }
.primary {
  background: #2563eb;
  color: #fff;
  border: 0;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
}
.error { color: #dc2626; margin-top: 1rem; }
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 2rem;
}
.card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.25rem;
  background: var(--color-background-soft);
}
.card h3 { margin-bottom: 0.5rem; }
</style>
