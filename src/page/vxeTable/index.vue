<script setup lang="ts">
function getMock() {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log(xhr.responseText)
    }
  }
  xhr.open(
    'GET',
    'http://127.0.0.1:4523/m1/1509648-0-default/mock/get_token?apifoxResponseId=88311344',
    true
  )
  xhr.send()
}

type method =
  | 'GET'
  | 'POST'
  | 'UPDATA'
  | 'DELETE'
  | 'get'
  | 'post'
  | 'updata'
  | 'delete'

function request(method: method, url: string, data: any) {
  method = method.toUpperCase() as method
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 || xhr.status === 304) {
          resolve(xhr.responseText)
        }
      }
    }
    xhr.open(method, url, true)
    xhr.send(data)
  })
}
</script>
<template>
  <div>vxe-table</div>
  <button @click="getMock">Mock</button>
</template>
