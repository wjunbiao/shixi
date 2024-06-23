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
    <el-button type="primary" @click="add()"
      ><el-icon><Plus /></el-icon>&nbsp;新增</el-button
    >
    
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column fixed prop="user_name" label="学号" width="130">
      </el-table-column>
      <el-table-column fixed prop="pass_word" label="密码" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="teacher" label="指导教师" width="130">
      </el-table-column>
      <el-table-column prop="year" label="入学年份" format="YYYY 年"
      value-format="YYYY 年" width="130">
      </el-table-column>
      <el-table-column prop="clas" label="班级" width="140"> </el-table-column>
      <el-table-column prop="enterprise" label="实习单位" width="150">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="120"> </el-table-column>
      <el-table-column prop="age" format="YYYY/MM/DD"
      value-format="YYYY-MM-DD" label="出生年月日" width="130">
      </el-table-column>
      <el-table-column prop="tel" label="电话" width="130"> </el-table-column>
      <el-table-column prop="limit" label="权限" width="100">
        <template #default="scope">
          {{ scope.row.limit == '1' ? '开' : '关' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="handleDel(scope.row)" type="text" size="small"
            >注销</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="学生信息管理"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form ref="form" :model="from" label-width="90px">
        <el-form-item label="学号">
          <el-input
            placeholder="请输入"
            v-model="from.user_name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            placeholder="请输入"
            v-model="from.pass_word"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            placeholder="请输入"
            v-model="from.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="入学年份">
          <el-date-picker
            type="year"
            placeholder="请输入"
            v-model="from.year"
            format="YYYY 年"
      value-format="YYYY 年"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="班级">
          <el-input
            placeholder="请输入"
            v-model="from.clas"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="实习单位">
          <el-input
            placeholder="请输入"
            v-model="from.enterprise"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input
            placeholder="请输入"
            v-model="from.sex"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="出生年月日">
          <el-date-picker
            type="date"
            placeholder="请输入"
            v-model="from.age"
            format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            placeholder="请输入"
            v-model="from.tel"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="指导教师">
          <el-select v-model="from.teacher" placeholder="请选择">
            <el-option
              v-for="item in teaList"
              :key="item.id"
              :label="item.user_name"
              :value="item.user_name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限">
          <el-switch v-model="from.limit" active-text="开" inactive-text="关">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
 import { ElMessage } from 'element-plus'

const tableData = ref([])
const teaList = ref(null)
const search = ref('')
const dialogVisible = ref(false)
const isadd = ref('')
const id = ref(null)

const from = reactive({
  user_name: '',
  pass_word: '',
  name: '',
  year: '',
  clas: '',
  enterprise: '',
  sex: '',
  age: '',
  tel: '',
  teacher: '',
  limit: ''
})

onMounted(() => {
  data()
})

function data() {
  axios({
    url: 'http://localhost:8082/users3?state=学生',
    method: 'get'
  }).then(res => {
    tableData.value = res.data
  })
  axios({
    url: 'http://localhost:8082/users3?state=教师',
    method: 'get'
  }).then(res => {
    teaList.value = res.data
  })
}

function query(search) {
  axios({
    url: 'http://localhost:8082/users4?search='+search,
    method: 'get'
  }).then(res => {
    // const filteredArr = res.data.filter((item) => {
    //   return item.user_name.indexOf(search.value) > -1 ||
    //     item.name.indexOf(search.value) > -1
    // })
    tableData.value = res.data
  })
}

function add() {
  dialogVisible.value = true
  isadd.value = true
  from.user_name = ''
  from.pass_word = ''
  from.name = ''
  from.year = ''
  from.clas = ''
  from.enterprise = ''
  from.sex = ''
  from.age = ''
  from.tel = ''
  from.teacher = ''
  from.limit = true
}

function handleEdit(row) {
  id.value = row.id
  dialogVisible.value = true
  isadd.value = false
  from.user_name = row.user_name
  from.pass_word = row.pass_word
  from.name = row.name
  from.year = row.year
  from.clas = row.clas
  from.enterprise = row.enterprise
  from.sex = row.sex
  from.age = row.age
  from.tel = row.tel
  from.teacher = row.teacher
  from.limit = row.limit === '1'? true : false
}

function sub() {
  if (from.user_name === '' || from.pass_word === '') {
    ElMessage({
      showClose: true,
      message: "请完整填写！",
      type: "error",
    });
  } else {
    if (isadd.value) {
      axios({
        url: 'http://localhost:8082/adduser',
        method: 'get',
        params: {
          user_name: from.user_name,
          pass_word: from.pass_word,
          name: from.name,
          year: from.year,
          clas: from.clas,
          enterprise: from.enterprise,
          sex: from.sex,
          age: from.age,
          tel: from.tel,
          state: '学生',
          teacher: from.teacher,
          limit: from.limit? '1' : '0'
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
        url: 'http://localhost:8082/users2/' + id.value,
        method: 'get',
        params: {
          user_name: from.user_name,
          pass_word: from.pass_word,
          name: from.name,
          year: from.year,
          clas: from.clas,
          enterprise: from.enterprise,
          sex: from.sex,
          age: from.age,
          tel: from.tel,
          teacher: from.teacher,
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
    url: 'http://localhost:8082/deluser/' + row.id,
    method: 'get'
  }).then(res => {
    data()
    ElMessage({
      showClose: true,
      message: "注销成功！",
      type: "success",
    });
  })
}

function handleSuccess(response, file, fileList) {
  ElMessage({
    showClose: true,
    message: response.message,
    type: response.errno === 1? "error" : "success",
  });
  data();
}
</script>

<style scoped>
.one > .el-input {
  width: 250px;
  margin: 3px 5px 6px 0;
}
</style>