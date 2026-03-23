<template>
    <div class="login-container">
        <div class="login-box">
            <h2 class="login-title">后台管理系统</h2>
            <el-form 
            ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="80px"
            class="login-form"
            >
              <el-form-item label="账号" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入账号"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"/>
              </el-form-item>
              <el-form-item class="login-btn">
                <el-button type="primary" @click="handleLogin" :loading="loading" style="width: 100%">登录</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import service from '../utils/request'

const router = useRouter();
//加载状态
const loading = ref(false);
//表单引用
const loginFormRef = ref(null);
//表单数据
const loginForm = reactive({
    username: '',
    password: ''
})
//表单验证规则
const loginRules = reactive({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})

const handleLogin = async() => {
    //表单验证
    try {
        await loginFormRef.value.validate();
        loading.value = true;

        //调用后端登录接口
        const res = await service.post('/api/login', loginForm);
        //保存token和用户信息
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('role', res.data.role);
        //跳转首页
        router.push('/');
        
    } catch (error) {
        // 登录失败提示已在 axios 响应拦截器中统一处理
        // 这里只保留兜底日志，避免账号密码错误时重复报错输出
        if (!error?.response) {
            console.error('登录流程异常:', error);
        }
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.login-container {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-box {
    width: 400px;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px  rgba(0, 0, 0, 0.1);
}
.login-title {
    text-align: center;
    margin-bottom: 20px;
    color: #1989fa;
}
.login-form {
    margin-top: 20px;
}
.login-btn {
    margin-bottom: 0;
}
</style>