import { createRouter, createWebHistory, RouterOptions } from 'vue-router'
import { getData } from 'api/index'
import { titleCase } from '@/utils/index'
import { useRouterStore } from '@/store/index'

// const routerStore = useRouterStore()
getData()
  .then((res) => {
    // console.log(res, '理论上这里是返回的路由信息')
  })
  .catch((err) => {
    // console.log(err, '理论上这里是返回的错误信息')
  })

let routerList: routeInfo[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../page/home/index.vue'),
    meta: {
      active: true,
      keepAlive: true,
    },
    children: [],
  },
]
let routes: routeInfo[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../page/home/index.vue'),
    meta: {
      active: true,
      keepAlive: true,
    },
    children: [],
  },
]
const modules = import.meta.glob('../page/**/*.vue')
Object.keys(modules).forEach((key) => {
  // 一级路由
  if (
    key.split('/').length === 4 &&
    key.includes('/index.vue') &&
    !key.includes('home')
  ) {
    const name = key.split('/')[2]
    const path = `/${name}`
    const component = modules[key]
    const meta = {
      active: false,
      keepAlive: true,
    }
    let item = routerList.find((item) => item.path === path)
    if (item) Object.assign(item, { component })
    else
      routerList.push({
        name,
        path,
        component,
        meta,
        children: [],
      })
    routes.push({
      name,
      path,
      component,
      meta,
      children: [],
    })
  }
  // 二级路由
  if (
    key.split('/').length === 5 &&
    key.includes('/index.vue') &&
    !key.includes('home')
  ) {
    const name = `${key.split('/')[2]}${titleCase(key.split('/')[3])}`
    const path = `/${key.split('/')[2]}/${key.split('/')[3]}`
    const component = modules[key]
    const meta = {
      active: false,
      keepAlive: true,
    }
    let item = routerList.find((item) => item.name === key.split('/')[2])
    if (!item) {
      item = {
        children: [],
        name: key.split('/')[2],
        path: `/${key.split('/')[2]}`,
        component: () => null,
        meta: {
          active: false,
          keepAlive: true,
        },
      }
      routerList.push(item)
    }

    item.children instanceof Array
      ? item.children.push({
          name,
          path,
          component,
          meta,
          children: [],
        })
      : (item.children = [{ name, path, component, meta, children: [] }])
    routes.push({
      name,
      path,
      component,
      meta,
      children: [],
    })
  }
})

const Router = createRouter({
  history: createWebHistory(),
  routes,
})
export { routerList }
export default Router
