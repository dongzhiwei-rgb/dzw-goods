<!-- <template>
  <div class='ll-bread'>
    <div class="ll-bread-item">
      <router-link to="/">首页</router-link>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <div class="ll-bread-item" v-if="parentName">
      <router-link v-if="parentPath" :to="parentPath">{{parentName}}</router-link>
      <span v-else>{{parentName}}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="ll-bread-item">
      <span><slot /></span>
    </div>
  </div>
</template> -->

<template>
  <div class='ll-bread'>
    <slot />
  </div>
</template>


<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'

@Component
export default class LlBread extends Vue{
    // @Prop({type:String,default:''})parentName!:string
    // @Prop({type:String,default:''})parentPath!:string

    // 需求
    // 1. 创建ll-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除ll-bread-item组件的i标签，因该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再ll-bread标签中
    render(h:any){
        console.log("渲染函数执行")
        let items:any = this.$slots.default
        let dymanicitems:any = []
        items.forEach((item:any,i:any)=>{
            dymanicitems.push(item)
            if(i < (items.length - 1)){
                dymanicitems.push(h('i',{class:'iconfont icon-angle-right'}))
            }
        })
        return h('div',{class:'ll-bread'},dymanicitems)
    }

}

</script>


<style lang='less'>
// 去除 scoped 属性，目的：然样式作用到ll-bread-item组件
.ll-bread{
  display: flex;
  padding: 25px 10px;
  // ul li:last-child {}
  // 先找到父元素，找到所有的子元素，找到最后一个，判断是不是LI，是就是选中，不是就是无效选择器
  // ul li:last-of-type {}
  // 先找到父元素，找到所有的类型为li的元素，选中最后一个
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @llColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>