<template>
    <div class="personCenter">
        <div class="pc-block">
            <div class="pcb-img">
                <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </div>
            <!-- <div>{{ accountInfo.name || accountInfo.username }}</div> -->
            <div style="color: #fff;">{{ nickname }}</div>
        </div>
        <div class="pc-input">
            <el-form :model="form" label-width="120px" @validate="validate">
                <el-form-item label="用户名:">
                    <el-input v-model="form.name" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="性别:">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="0" />
                        <el-option label="女" value="1" />                        
                    </el-select>
                </el-form-item>
                <el-form-item label="地区:">
                    <el-cascader v-model="form.location" :options="provAndCity" placeholder="请选择" />
                </el-form-item>
                <el-form-item label="手机:" prop="phone" :rules="{ len: 11, message: '手机号应为11位', trigger: 'change' }">
                    <el-input v-model="form.phone" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" class="updateBtn">确认更新</el-button>
                    <el-button @click="quitDialog = true">退出登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog v-model="quitDialog" title="温馨提示" width="30%" align-center>
            <span class="dialog-text">未更新的数据不会保存，确认要退出登录吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="quitDialog = false">否</el-button>
                    <el-button class="goodBtn" @click="quitFun">
                        是
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import provAndCity from '../area/area.json'
import axios from 'axios';
import { ElMessage } from 'element-plus'
const userInfo = sessionStorage.getItem('userInfo');
const form = reactive({
    name: '',
    sex: '',
    location: '',
    phone: ''
})
const nickname = ref('');
async function getUserData() {
   try {
    const result = await axios.get(`http://123.57.74.65:8081/user/personal?id=${JSON.parse(userInfo).id}`);
    if (result.status === 200) {
        console.log(result)
        form.name = result.data.nickname;
        form.sex = result.data.sex;
        form.phone = result.data.phone;
        form.location = JSON.parse(result.data.location);
        nickname.value = result.data.account;
    }
   } catch (error) {
        console.log(error);
   }
}
getUserData()
const ruleBoolean = ref(true);
function validate(a, b) {
    if(a === 'phone') {
        ruleBoolean.value = b;
    }
}
async function onSubmit() {
    if(!ruleBoolean.value) {
        ElMessage({
                type: 'warning',
                message: '请输入正确的手机号格式'
            })
        return
    }
    const params = {
        Id: JSON.parse(userInfo).id,
        nickname: form.name,
        sex: form.sex,
        location: JSON.stringify(form.location),
        phone: form.phone
    }

    try {
        const result = await axios.post('http://123.57.74.65:8081/user/personalChange', params);
        console.log(result);
        if(result.data.message === '修改成功') {
            ElMessage({
                type: 'success',
                message: result.data.message
            })
        }
        // if (data.code === 200) {
        //     sessionStorage.setItem('accountInfo', JSON.stringify(data.accountInfo));
        //     ElMessage({
        //         type: 'success',
        //         message: data.msg
        //     })
        //     router.go(0);
        // } else {
        //     ElMessage({
        //         type: 'warning',
        //         message: data.msg
        //     })
        // }
    } catch (error) {
        console.log(error);
        ElMessage({
            type: 'error',
            message: '更新出现问题！'
        })

    }

}
// 退出登录
const quitDialog = ref(false);
const router = useRouter();
function quitFun() {
    quitDialog.value = false;
    if (sessionStorage.getItem('userInfo')) {
        sessionStorage.removeItem('userInfo')
    }
    if (sessionStorage.getItem('chatName')) {
        sessionStorage.removeItem('chatName')
    }
    sessionStorage.removeItem('selectedIndex');
    sessionStorage.removeItem('tabKey');
    if (sessionStorage.getItem('toid')) {
        sessionStorage.removeItem('toid');
    }
    // useCar().$reset()
    sessionStorage.removeItem('userInfo')
    router.push('/');
}
</script>

<style lang="scss" scoped>
.personCenter {
    background-color: #37383d;
    // border-radius: 10px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .pc-block {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 20px;

        .pcb-img {
            height: 120px;
            width: 120px;
            box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.263);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            margin-bottom: 10px;
        }
    }

    .pc-input {
        width: 400px;
        margin-left: -100px;

        .inp {
            margin: 5px 0px;
        }

        .updateBtn {
            margin-left: 100px;
            margin-right: 40px;
        }

        .el-button {
            margin-top: 20px;
            padding: 20px 30px;
        }
    }

    .dialog-footer {
        display: flex;
        justify-content: center;

        .el-button {
            padding: 20px 40px;
            margin: 0 20px;
        }

        .goodBtn {
            background-color: #123456;
            color: #ffffff;
            border: 1px solid #123456;
        }
    }

    .dialog-text {
        display: flex;
        justify-content: center;
    }
}

.el-button:active {
    border: 1px solid #123456;
}

.el-button:hover {
    color: #123456;
    border: 1px solid #123456;
    background-color: #ffffff;
}

.el-button:focus {
    color: #606266;
    background-color: #ffffff;
    border: 1px solid #dcdfe6;
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #123456 inset;
}

:deep(.el-cascader .el-input.is-focus .el-input__wrapper) {
    box-shadow: 0 0 0 1px #123456 inset;
}

:deep(.el-input) {
    width: 100%;
}

:deep(.el-cascader) {
    width: 100%;
}

:deep(.el-form-item__content) {
    margin-left: 0 !important;
}

:deep(.el-form-item__label) {
    color: #fff !important;
}
</style>