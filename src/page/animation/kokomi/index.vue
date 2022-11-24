
<script lang="ts" setup>
import * as kokomi from 'kokomi.js'
import { onMounted } from 'vue';

onMounted(()=>{
  init()
})
function init () {

}
</script>

<template>
  <div id="kokomi" class="bg-black overflow-hidden">
    <iframe height="100%" width="100%" src="/极光.html" />
  </div>
</template>



<style lang="less" scoped>
#kokomi {
  width: 100%;
  height: 100%;
}
</style>