import React from "react";
import styles from "./textArea.module.css";

const TextArea = ({ name, value, onChange, rows = 5, className = "", ...props }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`${styles.textArea} ${className}`}
      {...props}
    />
  );
};

export default TextArea;
