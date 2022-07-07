<!-- 城市组件 -->
<template>
  <div class="ll-city" v-clickoutside="closeDialog">
    <div class="select" @click="toggleDialog"   :class="{active}">
      <span class="placeholder" >{{fullLocation || '请选择配送地址'}} </span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option"  v-show="active" >
    <div v-if="loading" class="loading"></div>
     <template v-else>
        <span class="ellipsis"  @click="changeItem(item)" v-for="item in currList" :key="item.code">{{item.name}}</span>
     </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Prop} from 'vue-property-decorator'


@Component
export default class LlCity extends Vue{
  @Prop({type:String})fullLocation!:any
    // 控制展开收起，默认收起
    active = false
    loading = false
    cityData:Array<any> = []

    // 存储切换后的城市数据
    changeResult:any = {
      provinceCode:'',
      provinceName:'',
      cityCode:'',
      cityName:'',
      countryCode:'',
      countryName:'',
      fullLocation:''
    }

    openDialog(){
        this.active = true
        this.loading = false
        // 打开弹层清空之前的选择

    }

    closeDialog(){
        this.active = false
        this.loading = false
    }

    // 切换展开收起
    toggleDialog(){
        this.active = !this.active
    }

    // 用户点击省市 展示市列表和地区列表
    changeItem(item:any){
      //省份
      if(item.level === 0){
        this.changeResult.provinceCode = item.code
        this.changeResult.provinceName = item.name
      }
      //市
      if(item.level === 1){
        this.changeResult.cityCode = item.code
        this.changeResult.cityName = item.name
      }
      // 点击地区的时候，将数据通知给父组件使用，关闭对话框
      // 地区
      if(item.level === 2){
        this.changeResult.countryCode = item.code
        this.changeResult.countryName = item.name
        this.changeResult.fullLocation = `${this.changeResult.provinceName}  ${this.changeResult.cityName} ${this.changeResult.countryName}`
        this.$emit('change', this.changeResult)
        // 清空选择结果
        for (let key in this.changeResult){
          this.changeResult[key]= ''
        }
        this.closeDialog()
      }

    }

    // 计算出需要展示的列表
    get currList(){
      // 省份
      let currList = this.cityData
      // 城市
      if(this.changeResult.provinceCode){
        currList = currList.find(item => {
          return item.code === this.changeResult.provinceCode
        }).areaList

      }
      // 地区
      if(this.changeResult.cityCode){
        currList = currList.find(item =>{
         return  item.code === this.changeResult.cityCode
        }).areaList
      }
      return currList
    }

    mounted() {
        const data:any = window.localStorage.getItem('client-store-data')
        if (data){
            this.cityData = JSON.parse(data)['city'].cityObj
        }else{
            this.$store.dispatch('city/getCitys')
            const data:any = window.localStorage.getItem('client-store-data')
            this.cityData = JSON.parse(data)['city'].cityObj
        }
    }

}
</script>


<style scoped lang="less">
.ll-city {
  display: inline-block;
  position: relative;
  z-index: 400;  
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
