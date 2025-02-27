import React from "react";
import styles from "./bigButton.module.css";

const BigButton = ({ children, onClick, type = "button", className = "", ...props }) => {
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default BigButton;
