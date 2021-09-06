<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在van-search外层增加form标签，且action不为空，即可在iOS输入法中显示搜索按钮。 -->
    <form action="/" class="search-box">
      <van-search
        shape="round"
        background="#3296fa"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>

    <!-- 联想建议 -->
    <search-suggestion
    v-else-if="searchText"
    :search-text="searchText"
    @search="onSearch"
    ></search-suggestion>

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-history="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
      ></search-history>
  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage.js'
import searchHistory from './component/search-history.vue'
import SearchSuggestion from './component/search-suggestion.vue'
import SearchResult from './component/search-result.vue'

export default {
  components: { searchHistory, SearchSuggestion, SearchResult },
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('search-histories') || []
    }
  },
  watch: {
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      // 如果历史记录里已经有了该搜索字符串
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }
      // 把搜索的字符串放到历史记录里,并将最新的放在第一位
      this.searchHistories.unshift(searchText)
      setItem('search-histories', this.searchHistories)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container{
    .van-search__action{
      color: #fff
    }
}
</style>

<!-- 设置点击出来的联想建议词跳转到搜索结果页面
    1、在搜索栏中的onSearch方法中传递参数searchText，将搜索栏中通过v-model绑定的searchText显示为传递过来的参数
    2、在search-suggestion页面的搜索框中绑定点击事件，@click="$emit('search', str)"
        用$emit绑定一个自定义事件search，并传递参数str，即联想建议列表里的建议词
    3、在父组件index.vue中监听这个自定义事件，调用onSearch方法，将str传递到onSearch方法中
      此时str就是传递的参数searchText
-->
