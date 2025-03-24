import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Registration from "./pages/auth/registration";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Profile from "./pages/profile/profile";
import ProjectStages from "./pages/projectStages";

import PasswordRecovery from "./pages/auth/passwordRecovery";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ErrorPage from "./pages/404";
import { ROUTES } from "./utils/constants";
import "./swiper.css";
import "./bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <BrowserRouter>
          <div className="bodyContainer">
            <Header />
            <Routes>
              <Route
                index
                path={ROUTES.MAIN}
                element={<Home />}
              />
              <Route
                path={ROUTES.REGISTRATION}
                element={<Registration />}
              />
              <Route
                path={ROUTES.LOGIN}
                element={<Login />}
              />
              <Route
                path={ROUTES.PROFILE}
                element={<Profile />}
              />
              <Route
                path={ROUTES.RECOVERY}
                element={<PasswordRecovery />}
              />
              <Route
                path="*"
                element={<ErrorPage />}
              />
              <Route
                path={ROUTES.STAGES}
                element={<ProjectStages />}
              />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
