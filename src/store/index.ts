import { defineStore } from 'pinia'

export const useRouterStore = defineStore('routerStore', {
  state: () => {
    return {
      routerHistoryStack: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/Home.vue'),
          meta: {
            active: true,
            keepAlive: true,
          },
        },
      ] as routeInfo[],
    }
  },
  actions: {
    add(payload: routeInfo) {
      const index = this.routerHistoryStack.findIndex(
        (item) => item.path === payload.path
      )
      if (index === -1) {
        this.routerHistoryStack.push(payload)
      } else {
        this.active(payload)
      }
    },
    remove(payload: routeInfo) {
      // this.routerHistoryStack.splice(payload, 1)
    },
    clear() {
      this.routerHistoryStack = []
    },
    active(payload: routeInfo) {
      if (this.routerHistoryStack.find((item) => item.meta.active)) {
        this.routerHistoryStack.find((item) => item.meta.active)!.meta.active =
          false
      }
      const item = this.routerHistoryStack.find(
        (item) => item.path === payload.path
      )!
      item.meta.active = true
    },
  },
})
