<!-- 登录表单组件 表单布局和帐号登录，短信登录切换。 -->
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>


    <div class="form">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" v-model.trim="$v.account.$model" placeholder="请输入用户名或手机号" />
            <div class="error" v-show="!$v.account.required">请输入用户名</div>
            <div class="error" v-show="!$v.account.words">字母开头且6-20个字符</div>
            <!-- <div class="error" v-show="$v.form.account.words">字母开头且6-20个字符</div> -->
          </div>
          <!-- <div class="error"><i class="iconfont icon-warning" />请输入手机号</div> -->
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input type="password" placeholder="请输入密码">
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input type="password" placeholder="请输入验证码">
            <span class="code">发送验证码</span>
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <LlCheckbox v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" @click="submit" class="btn">登录</a>
    </div>




<!-- 
    <form @submit.prevent="submit">
  <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
    <label class="form__label">Name</label>
    <input class="form__input" />
  </div>
  <div class="error" v-if="!$v.name.required">Name is required</div>
  <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
  <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
  <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
  <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
  <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
</form> -->
    
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
    <component :is="comName"></component>
  </div>
</template>


<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { required } from 'vuelidate/lib/validators'
import {rules} from '@/utils/vee-validate'
Component.registerHooks(["validations"]) 

@Component
export default class LoginForm extends Vue{
    // 是否短信登录
    isMsgLogin = false
    // 表单信息对象
    form = {
        isAgree:true
    }
    comName:any = null
    // 验证规则

    // 错误信息
    validations() {
      return {
          account: {
            required,//请输入用户名
            words:rules.account.words,//字母开头且6-20个字符
          },
          password: {
            required,//请输入密码
            length:rules.password.length//密码是6-24个字符
          },
          mobile:{
            required,//请输入手机号
            format:rules.mobile.format //手机号格式错误
          },
          code:{
            required,//请输入验证码
            length:rules.code.length //验证码是6个数字
          },
          isAgree:{
            required //请勾选同意用户协议
          }
      }
    }

    submitStatus:any =  null

    submit() {
      // console.log(this.$v.account.$model,this.$v.account)
      // this.$v.$touch()
      // if (this.$v.$invalid) {
      //   this.submitStatus = 'ERROR'
      // } else {
      //   // do your submit logic here
      //   this.submitStatus = 'PENDING'
      //   setTimeout(() => {
      //     this.submitStatus = 'OK'
      //   }, 500)
      // }
    }

    created(){
      //  console.log("this.$v:::",this.$v.account)
    }

}

</script>



<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @llColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @llColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @llColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}


</style>