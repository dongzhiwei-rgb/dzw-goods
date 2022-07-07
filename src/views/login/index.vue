<!-- 登录主体 -->
<template>
  <div>
    <LoginHeader>欢迎登录</LoginHeader>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a
            @click="activeName = 'account'"
            :class="{ active: activeName === 'account' }"
            href="javascript:;"
            >账户登录</a
          >
          <a
            @click="activeName = 'qrcode'"
            :class="{ active: activeName === 'qrcode' }"
            href="javascript:;"
            >扫码登录</a
          >
        </nav>
        <!-- 表单 -->
        <div v-if="activeName === 'account'" class="account-box">
        <LoginForm/>
        </div>
        <!-- 二维码 -->
        <div v-if="activeName === 'qrcode'" class="qrcode-box">
          <img src="@/assets/images/qrcode.jpg" alt="" />
          <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
        </div>
      </div>
    </section>
    <LoginFooter />
  </div>
</template>




<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginHeader from "@/components/login/login-header.vue";
import LoginFooter from "@/components/login/login-footer.vue";
import LoginForm from "@/components/login/login-form.vue"

@Component({
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm
  },
})
export default class PageLogin extends Vue {
  // 声明activeName数据提供模版使用
  activeName = "account";
}
</script>


<style scoped lang='less'>
.login-section {
  background: url(@/assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    // 二维码容器
    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        a {
          color: @llColor;
          font-size: 16px;
        }
      }
    }

    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @llColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>