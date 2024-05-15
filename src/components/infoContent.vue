<template>
    <div v-if="other === true" class="container-left">
      <div class="avatar"></div>
      <div class="mesContent">
        {{ message }}
      </div>
    </div>
    <div v-else class="container-right" >
      <div class="myAvatar"></div>
      <div class="myContent">
        {{ message }}
      </div>
      <div style="height: calc(var(--myContent-height));"></div>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps, onMounted } from 'vue'
const props = defineProps({
  //子组件接收父组件传递过来的值
  other: Boolean,
  message: String
})
const { other, message } = props;
onMounted(() => {
  let myBox = document.getElementsByClassName('myContent')
  let container = document.getElementsByClassName('container')
  // console.log(other);
  // document.querySelector('.container').style.height = `${document.querySelector('.myContent').offsetHeight + 8 }px`;
})
// function toScenic(){
//     console.log(props);
// }
// let other = ref(false);
</script>

<style scoped>
.container-right {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  flex-shrink: 0;
  margin-top: 10px;
  /* position: relative; */
  /* display: table; */
}
.container-left {
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  /* margin-top: 10px; */
  /* position: relative; */
  /* display: table; */
}
.avatar {
  height: 40px;
  width: 40px;
  background-color: rgb(116, 116, 116);
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  /* position: absolute;
  left: 25PX;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  width: 40px;
  background-color: rgb(116, 116, 116);
  border: 0;
  border-radius: 4px; */
}

.myAvatar {
  height: 40px;
  width: 40px;
  background-color: rgb(108, 191, 0);
  border: 0;
  border-radius: 4px;
  margin-right: 10px
  /* position: absolute;
  right: 25PX;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  width: 40px;
  background-color: rgb(108, 191, 0);
  border: 0;
  border-radius: 4px; */
}

.mesContent {
  text-align: left;
  white-space: pre-wrap;
	word-break: break-word;
  max-width: 200px;
  min-height: 20px;
  min-width: 20px;
  background-color: rgb(116, 116, 116);
  border: 0;
  border-radius: 5px;
  padding: 10px;
  margin-left: 25px;
  position: relative;
  /* max-width: 200px;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 90px;
  height: 20px;
  min-width: 20px;
  background-color: rgb(116, 116, 116);
  border: 0;
  border-radius: 5px; */
}

.myContent {
  text-align: left;
  white-space: pre-wrap;
	word-break: break-word;
  max-width: 200px;
  min-height: 20px;
  min-width: 20px;
  background-color: rgb(108, 191, 0);
  border: 0;
  border-radius: 5px;
  padding: 10px;
  margin-right: 25px;
  position: relative;
  flex-basis: auto;
  flex-shrink: 0;
  /* text-align: left;
  display: table-cell;
  vertical-align: bottom;
  white-space: normal;
	word-break: break-all;
  max-width: 200px;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 90px;
  min-height: 20px;
  min-width: 20px;
  background-color: rgb(108, 191, 0);
  border: 0;
  border-radius: 5px; */
}

.myContent::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -6.5px;
  display: block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  /*上边框*/
  border-right: none;
  /*右边框*/
  border-bottom: 5px solid transparent;
  /*下边框*/
  border-left: 7px solid rgb(108, 191, 0);
  /*左边框取消*/
}

.mesContent::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -6.5px;
  display: block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  /*上边框*/
  border-left: none;
  /*右边框*/
  border-bottom: 5px solid transparent;
  /*下边框*/
  border-right: 7px solid rgb(116, 116, 116);
  /*左边框取消*/
}
</style>
