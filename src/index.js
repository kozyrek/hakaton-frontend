import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import { Container, Row, Col } from "react-bootstrap";
import Registration from "./pages/auth/registration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        {/* Navbar заменишь на свой компонент */}
        <div
          style={{
            height: "80px",
            width: "100%",
            background: "linear-gradient(90deg, #be1b86, #2b306c)",
            zIndex: "1",
            marginBottom: "-2px",
          }} // Так стили не пишем) не засоряем код
        >
          <Container
            fluid="xxl"
            style={{ paddingTop: "29px", color: "white" }}
          >
            <Row>
              <Col>просто нав бар</Col>
            </Row>
          </Container>
        </div>
        {/* Navbar end */}
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
        {/* footer */}
        <div
          style={{
            marginTop: "-2px",
            minHeight: "314px",
            background: "#2B306C",
            color: "white",
            zIndex: "2",
          }}
        >
           
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
