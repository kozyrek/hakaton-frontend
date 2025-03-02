import React from "react";
import styles from "./logoutButton.module.css";
import logoutIcon from "../../assests/images/icon/logout.svg"

const LogoutButton = ({ onClick, text = "Выйти из профиля", className = "" }) => {
  return (
    <button className={`${styles.logoutButton} ${className}`} onClick={onClick}>
      <img src={logoutIcon} alt="logout icon" className={styles.logoutIcon} />
      {text}
    </button>
  );
};

export default LogoutButton;
