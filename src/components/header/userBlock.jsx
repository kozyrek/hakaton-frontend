import Avatar from "./images/iconAvatar";

import styles from "./styles/userBlock.module.css";

export default function UserBlock({ user }) {
  return (
    <div className={styles.userBlock}>
      <p className={styles.userName}>
        <span>{user.lastName} </span>
        <span>{user.firstName}</span>
      </p>
      <div className={styles.imageWrapper}>
        {user.image ? (
          <img
            src={user.image}
            alt="Фотография пользователя"
          ></img>
        ) : (
          // Чтоб так показать свг картинку - нужно нужно сделать ее компанентом
          // : <Avatar/>
          <>Ошибка</>
        )}
      </div>
    </div>
  );
}
