// 实现使用函数调用ll-message组件的逻辑
import LlMessage from '@/components/skeleton/ll-message.vue'
import Vue from 'vue'

// 定时器标识
// let timer:any = null

export default (type:any,text:any)=>{
    Vue.component('my-message',{
        render(createElement:any){
            return createElement(
                // 准备dom容器
                'div',
                {
                    class:'ll-message-container'
                },
                [
                    createElement(
                        LlMessage,
                        {
                        attrs:{
                            type:type,
                            text:text
                        }
                    })
                ])
        }    
    })

}

// //   // 开启定时，移出DOM容器内容
// //   clearTimeout(timer)
// //   timer = setTimeout(() => {
// //     div.removeChild(vnode)
// //   }, 3000)


