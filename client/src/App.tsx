import React, { useEffect } from "react";
import "./css/App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Msg } from "./components/Msg";
import { AppDispatch, RootState } from "./store";
import socket from "./socket";
import { setUserId } from "./store/userSlice";
import { addMsg } from "./store/msgSlice";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  // 使用 useEffect 来管理事件监听器
  useEffect(() => {
    // 得到初始化用户ID
    socket.on("ID", (ID: string) => {
      dispatch(setUserId(ID));
    });

    // 接收消息
    socket.on("broadcast", (from: string, fromUser: string, msg: string) => {
      dispatch(addMsg({ from, fromUser, msg }));
    });

    // 清除监听器，防止内存泄漏
    return () => {
      socket.off("ID");
      socket.off("broadcast");
    };
  }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Login}></Route>
          <Route path="/msg" Component={Msg}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
