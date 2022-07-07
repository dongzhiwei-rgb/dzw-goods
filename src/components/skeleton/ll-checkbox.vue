<template>
  <div class="ll-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>


<script lang="ts">
import {Vue, Component,Prop,Watch} from 'vue-property-decorator'
@Component
export default class LlCheckbox extends Vue{
    @Prop({type:Boolean,default:false})modeValue!:boolean
    checked:any = false
    
    changeChecked(){
        this.checked = !this.checked
        // 使用emit通知 父组件数据的改变
        this.$emit('update:modelValue',this.checked)
    }
    // 使用侦听器，得到父组件传递数据，给checked数据
    @Watch('modelValue',{immediate:true})
    handle(newVal:any){
        this.checked = newVal;
    }


}

</script>


<style scoped lang="less">
.ll-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @llColor;
    ~ span {
      color: @llColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>