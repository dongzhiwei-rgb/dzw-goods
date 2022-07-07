// 调用Api获取分类信息
import { CatagoryApi } from '@/utils/request'

// 分类模块
export default {
    namespaced: true,
    state: {
        // 分类信息集合 设置默认值，避免加载时出现空白（数据未及时加载 ）
        topCategory: [
            {
                name:'居家'
            },
            {
                name:'美食'
            },
            {
                name:'服饰'
            },
            {
                name:'母婴'
            },
            {
                name:'个护'
            },
            {
                name:'严选'
            },
            {
                name:'数码'
            },
            {
                name:'运动'
            },
            {
                name:'杂货'
            }
        ]
    },
    mutations: {
        setCategory(state: any, payload: any) {
            state.topCategory = payload;
        },
        // 修改当前一级分类下的open数据为true
        show(state:any, item:any) {
            const category = state.topCategory.find((category: any) => category.id === item.id)
            category.open = true
        },
        // 修改当前一级分类下的open数据为false
        hide(state:any, item:any) {
            const category = state.topCategory.find((category:any) => category.id === item.id)
            category.open = false
        }

    },
    // 异步获取数据
    actions: {
        async setCategory(context: any) {
            const result = await CatagoryApi.findAllCategory()
            // （解决单页面不刷新，二级分类会一直展开的问题） 给一级分类加上一个控制二级分类显示隐藏的数据open 
            result.forEach((item: { open: boolean; }) => {
                item.open = false
            })
            context.commit('setCategory', result)
        }
    }

}
