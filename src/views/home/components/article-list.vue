<template>
  <div class="article-list">
    <van-pull-refresh v-model="isPullDownLoading" @refresh="onRefresh"
    :success-text="refreshSuccessText" :success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item v-for="(article,index) in articles" :key="index" :article='article'></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      refreshSuccessText: '',
      isPullDownLoading: false,
      articles: [],
      loading: false, // 控制加载中的loading状态
      finished: false, // 控制加载结束的状态，当加载结束，就不能触发加载更多
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      console.log('onLoad')
      // 1.请求获取数据
      const { data } = await getArticleList({
        channel_id: this.channel.id, // 频道的id
        timestamp: this.timestamp || Date.now(), // this.timestamp || Date.now()
        with_top: 1
      })
      console.log(data)
      // 2. 把数据放到articles中
      const { results } = data.data
      this.articles.push(...results)
      // 3. 设置本次加载状态结束，才可以判断是否加载下一次，否则永远显示加载中
      this.loading = false
      // 4. 数据加载设置
      if (results.length) {
        // 更新获取下一页的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据后，设置finished为true
        this.finished = true
      }
    },
    async onRefresh () {
      console.log('onRefresh')
      // 下拉刷新，组件自己就会展示loadind状态
      // 1. 请求获取数据
      const { data } = await getArticleList({
        channel_id: this.channel.id, // 频道的id
        timestamp: Date.now(), // Date.now()
        with_top: 1
      })
      // 2. 把数据放到数据列表中
      const { results } = data.data
      console.log(results.length)
      this.articles.unshift(...results)
      // 3. 关闭刷新的状态
      this.isPullDownLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped>
.article-list{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow: auto;
}
</style>
