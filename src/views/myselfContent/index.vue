<template>
  <div class="container">
    <div class="myselfBox">
        <div class="myAvatar"></div>
        <div class="myInfo">
            <span>昵称：张建</span>
        </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.container{
    width: 100vw;
    height: 100vh;
    /* position: relative; */
}
.myselfBox{
    background-color: antiquewhite;
    width: 100%;
    height: 85%;
    /* margin-top: 15%; */
    position: relative;
    /* position: absolute; */
    top: 15%;
}
.myAvatar{
    width: 100px;
    height: 100px;
    background-color: black;
    border: 0;
    border-radius: 100px;
    transform: translate(50px,-50px);
}
.myInfo{
    background-color: aquamarine;
    width: 60%;
    position: absolute;
    top: -35px;
    left: 160px;
    font-size: 25px;
    font-weight: 700;
}
</style>
