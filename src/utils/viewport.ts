export const isElementInViewport = function (el:any){
    if(el){
        // 获取可视窗口大小
        const viewportHeight = document.documentElement.clientHeight || window.innerHeight
        const rect = el.getBoundingClientRect();
        // 元素顶部距离可视窗口距离 === 可视窗口距离 => 元素进入视野 
        return rect.top <= viewportHeight
    }
}