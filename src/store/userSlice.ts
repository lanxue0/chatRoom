// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
  ID: number | null;
  name: string | null;
}

const initialState: UsersState = {
  ID: null,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.ID = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setUserId, setUserName } = userSlice.actions;
export default userSlice.reducer;
