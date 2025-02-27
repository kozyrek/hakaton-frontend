import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import LayoutLogin from "./layoutLogin";
import { Link, useNavigate } from "react-router-dom";
import { loginFields } from "./utils/utils";
import Inputs from "../../components/inputs/inputs";

import styles from "./styles/formLogin.module.css";
import stylesReg from "./styles/registration.module.css";

// import ShowPassword from "./images/showPassword";
import { validateField, validateForm } from "./utils/validateForm";

export default function Login() {
  // const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { applicableFields, errorFields } = loginFields.reduce(
      (acc, field) => {
        acc.applicableFields[field.name] = {
          value: "",
          type: field.type,
        };
        acc.errorFields[field.name] = "";
        return acc;
      },
      { applicableFields: {}, errorFields: {} }
    );

    setFormData((prev) => ({
      ...prev,
      ...applicableFields,
    }));

    setFormError(errorFields);
  }, []);

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: { value: value, type: formData[name].type },
    });

    if (timerRef.current) {
      clearTimeout(timerRef);
    }

    timerRef.current = setTimeout(() => {
      validateField(value, formData[name].type, name, setFormError);
    }, 1500);
  };

  const handleSubmit = () => {
    const errors = validateForm(formData, formError, setFormError);
    if (!errors) return;
    if (
      formData["email"].value === "an@an.ru" &&
      formData["retryPassword"].value === "Ayk021188!"
    ) {
      navigate("/profile");
    } else {
      console.log("false");
    }
  };
  return (
    <LayoutLogin>
      <Container
        fluid
        className={styles.containerForm}
      >
        <div className={styles.form}>
          <h3 className={styles.h3}>Вход</h3>
          <div className={styles.isNoAccount}>
            Нет аккаунта?{" "}
            <Link
              to="/registration"
              className={styles.linkRegister}
            >
              Зарегистрироваться
            </Link>
          </div>
          {/* <div className={styles.inputGroup}>
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
          </div> */}

          {loginFields.map((item) => {
            return (
              <div
                className={`${stylesReg.conInputs}`}
                key={item.id}
              >
                <Inputs
                  {...item}
                  formData={formData}
                  formError={formError}
                  onChange={handleChange}
                />
              </div>
            );
          })}

          <div>
            <button
              onClick={handleSubmit}
              className={styles.enterButton}
            >
              Вход
            </button>
          </div>
          <div className={styles.isNoAccount}>
            Забыли пароль?{" "}
            <Link
              to="/recovery"
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
