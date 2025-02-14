import { defineStore, acceptHMRUpdate } from 'pinia'

import { Button } from '@/data/button'

export const useCalculateStore = defineStore('calculate', {
  state: () => ({
    screen: [] as Button[],
  }),

  getters: {
    GetScreen: (state) => state.screen,
  },

  actions: {
    Add(action: Button) {
      this.screen.push(action)
    },
    Remove() {
      this.screen.pop()
    },
    Clean() {
      this.screen = []
    },
    Calculate() {},
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCalculateStore, import.meta.hot))
}
