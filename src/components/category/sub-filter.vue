<!-- 根据后台返回的筛选条件展示筛选区域。 -->
<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a @click="changeBrand(item.id)" :class="{active:item.id===filterData.selectedBrand}" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{item.name}}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{item.name}}：</div>
      <div class="body">
        <a @click="changeProp(item,prop.id)" :class="{active:prop.id===item.selectedProp}" href="javascript:;" v-for="prop in item.properties" :key="prop.id">{{prop.name}}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <LlSkeleton class="item" width="800px" height="40px"  />
    <LlSkeleton class="item" width="800px" height="40px"  />
    <LlSkeleton class="item" width="600px" height="40px"  />
    <LlSkeleton class="item" width="600px" height="40px"  />
    <LlSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>



<script lang="ts">
import {Component ,Vue,Watch} from 'vue-property-decorator'
import {CatagoryApi} from '@/utils/request'

@Component
export default class SubFilter extends Vue {
    // 1. 获取数据
    // 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
    // 3. 完成渲染
    filterData:any = null;
    filterLoading:any = false;


    // 获取筛选参数
     getFilterParams(){
      let filterParams :any = {}
      let attrs:any = []
      console.log('this.filterData::',this.filterData)
      filterParams.brandid = this.filterData.selectedBrand
      this.filterData.saleProperties.forEach((item:any)=>{
        const attr = item.properties.find( (attr:any) => attr.id === item.selectedProp)
        if (attr && attr.id !== undefined){
          attrs.push({
            groupName:item.name,
            propertyName:attr.name
            })
        }
      })
      if(attrs.length){
        filterParams.attrs = attrs
      }
      console.log('filterParams::',filterParams)
      return filterParams
     }

    // 选择品牌
    changeBrand(brandid:any){
      if(this.filterData.selectedBrand === brandid) return
      this.filterData.selectedBrand = brandid
      this.$emit('filter-change', this.getFilterParams())
    }

    // 选中属性
    changeProp(item:any,attrid:any){
      if(item.selectedProp === attrid) return
      item.selected = attrid
      this.$emit('filter-change',this.getFilterParams())
    }

    // 监听分类变化
    @Watch('$route.params.id',{immediate:true})
    handle(newVal:any){
        if(newVal && this.$route.path === ('/category/sub/'+ newVal)){
          // console.log("yes",newVal)
            this.filterLoading = true;
            newVal && CatagoryApi.findSubCategoryFilter({id:this.$route.params.id}).then(res =>{
                // 品牌全部
                res.selectBrand = null;
                res.brands.unshift({id:null,name:'全部'})
                // 销售属性全部
                res.saleProperties.forEach((p:any) =>{
                    p.selectedProp = undefined ;
                    p.properties.unshift({id:null,name:'全部'})
                })
                // console.log(res)
                this.filterLoading = false;
                this.filterData = res;
            })
        }
    }
}
</script>


<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @llColor;
          }
        }
      }
    }
    .ll-skeleton {
      padding: 10px 0;
    }
  }
</style>
