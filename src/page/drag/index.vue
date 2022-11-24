<script setup lang="ts">
import { reactive } from 'vue';
import child1 from './child-1/index.vue'
const ps = reactive({ name: 'fy', age: 17})
function cp() {
  ps.name = 'kkk'
  console.log(ps);
  
}

function submitd(a: any){
  console.log(a)
}
</script>
<template>
  <div id="drag">
    {{ps}}
    <div class="container-left" w-50 border>
      <child-1 :childProps="ps" @changeParent="cp" @submit2="submitd"></child-1>
    </div>
    <div class="container-right"></div>
  </div>
</template>
