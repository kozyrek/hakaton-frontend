import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import LayoutLogin from "./layoutLogin";
import { Link, useNavigate } from "react-router-dom";
import { loginFields } from "./utils/utils";
import Inputs from "../../components/inputs/inputs";
import { validateField, validateForm } from "./utils/validateForm";
import { useDispatch } from "react-redux";
import { add_token } from "../../store/user/userSlice";
import { getToken } from "../../api/getToken";
import { ROUTES } from "../../utils/constants";

import styles from "./styles/formLogin.module.css";
import stylesReg from "./styles/registration.module.css";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = async () => {
    const errors = validateForm(formData, formError, setFormError);
    if (!errors) return;
    setLoading(true);
    const token = await getToken(
      formData["email"].value,
      formData["retryPassword"].value
    );
    setLoading(false);
    if (token) {
      dispatch(add_token(token));
      navigate(ROUTES.PROFILE);
    }
  };

  return (
    <LayoutLogin>
      <Container
        fluid
        className={styles.containerForm}
      >
        <div className={styles.form}>
          {loading ? (
            <h2 style={{ position: "absolute", top: "50%", left: "43%" }}>
              Loading...
            </h2>
          ) : (
            <>
              <h3 className={styles.h3}>Вход</h3>
              <div className={styles.isNoAccount}>
                Нет аккаунта?{" "}
                <Link
                  to={ROUTES.REGISTRATION}
                  className={styles.linkRegister}
                >
                  Зарегистрироваться
                </Link>
              </div>
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
                  to={ROUTES.RECOVERY}
                  className={styles.linkRegister}
                >
                  Восстановить
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </LayoutLogin>
  );
}
