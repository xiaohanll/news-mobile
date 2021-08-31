/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store/'

// 创建一个实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 如果用户已登录，则统一给接口设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

//  导出
export default request
