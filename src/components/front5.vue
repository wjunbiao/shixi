<template>
    <div class="one">
        <el-input placeholder="请输入内容" v-model="search" clearable prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" @click="query(search)"><el-icon><Search /></el-icon>&nbsp;查询</el-button>
        <el-button type="primary" @click="add()"><el-icon><Plus /></el-icon>&nbsp;新增</el-button>
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
            width="200">
            <template  #default="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
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
      <span class="dialog-footer">
        <slot name="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
      </slot>
      </span>
    </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
 import { ElMessage } from 'element-plus'
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
    tableData.value = res.data
  })
}

function add() {
  dialogVisible.value = true
  isadd.value = true
  from.title = ''
  from.text = ''
  from.time = ''
}

function handleEdit(row) {
  id.value = row.id
  dialogVisible.value = true
  isadd.value = false
  from.title = row.title
  from.text = row.text
  from.time = row.time
}

function sub() {
  if (from.title === '' || from.text === '') {
    ElMessage({
      showClose: true,
      message: "请完整填写！",
      type: "error",
    });
  } else {
    if (isadd.value) {
      const date = new Date()
      axios({
        url: 'http://localhost:8082/addnotice',
        method: 'get',
        params: {
          title: from.title,
          text: from.text,
          time: date.toLocaleString()
        }
      }).then(res => {
        dialogVisible.value = false
        data()
        ElMessage({
          showClose: true,
          message: "新增成功！",
          type: "success",
        });
      })
    } else {
      axios({
        url: 'http://localhost:8082/eduitnotice/' + id.value,
        method: 'get',
        params: {
          title: from.title,
          text: from.text
        }
      }).then(res => {
        dialogVisible.value = false
        data()
        ElMessage({
          showClose: true,
          message: "修改成功！",
          type: "success",
        });
      })
    }
  }
}

function handleDel(row) {
  axios({
    url: 'http://localhost:8082/delnotice/' + row.id,
    method: 'get'
  }).then(res => {
    data()
    ElMessage({
      showClose: true,
      message: "删除成功！",
      type: "success",
    });
  })
}
</script>

<style scoped>
.one > .el-input{
    width: 250px;
    margin: 3px 5px 6px 0;
}
</style>