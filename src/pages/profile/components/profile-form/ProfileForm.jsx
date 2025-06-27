import React from "react";
import styles from "./profileForm.module.css";
import profilePhotoAvatar from "../../../../assests/images/photo/profilePhotoAvatar.svg";

import TextInput from "../../ui/input/textInput";
import TextArea from "../../ui/textarea/textArea";
import Button from "../../../../components/button/button";
import DownloadButton from "../../ui/downloadBtn/downloadButton";


const ProfileForm = ({
  formData,
  handleChange,
  handlePhotoChange,
  handlePdfChange,
  handleSaveProfile
}) => {
  return (
    <>
      <h2 className={`titleH2 ${styles.profileTabTitle}`}>Регистрационные данные</h2>
      <div className={`text2 ${styles.userRegDataChange}`}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Фамилия</label>
            <TextInput
              type="text"
              name="last_name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Имя</label>
            <TextInput
              type="text"
              name="first_name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Отчество</label>
            <TextInput
              type="text"
              name="middle_name"
              value={formData.patronymic}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Дата рождения</label>
            <TextInput
              type="text"
              name="birth_date"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {formData.participant && 
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Регион</label>
            <TextInput
              type="text"
              name="region"
              value={formData.participant.regionId}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Населенный пункт</label>
            <TextInput
              type="text"
              name="city"
              value={formData.participant.city}
              onChange={handleChange}
            />
          </div>
        </div>}

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Образовательная организация</label>
            <TextInput
              type="text"
              name="organization"
              value={formData.eduOrganization}
              onChange={handleChange}
            />
          </div>
          
          {formData.isMentor ?
          <div className={styles.formGroup}>
            <label>Должность</label>
            <TextInput
              type="text"
              name="position"
              value={formData.mentor.jobTitle}
              onChange={handleChange}
            />
          </div>
          : <div className={styles.formGroup}>
            <label>Класс/группа</label>
            <TextInput
              type="text"
              name="class"
              value={formData.participant.schoolGrade}
              onChange={handleChange}
            />
          </div>}
        </div>

        <div className={styles.formRow}>
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
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Пароль</label>
            <TextInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputFieldSmall}
            />
            <small className={styles.passwordHint}>
              Пароль должен содержать не&nbsp;менее 8&nbsp;символов, используйте латиницу, спецсимволы (@#$%&amp;*!), заглавные и&nbsp;прописные буквы, цифры.
            </small>
          </div>
          <div className={styles.formGroup}>
            <Button large text="Сменить пароль" onClick={() => alert("Сменить пароль")}/>
          </div>
        </div>

        <div className={styles.profilePhotoSection}>
          {/* <label>Фото пользователя (до 2 МБ):</label>
          <div>
            <img
              src={formData.photo_url || profilePhotoAvatar}
              alt="avatar"
              className={styles.profilePhotoPreview}
            />
          </div> */}
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
            // style={{ display: "none" }}
          />
        </div>
      </div>

      {/* <h3>Персональные данные</h3>
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

      </div> */}

      {/* <div className={styles.formGroup}>
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
      </div> */}

      <Button 
        large 
        text="Сохранить" 
        onClick={() => alert("Сменить пароль")}
        addClass={styles.btnSave}
      />
    </>
  );
};

export default ProfileForm;
