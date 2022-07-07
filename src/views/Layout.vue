<template>
  <div class="home">
    
    <template>
      <AppTopnav/>
      <AppHeader/>
      <main   class="app-body">
        <!-- 二级路由 -->
        <router-view></router-view>
      </main>
      <AppFooter/>
    </template>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from "@/components/app-header.vue"
import AppFooter from '@/components/app-footer.vue'

@Component({
  components: {
    AppTopnav,
    AppHeader,
    AppFooter
  }
})
export default class Layout extends Vue {
  created() {
    this.$store.dispatch('category/setCategory')
    // console.log("topCategory:::",this.$store.state.category.topCategory)
  }
}
</script>

<style scoped lang='less'>
.app-body {
  min-height: 600px;
}
</style>
