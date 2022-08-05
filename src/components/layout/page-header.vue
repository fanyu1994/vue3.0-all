<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const Route = useRoute()
const Router = useRouter()
const routerList = ref<any[]>([window.history.state.current])

watch(
  () => {
    return window.history.length
  },
  (newVal: any) => {
    console.log(newVal)

    if (newVal > 1) {
      routerList.value.push(window.history.state.current)
    }
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
