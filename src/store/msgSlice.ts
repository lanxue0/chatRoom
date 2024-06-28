// msgSlice.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const msgSlice = createSlice({
  name: "msg",
  initialState: [] as string[],
  reducers: {
    addMsg: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
  },
});

export const { addMsg } = msgSlice.actions;
export default msgSlice.reducer;
