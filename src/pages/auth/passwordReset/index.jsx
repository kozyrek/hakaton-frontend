import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Inputs from "../../../components/inputs/inputs";
import ModalWindow from "../../../components/modalWindow";
import { MODAL } from "../../../components/modalWindow/utils/constants";
import LayoutLogin from "../layoutLogin";
import Button from "../../../components/button/button";
import { resetPasswordWithToken } from "../../../api/auth/passwordReset";
import { toast } from "react-toastify";
import { validateField } from "../utils/validateForm";

import styles from "./index.module.css";

export default function PasswordReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const userId = searchParams.get('user_id');
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: { value: "", type: "password" },
    confirmPassword: { value: "", type: "password" },
  });
  
  const [formError, setFormError] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Эффект для проверки совпадения паролей
  useEffect(() => {
    if (formData.newPassword.value && formData.confirmPassword.value) {
      if (formData.newPassword.value !== formData.confirmPassword.value) {
        setFormError(prev => ({
          ...prev,
          confirmPassword: "Пароли не совпадают"
        }));
      } else {
        setFormError(prev => ({
          ...prev,
          confirmPassword: ""
        }));
      }
    } else {
      setFormError(prev => ({
        ...prev,
        confirmPassword: ""
      }));
    }
  }, [formData.newPassword.value, formData.confirmPassword.value]);

  const handleChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: { ...prev[name], value: value },
    }));

    // Валидация отдельного поля - теперь validateField возвращает строку ошибки
    if (name === "newPassword") {
      const error = validateField(value, "password", name);
      setFormError(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async () => {
    // Проверяем валидность
    const hasErrors = Object.values(formError).some(error => error !== "");
    const hasEmptyFields = !formData.newPassword.value || !formData.confirmPassword.value;
    const passwordsMatch = formData.newPassword.value === formData.confirmPassword.value;

    if (hasErrors) {
      toast.error("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    if (hasEmptyFields) {
      toast.error("Заполните все поля");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Пароли не совпадают");
      return;
    }

    if (!userId || !token) {
      toast.error("Неверная или устаревшая ссылка для восстановления пароля");
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        user_id: parseInt(userId),
        token: token,
        password: {
          newPassword: formData.newPassword.value
        }
      };

      await resetPasswordWithToken(requestData);
      toast.success("Пароль успешно изменен!");
      
      // Перенаправляем на страницу входа через 2 секунды
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      
      let errorMessage = "Ошибка при изменении пароля";
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Проверяем наличие необходимых параметров
  if (!userId || !token) {
    return (
      <LayoutLogin>
        <ModalWindow {...MODAL.PASSWORD_RECOVERY_FORM} descriptionLg>
          <div className={styles.errorMessage}>
            <p>Неверная или устаревшая ссылка для восстановления пароля.</p>
            <p>Пожалуйста, запросите новую ссылку для восстановления пароля.</p>
          </div>
          <div className={styles.actions}>
            <Button
              large
              text="Запросить новую ссылку"
              onClick={() => navigate("/recovery")}
            />
          </div>
        </ModalWindow>
      </LayoutLogin>
    );
  }

  return (
    <LayoutLogin>
      <ModalWindow 
        title="Восстановление пароля" 
        description="Введите новый пароль"
        closeButton={true}
        descriptionLg
      >
        <Inputs
          name="newPassword"
          placeholder="Новый пароль"
          type="password"
          formData={formData}
          onChange={handleChange}
          formError={formError}
        />
        <Inputs
          name="confirmPassword"
          placeholder="Повторите новый пароль"
          type="password"
          formData={formData}
          onChange={handleChange}
          formError={formError}
        />
        <div className={styles.submit}>
          <Button
            large
            text={isLoading ? "Сохранение..." : "Сохранить новый пароль"}
            onClick={handleSubmit}
            disabled={isLoading || 
                     !!formError.newPassword || 
                     !!formError.confirmPassword || 
                     !formData.newPassword.value || 
                     !formData.confirmPassword.value ||
                     formData.newPassword.value !== formData.confirmPassword.value}
          />
        </div>
      </ModalWindow>
    </LayoutLogin>
  );
}