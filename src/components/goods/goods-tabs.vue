<!-- 实现商品详情组件和商品评价组件的切换 -->
<template>
  <div class="goods-tabs">
    <nav>
      <a
        :class="{ active: activeName === 'detail' }"
        href="javascript:;"
        @click="clickTab('Detail')"
        >商品详情</a
      >
      <a
        :class="{ active: activeName === 'comment' }"
        href="javascript:;"
        @click="clickTab('Comment')"
        >商品评价<span>(500+)</span></a
      >
    </nav>
    <!-- 这个位置显示对应的组件 GoodsDetail 或者 GoodsComment -->
    <component :goods="goods" :is="'Goods'+activeName" />
  </div>
</template>

<script lang="ts">
import { Component, Vue,Prop} from 'vue-property-decorator'
import GoodsDetail from './goods-detail.vue';
import GoodsComment from './goods-comment.vue';

@Component({
    components:{
        GoodsDetail,
        GoodsComment
    }
})
export default class GoodsTabs extends Vue{
    @Prop({type:Object})goods!:any
    // detail --> 详情 comment --> 评价
    activeName = 'Detail'

    clickTab(name:any){
        this.activeName = name;
    }

}

</script>




<style scoped lang='less'>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @llColor;
        }
      }
    }
  }
}

</style>