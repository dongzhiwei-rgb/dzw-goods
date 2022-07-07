import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


const Layout = () => import(/* webpackChunkName: "HomeIndex" */'@/views/Layout.vue')
const HomeIndex = () => import(/* webpackChunkName: "HomeIndex" */ '@/views/home/index.vue')
//一级分类
const TopCategory = () => import(/* webpackChunkName: "TopCategory" */ '@/views/category/index.vue')
//二级分类
const SubCategory = () => import(/* webpackChunkName: "SubCategory" */ '@/views/category/sub.vue')

// 商品详情主页
const Goods  = () => import(/* webpackChunkName: "Goods" */ '@/views/goods/index.vue')


// 登录页
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')

const routerName ={
  Home:'home',
  Login:'login'

}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: routerName.Home,
    component: Layout,
    children:[
      {path:'/', component:HomeIndex},
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods }
    ]
  },
  {
    path:'/login',
    name:routerName.Login,
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(){ // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
      return {x:0,y:0}
  }
})

export default router
