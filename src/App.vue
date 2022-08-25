<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Head from './components/layout/head.vue'
import PageHeader from './components/layout/page-header.vue'
import Sidebar from './components/layout/sidebar.vue'
import Foot from './components/layout/foot.vue'
</script>

<template>
  <Head />
  <div id="main">
    <Sidebar />
    <div id="container">
      <page-header />
      <div id="container-main">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <suspense>
              <template #default>
                <component :is="Component" :key="route.path"></component>
              </template>
              <template #fallback> Loding... </template>
            </suspense>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
  <Foot />
</template>

<style scoped lang="less">
#main {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  #container {
    padding: 94px 10px 10px calc(10vw + 10px);
    min-height: 100vh;
    box-sizing: border-box;
    #container-main {
      box-sizing: border-box;
      height: calc(100vh - 134px - 2.5rem);
      padding: 10px;
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
