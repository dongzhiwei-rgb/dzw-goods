import axios  from "axios";
// 城市模块
export default {
    namespaced: true,
    state: {
        // 城市信息，嵌套
        cityObj:[]
    },
    mutations: {
        getCitys(state: any, payload: any) {
            state.cityObj = payload;
        }

    },
    // 异步获取数据
    actions: {
        async getCitys(context: any) {
            const url = "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
            const res = await axios.get(url).then(res =>res.data)
            context.commit('getCitys',res)
        }
    }

}