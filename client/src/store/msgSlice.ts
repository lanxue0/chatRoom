// msgSlice.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Message {
  from: string;
  fromUser: string;
  msg: string;
}

const msgSlice = createSlice({
  name: "msg",
  initialState: [] as Message[],
  reducers: {
    addMsg: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
  },
});

export const { addMsg } = msgSlice.actions;
export default msgSlice.reducer;
