import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import LayoutLogin from "./layoutLogin";
import { Link, useNavigate } from "react-router-dom";
import { loginFields } from "./utils/utils";
import Inputs from "../../components/inputs/inputs";
import Loader from "../../components/loader/loader";
import { validateField, validateForm } from "./utils/validateForm";
import { useDispatch } from "react-redux";
import { add_token, set_user } from "../../store/user/userSlice";
import { getToken } from "../../api/getToken";
import { ROUTES } from "../../utils/constants";

import styles from "./styles/formLogin.module.css";
import stylesReg from "./styles/registration.module.css";
import getUser from "../../api/getUser";
import ModalWindow from "../../components/modalWindow";
import ModalWrapper from "../../components/modalOverlay";
import Button from "../../components/button/button";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, messages: [] });
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

  const getLoginErrorMessage = (error) => {
    console.log("Login error:", error);
    
    // Получаем текст ошибки из разных возможных мест
    let errorMessage = "";
    
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.response?.data?.detail) {
      errorMessage = error.response.data.detail;
    }
    
    console.log("Extracted error message:", errorMessage);
    
    // Обрабатываем конкретные сообщения об ошибках
    if (errorMessage.includes("Account not verified yet")) {
      return ["Аккаунт не подтвержден", "Пожалуйста, подождите, пока модератор подтвердит вашу регистрацию."];
    }
    if (errorMessage.includes("Incorrect email or password")) {
      return ["Неверный email или пароль", "Проверьте правильность введенных данных и попробуйте снова."];
    }
    if (errorMessage.includes("Invalid email or password")) {
      return ["Неверный email или пароль", "Проверьте правильность введенных данных и попробуйте снова."];
    }
    
    // Если ошибка - объект Axios error
    if (error.response) {
      const status = error.response.status;
      
      // Аккаунт не подтвержден
      if (status === 403) {
        return ["Аккаунт не подтвержден", "Пожалуйста, подождите, пока модератор подтвердит вашу регистрацию."];
      }
      
      // Неверные учетные данные
      if (status === 401 || status === 400) {
        return ["Неверный email или пароль", "Проверьте правильность введенных данных и попробуйте снова."];
      }
      
      // Ошибка сервера
      if (status === 500) {
        return ["Внутренняя ошибка сервера", "Попробуйте позже."];
      }
    }
    
    // Сетевая ошибка
    if (errorMessage.includes("Network Error")) {
      return ["Проблемы с подключением", "Проверьте интернет-соединение и попробуйте снова."];
    }
    
    // Общая ошибка - если ничего не подошло, показываем общее сообщение
    return ["Ошибка входа", "Попробуйте еще раз или обратитесь в поддержку."];
  };

  const closeErrorModal = () => {
    setErrorModal({ isOpen: false, messages: [] });
  };

  const handleSubmit = async () => {
    const errors = validateForm(formData, formError, setFormError);
    if (errors) return;
    
    setLoading(true);
    try {
      const token = await getToken(
        formData["email"].value,
        formData["retryPassword"].value
      );
      dispatch(add_token(token.data));
      const user = await getUser();
      dispatch(set_user(user));
      setLoading(false);
      navigate(ROUTES.PROFILE);
    } catch (error) {
      console.log("Login error:", error);
      
      const errorMessages = getLoginErrorMessage(error);
      
      // Показываем модальное окно с ошибкой
      setErrorModal({
        isOpen: true,
        messages: errorMessages
      });
    }
    setLoading(false);
  };

  return (
    <LayoutLogin>
      <Container
        fluid
        className={styles.containerForm}
      >
        <div className={styles.form}>
          {loading ? (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <Loader />
            </div>
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

      {/* Модальное окно для ошибок входа */}
      <ModalWrapper
        isOpen={errorModal.isOpen}
        onClose={closeErrorModal}
      >
        <ModalWindow
          title="Ошибка входа"
          setIsShow={closeErrorModal}
          buttonArea={[
            <Button
              key="close"
              text="Ок"
              onClick={closeErrorModal}
            />
          ]}
        >
          <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
            {errorModal.messages.map((message, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: index < errorModal.messages.length - 1 ? '10px' : '0',
                  padding: '0 10px',
                  fontWeight: index === 0 ? 'bold' : 'normal',
                  color: index === 0 ? '#333' : '#666'
                }}
              >
                {message}
              </div>
            ))}
          </div>
        </ModalWindow>
      </ModalWrapper>
    </LayoutLogin>
  );
}