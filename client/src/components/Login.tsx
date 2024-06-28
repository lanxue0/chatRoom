import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUserName } from "../store/userSlice";

export function Login() {
  const [inputValue, setInputValue] = useState("");
  const history = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const rnd = Math.floor(Math.random() * 1000000);
  const handleLogin = () => {
    dispatch(setUserName(inputValue));
    setInputValue("");
    history("/msg");
  };
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h2 className="panel-title">登录</h2>
      </div>
      <div className="panel-body">
        <div className="from-group">
          <label htmlFor={"username" + rnd}></label>
          <input
            className="from-control"
            type="text"
            id={"username" + rnd}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入用户名"
          />
        </div>
        <div className="from-group" style={{ marginTop: "10px" }}>
          <button
            type="button"
            className="btn btn-default"
            onClick={handleLogin}
          >
            登录
          </button>
        </div>
      </div>
    </div>
  );
}
