<template>
    <div class="personCenter">
        <div class="pc-block">
            <div class="pcb-img">
                <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </div>
            <!-- <div>{{ accountInfo.name || accountInfo.username }}</div> -->
            <div>于森</div>
        </div>
        <div class="pc-input">
            <el-form :model="form" label-width="120px" @validate="validate" >
                <el-form-item label="姓名:">
                    <el-input v-model="form.name" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="生日:">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="请选择出生年月日" :editable="false"
                        value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="地区:">
                    <el-cascader v-model="form.location" :options="provAndCity" placeholder="请选择" />
                </el-form-item>
                <el-form-item label="手机:" prop="phone" :rules="{ len: 11, message: '手机号应为11位', trigger: 'change'}">
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
import { useRouter } from 'vue-router';
// import { useCar } from '../../store';
// import { changeUserInfoFun } from '../../api/user'
import provAndCity from '../area/area.json'
import { ElMessage } from 'element-plus';
// let accountInfo = JSON.parse(sessionStorage.getItem('accountInfo'));
// const form = reactive({
//     name: accountInfo.name,
//     birthday: accountInfo.birthday,
//     location: accountInfo.location,
//     phone: accountInfo.phone
// })
const form = reactive({
    name: '',
    birthday: '',
    location: '',
    phone: ''
})
// 表单验证
// const ruleBoolean = ref(true);
// function validate(a, b) {
//     if(a === 'phone') {
//         ruleBoolean.value = b;
//     }
// }
// 确认更新
// async function onSubmit() {
//     if(ruleBoolean.value) {
//         if (!(form.name === accountInfo.name &&
//         form.birthday === accountInfo.birthday &&
//         JSON.stringify(form.location) === JSON.stringify(accountInfo.location) &&
//         form.phone === accountInfo.phone)
//     ) {
//         const params = {
//             id: accountInfo.id,
//             name: form.name,
//             birthday: form.birthday,
//             location: form.location,
//             phone: form.phone
//         }

//         // try {
//         //     const { data } = await changeUserInfoFun(params);
//         //     if (data.code === 200) {
//         //         sessionStorage.setItem('accountInfo', JSON.stringify(data.accountInfo));
//         //         ElMessage({
//         //             type: 'success',
//         //             message: data.msg
//         //         })
//         //         router.go(0);
//         //     } else {
//         //         ElMessage({
//         //             type: 'warning',
//         //             message: data.msg
//         //         })
//         //     }
//         // } catch (error) {
//         //     console.log(error);
//         //     ElMessage({
//         //         type: 'error',
//         //         message: '更新出现问题！'
//         //     })

//         // }
//     } else {
//         ElMessage({
//             type: 'info',
//             message: '您并未修改无需更新！'
//         })
//     }
//     } else {
//         ElMessage({
//                 type: 'error',
//                 message: '手机号应为11位'
//             })
//     }


// }
// 退出登录
// const quitDialog = ref(false);
// const router = useRouter();
// function quitFun() {
//     quitDialog.value = false;
//     if (sessionStorage.getItem('routePath')) {
//         sessionStorage.removeItem('routePath')
//     }
//     if (sessionStorage.getItem('tabRoutes')) {
//         sessionStorage.removeItem('tabRoutes')
//     }
//     if (sessionStorage.getItem('accountInfo')) {
//         sessionStorage.removeItem('accountInfo');
//     }
//     // useCar().$reset()
//     sessionStorage.removeItem('userInfo')
//     router.push('/dashboard');
// }
</script>

<style lang="scss" scoped>
.personCenter {
    background-color: #ffffff;
    border-radius: 10px;
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
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
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
</style>