import axios from 'axios';
import { ElMessage } from 'element-plus';

//封装axios请求
const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})

//请求拦截器
service.interceptors.request.use(
    (config) => {
        //获取本地存储的token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        ElMessage.error('请求失败:' + error.message);
        return Promise.reject(error);
    }
)

//响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code !== 200) {
            ElMessage.error(res.msg || '请求失败');
            return Promise.reject(res);
        }
        return res;
    },
    (error) => {
        const message = error?.response?.data?.msg || error.message || '请求失败';
        ElMessage.error(message);
        return Promise.reject(error);
    }
)

export default service;