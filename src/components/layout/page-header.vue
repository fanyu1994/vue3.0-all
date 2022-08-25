<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const Route = useRoute()
const Router = useRouter()
const routerList = reactive<any[]>([window.history.state.current])

watch(
  () => {
    return window.history.length
  },
  (newVal: any) => {
    console.log(newVal)

    if (newVal > 1) {
      routerList.push(window.history.state.current)
    }
  }
)
watch(
  () => {
    return Route
  },
  () => {
    console.log(Route.matched[0], routerList,'Route routerList')
  },
  {
    deep: true,
  }
)
function go(item: any) {
  Router.push(item.path)
}
</script>
<template>
  <div id="page-header" h-10 b-pink>
    <div v-for="item in routerList" @click="go(item)">
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>
