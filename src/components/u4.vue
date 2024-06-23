<template>
    <div class="three">
        <h1>Internship Results</h1>
        <div class="zhe">
            <div v-for="(item,index) in dataList" :key="index">
                <span @click="open(item)">{{item.title}}</span>
                <el-divider></el-divider>
            </div>
        </div>
        <el-drawer
            :title="aaa.title"
           v-model="drawer"
            :with-header="false"
            direction="btt">
            
            <el-descriptions class="margin-top" :title="aaa.title" :column="4" :size="size" border>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        实习学校指导教师评分

      </template>
      {{aaa.a}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        本校指导教师评分
      </template>
      {{aaa.b}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        实习小组评分
      </template>
      {{aaa.c}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        教学工作实习评定成绩
      </template>
      {{aaa.abc}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        实习学校指导教师评分
      </template>
      {{aaa.e}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        本校指导教师评分
      </template>
      {{aaa.d}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        实习小组评分
      </template>
      {{aaa.f}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        班主任工作实习评定成绩
      </template>
      {{aaa.def}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <i class="el-icon-tickets"></i>
        总成绩
      </template>
      {{aaa.abcdef}}
    </el-descriptions-item>
  </el-descriptions>

        </el-drawer>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'

const dataList = ref(null)
var aaa = reactive({ title: '' })
const drawer = ref(false)

axios({ //获取数据
    url: 'http://localhost:8082/achievement?user_name=' + window.sessionStorage.getItem('username'),
    method: 'get'
}).then(res => {
    dataList.value = res.data
})

function open(item) {
    aaa = item
    drawer.value = true
}
</script>

<style scoped>
    .three{
        width: 100%;
        margin-top: 50px;
    }
    .three > h1{
        color: #4c4c4c;
        font-size: 40px;
        text-align: center;
    }
    .zhe{
        width: 60%;
        margin: 40px auto 10px;
    }
    .text{
        font-size: 16px;
    }
    .time{
        font-size: 14px;
        color: #999;
    }
</style>