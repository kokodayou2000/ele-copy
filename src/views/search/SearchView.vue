<script setup lang="ts">
import OpSearch from "@/components/OpSearch.vue";
import {computed, ref, watch} from "vue";
import {fetchSearchData} from "@/api/search";
import type {ISearchResult, ISearchResultList} from "@/types";

import {useToggle} from "@/use/useToggle";

interface IEmits {
  (e: 'cancel') : void
}
const emits = defineEmits<IEmits>()
const searchValue = ref('')
const searchResult = ref([] as ISearchResult[])

const HISTORY_TAGS = [
    '比萨','栗子','炒饭','水果','烧烤','奶茶','咖啡','汉堡王','肯德基'
]
const [isHistoryTagShown,toggleHistoryTag] = useToggle(false)
// 历史记录，根据isHistoryTagShown的状态来表示用户是否点击了显示全部历史信息
const historyTags = computed(()=>
  isHistoryTagShown.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0,5)
 )

const [INIT,DONE,DOING ] = [-1,0,1]
const searchStats =ref(INIT)

const onSearch = async (v?: string | number )=>{
  console.log( '---onSearch' ,v)
  try{
    // 点击search，就表示正在搜索
    searchStats.value = DOING
    const {list} = await fetchSearchData(v as string)

    searchResult.value = list
  }finally{
    searchStats.value = DONE
  }
}

const onTagClick = (v:string)=>{
  searchValue.value = v
  //调用onSearch方法
  onSearch(v)
}
// 任何的输入都会发送请求 但是需要做防抖 useDebounce
watch(searchValue,(nv)=>{
  if (!nv){
    searchResult.value=[]
    return
  }
  onSearch(nv)
})
</script>

<template>
<div class="search-view">
  <OpSearch
      show-action
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="emits('cancel')"
  ></OpSearch>
  <div v-if="!searchValue" class="search-view__history">
    <div class="label">历史搜索</div>
    <transition-group name="list">
    <div class="history-tag" v-for="v in historyTags" :key="v"
    @click="onTagClick(v)"
    >
      {{v}}
    </div>
    <div class="history-tag" @click="toggleHistoryTag"
         key="arrow"
    >
      <VanIcon v-if="isHistoryTagShown"
          name="arrow-up"/>
      <VanIcon v-else name="arrow-down" />
    </div>
    </transition-group>
  </div>


<!--  查找结果-->
  <div v-else class="search-view__result">
    <div class="searching" v-if="searchStats === DOING">正在搜索</div>
    <template v-if="searchStats === DONE">
      <div class="result-item" v-for="v in searchResult" :key="v.label">
        <VanIcon name="search"></VanIcon>
        <div class="name">{{v.label}}</div>
        <div class="count">约 {{v.resultCount}} 个结果</div>
      </div>

      <div class="no-result" v-if="!searchResult.length" >暂无推荐</div>
    </template>
  </div>
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

  &__history {
    padding: var(--van-padding-sm);
    .label {
      margin-bottom: var(--van-padding-xs)
    }
    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);

    }
  }

  &__result {
    .result-item{
      display: flex;
      align-items: center;
      font-size: 12px;
      padding:10px;
      border-radius:1px solid var(--van-gray-1);
      .name{
        flex:1;
        padding-left: 6px;
      }
      .count{
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }
    .no-result , .searching{
      font-size: 12px;
      padding:100px 0;
      text-align: center;
      color: var(--van-gray-6);
    }
  }
}

.list-enter-active ,.list-leave-active{
  transition: all 0.5s ease;
}
.list-enter-from ,.list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}

</style>