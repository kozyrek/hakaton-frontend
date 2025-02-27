import React from "react";
import styles from "./textInput.module.css";

const TextInput = ({ type = "text", name, value, onChange, className = "", ...props }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`${styles.textInput} ${className}`}
      {...props}
    />
  );
};

export default TextInput;
