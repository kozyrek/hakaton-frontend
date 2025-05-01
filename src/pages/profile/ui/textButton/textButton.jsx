import React from "react";
import styles from "./textButton.module.css";

const TextButton = ({ onClick, children, className = "", ...props }) => {
  return (
    <button onClick={onClick} className={`${styles.removeButton} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default TextButton;
