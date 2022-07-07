<template>
  <div class="ll-infinite-loading" ref="container">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
// import {useIntersectionObserver}  from '@vueuse/core'
@Component
export default class LlInfiniteLoading extends Vue{
    @Prop({type:Boolean,default:false})loading!:any
    @Prop({type:Boolean,default:false})finished!:any
    container:any = this.$refs.container;

    //TODO useIntersectionObserver使用
    // 第一个参数：ref引用，获取DOM
    // 第二个参数：回调，回调里面的参数 isIntersecting 会在参数一获取的 DOM 元素进入可视区域的时候监听并且为 true
    // 第三个参数：DOM 元素进入可视区域的距离 从 0 - 1

    // stop = useIntersectionObserver(
    //         this.container, 
    //         ([{isIntersecting}]:any)=>{
    //             if(isIntersecting){
    //             if(this.loading === false && this.finished === false){
    //               this.$emit('infinite')
    //             }
    //         }
    //         },{
    //           threshold : 0
    //         })

}

</script>


<style scoped lang='less'>
.ll-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(@/assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(@/assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>