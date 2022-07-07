<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="changeFilter" />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="changeSort"/>
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 加载 -->
        <LlInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SubBread from '@/components/category/sub-bread.vue';
import SubFilter from '@/components/category/sub-filter.vue';
import SubSort from '@/components/category/sub-sort.vue'
import GoodsItem from '@/components/goods/goods-item.vue'
import { CatagoryApi } from '@/utils/request';

@Component({
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
})
export default class SubCategory extends Vue {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表

    loading = false;
    finished = false;
    goodsList:Array<any> = []

    // 查询参数配置
    reqParams:any = {
      page: 1,
      pageSize:20
    }

    // 监听筛选区改变
    async changeFilter(filterParams:any){
      this.reqParams = {...this.reqParams,...filterParams}
      this.reqParams.page = 1
      const result = await CatagoryApi.findSubCategoryGoods(this.reqParams)
      this.goodsList = []
      this.goodsList.push(...result.items)
      this.finished = false
    }

    // 监听排序改变
    async changeSort(sortParams:any){
      this.reqParams = {...this.reqParams,...sortParams}
      this.reqParams.page = 1
      console.log("this.reqParams::",this.reqParams)
      const result = await CatagoryApi.findSubCategoryGoods(this.reqParams)
      this.goodsList = []
      this.goodsList.push(...result.items)
      this.finished = false
    }

    // 获取数据
    async getData(){
      this.loading = true
      this.reqParams.categoryid = this.$route.params.id
      
      const result = await CatagoryApi.findSubCategoryGoods(this.reqParams)
      console.log("二级分类请求回的全部数据::",result)
      if(result.items.length){
        this.goodsList.push(...result.items)
        this.reqParams.page++
      }else {
        //加载完毕
        this.finished = true  
      }
      // 请求结束
      this.loading = false
    }


    // 切换二级分类重新加载
    @Watch('$route.params.id',{immediate:true})
    hanle(newVal:any){
      if(newVal && this.$route.path === ('/category/sub/'+newVal)){
        this.goodsList = []
        this.reqParams = {
          page: 1,
          pageSize:20,
          categoryId:newVal
        }
        this.getData()
        this.finished = false
      }
    }
}
</script>



<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>