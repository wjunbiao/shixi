<template>
    <div class="one">
        <el-input placeholder="请输入内容" v-model="search" clearable prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" @click="query(search)"><el-icon><Search /></el-icon>&nbsp;查询</el-button>
        <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column
            prop="major"
            label="学院"
            width="250">
            </el-table-column>
            <el-table-column
            prop="clas"
            label="班级"
            width="250">
            </el-table-column>
            <el-table-column
            prop="plan"
            label="计划"
            width="400">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template #default="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">查看</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
      title="实习计划查看"
      v-model="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :append-to-body="true">
      <el-form ref="form" :model="from" label-width="90px">
      <el-form-item label="学院">
        <el-input placeholder="请输入" v-model="from.major" clearable></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input placeholder="请输入" v-model="from.clas" clearable></el-input>
      </el-form-item>
      <el-form-item label="计划">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="from.plan"></el-input>
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
const isadd = ref('')
const id = ref(null)

const from = reactive({
  major: '',
  clas: '',
  plan: ''
})

onMounted(() => {
  data()
})

function data() {
  axios({
    url: 'http://localhost:8082/plan',
    method: 'get'
  }).then(res => {
    tableData.value = res.data
  })
}

function query(search) {
  axios({
    url: 'http://localhost:8082/plan2?search='+search,
    method: 'get'
  }).then(res => {
    // const filteredArr = res.data.filter((item) => {
    //   return item.major.indexOf(search.value) > -1 || 
    //   item.clas.indexOf(search.value) > -1
    // })
    tableData.value = res.data
  })
}

function handleEdit(row) {
  id.value = row.id
  dialogVisible.value = true
  isadd.value = false
  from.major = row.major
  from.clas = row.clas
  from.plan = row.plan
}
</script>

<style scoped>
.one > .el-input{
    width: 250px;
    margin: 3px 5px 6px 0;
}
</style>