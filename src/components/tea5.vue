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
            prop="type"
            label="任务类型"
            width="200">
            </el-table-column>
            <el-table-column
            prop="start"
            label="开始日期"
            width="200">
            </el-table-column>
            <el-table-column
            prop="end"
            label="截止日期"
            width="200">
            </el-table-column>
            <el-table-column
            prop="text"
            label="任务描述"
            width="400">
            </el-table-column>
            <el-table-column
            prop="limit"
            label="任务状态"
            width="100">
            <template  #default="scope">
                {{ scope.row.limit=='1'?'开通':'结束' }}
            </template>
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
      title="实习任务管理"
      v-model="dialogVisible"
      width="35%"
      :before-close="handleClose"
      :append-to-body="true">
      <el-form ref="form" :model="from" label-width="90px">
      <el-form-item label="任务类型">
        <el-input placeholder="请输入" v-model="from.type" clearable></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker type="date" placeholder="请输入" v-model="from.start"format="YYYY/MM/DD"
        value-format="YYYY-MM-DD" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期">
        <el-date-picker type="date" placeholder="请输入" v-model="from.end" format="YYYY/MM/DD"
        value-format="YYYY-MM-DD" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="from.text"></el-input>
      </el-form-item>
      <el-form-item label="任务状态" v-show="!isadd">
            <el-switch
        v-model="from.limit"
        active-text="开通"
        inactive-text="结束">
        </el-switch>
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

const tableData = ref([])
const search = ref('')
const dialogVisible = ref(false)
const isadd = ref('')
const id = ref(null)
  import { ElMessage } from 'element-plus'

const from = reactive({
  type: '',
  start: '',
  end: '',
  text: '',
  limit: ''
})

onMounted(() => {
  data()
})

function data() {
  axios({
    url: 'http://localhost:8082/task?teacher=' + window.sessionStorage.getItem('username'),
    method: 'get'
  }).then(res => {
    tableData.value = res.data
  })
}

function query(search) {
  axios({
    url: 'http://localhost:8082/task2?search=' + search,
    method: 'get'
  }).then(res => {
    // const arr = res.data.filter((item) => {
    //   return item.type.indexOf(search.value) > -1 || 
    //   item.text.indexOf(search.value) > -1
    // })
    tableData.value = res.data
  })
}

function add() {
  dialogVisible.value = true
  isadd.value = true
  from.type = ''
  from.start = ''
  from.end = ''
  from.text = ''
  from.limit = '1'
}

function handleEdit(row) {
  id.value = row.id
  dialogVisible.value = true
  isadd.value = false
  from.type = row.type
  from.start = row.start
  from.end = row.end
  from.text = row.text
  from.limit = row.limit === '1'? true : false
}

function sub() {
  if (from.type === '' || from.start === '' || from.end === '' || from.text === '') {
    ElMessage({
      showClose: true,
      message: "请完整填写！",
      type: "error",
    });
  } else {
    if (isadd.value) {
      axios({
        url: 'http://localhost:8082/addtask',
        method: 'get',
        params: {
          teacher: window.sessionStorage.getItem('username'),
          type: from.type,
          start: from.start,
          end: from.end,
          text: from.text,
          limit: '1'
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
        url: 'http://localhost:8082/eduittask/' + id.value,
        method: 'get',
        params: {
          type: from.type,
          start: from.start,
          end: from.end,
          text: from.text,
          limit: from.limit? '1' : '0'
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
    url: 'http://localhost:8082/deltask/' + row.id,
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