<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <!-- vant组件 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/" icon-prefix = "news" icon="shouye">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon-prefix = "news" icon="wenda">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon-prefix = "news" icon="shipin">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon-prefix = "news" icon="wode">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
