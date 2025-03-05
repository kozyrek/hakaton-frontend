import React from "react";
import styles from "./menuButton.module.css";

const MenuButton = ({
  children,
  onClick,
  isActive = false,
  icon,
  className = "",
  variant, // "logout" для кнопки Выход
  ...props
}) => {
  // Если variant равен "logout", используем другой класс
  const buttonClass =
    variant === "logout" ? styles.logoutButton : styles.button;

  return (
    <button
      className={`${buttonClass} ${
        variant !== "logout" && isActive ? styles.active : ""
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <img src={icon} alt="icon" className={variant === "logout" ? styles.logoutIcon : styles.icon} />
      )}
      {children}
    </button>
  );
};

export default MenuButton;
