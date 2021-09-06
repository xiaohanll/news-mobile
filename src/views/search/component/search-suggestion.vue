<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    v-for="(str, index) in suggestions"
    :key="index"
    @click="$emit('search', str)"
    >
    <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
// import _ from 'lodash' ：会加载整个模块，lodash支持按需加载
// 这个下划线 _ 是对lodash起的名字

export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // debounce是一个防抖函数，该函数在上一次被调用后，延迟wait毫秒后调用function方法
      // _.debounce(func, wait)
      handler: debounce(async function () {
        // 找到数据接口,请求获取数据
        const { data } = await getSearchSuggestions(this.searchText)
        // console.log(data)
        // 模板绑定展示
        this.suggestions = data.data.options
      }, 200),
      immediate: true // 在监听开始之后立即调用handler
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion{
  position: absolute;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
