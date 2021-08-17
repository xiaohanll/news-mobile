import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'

Vue.config.productionTip = false

// 创建vue根实例，将router、store配置到根实例
// 把App根组件渲染到app节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
