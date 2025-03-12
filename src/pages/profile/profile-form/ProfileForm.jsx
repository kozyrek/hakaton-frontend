import React from "react";
import styles from "./profileForm.module.css";
import profilePhoto from "../../../assests/images/photo/ivanIvanovProfile.png";

import TextInput from "../ui/input/textInput";
import TextArea from "../ui/textarea/textArea";
import Button from "../../../components/button/button";
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
      <h2 className={styles.profileTabTitle}>Регистрационные данные</h2>
      <div className={styles.userRegDataChange}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Фамилия</label>
            <TextInput
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Имя</label>
            <TextInput
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Отчество</label>
            <TextInput
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Дата рождения</label>
            <TextInput
              type="text"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
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
            />
          </div>
          <div className={styles.formGroup}>
            <label>Пост</label>
            <TextInput
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Должность</label>
            <TextInput
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Электронная почта</label>
            <TextInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Номер телефона</label>
            <TextInput
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
            <Button large text="Сменить пароль" onClick={() => alert("Сменить пароль")}/>

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
        <div>
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
      <div>
       
          <div className={styles.formGroup}>
            <label>Статьи</label>
            <TextArea
              name="articles"
              value={formData.articles}
              onChange={handleChange}
              className={styles.inputFieldLarge}
              rows={5}
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
            />
          </div>
          <div className={styles.formGroup}>
            <label>Тематика научных работ</label>
            <TextArea
              type="text"
              name="research"
              value={formData.research}
              onChange={handleChange}
            />
          </div>

      </div>

      <div className={styles.formGroup}>
        <label>Загрузить PDF (сертификаты.pdf)</label>
        <div>
          <label htmlFor="pdfInput">
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

      <Button large text="Сохранить" onClick={() => alert("Сменить пароль")}/>
    </div>
  );
};

export default ProfileForm;
