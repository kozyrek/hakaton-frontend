import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  activeUser: {},
  token: {
    accessToken: "",
    refreshToken: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_user: (state, action) => {
      // const { name } = action.payload;
      state.user = { ...action.payload };
    },
    add_token: (state, action) => {
      state.token = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    logout: (state) => {
      state.token = {
        accessToken: "",
        refreshToken: "",
      };
      state.user = {};
    },
  },
});

export const { set_user, add_token, logout } = userSlice.actions;

export default userSlice.reducer;
