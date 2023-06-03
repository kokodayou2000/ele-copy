<script setup lang="ts">
import TheTop from "@/views/tabs/home/components/TheTop.vue";
import {useToggle} from "@/use/useToggle";
import SearchView from "@/views/search/SearchView.vue";
const recomments = [
  {
    value:1,
    label:'牛腩',
  },{
    value: 2,
    label: '色拉',
  },
  ]

const [isSearchViewShow,toggleSearchView] = useToggle(false)
</script>
<template>

  <div class="home-page">
<!--Transition 实现动画效果-->
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow"
                  @cancel="toggleSearchView"
      ></SearchView>

    </Transition>

<!--    向TheTop 传入recomments的属性-->

    <TheTop :recomments = "recomments"
            @searchClick="toggleSearchView"
    />
    一二三四五六七八九十
  </div>
</template>

<style lang="scss" scoped>
  //动画执行和动画退出的效果 从 0-1 中间经历0.5s
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
