<template>
  <div class="container">
    <div class="right" style="border-left: 1px solid rgba(0, 0, 0, 0.2)"></div>
    <div class="left">
      <div
        style="
          width: 200px;
          display: flex;
          justify-content: space-around;
          flex-flow: column nowrap;
          border: 3px solid deeppink;
          margin: 20px;
          padding: 10px 20px;
        "
      >
        <h4>图片压缩</h4>
        <input type="file" id="file" @input="fileInput" />
      </div>
      <div
        style="
          width: 200px;
          display: flex;
          justify-content: space-around;
          flex-flow: column nowrap;
          border: 3px solid deeppink;
          margin: 20px;
          padding: 10px 20px;
        "
      >
        <h4>大文件上传</h4>
        <input type="file" id="big-file-Upload" @input="bigFileUpload" />
        <button @click="big_delete">delete</button>
        <button @click="big_updata">updata</button>
        <button @click="big_query">query</button>
        <button @click="big_queryAll">queryAll</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 大文件上传
 */

function bigFileUpload(e: any) {
  const file = e.target.files[0]
  // const base_chunk_size = 1048576
  // const base_chunk_size = 1048576
  const base_chunk_size = 1048576 / 8
  const arr_req: Promise<unknown>[] = []
  let cur = 0
  let sort_index = 0
  const reader = new FileReader()
  reader.onload = (e) => {
    console.log(e)
    const chunk = e.target?.result as ArrayBuffer
    const size = (e.target?.result as ArrayBuffer).byteLength
    while (true) {
      if (cur + base_chunk_size >= size || size < base_chunk_size) {
        const data = new FormData()
        const blob_data = new Blob([chunk.slice(cur)])
        data.append('file_chunk', blob_data)
        data.append('file_name', file.name)
        data.append('sort_index', sort_index.toString())
        request('/book/save_filesDB', 'POST', data, {}).then((res) => {
          console.log(res, '处理完了')
        })
        break
      } else {
        const data = new FormData()
        const blob_data = new Blob([chunk.slice(cur, cur + base_chunk_size)])
        data.append('file_chunk', blob_data)
        data.append('file_name', file.name)
        data.append('sort_index', sort_index.toString())
        request('/book/save_filesDB', 'POST', data, {}).then((res) => {
          console.log(res, '正在处理')
        })
        arr_req.push(request('/book/save_filesDB', 'POST', data, {}))
        cur += base_chunk_size
        sort_index += 1
      }
    }
  }
  reader.readAsArrayBuffer(file)
}

function big_delete() {
  request_post('/book/delete_filesDB', 'POST', { name: '287.jpg' }).then(
    (res: any) => {
      console.log(res, ' 123')
    }
  )
}
function big_updata() {}
function big_query() {
  requestBlob(
    '/book/select_filesDB?file_name=28.jpg',
    'GET',
    {},
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  ).then((res: any) => {
    console.log(res, ' sss')
    const blob = new Blob([res.response])
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '111.jpg'
    a.click()
    URL.revokeObjectURL(url)
  })
}
function big_queryAll() {
  request(
    '/book/selectAll_filesDB',
    'GET',
    { name: '28.jpg' },
    {
      'Content-Type': 'application/json',
    }
  ).then((res) => {
    console.log(res, ' sss')
  })
}

function request(
  url: string | URL,
  method: 'GET' | 'POST',
  data: any = null,
  headers: Record<string, any> | {} = {}
) {
  return new Promise((resolve, reject) => {
    const BASE_URL = 'http://127.0.0.1:3000/books'
    const xhr = new XMLHttpRequest()
    const Headers = {
      // 'Content-Type': 'application/json',
      ...headers,
    }
    function setHeader(
      headers: Record<string, string> | null,
      xhr: XMLHttpRequest
    ) {
      if (!headers) return
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.responseText)
        }
      }
    }

    xhr.open(method, BASE_URL + url)
    Headers && Object.keys(Headers).length ? setHeader(Headers, xhr) : undefined
    xhr.send(data)
  })
}
function request_post(
  url: string | URL,
  method: 'GET' | 'POST',
  data: any = null,
  headers: Record<string, any> | {} = {}
) {
  return new Promise((resolve, reject) => {
    const BASE_URL = 'http://127.0.0.1:3000/books'
    const xhr = new XMLHttpRequest()
    const Headers = {
      'Content-Type': 'application/json',
      ...headers,
    }
    function setHeader(
      headers: Record<string, string> | null,
      xhr: XMLHttpRequest
    ) {
      if (!headers) return
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.responseText)
        }
      }
    }

    xhr.open(method, BASE_URL + url)
    Headers && Object.keys(Headers).length ? setHeader(Headers, xhr) : undefined
    xhr.send(JSON.stringify(data))
  })
}

function requestBlob(
  url: string | URL,
  method: 'GET' | 'POST',
  data: any = null,
  headers: Record<string, any> | {} = {}
) {
  return new Promise((resolve, reject) => {
    const BASE_URL = 'http://127.0.0.1:3000/books'
    const xhr = new XMLHttpRequest()
    const Headers = {
      'Content-Type': 'application/json',
      ...headers,
    }
    function setHeader(
      headers: Record<string, string> | null,
      xhr: XMLHttpRequest
    ) {
      if (!headers) return
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr)
        }
      }
    }
    xhr.open(method, BASE_URL + url)
    xhr.responseType = 'blob'
    Headers && Object.keys(Headers).length ? setHeader(Headers, xhr) : undefined
    xhr.send(data)
  })
}

/**
 * 图片压缩
 */
function fileInput(e: any) {
  const file = e.target.files[0]
  asyncBeforeRead(file) // 图片压缩
}

const asyncBeforeRead = (file: File) =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      // 非图片文件
      console.log('请上传图片')
      reject()
    } else {
      // 文件压缩, imgCompress方法往下看
      imgCompress(file).then((f) => {
        resolve(f)
        const blob = new Blob([f])
        const href = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = href
        a.download = '123.jpg'
        a.click()
        URL.revokeObjectURL(href)
      })
    }
  })

async function imgCompress(file: File): Promise<File> {
  // 将文件转img对象
  const img: any = await fileToImg(file)
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    // 获取文件宽高比例
    const { width: originWidth, height: originHeight } = img
    // 自定义等比例缩放宽高属性，这里我用的是固定800宽度，高度是等比例缩放
    const scale = +(originWidth / originHeight).toFixed(2) // 比例取小数点后两位)
    const targetWidth = 358 // 固定宽
    const targetHeight = Math.round(358 / scale) // 等比例缩放高

    canvas.width = targetWidth
    canvas.height = targetHeight
    context?.clearRect(0, 0, targetWidth, targetHeight)
    // canvas重新绘制图片
    context?.drawImage(img, 0, 0, targetWidth, targetHeight)
    // canvas转二进制对象转文件对象，返回
    const type = 'image/png'
    canvas.toBlob(function (blob: any) {
      const f = new File([blob], file.name, {
        type,
        lastModified: file.lastModified,
      })
      resolve(f)
    }, type)
  })
}

// file转换成img对象
function fileToImg(file: File) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()
    reader.onload = function (e: any) {
      img.src = e.target.result
    }
    reader.onerror = function (e) {
      reject(e)
    }
    reader.readAsDataURL(file)
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function (e) {
      reject(e)
    }
  })
}
</script>
