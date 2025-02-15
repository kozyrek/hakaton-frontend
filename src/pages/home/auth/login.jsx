import { Container } from "react-bootstrap";
import LayoutLogin from "./layoutLogin";

import styles from "./styles/formLogin.module.css";
import { Link } from "react-router-dom";
import ShowPassword from "./images/showPassword";
import { useState } from "react";

export default function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <LayoutLogin>
      <Container
        fluid
        className={styles.containerForm}
      >
        <div className={styles.form}>
          <h3>Вход</h3>
          <div className={styles.isNoAccount}>
            Нет аккаунта?{" "}
            <Link
              to="/registration"
              className={styles.linkRegister}
            >
              Зарегистрироваться
            </Link>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Логин"
              className={styles.loginInput}
            />
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Пароль"
              className={`${styles.loginInput} mt-3`}
            />
            <button
              className={styles.showPassword}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              <ShowPassword />
            </button>
          </div>
          <div>
            <button className={styles.enterButton}>Вход</button>
          </div>
          <div className={styles.isNoAccount}>
            Забыли пароль?{" "}
            <Link
              to="/registration"
              className={styles.linkRegister}
            >
              Восстановить
            </Link>
          </div>
        </div>
      </Container>
    </LayoutLogin>
  );
}
