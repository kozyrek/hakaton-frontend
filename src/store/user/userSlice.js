import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  activeUser: {},
  token: {
    accessToken: "",
    refreshToken: "",
  },
  personalInfo: {
    interests:
      "Программирование, разработка веб-сайтов, создание мобильных приложений, робототехника, искусственный интеллект. Участие в олимпиадах, конференциях, конкурсах научных работ, проектная деятельность. Компьютерные игры, консольные игры, мобильные игры, киберспорт, стриминг.",
    olympiads: [
      "Олимпиада «Высшая проба» по математике",
      "Олимпиада школьников «Ломоносов» по математике",
    ],
    progress: [],
    download: ["Грамоты.pdf"],
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
      //временно
      state.personalInfo = {
        interests:
          "Программирование, разработка веб-сайтов, создание мобильных приложений, робототехника, искусственный интеллект. Участие в олимпиадах, конференциях, конкурсах научных работ, проектная деятельность. Компьютерные игры, консольные игры, мобильные игры, киберспорт, стриминг.",
        olympiads: [
          "Олимпиада «Высшая проба» по математике",
          "Олимпиада школьников «Ломоносов» по математике",
        ],
        progress: [],
        download: ["Грамоты.pdf"],
      };
    },
    add_user_file: (state, action) => {
      const arr = state.personalInfo.download || [];
      state.personalInfo.download = [...arr, action.payload];
    },
    delete_user_file: (state, action) => {
      const arr = state.personalInfo.download.filter(item => item !== action.payload) 
      state.personalInfo.download = arr
    },
    logout: (state) => {
      state.token = {
        accessToken: "",
        refreshToken: "",
      };
      state.user = {};
      state.personalInfo = {
        interests: "",
        olympiads: [],
        progress: [],
        download: [],
      };
      
    },
  },
});

export const { set_user, add_token, add_user_file, delete_user_file, logout } = userSlice.actions;

export default userSlice.reducer;
