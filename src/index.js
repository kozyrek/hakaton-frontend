import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/home/auth/login";
import Registration from "./pages/home/auth/registration";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bodyContainer">
        <Header></Header>
        <Routes>
          <Route
            index
            path="/"
            element={<Home />}
          />
          <Route
            path="dashboard"
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
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
