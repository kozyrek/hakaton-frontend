import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Registration from "./pages/auth/registration";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Profile from "./pages/profile/profile";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bodyContainer">
        <Header/>
        <Routes>
          <Route
            index
            path="/"
            element={<Home />}
          />
          <Route
            path="registration"
            element={<Registration />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route path="/profile" element={<Profile />} />

        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
