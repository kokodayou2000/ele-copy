import {
    ref,

} from "vue";

import type {UnwrapRef} from "vue"
/**
 * T 返回的数据类型
 * @param asyncFn promise函数
 * @param initValue 初始值默认为T
 * @param immediate 是否立即执行
 * @return pending 是否还在请求中 data请求返回的数据 error 错误信息
 *
 */
export function useAsync<T>(asyncFn:()=>Promise<T>,initValue:T,immediate:true){
    const pending = ref(false)
    const data = ref(initValue)
    const error = ref(null)
    // 执行函数的句柄
    const execute = function (){
        pending.value = true
        error.value = null
        //执行函数，并将结果保持到data中
        return asyncFn().then((res)=>{
            data.value = res as UnwrapRef<T>
            pending.value = false
        }).catch((err)=>{
            error.value = err
            pending.value = false
        })
    }

    if (immediate){
        execute()
    }

    return {
        pending,
        data,
        error,
        execute
    }
}