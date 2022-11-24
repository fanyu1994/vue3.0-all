<script setup lang="ts">
import { effect, onBeforeUnmount, ref } from 'vue'
// import { getIP } from '../../api/index'

const emits = defineEmits(['change', 'delete'])

let time = ref<any>(null)
let interval = setInterval(() => {
  time.value = new Date().toLocaleTimeString()
  emits('change', time)
}, 1000)
onBeforeUnmount(() => {
  clearInterval(interval)
})
let ip = ref<string>('')
effect(() => {
  getIP().then((res: any) => {
    console.log(typeof res);
    
    ip.value = JSON.parse(res).data
  })
})

function getIP() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText)
      }
    }
    xhr.open('GET', 'http://127.0.0.1:3000/utils/get_ip')
    xhr.send()
  })
}
defineExpose({ time })
</script>
<template>
  <div flex flex-start id="foot">
    <div mr-2>IP:{{ ip }}</div>
    <div class="time">time:{{ time }}</div>
  </div>
</template>
<style scoped lang="less">
#foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: #ccc;
}
</style>
