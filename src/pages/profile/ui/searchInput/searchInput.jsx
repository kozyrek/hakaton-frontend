import React from "react";
import styles from "./searchInput.module.css";

const SearchInput = ({ value, onChange, searchIcon }) => {
  return (
    <div className={styles.searchUserForm}>
      <input
        type="text"
        placeholder="Поиск"
        value={value}
        onChange={onChange}
        className={styles.inputFieldSmall}
      />
      <div className={styles.searchIconRight}>
        <img src={searchIcon} alt="Search" className={styles.searchIconImg} />
      </div>
    </div>
  );
};

export default SearchInput;
