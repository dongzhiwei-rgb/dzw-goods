// /*  组件，做占位使用。术语：骨架屏组件
//      -- 暴露一些属性：高，宽，背景，是否有闪动画。
// 这是一个公用组件，需要全局注册
//  --vue插件中定义 */

// // 注册全局组（数据加载时占位组件）
// import LlSkeleton from './ll-skeleton.vue'
// // 轮播图组件
// import LlCarousel from './ll-carousel.vue'
// // 查看全部
// import LlMore from './ll-more.vue'
// // 面包屑组件
// import LlBread from './ll-bread.vue'
// // 单项面包屑组件，最后一项多一个图标
// import LlBrandItem from './ll-bread-item.vue'

// export default{
//      install(Vue:any){
//           Vue.component('LlSkeleton',LlSkeleton)
//           Vue.component('LlCarousel',LlCarousel)
//           Vue.component('LlMore',LlMore)
//           Vue.component('LlBread',LlBread)
//           Vue.component('LlBrandItem',LlBrandItem)

//      }
// }


// 自动的批量注册组件。

// 导入skeleton文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
/* 
    1. 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
    2. 然后 context 函数会返回一个导入函数 importFn
       -- 它又一个属性 keys() 获取所有的文件路径
    3. 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
    4. 遍历的同时进行全局注册即可

*/
const importFn = require.context('./',false,/\.vue$/)

export default{
     install(Vue: any){
          //批量全局注册组件
          importFn.keys().forEach(key => {
               // 导入组件
               const component = importFn(key).default
               // 注册组件
               Vue.component(component.name,component)
          })

          // 定义指令
          defineDirective(Vue)
     }
}


const defineDirective = (Vue: any) =>{
     // 图片懒加载指令 -v-lazyload
     Vue.directive('lazyload',{
          inserted(el:any,binding:any){
               // 元素插入后才能获取到DOM元，才能使用intersectionobserve进行监听进入可视区域
               // el是图片元素，binding.value 图片地址
               const observe = new IntersectionObserver(([{isIntersecting}]) =>{
                    if(isIntersecting){
                         el.src = binding.value
                         // 取消观察
                         observe.unobserve(el)
                    }
               },{
                    threshold:0.01
               }) 
               // 进行观察
               observe.observe(el)
          }
     })


     // 点击下拉列表区域外 关闭列表
     Vue.directive('clickoutside',{
          bind:function(el:any,binding:any){
               function Handler(e:any){
                    // console.log(el,e)
                    //  点击区域在 绑定元素内部
                    if(el.contains(e.target) || e.target.className ==='ellipsis'){
                         return false
                    }
                    //绑定值的字符串形式，存在
                    if (binding.expression){
                         // 绑定的值，是函数就执行
                         binding.value(e);
                    }
               }
               el.__click__ = Handler
               document.addEventListener('click', Handler)
          },
          unbind: function(el:any){
               document.removeEventListener('click',el.__click__)
               delete el.__click__
          }
     })
     
}