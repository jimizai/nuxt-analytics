import { Track } from './track'

declare module 'vuex' {
  interface Store<S> {
    $track: Track,
  }
}
