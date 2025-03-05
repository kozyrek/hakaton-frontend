import styles from "./index.module.css";

import ShowPassword from "./images/showPassword";
import SvgDelete from "./images/SvgDelete";
import { useState } from "react";

const HELPER_TEXT_PASSWORD =
  "Пароль должен содержать не менее 8 символов, используйте латиницу, спецсимволы (@#$%&*!), заглавные и прописные буквы, цифры.";

export default function Inputs(props) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { name, label, type, formData, formError, onChange, ...other } = props;
  const isError = formError[name];

  const handelClick = (type) => {
    switch (type) {
      case "password":
        setIsShowPassword(!isShowPassword);
        break;
      case "text":
      case "tel":
      case "email":
        onChange("", name);
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.container}>
      <label
        htmlFor={other.id}
        className={styles.label}
      >
        {label}
      </label>
      <input
        type={isShowPassword ? "text" : type}
        className={`${styles.loginInput} ${isError && styles.errorInput}`}
        value={formData[name]?.value || ""}
        onChange={(e) => onChange(e.target.value, name)}
        required
        {...other}
      />
      <button
        className={`${styles.delete} ${!label && styles.notLabel}`}
        onClick={() => handelClick(type)}
      >
        {type === "password" ? <ShowPassword /> : <SvgDelete />}
      </button>
      {isError ? (
        <span className={styles.helherTextError}>{formError[name]}</span>
      ) : (
        name === "password" && <span>{HELPER_TEXT_PASSWORD}</span>
      )}
    </div>
  );
}
