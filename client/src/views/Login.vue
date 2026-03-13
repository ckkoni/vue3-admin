<template>
    <div class="login">
        <h2>管理员登陆</h2>
        <el-input v-model="username" placeholder="请输入用户名"/>
        <el-input v-model="password" placeholder="请输入密码" type="password"/>
        <el-button type="primary" @click="login">登陆</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const username = ref('');
const password = ref('');

const login = () => {
    console.log('点击登录')
    if (username.value && password.value) {
        localStorage.setItem('token', '123456')
        router.push('/')
    }
};
</script>