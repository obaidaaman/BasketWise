<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please enter email and password.'
    return
  }
  auth.login(email.value)
  router.push('/')
}
</script>

<template>
  <div class="auth-page">
    <form class="card" @submit.prevent="handleLogin">
      <h1>Welcome back</h1>
      <p class="hint">Log in to compare prices near you.</p>

      <label>
        Email
        <input v-model="email" type="email" placeholder="you@example.com" required />
      </label>
      <label>
        Password
        <input v-model="password" type="password" placeholder="••••••••" required />
      </label>

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit" class="primary">Login</button>

      <p class="footer">
        New here? <RouterLink to="/signup">Create an account</RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.card {
  width: 100%;
  max-width: 380px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 2rem;
  background: var(--color-background-soft);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
h1 { margin-bottom: 0.25rem; }
.hint { color: var(--color-text); opacity: 0.7; margin-bottom: 0.5rem; }
label { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.9rem; }
input {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: inherit;
  font-size: 1rem;
}
.primary {
  background: #2563eb;
  color: #fff;
  border: 0;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}
.error { color: #dc2626; font-size: 0.9rem; }
.footer { text-align: center; font-size: 0.9rem; margin-top: 0.5rem; }
</style>
