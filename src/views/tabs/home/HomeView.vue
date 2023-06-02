<script setup lang="ts">
import TheTop from "@/views/tabs/home/components/TheTop.vue";
const recomments = [
  {
    value:1,
    label:'牛腩',
  },{
    value: 2,
    label: '色拉',
  },
  ]
</script>
<template>

  <div class="home-page">
<!--    向TheTop 传入recomments的属性-->
    <TheTop :recomments = "recomments" />
    一二三四五六七八九十
  </div>
</template>

<style scoped>
  .test{
    font-size: 39px;
  }
</style>