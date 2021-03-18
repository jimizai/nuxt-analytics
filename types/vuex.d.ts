import { ExtendInterface } from './extend'

declare module 'vuex' {
  interface Store<S> extends ExtendInterface {
    //
  }
}
