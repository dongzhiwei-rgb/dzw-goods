<!-- 封装排序组件，完成排序切换效果 -->
<template>
  <div class='sub-sort'>
    <div class="sort">
      <a :class="{active:sortParams.sortField===null}" @click="changeSort(null)" href="javascript:;">默认排序</a>
      <a :class="{active:sortParams.sortField==='publishTime'}" @click="changeSort('publishTime')" href="javascript:;">最新商品</a>
      <a :class="{active:sortParams.sortField==='orderNum'}" @click="changeSort('orderNum')" href="javascript:;">最高人气</a>
      <a :class="{active:sortParams.sortField==='evaluateNum'}" @click="changeSort('evaluateNum')" href="javascript:;">评论最多</a>
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i class="arrow up" :class="{active:sortParams.sortField==='price'&&sortParams.sortMethod=='asc'}" />
        <i class="arrow down" :class="{active:sortParams.sortField==='price'&&sortParams.sortMethod=='desc'}" />
      </a>
    </div>
    <div class="check">
      <LlCheckbox @change="changeCheck" v-model="sortParams.inventory">仅显示有货商品</LlCheckbox>
      <LlCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount">仅显示特惠商品</LlCheckbox>
    </div>
  </div>
</template>

<script lang="ts">
import {Component ,Vue} from 'vue-property-decorator'

@Component
export default class SubSort extends Vue {
    // 1. 根据后台需要的参数定义数据对象
    // 2. 根据数据对象，绑定组件（复选框，排序按钮）
    // 3. 在操作排序组件的时候，需要反馈给数据对象
    // sortField====>publishTime,orderNum,price,evaluateNum
    // sortMethod====>asc为正序 desc为倒序
    sortParams:any = {
        inventory:false,
        onlyDiscount:false,
        sortField:null,
        sortMethod:null
    }


    changeCheck(){
      this.$emit('sort-change',this.sortParams)
    }

    // 改变排序
    changeSort(sortField:any){
        if(sortField === 'price'){
           this.sortParams.sortField = sortField
           if(this.sortParams.sortMethod === null){
            // 第一次点击，默认降序
            this.sortParams.sortMethod = 'desc'
           }else{
            // 其他情况根据当前排序取反
            this.sortParams.sortMethod = this.sortParams.sortMethod === 'desc'?'asc':'desc'
           }
        }else{
            //如果排序未改变停止逻辑
            if(this.sortParams.sortField === sortField) return
            this.sortParams.sortField = sortField
            this.sortParams.sortMethod = null
        }
        this.$emit('sort-change',this.sortParams)
    }



}
</script>



<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @llColor;
        border-color: @llColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @llColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @llColor;
          }
        }
      }
    }
  }
  .check {
    .ll-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>