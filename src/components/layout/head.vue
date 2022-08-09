<template>
  <div
    id="head"
    :class="[clsName ? 'head-a' : 'head-b']"
    @mouseover="clsName = true"
    @mouseout="clsName = false"
  ></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clsName = ref(true)
</script>

<style lang="less" scoped>
#head {
  width: 100%;
  height: 84px;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
}
.head-a {
  background-color: rgba(0, 0, 0, .008);
}
.head-b {
  background: url('@/assets/长长的图.jpeg') repeat-x 0 center/auto;
  background-size: 100% 100%;
  animation: smooth 20s linear infinite;
}
</style>
