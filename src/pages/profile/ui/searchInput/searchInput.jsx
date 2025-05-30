import styles from "./searchInput.module.css";
import SearchIcon from "../../../../assests/images/svg/search.svg";

const SearchInput = ({ value, onChange }) => {
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
        <img
          src={SearchIcon}
          alt="Search"
          className={styles.searchIconImg}
        />
      </div>
    </div>
  );
};

export default SearchInput;
