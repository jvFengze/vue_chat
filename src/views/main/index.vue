<template>
    <div class="container" style="width: 100vw;height: 100vh;display: flex;position: relative;">
        <div class="leftBox">
            <div class="myself">
                <span>你好，于森~</span>
                <div class="avatar"></div>
                <div class="hoverUserCenter">
                    <div class="image"></div>
                    <div>
                        <span>你好，于森~</span>
                    </div>
                    <div class="pages">
                        <div>帮助中心</div>
                        <div @click="router.push('/personCenter')">个人中心</div>
                    </div>
                </div>
            </div>
            <div class="tabChange">
                <div :class="native === '0' ? 'native' : ''" @click="changeTabs(0)">好友列表</div>
                <div :class="native === '1' ? 'native' : ''" @click="changeTabs(1)">群聊列表</div>
            </div>
            <div class="frindList">
                <userCard :class="selectedIndex == index ? 'active' : ''" v-for="(item, index) of userList" :key="item"
                    :index=index :selectedIndex=selectedIndex @pointChart="toChart" :username="item.nickname" :toid="item.id">
                </userCard>
            </div>
            <div class="footer">
                <div class="findFrind">
                    <!-- <span class="input-group-text"></span> -->

                    <input type="text" placeholder="搜索">
                </div>
                <div class="addFrind" @click="addFrinds">
                    <svg t="1715313720100" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4654" width="30" height="30">
                        <path
                            d="M880.128 51.2h-736.256A92.7744 92.7744 0 0 0 51.2 143.872v736.3584a92.84608 92.84608 0 0 0 92.672 92.672h736.3584a92.84608 92.84608 0 0 0 92.672-92.672V143.872c-0.2048-51.2-41.5744-92.5696-92.7744-92.672zM727.9616 512.1024c0 19.8656-16.0768 36.0448-36.0448 36.0448H548.1472v143.7696c0 19.8656-16.0768 36.0448-36.0448 36.0448s-36.0448-16.0768-36.0448-36.0448V548.1472H332.3904c-19.8656 0-36.0448-16.0768-36.0448-36.0448 0-19.8656 16.0768-36.0448 36.0448-36.0448H476.16V332.3904c0-19.8656 16.0768-36.0448 36.0448-36.0448 19.8656 0 36.0448 16.0768 36.0448 36.0448V476.16h143.7696c19.7632 0 35.9424 16.0768 35.9424 35.9424z"
                            fill="#45484e" p-id="4655"></path>
                    </svg>
                </div>
                <div class="addBox" v-click-outside="handleClickOutside"
                    :class="visable == true ? 'box_transfrom' : ''">
                    <input type="text" placeholder="输入账号" v-model="account">
                    <div class="addFri" @click="addFriFun">添加</div>
                </div>
            </div>
        </div>

        <div class="rightBox">
            <div class="headerBox">
                <span>{{ chatName }}</span>
            </div>
            <div class="mainBox">
                <div class="infoBox">
                    <span v-if="a">选择一个朋友开始聊天吧~</span>
                    <infoContent v-else v-for="(item, index) in myInfo" :key="index" :other=item.other
                        :message=item.msg>
                    </infoContent>
                </div>
                <div class="postInfo">
                    <textarea type="text" placeholder="请输入..." v-model="inputValue" rows="5"
                        @keyup="handleKeyCode($event)"></textarea>
                    <input type="button" value="发送" @click="send">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import infoContent from '../../components/infoContent.vue'
import userCard from '../../components/userCard.vue'
import axios from "axios";
import { ElMessage } from 'element-plus';
// import WebSocket from 'websocket';
export default {
    components: {
        userCard,
        infoContent
    }
}
</script>
<script setup>
import axios from 'axios'
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
const userInfo = sessionStorage.getItem('userInfo');
const native = ref(sessionStorage.getItem('tabKey') || '0');
const router = useRouter();
const chatName = ref(sessionStorage.getItem('chatName') || '');
let selectedIndex = ref(Number(sessionStorage.getItem('selectedIndex')) > -1 ? Number(sessionStorage.getItem('selectedIndex')) : -1);

function changeTabs(key) {
    sessionStorage.removeItem('selectedIndex');
    sessionStorage.removeItem('chatName');
    chatName.value = '';
    selectedIndex.value = -1;
    if (key === 0) {
        sessionStorage.setItem('tabKey', '0')
        native.value = '0';
        getUserList()
    } else if (key === 1) {
        native.value = '1';
        sessionStorage.setItem('tabKey', '1');
        getUserList()
    }
}
function chatSocket(sendMsg) {
    // const params = {
    //     toid: sendId.value,
    //     id: JSON.parse(userInfo).id,
    //     message: '我是张海波'
    // }
    const socket = new WebSocket(`ws://123.57.74.65:8081/user/chat`);

    // 监听连接成功事件
    socket.onopen = () => {
        console.log('WebSocket connection established.');
        socket.send(JSON.stringify({id: JSON.parse(userInfo).id,toid: Number(sessionStorage.getItem('toid')),message: sendMsg}));
    };

    // 监听接收消息事件
    socket.onmessage = (event) => {
        console.log('Received message:', event.data);
    };

    // 监听连接关闭事件
    socket.onclose = () => {
        console.log('WebSocket connection closed.');
    };

    // 发送消息
}
// chatSocket();
let inputValue = ref('');
let other = ref(true);
let userList = ref([]);
let myInfo = reactive([])
let newMsg = reactive({})
let infoBox;
let a = false;
let addBox;
let visable = ref(false);
async function getUserList() {
    const params = {
        id: JSON.parse(userInfo).id
    }
    if (native.value === '0') {
        try {
            const result = await axios.post('http://123.57.74.65:8081/user/chat/getFriendList', params);
            console.log(result)
            userList.value = result.data.friends;
        } catch (error) {

        }
    } else if (native.value === '1') {
        try {
            const result = await axios.post('http://123.57.74.65:8081/user/chat/getGroupList', params);
            console.log(result)
            userList.value = result.data.groups;
        } catch (error) {

        }
    }
}
getUserList();
onMounted(() => {
    if(sessionStorage.getItem('chatName') && Number(sessionStorage.getItem('toid')) > -1) {
        getChatMessage(sessionStorage.getItem('toid'));
    }
    infoBox = document.querySelector('.infoBox');
    setTimeout(() => { infoBox.scrollTop = infoBox.scrollHeight; }, 0);
    addBox = document.querySelector('.addBox');
    // document.querySelector('.avatar').onclick = (event) => {
    //     event.preventDefault()
    //     document.querySelector('.hoverUserCenter').style.opacity = '1';
    //     document.querySelector('.hoverUserCenter').style.visibility = 'visible';
    // }
    document.onclick = (event) => {
        // console.log(event.target.className);
        // console.log(document.querySelector('.hoverUserCenter').contains(event.target));
        const hoverUserCenter = document.querySelector('.hoverUserCenter');
        if (event.target.className === 'avatar' || hoverUserCenter.contains(event.target)) {
            hoverUserCenter.style.opacity = '1';
            hoverUserCenter.style.visibility = 'visible';
        } else {
            hoverUserCenter.style.opacity = '0';
            hoverUserCenter.style.visibility = 'hidden';
        }
    }
})
watch(newMsg, (newval, oldval) => {
    myInfo.push(newval.value);
    setTimeout(() => { infoBox.scrollTop = infoBox.scrollHeight; }, 0)
})

const handleClickOutside = () => {
    // setTimeout
    if (visable.value == true) {
        visable.value = false
    }
}

const addFrinds = () => {
    setTimeout(() => {
        if (visable.value == true) return;
        visable.value = true;
    }, 0)

}
const handleKeyCode = (event) => {
    if (event.keyCode == 13) {
        if (!event.ctrlKey) {
            event.preventDefault();
            send();
        } else {
            inputValue.value += '\n';
        }
    }
    //     if (event.keyCode == 13) {

    //         if (!event.ctrlKey) {
    //         //   event.preventDefault();
    //           send;
    //         } else {
    //           searchValue.value += '\n';
    //         }
    //   }
}
const send = () => {
    const params = {
        // account: 'yusen',
        // password: '123456'
    };
    // let xhr = new XMLHttpRequest();
    // xhr.open('post','http://123.57.74.65:8080/login',params);
    // xhr.send();

    axios.post('http://123.57.74.65:8081/login')
        .then(response => {
            console.log(response.data.msg);
            // console.log('1');
        })
        .catch(error => {
            console.error('请求失败:', error);
        });
    //  const response = axios.post('http://123.57.74.65:8080/login', params)
    //  console.log(response);
    if (inputValue.value == '' || inputValue.value == '\n' || inputValue.value.replace(/\s+/g, ' ') == ' ') {
        inputValue.value = ''
        ElMessage({
            message: '请勿发送空内容',
            type: 'warning',
        })

        return;
    }
    // newMsg.value = { msg: inputValue.value, other: false }
    myInfo.push({ msg: inputValue.value, other: false });
    setTimeout(() => { infoBox.scrollTop = infoBox.scrollHeight; }, 0)
    chatSocket(inputValue.value);
    setTimeout(() => { inputValue.value = '' }, 0)
}

const toChart = async (index, username, toid) => {
    sessionStorage.setItem('toid', toid);
    sessionStorage.setItem('selectedIndex', index);
    sessionStorage.setItem('chatName', username)
    selectedIndex.value = index;
    chatName.value = username;
    myInfo.length = 0;
    getChatMessage(toid)
}
async function getChatMessage(toid) {
    const data = await axios.get(`http://123.57.74.65:8081/user/chat/getHistoryMessage?Id=${JSON.parse(userInfo).id}&toId=${toid}`)
    if(data.data.message === 'ok') {
        data.data.messageList.forEach((item) => {
            if(item.from_id == JSON.parse(userInfo).id) {
                myInfo.push({ msg: item.message, other: false });
    setTimeout(() => { infoBox.scrollTop = infoBox.scrollHeight; }, 0)
                // newMsg.value = { msg: item.message, other: false }
            } else if(item.id == JSON.parse(userInfo).id) {
                myInfo.push({ msg: item.message, other: false });
    setTimeout(() => { infoBox.scrollTop = infoBox.scrollHeight; }, 0)
                // newMsg.value = { msg: item.message, other: true }
            }
        })
    }
    console.log(data);
}
const account = ref('');

async function addFriFun() {
    try {
        const params = {
            friendId: Number(account.value),
            id: JSON.parse(userInfo).id
        }
        const result = await axios.post('http://123.57.74.65:8081/user/chat/addfriend', params);
        getUserList();
        account.value = ''
        ElMessage({
            message: '添加成功！',
            type: 'success'
        })
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
.leftBox {
    min-height: 560px;
    height: 100%;
    min-width: 250px;
    background-color: rgb(42, 46, 51);
    border-right: 1.5px solid rgb(71, 75, 82);
    display: flex;
    flex-direction: column;

    /* position: relative; */
    .myself {
        font-size: 20px;
        font-weight: 700;
        color: rgba(252, 252, 252, 0.677);
        height: 60px;
        background-color: rgba(42, 46, 51);
        border-bottom: 1.5px solid rgb(71, 75, 82);
        position: relative;
    }

    .frindList {
        flex: auto;
        overflow-y: auto;
    }

    .footer {
        height: 60px;
        width: 100%;
        background-color: rgba(42, 46, 51);
        border-top: 1.5px solid rgb(71, 75, 82);
        display: flex;

        .findFrind {
            width: 75%;
            height: 100%;
            position: relative;
            /* background-color: aliceblue */
        }

        .addFrind {
            height: 100%;
            width: 25%;
            position: relative;

            /* background-colorgb(33, 28, 20)ite; */
        }
    }
}

.addBox {
    border-top: 1.5px solid rgb(71, 75, 82);
    position: absolute;
    height: 0px;
    min-width: 250px;
    bottom: 61px;
    background-color: rgb(54, 56, 61);
    transition: all 0.5s;
    overflow: hidden;
    display: flex;
}

.addBox>input {
    padding: 5px;
    /* position: absolute;
    top: 30px; */
    margin-top: 30px;
    height: 20px;
    transform: translateY(-50%);
    margin-left: 10px;
    color: rgba(252, 252, 252, 0.677);
    background-color: rgb(54, 56, 61);
    border: 0;
    border-bottom: 1.5px solid rgb(88, 93, 101);
    /* border-radius: 3px; */
    width: 150px;
    outline: none;
    font-size: 16px;
}

.addBox>div {
    margin-top: 20px;
}

.box_transfrom {
    height: 60px;
}

/* .addFrind:active .addBox{
    background-color: #60646c
} */
/* .addBox:hover{
    background-color: #60646c;
} */
/* .box_transfrom{
    animation: appear 1s;
}
@keyframes appear {
    0%{
        height: 0px;
        transform: translateY(400px);
    }
    100%{
        height: 300px;
        transform: translateY(0px);
    }
} */
.addFrind>svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.addFrind>svg:hover {
    path {
        fill: #60646c;
    }
}

.findFrind>input {
    padding: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 10px;
    color: rgba(252, 252, 252, 0.677);
    background-color: rgb(69, 72, 78);
    border: 0;
    border-radius: 3px;
    width: 90%;
    outline: none;
    font-size: 16px;
}

.active {
    background-color: rgb(36, 37, 42);
}

.myself>span {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
}

.avatar {
    position: absolute;
    right: 25PX;
    top: 50%;
    transform: translateY(-50%);
    /* top: 50%;
    transform: translateY(-50%); */
    /* margin: 10px; */
    height: 40px;
    width: 40px;
    background-color: rgb(93, 84, 73);
    border: 0;
    border-radius: 4px;
}

.rightBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: auto;
    min-width: 500px;
    background-color: aquamarine;

    .headerBox {
        width: 100%;
        background-color: rgba(54, 56, 61);
        min-height: 60px;
        border-bottom: 1.5px solid rgb(71, 75, 82);
        position: relative;
    }

    .headerBox>span {
        font-size: 25px;
        color: rgba(252, 252, 252, 0.677);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 30px;
    }

    .mainBox {
        flex: auto;
        width: 100%;
        height: 100%;
        min-height: 500px;
        display: flex;
        flex-direction: column;
        position: relative;

        .postInfo {
            border-top: 1.5px solid rgb(71, 75, 82);
            width: 100%;
            min-height: 200px;
            background-color: rgba(54, 56, 61);
        }

        .infoBox {
            flex: auto;
            overflow-y: auto;
            text-align: center;
            flex: auto;
            background-color: rgba(54, 56, 61);
            display: flex;
            flex-direction: column;
            /* flex-wrap:wrap; */
        }
    }
}

.postInfo>textarea {
    resize: none;
    color: rgba(252, 252, 252, 0.677);
    font-size: 20px;
    border: 0;
    background-color: rgba(54, 56, 61);
    /* height: 30px; */
    width: 95%;
    margin: 10px;
    padding: 0;
    outline: none;
}

.postInfo>input {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    color: rgb(108, 191, 0);
    background-color: rgba(255, 255, 255, 0.2);
    border: 0;
    border-radius: 5px;
    width: 80px;
    height: 35px;
}

.postInfo>input:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.infoBox>span {
    color: rgba(252, 252, 252, 0.427);
    font-weight: 600;
    display: block;
    margin-top: 30px;
}

.addFri {
    color: aliceblue;
    cursor: pointer;
    margin-left: 10px;
}

.tabChange {
    /* background: ; */
    height: 50px;
    color: #fff;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    border-bottom: 1px solid rgb(71, 75, 82);
}

.tabChange>div {
    display: flex;
    height: 100%;
    align-items: center;
    cursor: pointer;
    /* width: 50%; */
    /* justify-content: center;
    align-items: center; */
}

.native {
    color: rgb(255, 213, 0);
}

.avatar {
    display: flex;
}

/* .avatar:hover + .hoverUserCenter {
    visibility: visible;
    opacity: 1;
} */
.hoverUserCenter {
    transition: all .5s;
    opacity: 0;
    visibility: hidden;
    background-color: #37383d;
    position: absolute;
    top: 65px;
    min-width: 230px;
    left: 10px;
    border-radius: 10px;
    /* min-height: 200px; */
    z-index: 100;
    padding: 30px 15px;
    box-sizing: border-box;
}

.image {
    height: 40px;
    width: 40px;
    background-color: rgb(93, 84, 73);
    border-radius: 5px;
    margin-bottom: 10px;
}

.pages {
    font-size: 16px;
    margin-top: 10px;
}
.pages div {
    cursor: pointer;
}
</style>
