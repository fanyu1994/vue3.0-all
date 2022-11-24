<script setup lang="ts">
import { routerList } from '../../route/index'
import { useRouter } from 'vue-router'
import { useRouterStore } from '../../store/index'
import { onMounted, ref, watch } from 'vue'

const Router = useRouter()
const routerStore = useRouterStore()
function go(item: routeInfo) {
  Router.push(item.path)
  routerStore.add(item)
  routerStore.active(item)
}
function activeRouter(list: routeInfo[], path: string) {
  list.forEach((e) => {
    e.meta.active = false
    if (e.children?.length) activeRouter(e.children, path)
    e.meta.active = path === e.path
  })
}

const cur = ref<string>('')

watch(
  () => routerStore.routerHistoryStack,
  (newVal: any) => {
    localStorage.setItem('routerHistoryStack', JSON.stringify(newVal))
    activeRouter(routerList, newVal.find((e: any) => e.meta.active)?.path)
  },
  { deep: true }
)

onMounted(() => {
  if (localStorage.getItem('routerHistoryStack')) {
    routerStore.routerHistoryStack = JSON.parse(
      localStorage.getItem('routerHistoryStack')!
    )
  }
  go(routerStore.routerHistoryStack.find((e) => e.meta.active)!)
})
</script>

<template>
  <div id="sidebar">
    <div id="head">
      <input
        type="search"
        my-5
        ml-2
        name="search-sidebar"
        id="search-sidebar"
      />
    </div>
    <div
      :class="[
        routerStore.routerHistoryStack.find((i) => i.path === item.path)?.meta
          .active
          ? 'menu-active'
          : '',
        'menu-item',
      ]"
      v-for="item in routerList"
      @click.stop="go(item)"
      @mouseover="cur = item.path"
    >
      <div relative>
        <span v-if="!item.meta.input">{{ item.name }}</span>
        <input h-8 pl-3 rd v-else v-model="item.name" />
        <button
          absolute
          right-0
          top-2
          v-show="cur === item.path"
          @click="item.meta.input = !item.meta.input"
          @mouseover="cur = item.path"
          class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"
        />
        <div
          class="menu-child"
          v-if="
            item.children?.length &&
            (item.children?.some((i) => i.meta.active) || item.meta.active)
          "
        >
          <div
            :class="[
              routerStore.routerHistoryStack.find((i) => i.path === its.path)
                ?.meta.active
                ? 'menu-child-active'
                : '',
              'menu-child-item',
            ]"
            v-for="its in item.children"
            @click.stop="go(its)"
            @mouseenter="cur = its.path"
          >
            <div relative>
              <span @mouseenter="cur = its.path" v-if="!its.meta.input">{{
                its.name
              }}</span>
              <input
                @mouseenter="cur = its.path"
                h-8
                pl-3
                rd
                v-else
                v-model="its.name"
              />
              <button
                absolute
                right-0
                top-2
                v-show="cur === its.path"
                @click="its.meta.input = !its.meta.input"
                @mouseenter="cur = its.path"
                class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#sidebar {
  position: fixed;
  top: 84px;
  left: 0;
  width: 10vw;
  height: calc(100vh - 84px);
  // padding: 10px;
  border-right: 1px rgba(0, 0, 0, 0.09) solid;
  box-sizing: border-box;
  user-select: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 1px;
    background: rgb(136, 124, 124);
  }
  .menu-item {
    cursor: pointer;
    // padding: 8px;
    margin: 1px;
    // background: #c6ced4;
    span {
      display: inline-block;
      padding: 8px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-size: 20px;
      border-bottom: rgb(233, 233, 233) 1px solid;
    }
    .menu-child {
      color: #000 !important;
      padding-left: 3px;
      box-sizing: border-box;
      .menu-child-item {
        cursor: pointer;
        margin: 1px;
        // background: #c6ced4;
        span {
          display: inline-block;
          padding: 8px;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          font-size: 16px;
          border-bottom: rgb(233, 233, 233) 1px solid;
          color: #000000;
          &:hover {
            color: #a0b68c;
          }
        }
      }
      .menu-child-active {
        color: #95af7c;
        // background: rgb(100, 197, 226);
        span {
          display: inline-block;
          padding: 8px;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          font-size: 16px;
          border-bottom: rgb(233, 233, 233) 1px solid;
          color: #95af7c;
        }
      }
    }
  }
  .menu-active {
    span {
      color: #95af7c;
      // background: rgb(100, 197, 226);
    }
  }
}
</style>
