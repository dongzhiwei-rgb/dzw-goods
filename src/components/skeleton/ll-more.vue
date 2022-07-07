<template>
  <router-link :to="path" class="ll-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </router-link>
</template>


<script lang="ts">
import {Vue, Component,Prop} from 'vue-property-decorator'
@Component
export default class LlMore extends Vue{
    @Prop({type:String,default:'/'})path!:string

}


</script>

<style scoped lang='less'>
.ll-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover {
    span,i {
      color: @llColor;
    }
  }
}
</style>
