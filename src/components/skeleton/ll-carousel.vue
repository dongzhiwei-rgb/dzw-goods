<!--轮播组件通用 -->
<template>
  <div class='ll-carousel' @mouseenter="stop()" @mouseleave="start()">
    <!-- 图片容器 -->
    <ul class="carousel-body">
      <!-- fade 显示的图片加上 -->
      <li class="carousel-item" v-for="(item,i) in sliders" :key="i" :class="{fade:index===i}">
        <!-- 图片 -->
        <router-link v-if="item.imgUrl" to="/">
          <img :src="item.imgUrl" alt="">
        </router-link>
        <!-- 商品列表 item=[goods1,goods2,。。。]-->
        <div v-else class="slider">
          <router-link v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="">
            <p class="name ellipsis">{{goods.name}}</p>
            <p class="price">&yen;{{goods.price}}</p>
          </router-link>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 下一张 -->
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active 激活点 -->
      <span @click="index=i" v-for="(item,i) in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue,Prop,Watch} from 'vue-property-decorator'

@Component
export default class LlCarousel extends Vue{
    // 默认显示的图片的索引
    index:any = 0;
    // 定时器
    timer:any = null;

    @Prop({type:Array,default:[]})sliders!:any
    @Prop({type:Number,default:3000})duration!:number
    // 自动播放

    autoplay(){
        clearInterval(this.timer)
        this.timer = setInterval(() =>{
                this.index ++ ;
                if (this.index >= this.sliders.length){
                    this.index = 0
                }
            },this.duration)
    }
    // 暂停轮播
    stop(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }
    // 开始轮播
    start(){
        if(this.sliders.length ){
            this.autoplay()
        }
    }
    // 切换上下张
    toggle(step:number){
      const newIndex = this.index + step
      if(newIndex >= this.sliders.length){
        this.index = 0
        return
      }
      if(newIndex < 0){
        //到最后一张
        this.index = this.sliders.length - 1
        return
      }
      this.index = newIndex
    }


    @Watch('sliders',{deep:true,immediate:true})
    handle (newVal:any){
        // 有数据&开启自动播放，才调用自动播放函数
        if(newVal.length ){
            this.index = 0
            this.autoplay()
        }
    }

    beforeDestroy(){
        clearInterval(this.timer)
    }
    
}

</script>



<style scoped lang="less">
.ll-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px!important;
      height: 230px!important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
