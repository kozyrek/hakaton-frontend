import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  documents: [],
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
      state.user = { ...action.payload };
    },
    add_token: (state, action) => {
      state.token = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    set_user_files: (state, action) => {
      state.documents = action.payload;
    },
    add_user_file: (state, action) => {
      const arr = state.documents || [];
      state.documents = [...arr, action.payload];
    },
    delete_user_file: (state, action) => {
      const arr = state.documents.filter((item) => item.id !== action.payload);
      state.documents = arr;
    },
    logout: (state) => {
      state.token = {
        accessToken: "",
        refreshToken: "",
      };
      state.documents = [];
      state.user = {};
    },
  },
});

export const {
  set_user,
  add_token,
  add_user_file,
  set_user_files,
  delete_user_file,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
