import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // ДОБАВЛЕНО
import Avatar from "./images/iconAvatar";

import styles from "./styles/userBlock.module.css";

export default function UserBlock({ user }) {
  // ДОБАВЛЕНО: получаем версию фото из store
  const { photoVersion } = useSelector((state) => state.user);

  // ДОБАВЛЕНО: функция для получения URL фото с параметром версии
  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    return `${photoPath}?v=${photoVersion}`;
  };

  const photoUrl = user.photoPath ? getPhotoUrl(user.photoPath) : null;

  return (
    <Link to="/profile" className={styles.userBlock}>
      <p className={`text4 ${styles.userName}`}>
        <span>{user.lastName} </span>
        <span>{user.firstName}</span>
      </p>
      <div className={styles.imageWrapper}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Фотография пользователя"
            key={`userblock-photo-${photoVersion}`} // ДОБАВЛЕНО: ключ для принудительного перерендера
          />
        ) : (
           <Avatar/>
        )}
      </div>
    </Link>
  );
}