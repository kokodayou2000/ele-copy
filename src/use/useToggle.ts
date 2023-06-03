import type {Ref} from "vue";
import {ref} from "vue";

// 来回跳转
export function useToggle(initState:boolean) : [Ref<boolean>,()=> void]{
    const state = ref(initState)
    const toggle = function (){
        state.value = !state.value
    }
    return [state,toggle]
}