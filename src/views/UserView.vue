<template>
  <div class="patient">
    <div class="header">
      <div class="logo"><span>Chu</span><span>xiong</span></div>
      <ul>
        <router-link to="/u1"><li :class="isli==1?'li_active':''" @click="isli=1">首页</li></router-link>
        <router-link to="/u2"><li :class="isli==3?'li_active':''" @click="isli=3">实习岗位</li></router-link>
        <router-link to="/u3"><li :class="isli==7?'li_active':''" @click="isli=7">实习任务</li></router-link>
        <router-link to="/u4"><li :class="isli==4?'li_active':''" @click="isli=4">实习成绩</li></router-link>
        <router-link to="/u5"><li :class="isli==5?'li_active':''" @click="isli=5">系统通告</li></router-link>
        <router-link to="/u6"><li :class="isli==6?'li_active':''" @click="isli=6">个人信息</li></router-link>
        <li @click="logout()">退出登录</li>
      </ul>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import router from '../router/index.js'
import { ref } from 'vue'
const isli = ref(1)

function logout() {
  router.push('/')
}
</script>

<style scoped>
.header{
  position: relative;
  width: 100%;
  height: 100px;
}
.logo{
  position: absolute;
  top: 50%;
  left: 6%;
  transform: translateY(-50%);
  font-size: 35px;
  font-weight: 700;
}
.logo span:first-child{
  color: #606eff;
}
.logo span:last-child{
color: #fb7370;
}
.header ul{
  width: 58%;
  height: 40px;
  position: absolute;
  top: 50%;
  right: 3%;
  transform: translateY(-50%);
}
.header ul li{
  display: inline-block;
  width: 14.2%;
  height: 100%;
  text-align: center;
  line-height: 40px;
}
.header ul li:nth-child(7){
  color: #fff;
  background-color: #fb7370;
  border-radius: 20px;
  font-weight: 700;
}
.header ul li:last-child:hover{
  cursor: pointer;
}


  .li_active{
    color: #606eff;
  }
</style>