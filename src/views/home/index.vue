<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <!-- 搜索框 -->
      <van-button
      to="/search"
      class="search-btn"
      slot="title"
      icon="search"
      type="info"
      round
    >搜索</van-button>
    </van-nav-bar>
    <!-- 文字频道列表 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab class="tab-item"
      :title="channel.name"
      :key="channel.id"
      v-for="channel in channels"
      >
      <!-- 文字列表 -->
      <article-list :channel="channel"></article-list>
      </van-tab>
      <!-- 频道编辑按钮：因为按钮是fixed定位，在频道列表拉到最后面时，按钮挡住了最后面的频道选项
        解决方案：在最后面添加一个占位元素，这个占位元素不与频道选项参与flex比例的平分，所以设置flex-shrink=0 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="isChannelEditShow = true" class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 编辑频道 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <channel-edit
      :user-channels="channels"
      :value="active"
      @close="isChannelEditShow = false"
      @update-active="active = $event"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  conputed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      try {
        // 请求获取频道信息
        let channels = []
        if (this.user) {
          // 已登录，请求获取线上的频道数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录
          const localChannels = getItem('channels')
          if (localChannels) {
            // 如果有本地存储的频道列表
            channels = localChannels
          } else {
            // 如果没有本地存储的频道列表,则请求获取默认推荐的频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    }
    // onUpdateActive (index) {
    //   this.active = index
    // }
  }
}
</script>

<style scoped lang="less">
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    background-color: #5babfb;
  }
  .van-icon {
    font-size: 16px;
  }
  .van-button__text{
    font-size: 14px;
  }
  .channel-tabs{
    /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line{
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;
    }
  }
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    width: 33px;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon{
      font-size: 24px;
    }
  }
}
.channel-edit-popup{
  height: 100%;
}
</style>
