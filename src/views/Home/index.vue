<template>
  <div>
    <Tabbar />
    home
  </div>
</template>

<script setup>
import { onMounted, reactive, defineOptions } from 'vue'
import Tabbar from '@/views/layout/Tabbar.vue'

defineOptions({
  name: 'Home',
})

onMounted(() => {
  debugger
})
</script>

<style lang='scss' scoped></style>
