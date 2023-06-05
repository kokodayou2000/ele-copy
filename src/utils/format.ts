export const clamp = (num:number,min:number,max:number)=>{
    // 保证 num在[min,max]之间
    return Math.min(Math.max(num,min),max)
}