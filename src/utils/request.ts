import axios from 'axios'
// axios.defaults.baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net"

const instance = axios.create({
    baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout: 5000
})

// 主页数据
export class HomeApi {
    /*  品牌展示 获取品牌数据*/
    static async findBrand(param: any) {
        return instance.get('/home/brand', { params: param }).then(res => res.data.result)
    }
    /* 获取轮播数据 */
    static async findBanner() {
        return instance.get('/home/banner').then(res => res.data.result)
    }
    /* 获取新鲜好物数据 */
    static async findNew() {
        return instance.get('/home/new').then(res => res.data.result)
    }
    /* 获取人气推荐数据 */
    static async findHot() {
        return await instance.get('/home/hot').then(res => res.data.result)
    }
    /* 获取商品数据 */
    static async findGoods() {
        return await instance.get('/home/goods').then(res => res.data.result)
    }
    /* 获取最新专题数据 */
    static async findSpecial() {
        return await instance.get('/home/special').then(res => res.data.result)
    }


}

// 分类数据
export class CatagoryApi {

    /* 获取首页头部分类数据*/
    static async findAllCategory() {
        return instance.get('/home/category/head').then(res => res.data.result)
    }
    /* 获取单个顶级分类 */
    static async findTopCategory(id: any) {
        return instance.get('/category', { params: id }).then(res => res.data.result.children)
    }


    /* 
    获取二级分类筛选条件数据
    */
    static async findSubCategoryFilter(id: any) {
        return instance.get('/category/sub/filter', { params: id }).then(res => res.data.result)
    }


    /**
     * 获取分类下的商品（带筛选条件）
     */
    static async findSubCategoryGoods(data: any) {
        return instance.post('/category/goods', data).then(res => res.data.result)
    }
}

// 商品数据
export class GoodsApi {
    /**
    * 获取商品详情
    * @param {String} id - 商品ID
    */
    static async findeGoods(id:any){
        return instance.get('/goods',{params:id}).then(res => res.data.result)
    }

    /**
    * 获取商品同类推荐-未传入ID为猜喜欢
    * @param {String} id - 商品ID
    * @param {Number} limit - 获取条数
    */
   static async findRelGoods(param:any){
        return instance.get('/goods/relevant',{params:param}).then(res => res.data.result)
   }


   /**
    * 获取热榜商品
    * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
    * @param {Number} limit - 获取个数
    */
   static async findHotGoods(param:any){
        return instance.get('/goods/hot',{params:param}).then(res => res.data.result)
   }

   /**
    * 获取商品的评价统计信息
    * @param {String} id - 商品ID
    */
   static async findCommentInfoByGoods (id:any){
        return instance.get(`/goods/${id}/evaluate`).then(res => res.data.result)
   }

   // 获取评论列表
   static async findCommentListByGoods(id:any,param:any){
        return instance.get(`/goods/${id}/evaluate/page`,{params:param}).then(res => res.data.result)
   }
}   


// 用户数据
export class UserApi {
    /**
     * @param {String} account - 用户名
     * @param {String} password - 密码
    * @returns Promise
    */
    //帐号登录
    static async userAccountLogin(account:any,password:any){
        return instance.post('/login',{account:account,password:password}).then(res => res.data.result)
    }
}