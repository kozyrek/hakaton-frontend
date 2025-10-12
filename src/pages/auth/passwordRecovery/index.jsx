import { useRef, useState } from "react";
import Inputs from "../../../components/inputs/inputs";
import ModalWindow from "../../../components/modalWindow";
import { MODAL } from "../../../components/modalWindow/utils/constants";
import LayoutLogin from "../layoutLogin";
import Button from "../../../components/button/button";

import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { validateField } from "../utils/validateForm";
import { requestPasswordReset } from "../../../api/auth/passwordReset";
import { toast } from "react-toastify";

export default function PasswordRecovery() {
  const [formData, setFormData] = useState({
    login: { value: "", type: "email" },
  });
  const [formError, setFormError] = useState({
    login: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef(null);

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: { value: value, type: formData[name].type },
    });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      validateField(value, formData[name].type, name, setFormError);
    }, 1500);
  };

  const handleSubmit = async () => {
    // Проверяем валидность email
    if (formError.login) {
      toast.error("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    if (!formData.login.value) {
      setFormError({ login: "Email обязателен" });
      return;
    }

    setIsLoading(true);
    try {
      // Отправляем email как строку (не объект)
      await requestPasswordReset(formData.login.value);
      setIsSuccess(true);
      toast.success("Инструкции по восстановлению пароля отправлены на вашу почту");
    } catch (error) {
      console.error("Ошибка при запросе сброса пароля:", error);
      
      let errorMessage = "Ошибка при отправке запроса";
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Если запрос успешен, показываем сообщение об успехе
  if (isSuccess) {
    return (
      <LayoutLogin>
        <ModalWindow {...MODAL.PASSWORD_RECOVERY_FORM} descriptionLg>
          <div className={styles.successMessage}>
            <p>Инструкции по восстановлению пароля были отправлены на вашу электронную почту.</p>
            <p>Пожалуйста, проверьте вашу почту и следуйте инструкциям в письме.</p>
          </div>
          <div className={styles.rememberedPassword}>
            Вспомнили пароль?&nbsp;
            <Link
              to="/login"
              className={styles.link}
            >
              Войти
            </Link>
          </div>
        </ModalWindow>
      </LayoutLogin>
    );
  }

  return (
    <LayoutLogin>
      <ModalWindow {...MODAL.PASSWORD_RECOVERY_FORM} descriptionLg>
        <Inputs
          name="login"
          placeholder="Введите электронную почту"
          type="email"
          formData={formData}
          onChange={handleChange}
          formError={formError}
        />
        <div className={styles.submit}>
          <Button
            large
            text={isLoading ? "Отправка..." : "Отправить"}
            onClick={handleSubmit}
            disabled={isLoading || !!formError.login || !formData.login.value}
          />
        </div>
        <div className={styles.rememberedPassword}>
          Вспомнили пароль?&nbsp;
          <Link
            to="/login"
            className={styles.link}
          >
            Войти
          </Link>
        </div>
      </ModalWindow>
    </LayoutLogin>
  );
}