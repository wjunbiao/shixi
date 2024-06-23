<template>
  <div>
    <el-container>
      <el-aside :width="asideWidth">
        <div style="height: 60px; line-height: 60px; font-size: 20px; display: flex; align-items: center; justify-content: center">
          <img src="D:\Microsoft账户\OneDrive\桌面\vue3333(4)\src\assets\logo.png" style="width: 30px;" alt="">
          <span class="logo-title" v-show="!isCollapse">教育实习 管理端</span>
        </div>
        <el-menu router :collapse="isCollapse" :collapse-transition="false" background-color="#001529"
                 active-text-color="#fff" text-color="rgba(255, 255, 255, 0.65)" :default-active="$route.path"
                 style="border: none" :unique-opened="true" @open="handleOpen" >
          <el-sub-menu index="1">
            <template #title><i class="el-icon-menu"></i><span><el-icon><UserFilled /></el-icon>人员管理</span></template>
            <el-menu-item index="/front1" @click="two='学生管理'">学生管理</el-menu-item>
            <el-menu-item index="/front2" @click="two='教师管理'">教师管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title><i class="el-icon-menu"></i><span><el-icon><Promotion /></el-icon>实习管理</span></template>
            <el-menu-item index="/front3" @click="two='实习计划'">实习计划</el-menu-item>
            <el-menu-item index="/front4" @click="two='实习单位'">实习单位</el-menu-item>
            <el-menu-item index="/front6" @click="two='实习成绩'">实习成绩</el-menu-item>
          </el-sub-menu>
           <el-sub-menu index="3">
            <template #title><i class="el-icon-menu"></i><span><el-icon><Memo /></el-icon>通告管理</span></template>
            <el-menu-item index="/front5" @click="two='通告管理'">通告管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
 
      <el-container>
        <el-header style="height: 60px; line-height: 60px; display: flex; align-items: center; box-shadow: 2px 0 6px rgba(0, 21, 41, .35);">
          <i :class="collapseIcon" @click="handleCollapse" style="font-size: 26px"></i>
          <el-breadcrumb separator="/" style="margin-left: 20px">
            <el-breadcrumb-item style="font-weight:700;color:#000;">{{one}}</el-breadcrumb-item>
            <el-breadcrumb-item >{{two}}</el-breadcrumb-item>
          </el-breadcrumb>
 
          <div style="flex: 1; display: flex; justify-content: flex-end; align-items: center">
            <i class="el-icon-quanping" @click="handleFullScreen" style="font-size: 25px"></i>
            <el-dropdown placement="bottom">
              <div style="display: flex; align-items: center; cursor: pointer">
                <img src="D:\Microsoft账户\OneDrive\桌面\vue3333(4)\src\assets\头像.png" style="width: 30px;" alt="">
 
                <span>管理员</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><div @click="dialogVisible=true">个人信息</div></el-dropdown-item>
                  <el-dropdown-item><div @click="dialogVisible1=true">修改密码</div></el-dropdown-item>
                  <el-dropdown-item><div @click="logout()">退出登录</div></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
 
        <el-main>
          <div style="box-shadow: 0 0 10px rgba(0,0,0,.1); padding: 10px 20px; border-radius: 5px; margin-bottom: 10px">
            <router-view></router-view>
          </div>
          
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="个人信息修改"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true">
      <el-form ref="form" :model="from" label-width="90px">
      <el-form-item label="姓名">
        <el-input placeholder="请输入" v-model="from.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input placeholder="请输入" v-model="from.sex" clearable></el-input>
      </el-form-item>
      <el-form-item label="出生年月日">
        <el-date-picker type="date" placeholder="请输入" v-model="from.age" format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input placeholder="请输入" v-model="from.tel" clearable></el-input>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="密码修改"
      v-model="dialogVisible1"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true">
      <el-form ref="form" :model="from1" label-width="90px">
        <el-form-item label="账号">
        <el-input placeholder="请输入" v-model="from1.user_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入" v-model="from1.pass_word" show-password></el-input>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="sub1()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script setup>
import axios from 'axios'
import router from '../router/index.js'
import { ref, reactive, onMounted } from 'vue'

const isCollapse = ref(false)
const asideWidth = ref('200px')
const collapseIcon = ref('el-icon-s-fold')
const one = ref('人员管理')
const two = ref('学生管理')
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const id = ref(null)
const from = reactive({
  name: '',
  sex: '',
  age: '',
  tel: ''
})
const from1 = reactive({
  user_name: '',
  pass_word: ''
})

onMounted(() => {
  axios({
    url: 'http://localhost:8082/users?user_name=' + window.sessionStorage.getItem('username'),
    method: 'get'
  }).then(res => {
    id.value = res.data[0].id
    from.name = res.data[0].name
    from.sex = res.data[0].sex
    from.age = res.data[0].age
    from.tel = res.data[0].tel
    from1.user_name = res.data[0].user_name
    from1.pass_word = res.data[0].pass_word
  })
})

function handleFullScreen() {
  document.documentElement.requestFullscreen()
}

function handleCollapse() {
  isCollapse.value =!isCollapse.value
  asideWidth.value = isCollapse.value? '64px' : '200px'
  collapseIcon.value = isCollapse.value? 'el-icon-s-unfold' : 'el-icon-s-fold'
}

function handleOpen(key, keyPath) {
  const arr = ['人员管理', '实习管理', '通告管理']
  one.value = arr[key - 1]
}

function sub() {
  axios({
    url: 'http://localhost:8082/users2/' + id.value,
    method: 'patch',
    data: {
      name: from.name,
      sex: from.sex,
      age: from.age,
      tel: from.tel
    }
  }).then(res => {
    dialogVisible.value = false
    ElMessage({
      showClose: true,
      message: "修改成功！",
      type: "success"
    });
  })
}

function sub1() {
  if (from1.pass_word === '') {
    ElMessage({
      showClose: true,
      message: "请完整填写！",
      type: "error"
    });
  } else {
    axios({
      url: 'http://localhost:8082/users2/' + id.value,
      method: 'patch',
      data: {
        pass_word: from1.pass_word
      }
    }).then(res => {
      dialogVisible1.value = false
      ElMessage({
        showClose: true,
        message: "修改成功！",
        type: "success"
      });
    })
  }
}

function logout() {
  router.push('/')
}
</script>
 
<style>
.el-menu--inline, .el-menu-item {
  background-color: #000c17 !important;
}
 
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 25px !important;
  transition: color 0s;
}
.el-menu--collapse .el-submenu__title {
  padding: 0 20px !important;
}
.el-submenu__title>i:nth-child(1) {
  margin-top: 2px;
}
.el-submenu__title>i.el-submenu__icon-arrow {
  margin-top: -5px;
}
.el-menu-item {
  min-width: 0 !important;
  width: calc(100% - 10px);
  margin: 5px;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 5px;
}
.el-menu--inline>.el-menu-item {
  padding-left: 50px !important;
}
.el-menu-item.is-active {
  background-color: dodgerblue !important;
}
 
.el-menu-item:hover {
  color: #fff !important;
}
 
.el-submenu__title:hover *, .el-submenu__title:hover {
  color: #fff !important;
}
 
.el-aside {
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  background-color: #001529;
  color: #fff;
  min-height: 100vh;
  transition: width .3s;
}
.el-menu--collapse .el-tooltip {
  padding: 0 15px !important;
}
.logo-title {
  margin-left: 5px;
  transition: all .3s;
}
.el-menu {
  transition: all .3s;
}
</style>