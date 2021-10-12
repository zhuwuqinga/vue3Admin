/*
 * @Author: fanheng
 * @Date: 2021-07-26 11:58:29
 * @Last Modified by: zhuwuqing
 * @Last Modified time: 2021-09-26 17:39:13
 */
// import axios, { AxiosRequestConfig, Method } from "axios";
/**
 * 请求拦截器
 */
import axios, { AxiosRequestConfig, Method } from 'axios'
import Cookies from 'js-cookie'

//定义接口
interface pendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: Function
}

//取消重复请求
const pending: Array<pendingType> = []
const CancelToken = axios.CancelToken
// 创建axios实例
const instance = axios.create({
  timeout: 10000,
  responseType: 'json',
})

//移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: pendingType = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

//添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    // request.headers.token = Cookies.get('token')
    request.headers['X-Access-Token'] =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzI5MDI2NjAsInVzZXJuYW1lIjoiYWRtaW4ifQ.UB-bCu5r10VnijObtEENgnnNoOY8KNoQTpUrilZ69g4'
    removePending(request)
    request.cancelToken = new CancelToken((c) => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c,
      })
    })
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

//添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    removePending(response.config)
    const errorCode = response?.data?.errorCode
    switch (errorCode) {
      case '401':
        // 根据errorCode，对业务做异常处理(和后端约定)
        break
      default:
        break
    }

    return response
  },
  (error) => {
    const response = error.response
    //根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 401:
        // token失效
        break
      case 403:
        // 没有权限
        break
      case 500:
        // 服务端错误
        break
      case 503:
        // 服务端错误
        break
      default:
        break
    }
    // 超时重新请求
    const config = error.config
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [0, 1000]

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message })
      }
      // 增加重试计数
      config.__retryCount++
      // 创造新的Promise来处理指数后退
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, RETRY_DELAY || 1)
      })
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config)
      })
    }
    // eslint-disable-next-line
    return Promise.reject(response || { message: error.message })
  }
)
export default instance
