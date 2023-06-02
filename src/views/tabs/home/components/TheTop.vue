<script setup lang="ts">
import type{ISearchRecomment} from '@/types'
import OpSearch  from "@/components/OpSearch.vue";
import {ref} from "vue";
interface IProps{
  recomments : ISearchRecomment[]
}
defineProps<IProps>()
interface IEmits {
  (e:'searchClick'): void
}
const emits = defineEmits<IEmits>()

</script>

<template>
<div class="home-top">
  <div class="top">
    <img class="location-icon" src="@/assets/imgs/index_page/location.png"/>
    <div class="location">天职师大</div>
    <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png"/>
    <img class="comments-icon" src="@/assets/imgs/index_page/comments.png" />
  </div>

  <OpSearch
      shape="round"
      background="linear-gradient(to right,rgb(53,200,250),rgb(31,175,243))"
      placeholder="古茗奶茶"
      @inputClick="emits('searchClick')"
  >
    <template #right-icon>
      <div @click="emits('searchClick')">搜索</div>
    </template>

  </OpSearch>
<div class="search-recomments">
  <div  v-for="v in recomments" :key="v.value"
        class="tag">
  {{v.label}}
  </div>
</div>
</div>

</template>

<style lang="scss" scoped>
  .home-top {
    //渐变色
    background: linear-gradient(to right,rgb(53,200,250),rgb(31,175,243));
    // 字体颜色
    color: white;
    .top{
      // 平铺
      display: flex;
      align-items: center;
      padding: 10px 10px 0 10px;
      line-height: 15px;
      font-size: 15px;
      font-weight: bold;
      .location-icon {
        width: 24px;
        height: 24px;
      }
      .location{
        flex: 1;
      }
      .shopcart-icon{
        width: 24px;
        height: 24px;
      }
      .comments-icon{
        width: 28px;
        height: 24px;
        margin-left: 10px;
      }
    }

  }

</style>
<!--重写-->
<style lang="scss">
.home-top{
  .van-field__right-icon {
    margin-left: 0;
  }
  .search-recomments {
    display: flex;
    padding: 0 10px 8px;
    .tag{
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242,242,242,0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
}

</style>