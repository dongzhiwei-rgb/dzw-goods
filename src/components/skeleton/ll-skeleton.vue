<template>
  <div class="ll-skeleton" :style="{width,height}" :class="{shan:animated}">
    <!-- 1 盒子-->
    <div class="block" :style="{backgroundColor:bg}"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>

<script lang="ts">
import { Component, Vue,Prop} from 'vue-property-decorator'

@Component
export default class LlSkeleton extends Vue{
    // 使用的时候需要动态设置 高度，宽度，背景颜色，是否闪下
    @Prop({type:String,default:'#efefef'})bg!:string
    @Prop({type:String,default: '100px'})width!:string
    @Prop({type:String,default: '100px'})height!:string
    @Prop({type:Boolean,default: false})animated!:boolean

}

</script>


<style scoped lang="less">
.ll-skeleton {
  animation: fade 1s linear infinite alternate;
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}

</style>
