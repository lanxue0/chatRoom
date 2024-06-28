import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import socket from "../socket";

interface Message {
  from: string;
  fromUser: string;
  msg: string;
}

export function Msg() {
  const [showMsg, setShowMsg] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const msg: Message[] = useSelector((state: RootState) => state.msg);
  const handleSend = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("this.props.user.username:", user.name);
    socket.emit("msg", user.name, showMsg);
    setShowMsg("");
  };
  return (
    <div>
      <div>
        <div className="from-group">
          <textarea
            className="from-control"
            value={showMsg}
            onChange={(e) => setShowMsg(e.target.value)}
          ></textarea>
        </div>
        <div className="from-group">
          <button
            className="btn btn-default"
            type="button"
            onClick={handleSend}
          >
            发送
          </button>
        </div>
      </div>
      <ul>
        {msg.map(({ from, fromUser, msg }, index) => (
          <li key={index}>
            <h3
              className="list-group-item-heading"
              style={{ color: from == user.ID ? "red" : "" }}
            >
              {fromUser}
            </h3>
            <p className="list-group-item-text">{msg}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
