<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a @click="toggle(-1)" :class="{disabled:index===0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="toggle(1)" :class="{disabled:index===1}" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
       <div ref="tar" class="box">
      <transition name="fade">
        <ul v-if="brands.length" class="list" :style="{transform:`translateX(${-index*1240}px)`}">
          <li v-for="item in brands" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="">
            </router-link>
          </li>
        </ul>
        <div v-else class="skeleton">
          <LlSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
        </div>
      </transition>
    </div>
  </HomePanel>
</template>


<script lang="ts">
import {Component,Vue} from 'vue-property-decorator'
import HomePanel from '@/components/home/home-panel.vue'
import { HomeApi } from '@/utils/request'
import { Throttled } from '@/utils/frequency'
import { LazyData } from '@/utils/hooks'

@Component({
    components: {
        HomePanel
    }
})
export default class HomeBrand extends Vue{
    // 获取的数据
    brands:Array<any> = []
    // 切换效果，只有0 1两页
    index = 0
    toggle(step:number){
        const newIndex = this.index +step
        if (newIndex < 0 || newIndex > 1) return
        this.index = newIndex
    }

  async scollTop() {
    if (this.brands.length == 0) {
      const res = await LazyData(this.$refs.tar, HomeApi.findBrand,10);
      if (res) {
        this.brands = res;
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
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @llColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
