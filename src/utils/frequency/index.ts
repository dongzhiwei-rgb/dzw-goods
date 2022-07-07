
// 定义节流 一段时间内只触发一次
export const  Throttled = (fun:any,time:any) => {
    let timer:any = false
    return function(this:any,...args:any){
        const _this = this
        if(!timer){
            timer = setTimeout(()=>{
                fun.apply(_this,args)
                timer = false
            },time)
        }
    }
}

// export function throttle(time = 0.3) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         const oldFun = descriptor.value;
//         let isLock = false;
//         descriptor.value = function (...args: any[]) {
//             if (isLock) { return }
//             isLock = true;
//             setTimeout(() => {
//                 isLock = false
//             }, time * 1000)
//             oldFun.apply(this, args)
//         }
//         return descriptor
//     }
// }

// 定义防抖 最后一次触发
export const Debounce = (fun:any,time:any) =>{
    let timer:any
    return function(this:any,...options:any){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fun.apply(this,options)
        },time)
    }
}