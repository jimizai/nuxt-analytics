import type Vue from 'vue'
import { ExtendInterface } from './extend'
import './vuex'

interface AnalyticsOptions {
  baidu: string | string[];
  google: string;
  disabled: boolean;
  isDebug: boolean;
}


declare module '@nuxt/vue-app' {
  interface Context extends ExtendInterface{
    //
  }
  interface NuxtAppOptions extends ExtendInterface {
    //
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context extends ExtendInterface {
    //
  }

  interface NuxtAppOptions extends ExtendInterface {
    //
  }

  interface NuxtConfig {
    analytics?: AnalyticsOptions
  }
}

declare module 'vue/types/vue' {
  interface Vue extends ExtendInterface{
    //
  }
}
