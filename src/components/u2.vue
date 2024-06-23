<template>
    <div class="three">
        <h1>Internship Positions</h1>
        <ul>
            <li v-for="(item,index) in dataList" :key="index" @click="open(item.id)">
                <span></span>
                <h3>{{item.enterprise}}</h3>
                <p>岗位：{{item.post}}</p>
                <p>要求：{{item.ask}}</p>
            </li>
        </ul>
        <el-dialog
      title="实习岗位信息"
      v-model="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :append-to-body="true">
      <img :src="img" alt="">
      <div class="d">企业单位</div>
      <p class="p">{{enterprise}}</p>
      <el-divider></el-divider>
      <div class="d">岗位</div>
      <p class="p">{{post}}</p>
      <el-divider></el-divider>
      <div class="d">要求</div>
      <p class="p">{{ask}}</p>
    </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'

const dataList = ref(null)
const dialogVisible = ref(false)
const enterprise = ref('')
const post = ref('')
const ask = ref('')
const img = ref('')

axios({ //获取公告数据
    url: 'http://localhost:8082/enterprises',
    method: 'get'
}).then(res => {
    dataList.value = res.data
})

function open(id) {
    axios({ //获取公告数据
        url: 'http://localhost:8082/enterprise/' + id,
        method: 'get'
    }).then(res => {
        console.log(res.data[0].enterprise)
        dialogVisible.value = true
        enterprise.value = res.data[0].enterprise
        post.value = res.data[0].post
        ask.value = res.data[0].ask
        img.value = res.data[0].img
    })
}
</script>

<style scoped>
    .three{
        width: 100%;
        margin-top: 50px;
    }
    .three > h1{
        color: #4c4c4c;
        font-size: 40px;
        text-align: center;
    }
    .three > ul{
        width: 90%;
        margin: 50px auto;
    }
    .three > ul li{
        position: relative;
        display: inline-block;
        width: 33.3%;
        height: 220px;
        border-radius: 10px;
        transition: all .5s;
        margin-bottom: 50px;
    }
    .three > ul li span{
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: #fff;
        left: 10%;
        top: -50px;
        border-radius: 50%;
    }
    .three > ul li h3{
        position: absolute;
        font-size: 20px;
        color: #4c4c4c;
        top: 30%;
        left: 10%;
    }
    .three > ul li p:nth-child(3){
        width: 80%;
        position: absolute;
        top: 45%;
        left: 10%;
        color: #999;
    }
    .three > ul li p:nth-child(4){
        width: 80%;
        position: absolute;
        top: 58%;
        left: 10%;
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    
    .three > ul li:hover{
        background-color: #606eff;
    }
    .three > ul li:hover h3,.three > ul li:hover p{
        color: #fff;
    }
    img{
        width: 200px;
    }
    .d{
        font-weight: 700;
        margin-bottom: 5px;
        display: inline-block;
    }
    .p{
        text-indent: 2em;
        display: inline-block;
    }
</style>