<template>
  <div id="frindCard" class="container" @click="toChat()">
    <div class="avatar"></div>
    <div class="frindName">
        {{props.username}}
    </div>
  </div>
</template>

<script setup>
import {ref,reactive,defineProps,onMounted} from 'vue'
// 点击状态
let pointChat = ref(false);
// 好友列表选择
// let selectedIndex = ref();
const props = defineProps({
  //子组件接收父组件传递过来的值
  index: Number,
  selectedIndex: Number,
  username: String
})
let frindCard;
const emit = defineEmits(['pointChart'])
onMounted(()=>{
    frindCard = document.getElementById('frindCard');
    // console.log(index);
})
const index = props.index;
const selectedIndex = ref(-1)
const toChat = () =>{
    selectedIndex.value = props.selectedIndex
    if(selectedIndex.value == index) return;
    emit('pointChart',index, props.username)
}
</script>

<style scoped>
.container{
    cursor: pointer;
    color: rgba(252, 252, 252, 0.677);
    width: 100%;
    height: 60px;
    position: relative;
    background-color: rgb(42, 46, 51)
}
.container.active{
    background-color: rgb(36, 37, 42);
}
.container:hover{
    background-color: rgb(36, 37, 42);
}
.avatar{
    position: absolute;
    /* top: 50%;
    transform: translateY(-50%); */
    margin: 10px;
    height: 40px;
    width: 40px;
    background-color: rgb(93, 84, 73);
    border: 0;
    border-radius: 4px;
}
.frindName{
    /* font-family: PingFang SC, PingFang SC; */
    position: absolute;
    top: 10px;
    left: 60px;
    font-size: 14px;
    font-weight: 600;
}
</style>
