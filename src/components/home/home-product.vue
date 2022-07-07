<template>
  <div class="home-product" ref="tar">
    <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
      <template v-slot:right>
        <div class="sub">
            <router-link v-for="sub in cate.children" :key="sub.id" to="/">{{sub.name}}</router-link>
        </div>
        <LlMore />
      </template>
      <div class="box">
        <router-link class="cover" to="/">
          <img :src="cate.picture" alt="">
          <strong class="label">
            <span>{{cate.name}}馆</span>
            <span>{{cate.saleInfo}}</span>
          </strong>
        </router-link>
        <ul class="goods-list">
           <li v-for="item in cate.goods" :key="item.id">
            <HomeGoods :goods="item" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script lang="ts">
import {Component,Vue} from 'vue-property-decorator'
import HomePanel from '@/components/home/home-panel.vue'
import HomeGoods from '@/components/home/home-goods.vue'


import { HomeApi } from '@/utils/request'
import { Throttled } from '@/utils/frequency'
import { LazyData } from '@/utils/hooks'

@Component({
    components: {
        HomePanel,
        HomeGoods
    }
})
export default class HomeProduct extends Vue{
    // 获取的数据
    list:Array<any> = []


  async scollTop() {
    if (this.list.length == 0) {
      const res = await LazyData(this.$refs.tar, HomeApi.findGoods);
      if (res) {
        this.list = res;
        window.removeEventListener("scroll", this.scollTop)
      }
    }
  }

  mounted() {
      // TODO为滚动条添加节流
    window.addEventListener("scroll", Throttled(this.scollTop,500));
  }
}
</script>


<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @llColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>