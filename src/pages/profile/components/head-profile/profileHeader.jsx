import { useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./profileHeader.module.css";

import profilePhotoAvatar from "../../../../assests/images/photo/profilePhotoAvatar.svg";
import phoneSvg from "../../../../assests/images/svg/phone.svg";
import emailSvg from "../../../../assests/images/svg/email.svg";
import Pencil from "../personal-info/images/Pencil";
import { useResize } from "../../../../hooks/useResize";
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

const ProfileHeader = ({ user, setEditRegInfo }) => {
  const role = useMemo(() => getRole(user), [user]);
  const width = useResize();

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
        <div className={styles.profilePhotoBlock}> 
          <img
            src={user.photoPath || profilePhotoAvatar}
            alt={`Аватар ${user.firstName} ${user.lastName}`}
            className={styles.profilePhotoPlaceholder}
          />
        </div>
        <div className={styles.titleBlock}>
          <h2 className={`titleH2 ${styles.userName}`}>
            {user.lastName} {user.firstName}
            {user.patronymic && ` ${user.patronymic}`}
          </h2>
          <button 
            className={styles.editButton}
            onClick={() => setEditRegInfo(true)}
            aria-label="Редактировать регистрационные данные">
            <Pencil
              width={width < 769 ? 18 : 28}
              height={width < 769 ? 18 : 28}
              aria-hidden="true"
            />
          </button>
        </div>
        {user.birthDate && (
          <p className={`text1 ${styles.userBirthDate}`}>
            {formatDate(user.birthDate)}
          </p>
        )}
        <div className={styles.bottomText}>
          <p className={`text1 ${styles.userDetails}`}>
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
