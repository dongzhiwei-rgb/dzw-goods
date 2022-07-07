// //vee-validate.js文件 在main.js中引入

export const rules = {
  // 校验account
  account:{
    words: (value:any) => {
      console.log(value)
      return /^[a-zA-Z]\w{5,19}$/.test(value)
    }
  },
  password:{
    length:(value:any) => /^\w{6,24}$/.test(value) 
  },
  mobile:{
    format:(value:any) => /^1[3-9]\d{9}$/.test(value)
  },
  code:{
    length:(value:any) => /^\d{6}$/.test(value)
  }
}
    


  

