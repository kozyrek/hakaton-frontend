import React from "react";
import styles from "./profileHeader.module.css";
import profilePhoto from "../../../assests/images/photo/ivanIvanovProfile.png";
import phoneSvg from "../../../assests/images/svg/phone.svg";
import emailSvg from "../../../assests/images/svg/email.svg";

const ProfileHeader = ({ user }) => {
  return (
    <div className={styles.userInfoBlock}>
      <div className={styles.userInfoHeader}>
      <h2 className={styles.userNameResponsive}>
        {user.last_name} {user.first_name} {user.middle_name}
      </h2>
        <img
          src={profilePhoto}
          alt="avatar"
          className={styles.profilePhotoPlaceholder}
        />
        <div className={styles.textContent}>
          <div>
            <h2 className={styles.userName}>
              {user.last_name} {user.first_name} {user.middle_name}
            </h2>
            <p className={styles.userBirthDate}>{user.birth_date}</p>
          </div>
          <div className={styles.bottomText}>
            <p className={styles.userDetails}>
              {user.role} | {user.organization} | {user.position}
            </p>
            <div className={styles.contact}>
              <div className={styles.contactItem}>
                <img src={phoneSvg} alt="phone icon" className={styles.icon} />
                <p>{user.phone}</p>
              </div>
              <div className={styles.contactItem}>
                <img src={emailSvg} alt="email icon" className={styles.icon} />
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
