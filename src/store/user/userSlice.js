import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  documents: [],
  token: {
    accessToken: "",
    refreshToken: "",
  },
  photoVersion: 0, // ДОБАВЛЕНО: счетчик версий для принудительного перерендера
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
      state.photoVersion = 0; // Сброс версии фото
    },
    update_user: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    update_user_photo: (state, action) => {
      state.user.photoPath = action.payload;
      // ДОБАВЛЕНО: увеличиваем версию фото для принудительного перерендера
      state.photoVersion += 1;
    },
    update_user_participant: (state, action) => {
      if (!state.user.participant) {
        state.user.participant = {};
      }
      state.user.participant = { ...state.user.participant, ...action.payload };
    },
    update_user_mentor: (state, action) => {
      if (!state.user.mentor) {
        state.user.mentor = {};
      }
      state.user.mentor = { ...state.user.mentor, ...action.payload };
    },
    // ДОБАВЛЕНО: принудительное обновление версии фото
    increment_photo_version: (state) => {
      state.photoVersion += 1;
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
  update_user,
  update_user_photo,
  update_user_participant,
  update_user_mentor,
  increment_photo_version, // ДОБАВЛЕНО
} = userSlice.actions;

export default userSlice.reducer;