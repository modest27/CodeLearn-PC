import axios from 'axios'
import { getToken, hasToken, removeToken } from './storage'
import { message } from 'antd'
import history from './history'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000
})

// 配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (hasToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // token过期
      // 1. 删除token
      removeToken()
      // 2. 给出提示
      message.warning('登录信息过期了', 1)
      // 3. 跳转到登录页
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
