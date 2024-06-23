<template>
    <div class="one">
        <el-input placeholder="请输入内容" v-model="search" clearable prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" @click="query(search)"><el-icon><Search /></el-icon>&nbsp;查询</el-button>
        <el-button type="primary" @click="add()"><el-icon><Plus /></el-icon>&nbsp;录入</el-button>
        <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column
            prop="user_name"
            label="学号"
            width="200">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="250">
            </el-table-column>
            <el-table-column
            prop="title"
            label="实训主题"
            width="400">
            </el-table-column>
            <el-table-column
            prop="abc"
            label="教学工作实习成绩评定"
            width="200">
            </el-table-column>
            <el-table-column
            prop="def"
            label="班主任工作实习成绩评定"
            width="200">
            </el-table-column>
            <el-table-column
            prop="abcdef"
            label="总成绩"
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
      title="实习成绩管理"
      v-model="dialogVisible"
      width="35%"
      :before-close="handleClose"
      :append-to-body="true">
      <el-form ref="form" :model="from" label-width="160px">
      <el-form-item label="实习学生">
        <el-select v-model="from.stu" placeholder="请选择">
            <el-option
            v-for="item in stuData"
            :key="item.id"
            :label="item.name+'('+item.user_name+')'"
            :value="item.name+'('+item.user_name">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实训主题">
        <el-input placeholder="请输入" v-model="from.title" clearable></el-input>
      </el-form-item>
      <el-divider content-position="left">教学工作实习评定成绩</el-divider>
      <el-form-item label="实习学校指导教师评分">
        <el-input placeholder="请输入" v-model="from.a" clearable></el-input>
      </el-form-item>
      <el-form-item label="本校指导教师评分">
        <el-input placeholder="请输入" v-model="from.b" clearable></el-input>
      </el-form-item>
      <el-form-item label="实习小组评分">
        <el-input placeholder="请输入" v-model="from.c" clearable></el-input>
      </el-form-item>
      <el-divider content-position="left">班主任工作实习评定成绩</el-divider>
      <el-form-item label="实习学校指导教师评分">
        <el-input placeholder="请输入" v-model="from.d" clearable></el-input>
      </el-form-item>
      <el-form-item label="本校指导教师评分">
        <el-input placeholder="请输入" v-model="from.e" clearable></el-input>
      </el-form-item>
      <el-form-item label="实习小组评分">
        <el-input placeholder="请输入" v-model="from.f" clearable></el-input>
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
const stuData = ref([])
const search = ref('')
const dialogVisible = ref(false)
const isadd = ref('')
const id = ref(null)

const from = reactive({
  stu: '',
  title: '',
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
  f: ''
})

onMounted(() => {
  data()
})

function data() {
  axios({
    url: 'http://localhost:8082/achievements?teacher=' + window.sessionStorage.getItem('username'),
    method: 'get'
  }).then(res => {
    tableData.value = res.data
  })
  axios({
    url: 'http://localhost:8082/users3?state=学生',
    method: 'get'
  }).then(res => {
    // let username = window.sessionStorage.getItem('username')
    // const filteredArr = res.data.filter((item) => {
    //   return item.teacher.split('(')[1] == username + ')'
    // })
    stuData.value = res.data
  })
}

function query(search) {
  axios({
    url: 'http://localhost:8082/achievement2?search=' +search,
    method: 'get'
  }).then(res => {
    // const filteredArr = res.data.filter((item) => {
    //   return item.name.indexOf(search.value) > -1
    // })
    tableData.value = res.data
  })
}

function add() {
  dialogVisible.value = true
  isadd.value = true
  from.stu = ''
  from.title = ''
  from.a = ''
  from.b = ''
  from.c = ''
  from.d = ''
  from.e = ''
  from.f = ''
}

function handleEdit(row) {
  console.log(row)
  id.value = row.id
  dialogVisible.value = true
  isadd.value = false
  from.title = row.title
  from.a = row.a
  from.stu=row.name
  from.b = row.b
  from.c = row.c
  from.d = row.d
  from.e = row.e
  from.f = row.f
}

function sub() {
  if (from.title === '' || from.a === '' || from.b === '' || from.d === '') {
    ElMessage({
      showClose: true,
      message: "请完整填写！",
      type: "error",
    });
  } else {
    if (isadd.value) {
      axios({
        url: 'http://localhost:8082/addachievement',
        method: 'get',
        params: {
          teacher: window.sessionStorage.getItem('username'),
          name: from.stu.split('(')[0],
          user_name: from.stu.split('(')[1],
          title: from.title,
          a: from.a,
          b: from.b,
          c: from.c,
          abc: (((from.a - 0) + (from.b - 0) + (from.c - 0)) / 3).toFixed(2),
          d: from.d,
          e: from.e,
          f: from.f,
          def: (((from.d - 0) + (from.e - 0) + (from.f - 0)) / 3).toFixed(2),
          abcdef: (((from.a - 0) + (from.b - 0) + (from.c - 0) + (from.d - 0) + (from.e - 0) + (from.f - 0)) / 6).toFixed(2)
        }
      }).then(res => {
        dialogVisible.value = false
        data()
        ElMessage({
          showClose: true,
          message: "录入成功！",
          type: "success",
        });
      })
    } else {
      axios({
        url: 'http://localhost:8082/eduitachievement/' + id.value,
        method: 'get',
        params: {
          title: from.title,
          a: from.a,
          b: from.b,
          c: from.c,
          abc: ((from.a - 0) + (from.b - 0) + (from.c - 0)) / 3,
          d: from.d,
          e: from.e,
          f: from.f,
          def: ((from.d - 0) + (from.e - 0) + (from.f - 0)) / 3,
          abcdef: ((from.a - 0) + (from.b - 0) + (from.c - 0) + (from.d - 0) + (from.e - 0) + (from.f - 0)) / 6
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
    url: 'http://localhost:8082/delachievement/' + row.id,
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