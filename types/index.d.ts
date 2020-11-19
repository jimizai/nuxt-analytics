import type Vue from 'vue'
import { Track, AnalyticsOptions } from './track'
import './vuex'

declare module '@nuxt/vue-app' {
  interface Context {
    $track: Track
  }
  interface NuxtAppOptions {
    $track: Track
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $track: Track
  }

  interface NuxtAppOptions {
    $track: Track
  }

  interface NuxtConfig {
    analytics?: AnalyticsOptions
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $track: Track
  }
}
