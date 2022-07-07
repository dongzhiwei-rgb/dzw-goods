<!-- 一个通用按钮组件，有大、中、小、超小四种尺寸，有默认、主要、次要、灰色四种类型。 -->
<template>
  <button class="ll-button ellipsis" :class="[size,type]">
    <slot />
  </button>
</template>

<script lang="ts">
import {Vue, Component,Prop} from 'vue-property-decorator'
@Component
export default class LlButton extends Vue{
    @Prop({type: String,default:'middle'})size!:any
    @Prop({type:String,default:'default'})type!:any
}
</script>


<style scoped lang="less">
.ll-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}
.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}
.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}
.small {
  width: 100px;
  height: 32px;
  font-size: 14px;  
}
.mini {
  width: 60px;
  height: 32px;
  font-size: 14px;  
}
.default {
  border-color: #e4e4e4;
  color: #666;
}
.primary {
  border-color: @llColor;
  background: @llColor;
  color: #fff;
}
.plain {
  border-color: @llColor;
  color: @llColor;
  background: lighten(@llColor,50%);
}
.gray {
  border-color: #ccc;
  background: #ccc;;
  color: #fff;
}
</style>