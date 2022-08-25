<script setup lang="ts">
import * as kokomi from 'kokomi.js'
import { onMounted, nextTick, ref } from 'vue'
import {sleep} from '@/utils/index'
class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this)
    const box = new kokomi.Box(this)
    box.addExisting()
    this.update((time: number) => {
      box.spin(time)
    })
  }
}
onMounted(async () => {
  await sleep(500)
  const sketch = new Sketch()
  sketch.create()
})
</script>

<template>
  <div id="sketch" class="bg-black overflow-hidden"></div>
</template>

<style lang="less" scoped>
 #sketch {
    width: 100%;
    height: 100%;
  }
</style>
