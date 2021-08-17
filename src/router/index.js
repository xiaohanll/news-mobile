import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        // 默认子路由
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

// 以前导入组件
// import Login from '@/views/login'
// 路由懒加载
// const Login = () => import('@/views/login')
// const routes = [
//   {
//     path:'/login',
//     name:'login',
//     component: Login
//   }
// ]
