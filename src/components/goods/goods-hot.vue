<!-- 
    --展示24小时热榜商品，和周热榜商品。
    --完成多个组件展现型态，根据传入组件的类型决定。
    --1代表24小时热销榜 2代表周热销榜 3代表总热销榜
    --获取数据，完成商品展示和标题样式的设置。
 -->
<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item"/>  
    </div>  
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
import GoodsItem from './goods-item.vue'
import { GoodsApi } from '@/utils/request'
@Component({
    components:{
        GoodsItem
    }
})
export default class GoodsHot extends Vue{
    @Prop({type:Number})type!:any
    @Prop({type:String})goodsId!:any

    //处理标题
    titleObj:any =  { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    get title() {
        return this.titleObj[this.type]
    }
    //商品列表
    goodsList:Array<any> = []

    created(){
        // 获取数据，初始化商品列表
        GoodsApi.findHotGoods({id:this.goodsId,tyep:this.type,limit:3}).then( result=> {
            this.goodsList = result.map((item:any) =>{
                item.tag = item.desc
                return item
            })
        } )
    }
}

</script>


<style scoped lang="less">


.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}

</style>
