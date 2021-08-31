import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

// vuex是程序运行期间存储的状态管理，不是持久化的，为了持久化就需要把token放到本地存储
Vue.use(Vuex)

const USER_KEY = 'news-user'
const store = new Vuex.Store({
  state: {
    // 存储的是当前用户的登录状态，需要getItem()获取，(token等数据) JSON.parse(window.localStorage.getItem('user'))
    // 调用storage.js中的getItem方法
    user: getItem(USER_KEY)
  },
  mutations: {
    // 当用户登录成功时改变用户的状态
    setUser (state, data) {
      state.user = data
      // 为了防止页面刷新导致的数据丢失，需要把数据放到本地存储==>>持久化存储
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
      // 调用storage.js中的setItem方法
      // state.user是一个对象，要转成字符串才能保存到本地，所以要使用JSON.stringify()
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
