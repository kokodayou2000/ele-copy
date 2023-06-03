<script setup lang="ts">
// 组件的参数 <OpLoadingView :loading="" type="" />这样的
interface IProps {
  loading:boolean
  type:'loading' | 'skeleton'
}
defineProps<IProps>()
</script>

<template>
<!--  根据获取的不同参数执行不同的效果（圆形旋转，骨架屏，自定义）-->
<div v-if="loading" class="op-loading-view">

  <slot name="template">
    <div v-if="type === 'loading'" class="loading-wrapper">
      <VanLoading />
    </div>
<!--    骨架屏 -->
    <div v-if="type === 'skeleton'" class="skeleton-wrapper">
      <VanSkeleton :row="10" />
      <VanSkeleton title avatar :row="5"/>
      <VanSkeleton title :row="5"/>
    </div>
  </slot>
</div>

  <slot v-else>

  </slot>
</template>

<style lang="scss" scoped>
.op-loading-view {
  background: white;
  // 居中
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  // 不贴边
  .skeleton-wrapper {
    padding: 20px 10px;

  }
}
</style>