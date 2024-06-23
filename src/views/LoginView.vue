<template>
  <div class="logo">
    
      <el-carousel trigger="click" height="100vh">
        <el-carousel-item v-for="item in banner" :key="item">
          <img :src="item" alt="" style="width:100%;height:100%;">
        </el-carousel-item>
      </el-carousel>
    
    
    <div class="logo_son">
      <ul>
        <li :class="nav_li?'nav_active':''" @click="nav_li=true">登录</li>
        <li :class="!nav_li?'nav_active':''" @click="nav_li=false">注册</li>
      </ul>
      <div class="login" v-if="nav_li">
        <el-radio class="s1" v-model="loginForm.select" label="管理员" size="medium">管理员</el-radio>
        <el-radio class="s1" v-model="loginForm.select" label="教师" size="medium">教师</el-radio>
        <el-radio v-model="loginForm.select" label="学生" size="medium">学生</el-radio>
        <el-input class="i2" placeholder="请输入账号" v-model="loginForm.username" clearable></el-input>
        <el-input class="i2" placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        <el-button type="primary" @click="login(loginForm.select,loginForm.username,loginForm.password)">登录</el-button>
      </div>
      <div class="register" v-else>
        <el-radio class="s1" v-model="registerForm.select" label="管理员" size="medium">管理员</el-radio>
        <el-radio class="s1" v-model="registerForm.select" label="教师" size="medium">教师</el-radio>
        <el-radio v-model="registerForm.select" label="学生" size="medium">学生</el-radio>
        <el-input class="i2" placeholder="请设置账号" v-model="registerForm.username" clearable></el-input>
        <el-input class="i2" placeholder="请设置密码" v-model="registerForm.password1" show-password></el-input>
        <el-input class="i2" placeholder="请再次设置密码" v-model="registerForm.password2" show-password></el-input>
        <el-button type="success" @click="register(registerForm.select,registerForm.username,registerForm.password1,registerForm.password2)">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '../router/index.js'
import axios from 'axios'
import { reactive, ref } from 'vue'

  import { ElMessage } from 'element-plus'

const banner = [
  'https://www.cxtc.edu.cn/resources/_Img/banner3.jpg',
  'https://www.cxtc.edu.cn/image/xinxiaoqushejigainiantu2.jpg',
  'https://www.cxtc.edu.cn/images/zhengm.png',
  'https://www.cxtc.edu.cn/resources/_Img/banner2.jpg',
  'https://www.cxtc.edu.cn/resources/_Img/banner1.jpg',
  'https://www.cxtc.edu.cn/image/taoxingzhisuxiang1.png'
]

const nav_li = ref(true)

const loginForm = reactive({
  select: '管理员',
  username: '',
  password: ''
})

const registerForm = reactive({
  select: '管理员',
  username: '',
  password: ''
})

function login(select, username, password) {
  if (!username) {
    ElMessage({
      showClose: true,
      message: '请输入账号！',
      type: 'error'
    })
  } else if (!password) {
    ElMessage({
      showClose: true,
      message: '请输入密码！',
      type: 'error'
    })
  } else {
    axios({
      url: 'http://localhost:8082/users?user_name=' + username,
      method: 'get'
    }).then(res => {
      if (!res.data.length) {
        ElMessage({
          showClose: true,
          message: '该账户不存在！',
          type: 'error'
        })
      } else if (res.data[0].state!= select) {
        ElMessage({
          showClose: true,
          message: '身份不符！',
          type: 'error'
        })
      } else if (res.data[0].pass_word!= password) {
        ElMessage({
          showClose: true,
          message: '密码错误！',
          type: 'error'
        })
      } else {
        if (select == '管理员') {
          router.push('admin')
        } else if (select == '教师') {
          router.push('teacher')
        } else {
          router.push('user')
        }

        window.sessionStorage.setItem('username', username)
        ElMessage({
          showClose: true,
          message: '登录成功',
          type:'success'
        })
      }
    })
  }
}

function register(select, username, password1, password2) {
  let reg1 = /^[1-9a-zA-Z]+$/g //用户
  let reg2 = /(^[a-zA-Z0-9]{6,12}$)/ //密码
  if (!username) {
    ElMessage({
      showClose: true,
      message: '请输入账号！',
      type: 'error'
    })
  } else if (!password1) {
    ElMessage({
      showClose: true,
      message: '请输入密码！',
      type: 'error'
    })
  } else if (!password2) {
    ElMessage({
      showClose: true,
      message: '请再次输入密码！',
      type: 'error'
    })
  } else if (password1!= password2) {
    ElMessage({
      showClose: true,
      message: '两次密码输入不一致！',
      type: 'error'
    })
  } else if (!reg1.test(username)) {
    ElMessage({
      showClose: true,
      message: '账号仅有数字和字母组成！',
      type: 'error'
    })
  } else if (!reg2.test(password1)) {
    ElMessage({
      showClose: true,
      message: '密码由6-12位字母和数字组成！',
      type: 'error'
    })
  } else {
    axios({
      url: 'http://localhost:8082/users?user_name=' + username,
      method: 'get'
    }).then(res => {
      console.log(res)
      if (!res.data.length) {
        axios({ //添加用户账户信息
          url: 'http://localhost:8082/adduser',
          method: 'post',
          data: {
            user_name: username,
            pass_word: password1,
            name: '',
            age: '',
            sex: '',
            tel: '',
            state: select,
            teacher: '',
            limit: '1',
            year: '',
            clas: '',
            enterprise: ''
          }
        }).then(res => {
          ElMessage({
            showClose: true,
            message: '注册成功！',
            type:'success'
          })
        })  
      } else {
        ElMessage({
          showClose: true,
          message: '用户名已存在！',
          type: 'error'
        })
      }
    })
  }
}
</script>

<style scoped>
    .logo{
    width: 100%;
    height: 100vh;
    position: relative;
    background-size: cover;
  }
  
  .logo_son{
    z-index: 999;
    position: absolute;
    opacity: .88;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 60%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
    border-radius: 20px;
    padding: 40px 10px 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  }
  .logo_son:after{
    filter: blur(2px);
  }
  .logo_son ul{
    width: 90%;
    height: 30px;
    margin: 0 auto 20px;
  }
  .logo_son ul .nav_active{
    color: #000;
    font-weight: 700;
    
  }
  .logo_son ul li{
    font-size: 20px;
    display: inline-block;
    width: 50%;
    height: 100%;
    line-height: 30px;
    color: #999;
    border-bottom: 2px solid rgba(0,0,0,0);
    text-align: center;
  }
  .logo_son ul li:hover{
    cursor: pointer;
  }

  .login,.register{
    width: 90%;
    height: 85%;
    margin: 10px auto;
    box-sizing: border-box;
    padding: 15px 10px;
  }
   .login .i1,.register .i1{
    width: 18px;
    height: 18px;
  }
.login .s1{
  margin-right: 15px;
}
.register .s1{
  margin-right: 15px;
}
.login span,.register span{
  display: inline-block;
  transform: translateY(-2px);
  margin-left: 5px;
  color: #000;
}

  .login .i2,.register .i2{
    width: 99%;
    height: 30px;
    margin: 15px 0;
    border-radius: 8px;
    border: none;
  }
  .login button,.register button{
    display: block;
     width: 99%;
    margin: 15px 0;
  }
  
</style>