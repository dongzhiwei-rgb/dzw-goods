import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import cart from './modules/cart'
import city from './modules/city'
import category from './modules/category'
// 持久化 存储localStorage
import createPersistedstate from 'vuex-persistedstate'

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart,
    category,
    city
  },
  plugins: [
    createPersistedstate({
      // key
      key: 'client-store-data',
      // 存储的数据
      paths: ['user', 'cart','city']
    })
  ]

})
