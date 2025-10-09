import { useMemo } from "react";
import { useSelector } from "react-redux";
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
  if (!user?.isMentor) return ROLES.PARTICIPANT;
  if (user.mentor?.isAdmin) return ROLES.ADMIN;
  if (user.isMentor) return ROLES.MENTOR;
  return ROLES.UNDEFINED;
};

// Функция для форматирования класса/группы
const formatSchoolGrade = (schoolGrade) => {
  if (!schoolGrade) return "Не указано";
  
  // Если строка содержит только цифры, добавляем "класс"
  if (/^\d+$/.test(schoolGrade.trim())) {
    return `${schoolGrade} класс`;
  }
  
  // Если уже содержит текст, оставляем как есть
  return schoolGrade;
};

// Функция для получения информации об образовании
const getEducationInfo = (user) => {
  if (!user) return "Не указано";
  
  if (user.isMentor) {
    return user.mentor?.jobTitle || "Должность не указана";
  } else {
    return formatSchoolGrade(user.participant?.schoolGrade);
  }
};

// Функция для получения URL фото с параметром версии
const getPhotoUrl = (photoPath, photoVersion, defaultAvatar) => {
  if (!photoPath) return defaultAvatar;
  // Добавляем параметр версии для обхода кэша браузера
  return `${photoPath}?v=${photoVersion}`;
};

// Функция для получения образовательной организации
const getEducationOrganization = (user) => {
  if (!user) return "Организация не указана";
  return user.eduOrganization || "Организация не указана";
};

// Функция для получения телефона
const getPhoneNumber = (user) => {
  if (!user) return "Не указано";
  return user.phoneNumber || "Не указано";
};

const ProfileHeader = ({ user, setEditRegInfo, currentUserId, isEditable = false }) => {
  const role = useMemo(() => getRole(user), [user]);
  const width = useResize();
  
  // Получаем версию фото из store
  const { photoVersion } = useSelector((state) => state.user);

  // Упрощенная проверка - используем явный пропс isEditable
  const canEdit = isEditable && setEditRegInfo;

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) : "Не указана";

  // Отладочный вывод для проверки структуры данных
  console.log("ProfileHeader user data:", user);
  console.log("Phone number:", getPhoneNumber(user));
  console.log("Education organization:", getEducationOrganization(user));
  console.log("Participant data:", user?.participant);
  console.log("School grade:", user?.participant?.schoolGrade);

  if (!user) {
    return <div className={styles.error}>Профиль не загружен</div>;
  }

  // Получаем URL фото с параметром версии
  const photoUrl = getPhotoUrl(user.photoPath, photoVersion, profilePhotoAvatar);

  return (
    <div className={styles.userInfoBlock}>
      <div className={styles.userInfoHeader}>
        <div className={styles.profilePhotoBlock}> 
          <img
            src={photoUrl}
            alt={`Аватар ${user.firstName} ${user.lastName}`}
            className={styles.profilePhotoPlaceholder}
            key={`photo-${photoVersion}`} // Ключ для принудительного перерендера
          />
        </div>
        <div className={styles.titleBlock}>
          <h2 className={`titleH2 ${styles.userName}`}>
            {user.lastName} {user.firstName}
            {user.patronymic && ` ${user.patronymic}`}
          </h2>
          {/* Показываем кнопку редактирования только если явно разрешено */}
          {canEdit && (
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
          )}
        </div>
        {user.birthDate && (
          <p className={`text1 ${styles.userBirthDate}`}>
            Дата рождения: {formatDate(user.birthDate)}
          </p>
        )}
        <div className={styles.bottomText}>
          <p className={`text1 ${styles.userDetails}`}>
            {role} | {getEducationOrganization(user)} |{" "}
            {getEducationInfo(user)}
          </p>
          <div className={styles.contact}>
            <ContactItem
              icon={phoneSvg}
              text={getPhoneNumber(user)}
            />
            <ContactItem
              icon={emailSvg}
              text={user.email || "Email не указан"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    patronymic: PropTypes.string,
    birthDate: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    eduOrganization: PropTypes.string,
    isMentor: PropTypes.bool,
    photoPath: PropTypes.string,
    mentor: PropTypes.shape({
      isAdmin: PropTypes.bool,
      specialization: PropTypes.string,
      jobTitle: PropTypes.string,
    }),
    participant: PropTypes.shape({
      schoolGrade: PropTypes.string,
    }),
  }),
  currentUserId: PropTypes.string,
  setEditRegInfo: PropTypes.func,
  isEditable: PropTypes.bool,
};

export default ProfileHeader;