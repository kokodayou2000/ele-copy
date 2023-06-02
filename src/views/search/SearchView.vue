<script setup lang="ts">
interface IEmits {
  (e: 'cancel') : void
}
const emits = defineEmits<IEmits>()


</script>

<template>
<div class="search-view"
     @click="emits('cancel')"
>
详情页
</div>
</template>

<style lang="scss">
.search-view{
  // 铺满整个页面
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;
}

</style>