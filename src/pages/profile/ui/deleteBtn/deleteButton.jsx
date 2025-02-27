import React from "react";
import styles from "./deleteButton.module.css";

const DeleteButton = ({ onClick, children, className = "", ...props }) => {
  return (
    <button onClick={onClick} className={`${styles.removeButton} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default DeleteButton;
