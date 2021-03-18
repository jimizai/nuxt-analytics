import { VueGtag } from 'vue-gtag'

interface PushBAIDU {
  init(): void
  pv(pageUrl: string): void
  event(category: string, action: string, label: string, value: number): void
}

export interface ExtendInterface {
  $gtag: VueGtag
  $pushBAIDU: PushBAIDU
}
