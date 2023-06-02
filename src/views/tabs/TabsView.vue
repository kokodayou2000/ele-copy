<script setup lang="ts">
// useRoute获取当前router状态
// useRouter获取路由实例
import { RouterView, useRoute, useRouter } from "vue-router";

import { ref,watch } from 'vue'

const route = useRoute()
const router = useRouter()
const active = ref(route.name as string)
// 监控
watch(active, (nv)=>{
  router.push({
    name:nv
  })
})
</script>

<template>
  <RouterView />
  <VanTabbar v-model='active'>
    <VanTabbarItem name='home' icon='home-o'>首页</VanTabbarItem>
    <VanTabbarItem name='order' icon='bars'>订单</VanTabbarItem>
    <VanTabbarItem name='me' icon='contact'>我的</VanTabbarItem>
  </VanTabbar>

</template>

<style scoped>
.center{
  text-align: center;
}
</style>