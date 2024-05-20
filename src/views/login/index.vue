<template>
    <div class="container">
        <h2>欢迎来到张建的秘密花园</h2>
        <div class="login-container">
            <div style="position: relative;margin-bottom: 35px;margin-top: 15px;">
                <div id="toLogin" class="loginText textColor" @click="toLoginFun()">登录账号</div>
                <div id="toRegist" class="registText" @click="toRegistFun()">注册账号</div>
            </div>
            <!-- <h2>Login</h2> -->
            <div class="login-form" v-if="loginStatue === true">
                <div class="userNameText">账号</div>
                <input type="text" v-model="formData.account" name="username" placeholder="请输入账号">
                <div class="userNameText">密码</div>
                <input type="password"  v-model="formData.password" name="password" placeholder="请输入密码">
                <button id="button" type="submit" @click="login()">登录</button>
            </div>
            <div class="login-form" v-else>
                <div class="userNameText">昵称</div>
                <input type="text" name="username" placeholder="请输入昵称">
                <!-- <div class="userNameText">账号</div>
                <input type="text" name="username" placeholder="请输入账号"> -->
                <div class="userNameText">密码</div>
                <input type="password" name="password" placeholder="请输入密码">
                <button id="button" type="submit">注册</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '../../router/index.js';
import axios from 'axios'
import { ElMessage } from 'element-plus';
import {ref,reactive,onMounted} from 'vue'
let loginStatue = ref(true);
let toLogin,toRegist;
let formData = reactive({
    account: '',
    password: '',
})
onMounted(()=>{
    toLogin = document.getElementById('toLogin');
    toRegist = document.getElementById('toRegist');
})
function toLoginFun(){
    if(loginStatue.value === true) return;
    loginStatue.value = true;
    toLogin.classList.add('textColor');
    toRegist.classList.remove('textColor');
}
function toRegistFun(){
    if(loginStatue.value === false) return;
    loginStatue.value = false;
    toRegist.classList.add('textColor');
    toLogin.classList.remove('textColor');
    // console.log(loginStatue);
}
function login(){
    ElMessage({
        message: '我是你爹',
        type: 'success',
    })
    axios.post('http://123.57.74.65:8081/login', formData).then((res) => {
        if(res.data.message === 'ok') {
         router.push('/main')
        }
    })
    
}
</script>

<style scoped>
.container {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    /* display: flex;
            justify-content: center;
            align-items: center; */
    height: 100vh;
    width: 100vw;
    position: relative;
}

.container>h2 {
    width: 500px;
    position: absolute;
    top: 10%;
    left: 79%;
    transform: translate(-50%, -50%);
    font-size: 35px;
}

.login-container {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    height: 400px;
}

.login-container h2 {
    text-align: center;
}

.login-form {
    margin-top: 20px;
}
.regist-form{
    margin-top: 20px;
}
.regist-form>input{
    outline-color: #7acc35;
    width: 100%;
    padding: 10px;
    margin-bottom: -12px;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-sizing: border-box;
    height: 40px;
}
.regist-form>button{
    margin-top: 50px;
    width: 100%;
    padding: 10px;
    background-color: #7acc35;
    height: 40px;
    border: none;
    color: #fff;
    border-radius: 12px;
    cursor: pointer;
}
.login-form>input {
    outline-color: #7acc35;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-sizing: border-box;
    height: 40px;
}

.login-form>button {
    margin-top: 50px;
    width: 100%;
    padding: 10px;
    background-color: #7acc35;
    height: 40px;
    border: none;
    color: #fff;
    border-radius: 12px;
    cursor: pointer;
}

.login-form>button:hover {
    background-color: #87d149;
}

.userNameText {
    color: rgb(166, 166, 166);
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 12px;
}

.loginText {
    cursor: pointer;
    font-size: 20px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.416);
}

.registText {
    cursor: pointer;
    position: absolute;
    left: 25%;
    top: 0;
    font-size: 20px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.416);
}

.textColor {
    color: rgba(0, 0, 0, 1);
}

#button {
    font-size: 15px;
}
</style>
