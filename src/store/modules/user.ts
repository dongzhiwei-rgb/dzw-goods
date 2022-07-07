// 用户模块
export default {
    namespaced: true,
    state: {

        // 用户信息
        profile: {
          id: '',
          avatar: '',
          nickname: '',
          account: '',
          mobile: '',
          token: ''
        }
    },
    mutations: {
      // 修改用户信息，payload就是用户信息对象
      setUser (state:any, payload:object) {
        state.profile = payload
      }
    }
  }
  