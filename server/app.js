//引入依赖
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

//创建express实例
const app = express();
const port = 3000;

//配置JWT密钥
const JWT_SECRET = 'your_secret_key';

//配置CORS
app.use(cors());
app.use(express.json());

//模拟数据库中的管理员
const adminUser = {
    username: 'admin',
    password: '123456',
    role: 'admin'
}

//登录接口
app.post('/api/login', (req, res) => {
    try {
        const { username, password } = req.body;
        //验证账号和密码
        if (!username || !password) {
            return res.status(400).json({ msg: '账号和密码不能为空' });
        }
        if (username !== adminUser.username || password !== adminUser.password) {
            return res.status(401).json({ msg: '账号或密码错误' });
        }

        //生成JWT token
        const token = jwt.sign(
            { username: adminUser.username, role: adminUser.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        //返回成功结果
        res.json({
            code: 200,
            msg: '登录成功',
            data: {
                token,
                username: adminUser.username,
                role: adminUser.role
            }
        })
    } catch (err) {
        res.status(500).json({msg: '登录失败', error: err.message});
    }
});

//验证token接口
app.get('/api/verify-token', (req, res) => {
    try {
        //获取请求头中的token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({msg: '未提供token'});
        }

        //验证token
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({
            code: 200,
            msg: 'token验证成功',
            data: decoded
        })
    } catch (err) {
        res.status(401).json({msg: 'token验证失败', error: err.message});
    }
})

//启动服务器
app.listen(port, () => {
    console.log(`服务器已启动,http://localhost:${port}`);
})