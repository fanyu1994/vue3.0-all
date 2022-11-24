import axios from 'axios'

// const messageOnce = new MessageOnce()
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_ENV_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    const cf = config
    cf.headers = {
      'Content-Type': 'application/json',
      VERSION: 'v1',
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    let message = null
    if (response.status === 200) {
      if (res.code === 0 || res.code === 200) {
        message = Promise.resolve(res)
      } else {
        // 抛出错误提示 message(res.msg)
        message = Promise.resolve(res)
      }
    }
    return message
  },
  (error) => {
    console.log(error)
    // if (
    //   error.code === 'ECONNABORTED' &&
    //   error.message.indexOf('timeout') !== -1
    // ) {
    //   // messageOnce.error('请求超时')
    // } else if (error.response.status === 401) {
    //   // messageOnce.error('token失效')
    //   window.localStorage.removeItem('access_token') // 清除数据
    //   // router.push('/login')
    // } else if (error.response.status === 500 || error.response.status === 503) {
    //   // messageOnce.error('服务器内部错误')
    // } else {
    //   // messageOnce.error(error.response.data.msg)
    // }
    return Promise.reject(error)
  }
)

const fetch = (method: string, url: string, data?: any): Promise<any> => {
  let thisReturnData = Promise.resolve(null)
  const rep = import.meta.env.MODE === 'development' ? '/api' : ''
  if (method === 'post') {
    thisReturnData = service.post(`${rep}${url}`, { ...data })
  } else if (method === 'get') {
    thisReturnData = service.get(`${rep}${url}`, {
      params: data,
    })
  } else if (method === 'put') {
    thisReturnData = service.put(`${rep}${url}`, { ...data })
  } else if (method === 'delete') {
    thisReturnData = service.delete(`${rep}${url}`, {
      params: data,
    })
  }

  return thisReturnData
}
export default fetch
