<template>
  <div>
    <div class="login-container">
      <!-- 登录标题 -->
      <van-nav-bar
        title="登录"
        left-arrow
        @click-left="$router.back()"
        class="app-nav-bar"
      />
      <!-- 登录表单 -->
      <van-form
        @submit="onLogin"
        @failed="onFailed"
        :show-error="false"
        :show-error-message="false"
        ref="login-form"
        validate-first
      >
        <van-field
          v-model="user.mobile"
          icon-prefix = "news"
          left-icon="shouji"
          placeholder="请输入手机号码"
          name="mobile"
          :rules="formRules.mobile"
        />
        <!-- 通过设置clearable在输入过程中展示清除图标。 -->
        <van-field
          v-model="user.code"
          clearable
          center
          icon-prefix = "news"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          name="code"
          :rules="formRules.code"
        >
        <template #button>
          <!-- @finish事件：倒计时结束后显示验证码盒子 -->
          <van-count-down
          v-if="isCountDownShow"
          :time="60000"
          format=" ss s"
          @finish="isCountDownShow = false"
          />
          <van-button
          size="mini"
          class="send-btn"
          round
          v-else
          :loading="isSendSmsLoading"
          @click="onSendSms"
          >发送验证码</van-button>
        </template>
        </van-field>
        <!-- 登录的大按钮 -->
        <div class="login-btn-wrap">
          <van-button class="login-btn"
          type="primary"
          block
          @click="onLogin"
          >登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号码' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码' }],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }]
      },
      isCountDownShow: false, // 控制倒计时和验证码盒子的显示状态
      isSendSmsLoading: false // 发送验证码按钮的loading状态
    }
  },
  methods: {
    // 登录
    async onLogin () {
      Toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁止背景点击，就是说登录中禁止点击
        duration: 0
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const res = await login(this.user)
        console.log(res)
        Toast.success('登录成功')
        // 将后端返回的token放大vuex的容器中
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
        Toast.fail('登录失败')
      }
      // 4.处理响应结果
    },
    // 提交失败
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      // 校验手机号码是否正确
      try {
        // 正确情况
        await this.$refs['login-form'].validate('mobile')
        // 点击完“发送验证码”按钮后，显示loading状态，以防网络有延迟时，用户误以为没点上导致多次点击
        this.isSendSmsLoading = true
        // 验证通过请求发送验证码
        await sendSms(this.user.mobile)
        // 等请求完发送验证码之后，显示倒计时
        this.isCountDownShow = true
        // finish事件：倒计时结束后显示验证码盒子
      } catch (error) {
        let message = ''
        if (error && error.response && error.response.stasus === 429) {
          message = '操作太频繁，请稍后重试'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，请稍后重试'
        }
        // try里面的所有错误都会传到catch，不同的错误需要不同的提示，所以此处需要判断
        // 手机号码校验错误
        this.$toast({
          message: message,
          position: 'top'
        })
      }
      // 无论验证码是否发送失败，最后都要关闭“发送验证码”按钮的loading状态
      this.isSendSmsLoading = false
    }
    // onSendSms () {
    //   // 验证手机号码的正确性,validate返回值是一个promise
    //   this.$refs['login-form'].validate('mobile').then(
    //     data => { console.log(data) }
    //   ).catch()
    //   // 验证通过=>请求发送验证码=>用户接收短信=>输入验证码=>请求登录
    //   // 请求发送验证码之后要显示倒计时，隐藏按钮
    //   // 倒计时结束之后显示按钮，隐藏倒计时
    // }
  }
}
</script>

<style scoped lang="less">
.login-container{
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 16px;
      }
    }
  }
}

</style>
