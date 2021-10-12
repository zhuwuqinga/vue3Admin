import { createStore, createLogger } from 'vuex'
import app from './modules/app'
import tagsView from './modules/tagsView'
import user from './modules/user'

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
export const store = createStore({
  plugins,
  modules: {
    app,
    tagsView,
    user
  }
})

export function useStore() {
  return store
}