import { Link } from "react-router-dom";
import Avatar from "./images/iconAvatar";

import styles from "./styles/userBlock.module.css";

export default function UserBlock({ user }) {
  return (
    <Link to="/profile" className={styles.userBlock}>
      <p className={`text4 ${styles.userName}`}>
        <span>{user.lastName} </span>
        <span>{user.firstName}</span>
      </p>
      <div className={styles.imageWrapper}>
        {user.photoPath ? (
          <img
            src={user.photoPath}
            alt="Фотография пользователя"
          ></img>
        ) : (
           <Avatar/>
        )}
      </div>
    </Link>
  );
}
