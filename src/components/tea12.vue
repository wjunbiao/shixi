<template>
  <div class="one">
    <el-input
      placeholder="请输入内容"
      v-model="search"
      clearable
      prefix-icon="el-icon-search"
    ></el-input>
    <el-button type="primary" @click="query(search)"
      ><el-icon><Search /></el-icon>&nbsp;查询</el-button
    >
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column prop="user_name" label="学号" width="200">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
      <el-table-column prop="type" label="任务类型" width="250">
      </el-table-column>
      <el-table-column prop="time" label="提交时间" format="YYYY/MM/DD"
      value-format="YYYY-MM-DD" width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'

const tableData = ref([])
const search = ref('')

onMounted(() => {
  data()
})

function data() {
  axios({
    url: 'http://localhost:8082/work3?teacher=' + window.sessionStorage.getItem('username'),
    method: 'get'
  }).then(res => {
    console.log(res)
    tableData.value = res.data
  })
}

function query(search) {
  axios({
    url: 'http://localhost:8082/work4?search=' +search,
    method: 'get'
  }).then(res => {
    console.log(res.data)
    // const filteredArr = res.data.filter((item) => {
    //   return item.type.indexOf(search.value) > -1 ||
    //     item.name.indexOf(search.value) > -1 ||
    //     item.user_name.indexOf(search.value) > -1
    // })
    tableData.value = res.data
  })
}

function handleExport(row) {
  //导出，下载文件
  const regex = /^([^/]*\/[^/]*\/)(.*)$/;
  const match = row.text.match(regex);
  if (!match ||!match[2]) {
    return
  }
  window.open('http://localhost:8888/download?filesName=' + match[2])
}
</script>

<style scoped>
.one > .el-input {
  width: 250px;
  margin: 3px 5px 6px 0;
}
</style>