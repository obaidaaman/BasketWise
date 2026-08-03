<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-textMain selection:bg-primary selection:text-white flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
            <!-- Minimalist Logo SVG -->
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span class="text-xl font-bold tracking-tight text-primary">QuickCommerce</span>
          </div>
          <nav class="hidden md:flex gap-8">
            <a href="#features" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">How it Works</a>
            <a href="#testimonials" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Testimonials</a>
          </nav>
          <div class="flex items-center gap-4">
            <button @click="router.push('/login')" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors hidden sm:block">
              Log in
            </button>
            <button @click="router.push('/signup')" class="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-sm">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      
      <!-- Hero Section -->
      <section class="relative bg-background pt-20 pb-32 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-6">
            The AI-Powered Commerce Engine
          </h1>
          <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            QuickCommerce uses advanced LangGraph agents to curate, negotiate, and process orders on your behalf. Experience the most efficient way to source products globally.
          </p>
          <div class="flex justify-center gap-4">
            <button @click="router.push('/signup')" class="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors shadow-sm text-lg">
              Start Building Free
            </button>
            <button class="px-8 py-3 bg-white text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm text-lg">
              Read Documentation
            </button>
          </div>
        </div>
        <!-- Decorative subtle grid background -->
        <div class="absolute inset-0 z-0 opacity-[0.03]" style="background-image: radial-gradient(#1a2942 1px, transparent 1px); background-size: 32px 32px;"></div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Enterprise Features</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to handle inventory
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <!-- Feature 1 -->
            <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-background/50">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Intelligent Sourcing</h3>
              <p class="text-gray-600">Our LangGraph agent scans global suppliers in real-time, cross-referencing prices, shipping times, and reliability scores instantly.</p>
            </div>
            
            <!-- Feature 2 -->
            <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-background/50">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Automated Negotiation</h3>
              <p class="text-gray-600">The agent autonomously negotiates bulk discounts with vendors using historic pricing data, securing the best possible margins for your business.</p>
            </div>

            <!-- Feature 3 -->
            <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-background/50">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Contextual Memory</h3>
              <p class="text-gray-600">Powered by LangGraph checkpointers, the AI remembers your past preferences, constraints, and operational requirements across sessions.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it Works Section -->
      <section id="how-it-works" class="py-24 bg-background border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:flex lg:items-center lg:justify-between">
            <div class="lg:w-1/2 pr-8">
              <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Connect your data in minutes
              </h2>
              <p class="text-lg text-gray-600 mb-8">
                QuickCommerce integrates directly with your existing ERP or storefront. Once authenticated, our agent can immediately begin optimizing your supply chain.
              </p>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-xs font-bold">1</div>
                  </div>
                  <p class="ml-3 text-base text-gray-700">Create a secure account</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-xs font-bold">2</div>
                  </div>
                  <p class="ml-3 text-base text-gray-700">Chat with the agent to define your constraints</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-xs font-bold">3</div>
                  </div>
                  <p class="ml-3 text-base text-gray-700">Approve automated purchase orders</p>
                </li>
              </ul>
            </div>
            <div class="mt-10 lg:mt-0 lg:w-1/2">
              <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <!-- Mock UI snippet -->
                <div class="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
                  <div class="flex gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div class="text-xs text-gray-400 font-mono">POST /api/chat</div>
                </div>
                <div class="space-y-4 font-mono text-sm">
                  <div class="text-gray-500">
                    <span class="text-blue-600">user:</span> "Find me 500 units of standard mechanical keyboards under $25."
                  </div>
                  <div class="text-gray-800">
                    <span class="text-green-600">agent:</span> "Scanning suppliers... Found 3 matches. Negotiated with 'TechSupplies Inc' down to $22.50/unit if we order by Friday. Shall I draft the PO?"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-primary py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-extrabold text-white mb-4">Ready to upgrade your infrastructure?</h2>
          <p class="text-xl text-primary-100 text-gray-300 mb-8">Join the platform that is redefining digital commerce.</p>
          <button @click="router.push('/signup')" class="px-8 py-3 bg-white text-primary font-bold rounded-md hover:bg-gray-100 transition-colors shadow-sm text-lg">
            Create Free Account
          </button>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 pt-12 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Product</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Resources</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Legal</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <!-- Branding again -->
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="text-lg font-bold text-gray-900">QuickCommerce</span>
            </div>
            <p class="text-sm text-gray-500">
              The intelligent infrastructure for modern supply chains and retail.
            </p>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-8 flex justify-between items-center">
          <p class="text-sm text-gray-400">
            &copy; 2026 QuickCommerce Inc. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <!-- Social icons could go here -->
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Twitter</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">GitHub</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
