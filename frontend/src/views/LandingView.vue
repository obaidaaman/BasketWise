<script setup>
import { useRouter } from 'vue-router'
import { Sparkles, Leaf, Map, Clock, ShieldCheck, ArrowRight } from 'lucide-vue-next'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-background font-sans text-textMain selection:bg-primary-light selection:text-white flex flex-col">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-grow">
      
      <!-- Hero Section -->
      <section class="relative bg-primary pt-24 pb-32 overflow-hidden text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          <div class="w-full md:w-1/2 space-y-6">
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              The <span class="text-accent">Smartness</span><br/>
              of quick grocery.
            </h1>
            <p class="text-lg text-primary-light text-white/80 max-w-lg font-light leading-relaxed">
              Crafted with AI, powered by real-time data — discover the quickest and cheapest way to get your daily essentials from platforms like Blinkit, Zepto, and Instamart.
            </p>
            <div class="pt-6">
              <button @click="router.push('/signup')" class="px-8 py-3.5 bg-accent text-primary font-bold rounded-md hover:bg-amber-400 transition-colors shadow-lg shadow-accent/20 flex items-center gap-2 text-lg">
                Start Shopping <ArrowRight class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="w-full md:w-1/2 relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"></div>
            <!-- Illustrative graphic -->
            <div class="relative w-full aspect-[4/3] bg-primary-light/30 rounded-3xl border border-white/10 p-6 flex flex-col shadow-2xl overflow-hidden backdrop-blur-sm">
              <div class="flex gap-2 items-center mb-4">
                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                <div class="w-3 h-3 rounded-full bg-green-400"></div>
                <span class="ml-2 text-xs font-mono text-white/50">basketwise-ai</span>
              </div>
              <div class="space-y-4 font-mono text-sm">
                <div class="text-white/70">
                  <span class="text-accent">user:</span> "Find Tata Tea Gold 500g"
                </div>
                <div class="text-white">
                  <span class="text-green-400">agent:</span> Scanning quick commerce...
                </div>
                <div class="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center mt-2 animate-pulse">
                  <div>
                    <div class="font-sans font-medium text-white">Tata Tea Gold</div>
                    <div class="text-xs text-white/50">Blinkit • 10 mins</div>
                  </div>
                  <div class="font-serif text-accent text-xl">₹280</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section (Like Verdelle "Visualize your ideas") -->
      <section id="how-it-works" class="py-24 bg-background">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-16">
            <h2 class="text-sm text-accent font-semibold tracking-widest uppercase mb-3">How it works</h2>
            <p class="text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Simplify your shopping
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Feature 1 -->
            <div class="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-green-50 text-primary mb-6">
                <Leaf class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 font-serif">100% Real-Time</h3>
              <p class="text-gray-500 text-sm leading-relaxed">Made with live data, fetching inventory and prices directly from platforms.</p>
            </div>
            
            <!-- Feature 2 -->
            <div class="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-amber-50 text-accent mb-6">
                <Map class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 font-serif">Geo-Optimized</h3>
              <p class="text-gray-500 text-sm leading-relaxed">Location-aware tracking ensures you only see products deliverable to your door.</p>
            </div>

            <!-- Feature 3 -->
            <div class="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6">
                <Sparkles class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 font-serif">AI Powered</h3>
              <p class="text-gray-500 text-sm leading-relaxed">Carefully crafted LangGraph agents orchestrate complex searches in seconds.</p>
            </div>
            
            <!-- Feature 4 -->
            <div class="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-purple-50 text-purple-600 mb-6">
                <ShieldCheck class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 font-serif">No Hidden Fees</h3>
              <p class="text-gray-500 text-sm leading-relaxed">Free from upcharges—just clean, accurate data from your favorite apps.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Comparison Section -->
      <section class="py-24 bg-white border-y border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center gap-16">
            <div class="w-full md:w-1/2">
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-50 p-6 rounded-[24px] text-center border border-gray-100">
                  <div class="text-3xl font-serif text-primary font-bold mb-1">Zepto</div>
                  <div class="text-sm text-gray-500">Supported</div>
                </div>
                <div class="bg-gray-50 p-6 rounded-[24px] text-center border border-gray-100 translate-y-8">
                  <div class="text-3xl font-serif text-orange-500 font-bold mb-1">Blinkit</div>
                  <div class="text-sm text-gray-500">Supported</div>
                </div>
                <div class="bg-gray-50 p-6 rounded-[24px] text-center border border-gray-100 -translate-y-4">
                  <div class="text-3xl font-serif text-pink-600 font-bold mb-1">Instamart</div>
                  <div class="text-sm text-gray-500">Coming Soon</div>
                </div>
                <div class="bg-primary p-6 rounded-[24px] text-center shadow-lg translate-y-4 flex flex-col justify-center items-center">
                  <div class="text-3xl font-serif text-accent font-bold mb-1">All in 1</div>
                  <div class="text-sm text-white/70">Place</div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-sm text-accent font-semibold tracking-widest uppercase mb-3">About us</h2>
              <p class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Stop jumping between apps to check prices.
              </p>
              <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're clearing your list for the week, or grabbing a quick snack, you can trust that BasketWise finds the most cost-effective and fastest options instantly.
              </p>
              <button @click="router.push('/signup')" class="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-light transition-colors shadow-sm">
                Try BasketWise Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-primary text-white/70 pt-16 pb-8 border-t border-primary-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary">
            <span class="font-serif font-bold text-lg">BW</span>
          </div>
          <span class="text-xl font-bold font-serif tracking-tight text-white">BasketWise</span>
        </div>
        <p class="text-sm">
          &copy; 2026 BasketWise AI. The smart quick-commerce engine.
        </p>
      </div>
    </footer>
  </div>
</template>

