// 如果浏览器不支持 requestAnimationFrame就使用setTimeout来模拟
export const rAF = requestAnimationFrame || function (callback){
    //
    setTimeout(callback,1000 / 60 )
}
export const cancelRAF = cancelAnimationFrame || function (id:number){
    // 传入的是timeOut的句柄
    clearTimeout(id)
}