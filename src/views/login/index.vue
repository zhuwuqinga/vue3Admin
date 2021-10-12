<template>
  <div class="login">
    <div class="login_box">
      <h2>卡乐宝运营平台</h2>
      <div class="login_item">
        <p>登录账号</p>
        <el-input v-model="username" placeholder="请输入登录账号"></el-input>
      </div>
      <div class="login_item">
        <p>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</p>
        <el-input
          type="password"
          v-model="password"
          placeholder="请输入密码"
        ></el-input>
      </div>
      <div class="login_item">
        <p></p>
        <el-button class="submit" type="primary" @click="submit"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/server/api/agent'
import Cookies from 'js-cookie'

export default defineComponent({
  name: 'Login',
  setup() {
    const data = reactive({
      username: '14113172606',
      password: 'Aa111111',
      captcha: '',
    })
    const router = useRouter()
    const submit = () => {
      if (data.username == '') {
        ElMessage.warning('请输入登录账号！')
        return
      }
      if (data.password == '') {
        ElMessage.warning('请输入密码！')
        return
      }
      login()
    }
    const login = () => {
      // 登录请求
      // api.login({
      //   username: data.username.trim(),
      //   password: data.password,
      //   captcha: data.captcha
      // }).then((res:any) => {
      //   console.log(res)
      // })
      ElMessageBox.confirm(
        '登录未调用接口，如需修改token，请前往“/login/index.vue”第75行修改 -- Cookies.set',
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '跳过',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
        }
      )
        .then((res: any) => {})
        .catch(() => {
          Cookies.set('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzI0NDc0ODksInVzZXJuYW1lIjoiYWRtaW4ifQ.winRsH-FV5uqiy9Fdc-mmEB9tj-nlFx5DGUr5tMl-Xw')
          router.push({ path: '/dashboard' })
        })
    }
    return {
      ...toRefs(data),
      login,
      submit,
    }
  },
})
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/login.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login_box {
    width: 35%;
    height: 60%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .login_item {
      width: 80%;
      display: flex;
      align-items: center;
      margin: 0 auto;
      margin-top: 50px;
      p {
        width: 80px;
      }
      .el-input {
        flex: 1;
        margin-left: 10px;
      }
    }
    .submit {
      flex: 1;
      margin-left: 10px;
    }
  }
}
</style>
