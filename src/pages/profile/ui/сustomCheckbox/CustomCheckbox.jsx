import React from 'react';
import styles from './CustomCheckbox.module.css';

const CustomCheckbox = ({ checked, onChange, className = '' }) => (
  <label className={`${styles.wrapper} ${className}`}>
    <input
      type="checkbox"
      className={styles.input}
      checked={checked}
      onChange={onChange}
    />
    <svg
      className={styles.box}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="17"
        height="17"
        rx="0.5"
        stroke="#CEB2E9"
        fill="none"
      />
       <path 
       transform="translate(3 3)"
        className={styles.checkmark}
        d="M3.87459 10.3306C3.53396 10.3307 3.20728 10.1953 2.96662 9.95428L0.22153 7.2102C-0.0738435 6.91473 -0.0738435 6.43578 0.22153 6.14031C0.516999 5.84494 0.995953 5.84494 1.29142 6.14031L3.87459 8.72348L10.7086 1.8895C11.004 1.59413 11.483 1.59413 11.7785 1.8895C12.0738 2.18497 12.0738 2.66392 11.7785 2.95939L4.78256 9.95428C4.5419 10.1953 4.21523 10.3307 3.87459 10.3306Z"
        fill="#1A1F1F"
      />
    </svg>
  </label>
);

export default CustomCheckbox;
