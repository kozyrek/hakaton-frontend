import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
  },
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
    add_user: (state, action) => {
      const { name } = action.payload;
      state.user = {
        name,
      };
    },
    add_token: (state, action) => {
      state.token = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
  },
});

export const { add_user, add_token } = userSlice.actions;

export default userSlice.reducer;
