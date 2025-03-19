import React from "react";

import styles from "./profileHeader.module.css";

import profilePhoto from "../../../assests/images/photo/ivanIvanovProfile.png";
import phoneSvg from "../../../assests/images/svg/phone.svg";
import emailSvg from "../../../assests/images/svg/email.svg";

const ProfileHeader = ({ user }) => {
  const getRole = (user) => {
    if (user.isMentor === false) {
      return "Участник";
    }

    if (user.mentor?.isAdmin) {
      return "Администратор";
    }

    if (user.isMentor) {
      return "Ментор";
    }

    return "Роль не определена";
  };

  const role = getRole(user);

  // console.log(user);
  return (
    <div className={styles.userInfoBlock}>
      <div className={styles.userInfoHeader}>
        <img
          src={profilePhoto}
          alt="avatar"
          className={styles.profilePhotoPlaceholder}
        />
        <div className={styles.textContent}>
          <div>
            <h2 className={styles.userName}>
              {user.lastName} {user.firstName} {user.patronymic}
            </h2>
            <p className={styles.userBirthDate}>{user.birthDate}</p>
          </div>
          <div className={styles.bottomText}>
            <p className={styles.userDetails}>
              {role} | {user.eduOrganization} |{" "}
              {user.isMentor
                ? user.mentor.specialization
                : user.participant?.schoolGrade}
            </p>
            <div className={styles.contact}>
              <div className={styles.contactItem}>
                <img
                  src={phoneSvg}
                  alt="phone icon"
                  className={styles.icon}
                />
                <p>{user.phoneNumber}</p>
              </div>
              <div className={styles.contactItem}>
                <img
                  src={emailSvg}
                  alt="email icon"
                  className={styles.icon}
                />
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
