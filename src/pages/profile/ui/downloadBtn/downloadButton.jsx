import React from "react";
import styles from "./downloadButton.module.css";

const downloadButton = ({ children, onClick, type = "button", className = "", ...props }) => {
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default downloadButton;
