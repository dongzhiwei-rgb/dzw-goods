<!-- 目的：完成商品详情基础布局-->
<template>
  <div class="ll-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <LlBread>
        <LlBreadItem to="/">首页</LlBreadItem>
        <LlBreadItem :to="'/category/'+goods.categories[0].id">{{goods.categories[0].name}}</LlBreadItem>
        <LlBreadItem :to="'/category/sub/'+goods.categories[1].id">{{goods.categories[1].name}}</LlBreadItem>
        <LlBreadItem>{{goods.name}}</LlBreadItem>
      </LlBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
            <GoodsImage :images="goods.mainPictures" />
            <GoodsSales />
        </div>
        <div class="spec">
            <!-- 名字区组件 -->
            <GoodsName :goods="goods"/>
            <!-- 规格组件 -->
            <GoodsSku :goods="goods" @change="changeSku"/>
            <!-- 数量组件 -->
            <LlNumbox label="数量" @change="getNum"  :max="goods.inventory"/>
            <!-- 按钮组件 -->
            <LlButton type="primary" style="margin-top:20px;">加入购物车</LlButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import GoodsRelevant from "@/components/goods/goods-relevant.vue";
import GoodsName from '@/components/goods/goods-name.vue';
import GoodsSales from "@/components/goods/goods-sales.vue";
import GoodsImage from "@/components/goods/goods-image.vue"
import GoodsSku from "@/components/goods/goods-sku.vue";
import GoodsTabs from "@/components/goods/goods-tabs.vue";
import GoodsHot from "@/components/goods/goods-hot.vue";
import GoodsWarn from "@/components/goods/goods-warn.vue";
import { GoodsApi } from "@/utils/request";




@Component({
  components: {
    GoodsRelevant,
    GoodsName,
    GoodsSales,
    GoodsImage,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
})
export default class GoodsPage extends Vue {
    //选择的数量
    num = 1


    goods:any = null
  // 获取商品详情
  @Watch("$route.params.id", { immediate: true })
  handle(newVal: any) {
    if (newVal && `/product/${newVal}` === this.$route.path) {
      GoodsApi.findeGoods({id:this.$route.params.id}).then((result) => {
        // 让商品数据为null，然后使用v-if的组件可以重新销毁和创建
        this.goods = null
        Vue.nextTick(()=>{
            // console.log(result)
            this.goods = result
        })
      });
    }
  }

  // 获取数量
  getNum(newVal:any){
    this.num = newVal
  }

  //sku数据改变  change事件回调
  changeSku(sku:any){
    if(sku.skuId){
      this.goods.price = sku.price
      this.goods.oldPrice = sku.oldPrice
      this.goods.inventory = sku.inventory
    }
  }

}
</script>



<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>