const http = require('http');
const Koa = require('koa');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // 使用解构赋值来获取 v4 方法
const cors = require('@koa/cors');

const app = new Koa();
// 使用 CORS 中间件
app.use(cors({
    origin: 'http://localhost:3000', // 允许的请求源
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type']
}));
const httpServer = http.createServer(app.callback());
// 监听端口
const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const wsServer = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})

// 处理 socket.io 连接
wsServer.on('connection', (socket) => {
    console.log('A user connected');

    const ID = uuidv4(); // 生成唯一的 UUID

    // 发送 UUID 给客户端
    socket.emit('ID', ID);

    // 监听客户端发送的消息
    socket.on('msg', (user, msg) => {
        wsServer.emit('broadcast', ID, user, msg); // 广播消息给所有连接的客户端
    });

    // 处理断开连接事件
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
