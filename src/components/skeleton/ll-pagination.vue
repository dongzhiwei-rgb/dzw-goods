<!-- 统一的分页组件。 -->
<template>
  <div class="ll-pagination"  v-if="Total>0">
    <a v-if="currentPage<=1" href="javascript:;" class="disabled">上一页</a>
    <a @click="changePage(currentPage-1)" v-else href="javascript:;">上一页</a>
    <span v-if="pager.start>1">...</span>
    <a @click="changePage(i)" href="javascript:;" :class="{active:i===currentPage}" v-for="i in pager.btnArr" :key="i">{{i}}</a>
    <span v-if="pager.end<pager.pageCount">...</span>
    <a v-if="currentPage>=pager.pageCount" href="javascript:;" class="disabled">下一页</a>
    <a @click="changePage(currentPage+1)" v-else href="javascript:;">下一页</a>
  </div>
</template>


<script lang="ts">
import {Vue, Component,Prop} from 'vue-property-decorator'

@Component
export default class LlPagination extends Vue{
    //接收外部数据，提供分页事件
    // 总条数
    @Prop({type:Number,default:100})thisTotal!:number
    // 每页条数
    @Prop({type:Number,default:10})thisPageSize!:number
    // 当前第几页
    @Prop({type:Number,default:1})thisCurrentPage!:number

    Total = this.$props.thisTotal
    pageSize = this.$props.thisPageSize
    currentPage = this.$props.thisCurrentPage
    // 按钮个数
    btnCount = 5

    changePage(newPage:any){
        if(this.currentPage !== newPage){
            this.currentPage = newPage
            //将最新页面 传递给父组件
            this.$emit('current-change',newPage)
        }
        return
    }

    // important::   根据上述数据得到(总页数，起始页码，结束页码，按钮数量)
    get pager(){
        //计算总页数
        const pageCount = Math.ceil(this.Total / this.pageSize)
        // 计算起始页码和结束页码
        // 1.理想情况根据当前页面，和按钮个数得到  (当前页按钮显示在中间)
        let start = this.currentPage - Math.floor(this.btnCount /2)
        let end = start + this.btnCount - 1 
        // 2.不满足5页的情况
        // 2.1 如果起始页码< 1 。重新计算
        if(start < 1 ){
           start = 1
           end = (start + this.btnCount - 1)>pageCount ? pageCount : (start + this.btnCount - 1)
        }
        //2.2 如果结束页码> 总页数，需要重新计算
        if(end > pageCount){
           end = pageCount
           start = (end - this.btnCount + 1) < 1? 1 : (end - this.btnCount + 1)
        }
        // 处理完毕 得到按钮数组
        const btnArr = []
        for (let i = start; i<= end; i++){
            btnArr.push(i)
        }

        return {pageCount,start,end,btnArr}
    }


}
</script>


<style scoped lang="less">
.ll-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @llColor;
    }
    &.active {
      background: @llColor;
      color: #fff;
      border-color: @llColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>