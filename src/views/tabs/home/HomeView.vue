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
<!--    向TheTop 传入recomments的属性-->
    <SearchView v-if="isSearchViewShow"
                @cancel="toggleSearchView"
    >

    </SearchView>
    <TheTop :recomments = "recomments"
            @searchClick="toggleSearchView"
    />
    一二三四五六七八九十
  </div>
</template>

<style scoped>
  .test{
    font-size: 39px;
  }
</style>