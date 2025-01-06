<template>
  <van-tabbar id="tabBar" fixed v-model="state.active" route>
    <van-tabbar-item replace :to="item.path" v-for="item in state.list" :key="item.path">
      <template #icon>
        <i class="fa fa-home"></i>
      </template>
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { onMounted, reactive, defineOptions } from 'vue'
defineOptions({
  name: 'Tabbar',
})
const state = reactive({
  active: 0,
  list: [{
    name: '首页',
    path: '/news/head/头条'
  }, {
    name: '视频',
    path: '/video/videoList/推荐'
  }, {
    name: '直播',
    path: '/live'
  }, {
    name: '我的',
    path: '/my'
  }]
})
onMounted(() => {
  debugger
})
</script>

<style lang='scss' scoped></style>
