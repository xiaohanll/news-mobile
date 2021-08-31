<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <!-- 个人信息 -->
      <van-cell
        center
        :border="false"
        class="base-info"
      >
        <!-- fit指图片填充模式 -->
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="currentUser.photo"
        />
        <div slot="title" class="name"> {{ currentUser.name }} </div>
        <van-button size="small" class="update-btn" round>编辑资料</van-button>
      </van-cell>
      <!-- Grid宫格 -->
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-box">
            <div class="num"> {{ currentUser.art_count }} </div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-box">
            <div class="num"> {{ currentUser.follow_count }} </div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-box">
            <div class="num"> {{ currentUser.fans_count }} </div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-box">
            <div class="num"> {{ currentUser.like_count }} </div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else>
      <div class="mobile" @click="$router.push('/login')">
        <img src="./mobile.png" alt="">
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <!-- 收藏与历史 -->
    <van-grid class="nav-grid" :column-num="2">
      <van-grid-item icon-prefix = "news" icon="shoucang" text="收藏" class="nav-grid-item"/>
      <van-grid-item icon-prefix = "news" icon="lishi" text="历史" class="nav-grid-item"/>
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小凯同学" is-link to="/" />
    <van-cell class="logout-cell" title="退出登录" v-if="user" @click="onLogout"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {} // 当前的用户
    }
  },
  created () {
    this.loadCurrentUser()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },
    onLogout () {
      // 提示用户是否确认退出 确认=>退出
      this.$dialog.confirm({
        title: '退出',
        message: '确认退出吗'
      })
        .then(() => {
        // on confirm
        // 清除用户登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info{
      background-color: unset; // 重置背景色
      height: 115px;
      box-sizing: border-box; // 将margin、padding都计算在height中
      padding-top: 38px;
      padding-bottom: 11px;
    }
    .avatar{
      box-sizing: border-box;
      width: 66px;
      height: 66px;
      margin-right: 11px;
    }
    .name{
      font-size: 16px;
      color: #fff;
    }
    .update-btn{
      height: 16px;
      font-size: 10px;
      color: #666666;
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color: #fff;
        .text-box{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .num{
            font-size: 18px;
          }
          .text{
            font-size: 11px;
          }
        }
      }
    }
  }
  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 66px;
      height: 66px;
    }
    .text{
      font-size: 15px;
      color: #fff;
    }
  }
  /deep/ .nav-grid{
    .nav-grid-item{
      height: 70px;
      margin-bottom: 8px;
      .news{
        font-size: 22px;
      }
      .news-shoucang{
        color: #eb5253;
      }
      .news-lishi{
        color: #ff9d1d;
      }
    }
  }
  /deep/ .van-grid-item__content{
    background-color: unset;
  }
  .logout-cell{
    text-align: center;
    color: #eb5253;
    font-size: 16px;
    margin-top: 8px;
  }
}
</style>
