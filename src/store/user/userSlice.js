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
    // ДОБАВЛЕНО: action для обновления данных пользователя
    update_user: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    // ДОБАВЛЕНО: action для обновления фото пользователя
    update_user_photo: (state, action) => {
      state.user.photoPath = action.payload;
    },
    // ДОБАВЛЕНО: action для обновления участника (participant)
    update_user_participant: (state, action) => {
      if (!state.user.participant) {
        state.user.participant = {};
      }
      state.user.participant = { ...state.user.participant, ...action.payload };
    },
    // ДОБАВЛЕНО: action для обновления ментора (mentor)
    update_user_mentor: (state, action) => {
      if (!state.user.mentor) {
        state.user.mentor = {};
      }
      state.user.mentor = { ...state.user.mentor, ...action.payload };
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
  update_user, // ДОБАВЛЕНО
  update_user_photo, // ДОБАВЛЕНО
  update_user_participant, // ДОБАВЛЕНО
  update_user_mentor, // ДОБАВЛЕНО
} = userSlice.actions;

export default userSlice.reducer;