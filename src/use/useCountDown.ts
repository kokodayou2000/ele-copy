import {computed, ref} from "vue";
import {cancelRAF, rAF} from "@/utils/raf";

type CurrentTime = {
    days:number
    hours:number
    minutes:number
    seconds:number
    milliseconds:number
    total:number
}

type UseCountDownOptions ={
    time: number
    millisecond?:boolean
    onChange?:(current: CurrentTime) =>void
    onFinish?:() =>void

}

const SECOND = 1000 // 1000ms
const MINUTE = 60 * SECOND
const HOUR  = 60 * MINUTE
const DAY = 24 * HOUR

function parseTime(time: number) {
    // 需要多少天
    const days = Math.floor( time / DAY)
    const hours = Math.floor((time % DAY) / HOUR )
    const minutes = Math.floor(((time % HOUR) / MINUTE ))
    const seconds = Math.floor(((time % MINUTE) / SECOND ))
    const milliseconds = Math.floor(((time % SECOND)))

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        total:time
    }
}

const isSameSecond = (time1:number,time2:number)=>{
    // 获取两个时间戳的 秒 数
    return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function useCountDown(options:UseCountDownOptions){
    let counting: boolean
    let endTime: number
    let rafId: number // Request Animation Frame HandlerID

    // 需要倒计时多久
    const remain = ref(options.time)
    const current = computed(()=>
        parseTime(remain.value)
    )
    const getCurrentRemain = ()=>{
        // 和 0取最大
        return Math.max(endTime - Date.now(),0)
    }
    const pause = ()=>{
        counting = false
        cancelRAF(rafId)
    }
    const setRemain = (value:number) => {
        remain.value = value
        options.onChange?.(current.value)
        // 如果剩余时间已经到0了，就暂停执行
        if (value === 0 ){
            pause()
            options.onFinish?.()
        }
    }

    const microTick = () => {
        rafId = rAF(()=>{
            if (counting){
                // 获取需要倒计时的时间
                const remainRemain = getCurrentRemain()
                setRemain(remainRemain)
                if (remain.value > 0 ){
                    microTick()
                }
            }
        })
    }
    const macroTick = ()=>{
        rafId = rAF(()=>{
            if (counting){
                // 获取剩余时间
                const remainRemain = getCurrentRemain()
                // 微秒会对是否在同一毫秒的情况进行判断
                // 不在同一毫秒的时候，才进行设置剩余时间，但是当剩余时间===0的时候，就会强制设置
                if (!isSameSecond(remainRemain,remain.value) || remainRemain === 0){
                    setRemain(remainRemain)
                }
                if (remain.value > 0) {
                    macroTick()
                }
            }
        })
    }

    const tick = ()=>{
        if (options.millisecond){
            // 毫秒级的记时
            microTick()
        }else{
            // 微秒级的记时
            macroTick()
        }
    }
    const start = () => {
        if (!counting){
            endTime = Date.now() + remain.value
            // 表示开始计时了
            counting = true
            tick()
        }
    }
    // 清除老的RAF，然后重置剩余时间
    const reset = (totalTime = options.time) =>{
        pause()
        remain.value = totalTime
    }
    return {
        // 开始计时 通过 RAF
        start,
        // 暂停计时 就是清除 RAF
        pause,
        // 清除老的RAF，然后重置剩余时间
        reset,
        // 当前时间
        current,
    }
}