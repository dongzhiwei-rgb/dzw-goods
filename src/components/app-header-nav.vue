<template>
  <ul class="app-header-nav">
    <li class="home"><router-link to="/">首页</router-link></li>
    <!-- 滚动到顶部，鼠标有时候会进入一级类目上，触发弹出二级类目 改成在一级类目上移动弹出二级类目mousemove-->
    <li
      v-for="item in categoryList"
      :key="item.id"
      @mousemove="show(item)"
      @mouseleave="hide(item)"
    >
      <!-- 避免空白 -->
      <router-link :to="`/category/${item.id}`" @click.native="hide(item)">{{
        item.name || item
      }}</router-link>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click.native="hide(item)">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppHeaderNav extends Vue {
  show(item: any) {
    this.$store.commit("category/show", item);
  }
  hide(item: any) {
    this.$store.commit("category/hide", item);
  }

  // category仓库获取分类数据
  get categoryList() {
    // console.log("分类数据::",this.$store.state.category.topCategory)
    return this.$store.state.category.topCategory;
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  //  子标签
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @llColor;
        border-bottom: 1px solid @llColor;
      }
    // 通过 open 类来判断是否展开
    //   > .layer {
    //     height: 132px;
    //     opacity: 1;
    //   }
    }
  }
}
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @llColor;
        }
      }
    }
  }
}
</style>
