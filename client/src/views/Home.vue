<template>
    <h1>首页</h1>
    <el-button @click="logout">退出登录</el-button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
}
</script>