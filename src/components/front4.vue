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
            prop="enterprise"
            label="企业/单位"
            width="250">
            </el-table-column>
            <el-table-column
            prop="post"
            label="岗位"
            width="250">
            </el-table-column>
            <el-table-column
            prop="ask"
            label="岗位要求"
            width="300">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template #default="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
      title="实习单位管理"
      v-model="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :append-to-body="true">
      <el-form ref="form" :model="from" label-width="90px">
      <el-form-item label="企业/单位">
        <el-input placeholder="请输入" v-model="from.enterprise" clearable></el-input>
      </el-form-item>
      <el-form-item label="岗位">
        <el-input placeholder="请输入" v-model="from.post" clearable></el-input>
      </el-form-item>
      <el-form-item label="岗位要求">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="from.ask"></el-input>
      </el-form-item>
      </el-form>
      <span  class="dialog-footer">
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
  enterprise: '',
  post: '',
  ask: ''
})

onMounted(() => {
  data()
})

function data() {
  axios({
    url: 'http://localhost:8082/enterprises',
    method: 'get'
  }).then(res => {
    tableData.value = res.data
  })
}

function query(search) {
  axios({
    url: 'http://localhost:8082/enterprise2?search='+search,
    method: 'get'
  }).then(res => {
    // const filteredArr = res.data.filter((item) => {
    //   return item.enterprise.indexOf(search.value) > -1 ||
    //     item.post.indexOf(search.value) > -1
    // })
    tableData.value = res.data
  })
}

function add() {
  dialogVisible.value = true
  isadd.value = true
  from.enterprise = ''
  from.post = ''
  from.ask = ''
}

function handleEdit(row) {
  id.value = row.id
  dialogVisible.value = true
  isadd.value = false
  from.img = row.img
  from.enterprise = row.enterprise
  from.post = row.post
  from.ask = row.ask
}

function sub() {
  if (from.img === '' || from.enterprise === '' || from.post === '' || from.ask === '') {
    ElMessage({
      showClose: true,
      message: "请完整填写！",
      type: "error",
    });
  } else {
    if (isadd.value) {
      axios({
        url: 'http://localhost:8082/addenterprise',
        method: 'get',
        params: {
          enterprise: from.enterprise,
          post: from.post,
          ask: from.ask
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
        url: 'http://localhost:8082/eduitenterprise/' + id.value,
        method: 'get',
        params: {
          enterprise: from.enterprise,
          post: from.post,
          ask: from.ask
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
    url: 'http://localhost:8082/delenterprise/' + row.id,
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