import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式
import 'normalize.css'
import '@/assets/styles/common.less';

// 表单校验
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// 使用全局组件
import Llskeleton from "@/components/skeleton/index"
Vue.use(Llskeleton)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
