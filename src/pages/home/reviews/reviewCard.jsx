import { useEffect, createRef, useState } from "react";

import styles from "./styles/reviewCard.module.css";
import Avatar from "./images/iconAvatar";

export default function ReviewCard({ item, action, ...other }) {
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const refText = createRef();
//   console.log(item);
  useEffect(() => {
    const height = refText.current.getBoundingClientRect().height;
    setIsVisibleButton(height > 191);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelClick = (id) => {
    action(id);
    other.setId(id);
  };

  return (
    <>
      <div className={styles.reviewWrapper}>
        <div className={styles.imageWrapper}>
          {item.user.image ? (
            <img
              src={item.user.image}
              alt="Фотография пользователя"
            ></img>
          ) : (
            <Avatar />
          )}
        </div>
        <div className={styles.user}>
          <p className={`text2 ${styles.userName}`}>
            <span>{item.user.firstName} </span>
            <span>{item.user.lastName}</span>
          </p>
          {item.user.position && (
            <p className={styles.userPosition}>{item.user.position}</p>
          )}
        </div>
        <div className={styles.textWrapper}>
          <p
            ref={refText}
            className={`text4 ${styles.text} ${
              isVisibleButton ? styles.isCutText : ""
            }`}
          >
            {item.text}
          </p>

          {isVisibleButton && (
            <button
              className={`text2 ${styles.button}`}
              onClick={() => handelClick(item.id)}
            >
              Читать полностью
            </button>
          )}
        </div>
      </div>
    </>
  );
}
