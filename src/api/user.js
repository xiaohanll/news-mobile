// import store from '@/store/'
import request from '@/utils/request'

// 登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data // 请求体
  })
}

// 验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
    // 使用${}拼接时要用` `包裹
  })
}

// 获取登录用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    //   // Content-Type:
    // }
    // 使用${}拼接时要用` `包裹
  })
}

// 获取首页频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
