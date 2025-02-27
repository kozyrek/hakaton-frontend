import React from "react";
import styles from "./profileForm.module.css";
import profilePhoto from "../../../assests/images/photo/ivanIvanovProfile.png";

import TextInput from "../ui/input/textInput";
import TextArea from "../ui/textarea/textArea";
import BigButton from "../ui/bigBtn/bigButton";
import DownloadButton from "../ui/downloadBtn/downloadButton";


const ProfileForm = ({
  formData,
  handleChange,
  handlePhotoChange,
  handlePdfChange,
  handleSaveProfile
}) => {
  return (
    <div className={styles.profileTabContent}>
      <h3>Регистрационные данные</h3>
      <div className={styles.userRegDataChange}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Фамилия</label>
            <TextInput
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Имя</label>
            <TextInput
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Отчество</label>
            <TextInput
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Дата рождения</label>
            <TextInput
              type="text"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Организация</label>
            <TextInput
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Пост</label>
            <TextInput
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Должность</label>
            <TextInput
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Электронная почта</label>
            <TextInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Номер телефона</label>
            <TextInput
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Пароль</label>
          <div className={styles.flexRow}>
            <TextInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
            <BigButton onClick={() => alert("Сменить пароль")}>
              Сменить пароль
            </BigButton>
          </div>
          <small className={styles.passwordHint}>
            Пароль должен содержать не менее 8 символов...
          </small>
        </div>
      </div>

      <div className={styles.profilePhotoSection}>
        <label>Фото пользователя (до 2 МБ):</label>
        <div>
          <img
            src={formData.photo_url || profilePhoto}
            alt="avatar"
            className={styles.profilePhotoPreview}
          />
        </div>
        <div className={styles.fileUploadContainer}>
          <label htmlFor="photoInput">
            {formData.photo_url ? "Файл загружен" : "Загрузите файл"}
          </label>
          <DownloadButton onClick={() => document.getElementById("photoInput").click()}>
            Загрузить
          </DownloadButton>
        </div>
        <input
          type="file"
          accept="image/*"
          id="photoInput"
          onChange={handlePhotoChange}
          style={{ display: "none" }}
        />
      </div>

      <h3>Персональные данные</h3>
      <div className={styles.userDataChange}>
       
          <div className={styles.formGroup}>
            <label>Статьи</label>
            <TextArea
              name="articles"
              value={formData.articles}
              onChange={handleChange}
              className={styles.inputFieldLarge}
              rows={5}
              style={{ padding: "12px 16px" }}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Круг научных интересов</label>
            <TextArea
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className={styles.inputFieldLarge}
            />
     
        </div>
      
          <div className={styles.formGroup}>
            <label>Преподаваемые предметы</label>
            <TextArea
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className={styles.inputFieldLarge}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Тематика научных работ</label>
            <TextArea
              type="text"
              name="research"
              value={formData.research}
              onChange={handleChange}
              className={styles.inputFieldLarge}
            />
          </div>

      </div>

      <div className={styles.formGroup}>
        <label>Загрузить PDF (сертификаты.pdf)</label>
        <div className={styles.fileUploadContainer}>
          <label htmlFor="pdfInput" className={styles.uploadButton}>
            {formData.certificatesPdf || "Загрузите файл"}
          </label>
          <DownloadButton onClick={() => document.getElementById("pdfInput").click()}>
            Загрузить
          </DownloadButton>
        </div>
        <input
          type="file"
          accept=".pdf"
          id="pdfInput"
          onChange={handlePdfChange}
          style={{ display: "none" }}
        />
      </div>

      <BigButton onClick={handleSaveProfile}>
        Сохранить
      </BigButton>
    </div>
  );
};

export default ProfileForm;
