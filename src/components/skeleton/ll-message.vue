<!-- 消息提示组件封装  在接口请求报错的时候给用户进行提示-->
<template>
<transition name="down">
  <div class="ll-message" :style="style[type]"  v-show="visible">
    <!-- 上面绑定的是样式 -->
    <!-- 不同提示图标会变 -->
    <i class="iconfont" :class="[style[type].icon]"></i>
    <span class="text">{{text}}</span>
  </div>

</transition>
</template>


<script lang="ts">
import {Vue, Component,Prop} from 'vue-property-decorator'
@Component
export default class LlMessage extends Vue{
    @Prop({type:String,default:''})text!:string
    // warn 警告  error 错误  success 成功
    @Prop({type:String,default:'warn'})type!:string

    // 固定顶部显示，有三种类型：成功，错误，警告。
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    style:any = {
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }

    // 定义一个数据控制显示隐藏，默认是隐藏，组件挂载完毕显示
    visible = false
    mounted(){
        this.visible = true
    }
}

</script>


<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translate3d(0,-75px,0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.ll-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>