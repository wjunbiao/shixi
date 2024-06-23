<template>
    <div class="one">
        <el-input placeholder="请输入内容" v-model="search" clearable prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" @click="query(search)"><el-icon><Search /></el-icon>&nbsp;查询</el-button>
        <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column
            prop="title"
            label="标题"
            width="300">
            </el-table-column>
            <el-table-column
            prop="text"
            label="内容"
            width="400">
            </el-table-column>
            <el-table-column
            prop="time"
            label="时间"
            width="200">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template  #default="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">查看</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
      title="系统通告管理"
      v-model="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :append-to-body="true">
      <el-form ref="form" :model="from" label-width="90px">
      <el-form-item label="标题">
        <el-input placeholder="请输入" v-model="from.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="from.text"></el-input>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'

const tableData = ref([])
const search = ref('')
const dialogVisible = ref(false)
const isadd = ref('')
const id = ref(null)

const from = reactive({
  title: '',
  text: '',
  time: ''
})

onMounted(() => {
  data()
})

function data() {
  axios({
    url: 'http://localhost:8082/notice',
    method: 'get'
  }).then(res => {
    tableData.value = res.data
  })
}

function query(search) {
  axios({
    url: 'http://localhost:8082/notice2?search='+search,
    method: 'get'
  }).then(res => {
    // const filteredArr = res.data.filter((item) => {
    //   return item.title.indexOf(search.value) > -1
    // })
    console.log(res.data)
    tableData.value = res.data
  })
}

function handleEdit(row) {
  id.value = row.id
  dialogVisible.value = true
  isadd.value = false
  from.title = row.title
  from.text = row.text
  from.time = row.time
}
</script>

<style scoped>
.one > .el-input{
    width: 250px;
    margin: 3px 5px 6px 0;
}
</style>