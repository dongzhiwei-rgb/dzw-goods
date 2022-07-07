import {isElementInViewport} from '../viewport'
// import { HomeApi } from '../request'

/* 
LazyData 懒加载函数
@param {any} target 要监听的目标对象
@param {any} apiFn 请求数据的函数
@param {any} result 存储数据的位置
*/
export const LazyData = async function(target:any,apiFn:any,param ?: any){
    if(isElementInViewport(target)){
        const result = await apiFn(param)
        return result
    }
    return false

}


/* 
scollTop 懒加载具体实现
@param {any} event 组件绑定的事件
@param {any} dataArray 请求数据后用于存储的变量
@param {any} target 监听的目标对象
@param {any} apiFn 请求数据的函数
*/
// export const scollTop =  async function(event:any,dataArray:Array<any>,target:any,apiFn:any) {
//     if (dataArray.length == 0) {
//       const res = await LazyData(target,apiFn);
//       if (res) {
//         dataArray = res;
//         window.removeEventListener("scroll", event)
//       }
//     }
//   }