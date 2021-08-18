import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant组件
import Vant from 'vant'
// 加载Vant组件库样式
import 'vant/lib/index.css'
// 自动设置rem基准值(html标签字体的大小)
import 'amfe-flexible'
// 加载全局样式
import './styles/index.less'

// 全局注册Vant中的组件
Vue.use(Vant)

Vue.config.productionTip = false

// 创建vue根实例，将router、store配置到根实例
// 利用render函数把App.vue根组件渲染到index.html中的id="app"的div节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
