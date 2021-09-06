<template>
  <div class="channel-edit" :border="false">
    <!-- 我的频道 -->
    <van-cell center>
      <div slot="title" class="channel-title">我的频道</div>
      <!-- 编辑按钮 -->
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit=!isEdit"
      > {{ isEdit ? '完成' : '编辑' }} </van-button>
    </van-cell>
    <!-- 我的频道展示 -->
    <!-- :class="{ active: index === active }" active根据index === active决定active类名的显示与否 -->
    <van-grid :gutter="10">
      <van-grid-item
      class="grid-item"
      :class="{ active: index === value }"
      v-for="(channel, index) in userChannels"
      :key="index"
      :text="channel.name"
      :icon="(isEdit && index !== 0) ? 'clear' : '' "
      @click="onUserChannelClick(index)"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell center class="channel-title">
      <div slot="title">频道推荐</div>
    </van-cell>
    <!-- 频道推荐的展示 -->
    <van-grid :gutter="10">
      <van-grid-item
      class="grid-item"
      v-for="(channel,index) in recommendChannels"
      :key="index"
      :text="channel.name"
      @click="onAdd(channel)"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐的频道列表
    recommendChannels () {
      // 思路：所有频道-我的频道=所有剩余的频道
      return this.allChannels.filter(channel => {
        // 判断channel是否属于我的频道
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 加载获取所有的频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 添加频道到“我的频道”
    async onAdd (channel) {
      this.userChannels.push(channel)
      if (this.user) {
        // 登录了，数据存储到线上
        await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        // 没有登录，数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // 编辑频道
    onUserChannelClick (index) {
      // 如果是编辑状态，就删除频道，如果是非编辑状态，就切换频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index)
      } else {
        this.switchChannel(index)
      }
    },
    // 删除频道
    async deleteChannel (channel, index) {
      // 如果删除的是当前频道之前的频道
      if (index <= this.value) {
        // 更新激活频道的索引
        this.$emit('update-active', this.value - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    // 切换频道
    switchChannel (index) {
      this.$emit('update-active', index)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333;
  }
  .grid-item{
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content{
      background-color: #f4f5f6;
      .van-grid-item__text{
        margin-top: 0;
        font-size: 14px;
        color: #222;
      }
    }
    /deep/ .van-grid-item__icon{
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
