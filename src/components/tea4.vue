<template>
    <div class="one">
        <el-input placeholder="请输入内容" v-model="search" clearable prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" @click="query(search)"><el-icon><Search /></el-icon>&nbsp;查询</el-button>
        <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <!-- <el-table-column
            label="图示"
            width="200">
            <template  #default="scope">
              <img :src="scope.row.img" alt="" style="width:100px;">
            </template>
            </el-table-column> -->
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
            width="400">
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
      title="实习单位查看"
      v-model="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :append-to-body="true">
      <el-form ref="form" :model="from" label-width="90px">
      <!-- <el-form-item label="企业图示">
        <img :src="from.img" alt="">
      </el-form-item> -->
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
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </slot>
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
const id = ref(null)

const from = reactive({
  img: '',
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
    console.log(res.data)
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
    //   item.post.indexOf(search.value) > -1
    // })
    console.log(res)
    tableData.value = res.data
  })
}

function handleEdit(row) {
  id.value = row.id
  dialogVisible.value = true
  from.img = row.img
  from.enterprise = row.enterprise
  from.post = row.post
  from.ask = row.ask
}
</script>

<style scoped>
.one > .el-input{
    width: 250px;
    margin: 3px 5px 6px 0;
}
</style>