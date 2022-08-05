/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface routeInfo {
  path: string
  name: string
  component: () => any
  meta: {
    active: boolean
    title?: string
    icon?: string
    keepAlive?: boolean
    auth?: boolean
    keepAlive?: boolean
    keepAliveTime?: number
    [key: string]: any
  },
  children: routeInfo[],
}
