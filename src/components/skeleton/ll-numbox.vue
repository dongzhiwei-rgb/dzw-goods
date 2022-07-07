<!-- 封装一个通用的数量选中组件。  父组件通过change事件 获取传出的参数newValue -> 当前的数量 -->
<template>
  <div class="ll-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a  @click="changeNum(-1)" href="javascript:;">-</a>
      <input type="text"  v-model.number="num">
      <a @click="changeNum(1)" href="javascript:;">+</a>
    </div>
  </div>
</template>


<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
@Component
export default class LlNumbox extends Vue{
   @Prop({type: String})label!:any
   @Prop({type:Number,default:100})max!:any
   @Prop({type:Number,default:1})min!:any

    num = 1
   changeNum(value:any){
      const newValue = this.num + value
      if(newValue < this.min) return
      if(newValue > this.max) return
      this.num = newValue
      // console.log(newValue)
      this.$emit('change', newValue)
   }



}
</script>


<style scoped lang="less">
.ll-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right:1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left:1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>