// src/socket.js
import { io } from "socket.io-client";

// 配置 Socket.io 客户端连接
const socket = io("http://localhost:8080", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
