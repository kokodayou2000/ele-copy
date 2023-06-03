import {onUnmounted} from "vue";
export function useTimeout(fn:()=>void, delay:number){
    const timer = setTimeout(()=>{
        fn()
    },delay)
    const clear = ()=>{
        clearInterval(timer)
    }
    // 当组件销毁的时候，主动在内存中清理 timer
    onUnmounted(clear)
    return clear
}