import React from "react";
import styles from "./teamHeader.module.css";
import profilePhoto from "../../../../../../assests/images/photo/ivanIvanovProfile.png";
import { Container } from "react-bootstrap";

const TeamHeader = () => {
  const teamName = "КодФорсаж";

  return (
      <div className={styles.userInfoBlock}>
        <h1 className={styles.userNameResponsive}>Команда {teamName}</h1>
        <h1 className={styles.userName}>Команда {teamName}</h1>
        <div className={styles.userInfoHeader}>
          <img
            src={profilePhoto}
            alt="avatar"
            className={styles.profilePhotoPlaceholder}
          />
          <div className={styles.textContent}>
            <p className={styles.details}>Ментор команды</p>
            <p className={styles.nameMentor}>Иванов Иван Иванович</p>
          </div>
        </div>
      </div>
  );
};

export default TeamHeader;