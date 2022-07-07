<!-- 规格组件 -->
<!-- 每一个按钮拥有selected disabled 类名，做 选中 和 禁用要用。 -->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" >
          <img :key="'img-'+val.name" :class="{selected:val.selected,disabled:val.disabled}" @click="clickSpecs(item,val)" v-if="val.picture" :src="val.picture" :title="val.name" >
          <span :key="'span-'+val.name" :class="{selected:val.selected,disabled:val.disabled}" @click="clickSpecs(item,val)" v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>


<script lang="ts">
import { Component, Vue,Prop} from 'vue-property-decorator'
import {getPowerSet} from "@/vender/power-set"

@Component
export default class GoodsSku extends Vue{
    @Prop({type:Object,default:function(){
        return {specs:[],skus:[]}
    }})goods!:any

    @Prop({type:String,default:''})skuId!:any

    pathMap:any = []
    spliter = '★'
    


    /* 
    根据后台skus数据得到可走路径字典对象
    */
    getPathMAp(skus:any){

        let pathMap:any = {}
        skus.forEach((sku:any) =>{
            // 1.过滤出有库存有效的sku（SKU是物理上不可分割的最小存货单元）
            if(sku.inventory){
                // 2.得到sku属性值数组
                let specs = sku.specs.map((spec:any) => spec.valueName)
                // 3.得到sku属性值数组的子集
                let powerSet = getPowerSet(specs)
                // 4.设置给路径字典对象
                powerSet.forEach((set:any)=>{
                    let key = set.join(this.spliter)
                    if(pathMap[key]){
                        // 已经有key往数组追加
                        pathMap[key].push(sku.id)
                    }else{
                        //没有key设置一个数组
                        pathMap[key] = [sku.id]    
                    }
                })
            }
        })
        return pathMap
    } 
    // 得到当前选中规格集合
    getSelectedArr(specs:any){
        let selectedArr:any = []
        specs.forEach((spec:any)=>{
            const selectedVal = spec.values.find( (val:any) => val.selected)
            selectedArr.push(selectedVal ? selectedVal.name:undefined)
        })
        return selectedArr
    }

    /* 
    在组件初始化的时候，点击规格的时候，去更新其他按钮的禁用状态。
    */

    // 更新按钮的禁用状态
    updateDisabledStatus(specs:any,pathMap:any){
        specs.forEach((spec:any,i:any)=>{
            let selectedArr = this.getSelectedArr(specs)
            spec.values.forEach((val:any)=>{
                // 已经选中的按钮不用判断
                if(val.name === selectedArr[i]) return false
                // 未选中的替换对应的值
                selectedArr[i] = val.name
                // 过滤无效值得到key
                const key = selectedArr.filter((v:any)=>v).join(this.spliter)
                // 设置禁用状态
                 val.disabled = !pathMap[key]
            })
        })
    }


    clickSpecs(item:any,val:any){
        // console.log(val)
        // 如果是禁用状态不操作
         if (val.disabled) return 
        // 1.选中与取消选中逻辑
        if(val.selected){
            val.selected = false
        }else{
            item.values.forEach((bv:any) => {
                bv.selected = false
            })
            val.selected = true  
        }
        
        // console.log(val.selected)
        // 更新禁用状态
        this.updateDisabledStatus(this.goods.specs, this.pathMap)

        // change事件将sku数据传递出去 
        const selectedArr = this.getSelectedArr(this.goods.specs).filter((item:any) => item)
        if (selectedArr.length === this.goods.specs.length) {
            const skuIds = this.pathMap[selectedArr.join(this.spliter)]
            const sku = this.goods.skus.find((sku:any) => sku.id === skuIds[0])
            this.$emit('change', {
                skuId: sku.id,
                price: sku.price,
                oldPrice: sku.oldPrice,
                inventory: sku.inventory,
                // 提供给购物车存储使用
                specsText: sku.specs.reduce((res:any, item:any) => `${res} ${item.name}：${item.valueName}`, '').replace(' ', '')
            })
        } else {
            this.$emit('change', {})
        }
    }

    /* 
    根据传入的skuId进行默认选中，选择规格后触发change事件传出选择的sku数据。
    */
   // 初始化选中状态
   initSelectedStatus(goods:any,skuid:any){
        const sku = goods.skus.find((sku:any)=> sku.id === skuid)
        if(sku){
            goods.specs.forEach((specs:any,i:any)=>{
                const value = sku.specs[i].valueName
                specs.values.forEach((val:any)=> {
                    val.selected = val.name === value
                })
            })
        }
   }


    mounted() {
        this.pathMap = this.getPathMAp(this.goods.skus)
        // 设置默认选中规格按钮
        this.initSelectedStatus(this.goods,this.skuId)
        // 更新禁用状态
        this.updateDisabledStatus(this.goods.specs, this.pathMap)
        // console.log(this.goods)
    }
}
</script>


<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @llColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 10px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      line-height: 40px;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>