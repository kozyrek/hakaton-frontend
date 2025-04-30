import React, { useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./profileHeader.module.css";

import profilePhoto from "../../../../assests/images/photo/ivanIvanovProfile.png";
import phoneSvg from "../../../../assests/images/svg/phone.svg";
import emailSvg from "../../../../assests/images/svg/email.svg";
import { ROLES } from "../../../../utils/constants";

const ContactItem = ({ icon, text }) => (
  <div className={styles.contactItem}>
    <img
      src={icon}
      alt=""
      aria-hidden="true"
      className={styles.icon}
    />
    <p>{text || "Не указано"}</p>
  </div>
);

export const getRole = (user) => {
  if (!user.isMentor) return ROLES.PARTICIPANT;
  if (user.mentor?.isAdmin) return ROLES.ADMIN;
  if (user.isMentor) return ROLES.MENTOR;
  return ROLES.UNDEFINED;
};

const ProfileHeader = ({ user }) => {
  const role = useMemo(() => getRole(user), [user]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!user) {
    return <div className={styles.error}>Профиль не загружен</div>;
  }

  return (
    <div className={styles.userInfoBlock}>
      <div className={styles.userInfoHeader}>
        <img
          src={user.photoPath || profilePhoto}
          alt={`Аватар ${user.firstName} ${user.lastName}`}
          className={styles.profilePhotoPlaceholder}
        />
        <div className={styles.textContent}>
          <div>
            <h2 className={styles.userName}>
              {user.lastName} {user.firstName}
              {user.patronymic && ` ${user.patronymic}`}
            </h2>
            {user.birthDate && (
              <p className={styles.userBirthDate}>
                {formatDate(user.birthDate)}
              </p>
            )}
          </div>
          <div className={styles.bottomText}>
            <p className={styles.userDetails}>
              {role} | {user.eduOrganization || "Организация не указана"} |{" "}
              {user.isMentor
                ? user.mentor?.specialization || "Специализация не указана"
                : user.participant?.schoolGrade || "Класс не указан"}
            </p>
            <div className={styles.contact}>
              <ContactItem
                icon={phoneSvg}
                text={user.phoneNumber}
              />
              <ContactItem
                icon={emailSvg}
                text={user.email}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    patronymic: PropTypes.string,
    avatar: PropTypes.string,
    birthDate: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string.isRequired,
    isMentor: PropTypes.bool,
    photoPath: PropTypes.string,
    mentor: PropTypes.shape({
      isAdmin: PropTypes.bool,
      specialization: PropTypes.string,
    }),
    participant: PropTypes.shape({
      schoolGrade: PropTypes.string,
    }),
  }),
};

export default ProfileHeader;
