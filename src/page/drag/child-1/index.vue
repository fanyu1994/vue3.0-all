<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue'

const props = defineProps(['childProps'])
onBeforeMount(() => {
  console.log(props, 'onBeforeMount')
})
onMounted(() => {
  init()
})
const emitf = defineEmits({
  changeParent: null,
  submit2: ({ email, password }) => {
    if (typeof password === 'number') return true
    else{
      alert('类型错误')
      return false
    }
  },
})
function btnClickcheck(email: any, password: any) {
  emitf('submit2', { email, password })
}
function btnClick() {
  emitf('changeParent')
}

let imgs = ref<Array<Record<string, string>>>([])
function init() {
  console.log(11)

  request(
    'post',
    'http://127.0.0.1:3000/utils/get_image',
    JSON.stringify({
      url: 'https://www.keaitupian.cn/',
    })
  ).then((res: any) => {
    console.log(JSON.parse(res), 9999)
    const sres = JSON.parse(res)
    Object.keys(sres).forEach((e) => {
      imgs.value.push({
        label: e,
        value: sres[e],
      })
    })
  })
}

function request(method: string, url: string, data: any): any {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log(xhr.responseText);
        resolve(xhr.responseText)
      }
    }
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data)
  })
}
</script>
<template>
  <h2>{{ props.childProps.name }}</h2>
  <button @click="btnClick">changeParent</button>
  <button @click="btnClickcheck('845', true)">passwod</button>
  <div class="imgs">
    <div v-for="img in imgs" :key="img.value">
      <img :src="img.value" alt="" style="width: 200px" />
    </div>
  </div>
</template>
