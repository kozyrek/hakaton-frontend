import { useRef, useState } from "react";
import Inputs from "../../../components/inputs/inputs";
import ModalWindow from "../../../components/modalWindow";
import { MODAL } from "../../../components/modalWindow/utils/constants";
import LayoutLogin from "../layoutLogin";
import Button from "../../../components/button/button";

import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { validateField } from "../utils/validateForm";

export default function PasswordRecovery() {
  const [formData, setFormData] = useState({
    login: { value: "", type: "email" },
  });
  const [formError, setFormError] = useState({
    login: "",
  });
  const timerRef = useRef(null);

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
            text="Отправить"
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
