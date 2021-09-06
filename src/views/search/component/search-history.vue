<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = true"
      ></van-icon>
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history,index) in searchHistory"
      :key='index'
      @click="onDelete(history, index)"
    >
      <van-icon
        name="close"
        v-show='isDeleteShow'
      />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage.js'

export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 删除显示的状态
    }
  },
  methods: {
    onDelete (history, index) {
      // 如果isDeleteShow为true，说明其是处在删除状态，进行删除操作
      if (this.isDeleteShow) {
        this.searchHistory.splice(index, 1)
        // 持久化处理
        // 1、修改本地存储的数据
        // 2、请求接口删除线上的数据
        setItem('search-histories', this.searchHistory)
      } else {
        // 非删除状态时，点击某个历史记录，直接展示搜索该历史记录的结果
        this.$emit('search', history)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-history{
  position: absolute;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
