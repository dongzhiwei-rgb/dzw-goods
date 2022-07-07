<!-- 商品图片组件，渲染和切换 -->
<template>
  <div class="goods-image">
    <!-- 放大 -->
    <div
      class="large"
      v-show="show"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, bgPosition]"
    ></div>
    <div class="middle" ref="target" @mousemove="Throttled" @mouseleave="changeShow" >
      <img :src="images[currIndex]" alt="" />
      <!-- 移动的遮罩容器 -->
      <div class="layer" v-show="show"   :style="position"></div>
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";


@Component
export default class GoodsImage extends Vue {
  @Prop({ type: Array, default: [] }) images!: any;
  currIndex: any = 0;

  show = false;
  position: any = { left: 0, top: 0 };
  bgPosition: any = { backgroundPositionX: 0, backgroundPositionY: 0 };
  elementX: any = null;
  elementY: any = null;
  timer:any = null;
  // elementX 鼠标基于容器左上角X轴偏移
  // elementY 鼠标基于容器左上角Y轴偏移
  // isOutside 鼠标是否在模板容器外

  changeShow(){
    this.show = false;
  }
    getDOMPositon(el:any){
        const rect = el.getBoundingClientRect()
        // rect.left 元素左边距离可视窗口左边的距离
        // rect.top 元素右边距离可视窗口顶部的距离
        return [rect.left,rect.top]
    }
    
  getPosition(event:any) {
    this.show = true
    // console.log("鼠标移动");
    //TODO 替换掉useMouseInElement 函数
    const target = this.$refs.target
    // console.log(event)
    // 获取鼠标在target内的坐标
    let [left,top] = this.getDOMPositon(target)
    this.elementX = event.clientX - left
    this.elementY = event.clientY - top
  }
    // 节流
    Throttled(event:any){
        if(this.timer) return
        this.timer = setTimeout(()=>{
            this.getPosition(event)
            clearTimeout(this.timer)
            this.timer = null
        },16)
    }

  changePosition() {
    // console.log("位置变动");
    // 控制X轴方向的定位0-200
    if (this.elementX < 100) {
      this.position.left = 0;
    } else if (this.elementX > 300) {
      this.position.left = 200;
    } else {
      this.position.left = this.elementX - 100;
    }
    // 控制Y轴方向的定位 0- 200 之间
    if (this.elementY < 100) {
      this.position.top = 0;
    } else if (this.elementY > 300) {
      this.position.top = 200;
    } else {
      this.position.top = this.elementY - 100;
    }
    // 设置大背景的定位
    this.bgPosition.backgroundPositionX = -this.position.left * 2 + "px";
    this.bgPosition.backgroundPositionY = -this.position.top * 2 + "px";
    // 设置遮罩容器的定位
    this.position.left = this.position.left + "px";
    this.position.top = this.position.top + "px";

  }

  @Watch("elementX", {immediate: true })
  handler1() {
    this.changePosition();
  }
  @Watch("elementY", { immediate: true })
  handler2() {
    this.changePosition();
  }
  @Watch("isOutside", { immediate: true })
  handler3() {
    this.changePosition();
  }
}
</script>


<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @llColor;
      }
    }
  }
}
</style>

