<template>
  <div class="three">
    <h1>Internship Tasks</h1>
    <div class="zhe">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item,index) in dataList"
          :key="index"
          :title="item.type"
          :name="index"
          :disabled="item.limit == 0 || userlimit == '0'"
        >
          <div class="text">{{ item.text }}</div>
          <div class="time">{{ item.start }} ~ {{ item.end }}</div>
          <el-button
            size="small"
            icon="el-icon-edit"
            type="primary"
            @click="open(item.type, item.id)"
            >{{ btntext }}</el-button
          >
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog
      :title="type"
      v-model="dialogVisible"
      width="31%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        :data="{ userId: 0 }"
        action="http://localhost:8888/upload"
        :on-success="handleSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><em>点击上传</em></div>
      </el-upload>
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
import { ref, reactive } from 'vue'

const userlimit = ref('')
const activeName = ref('')
const dataList = ref(null)
const dialogVisible = ref(false)
var type = ref('')
const teacher = ref('')
const name = ref('')
const id = ref(null)
const fileList = ref([])
const btntext = ref("提交作业")
  import { ElMessage } from 'element-plus'

axios({ //获取公告数据
  url: 'http://localhost:8082/users?user_name=' + window.sessionStorage.getItem('username'),
  method: 'get'
}).then(res => {
  userlimit.value = res.data[0].limit
  name.value = res.data[0].name
  console.log(res.data[0].teacher.slice(1, -1))
  let teacherValue = res.data[0].teacher
  // let teacherValue = "teacher"
  teacher.value = teacherValue
  axios({ //获取公告数据
    url: 'http://localhost:8082/task?teacher=' + teacherValue,
    method: 'get'
  }).then(res1 => {
    dataList.value = res1.data
  })
})

function getbtntext() {
  axios({ //查询该学生是否交过作业
    url: 'http://localhost:8082/work2?user_name=' + window.sessionStorage.getItem('username') + '&type=' + type.value,
    method: 'get'
  }).then(res => {
    if (res.data.length) {
      btntext.value = "重新提交"
    } else {
      btntext.value = "提交作业"
    }
  })
}

function open(type1, id) {
  type.value = type1
  // id.value = id
  dialogVisible.value = true
}

function sub() {
  axios({ //查询该学生是否交过作业
    url: 'http://localhost:8082/work2?user_name=' + window.sessionStorage.getItem('username') + '&type=' + type.value,
    method: 'get'
  }).then(res => {
    const date = new Date()
      //没交过作业则本次执行新增操作
      axios({
        url: 'http://localhost:8082/addwork',
        method: 'get',
        params: {
          teacher: teacher.value,
          name: name.value,
          user_name: window.sessionStorage.getItem('username'),
          type: type.value,
          text: this.text,
          time: date.toLocaleString()
        }
      }).then(res1 => {
        getbtntext()
        dialogVisible.value = false
        // this.$message.success('提交成功！')
        ElMessage({
          showClose: true,
          message: '提交成功！',
          type:'success'
        })
      })
    
  })
}

function handleSuccess(res, file) {
  this.text = res.data.url
}
</script>

<style scoped>
.three {
  width: 100%;
  margin-top: 50px;
}
.three > h1 {
  color: #4c4c4c;
  font-size: 40px;
  text-align: center;
}
.zhe {
  width: 60%;
  margin: 40px auto 10px;
}
.text {
  font-size: 16px;
}
.time {
  font-size: 14px;
  color: #999;
}
</style>