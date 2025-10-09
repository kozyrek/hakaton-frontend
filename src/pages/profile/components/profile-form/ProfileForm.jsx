import { useEffect, useRef, useState } from "react";
import styles from "./profileForm.module.css";
import profilePhotoAvatar from "../../../../assests/images/photo/profilePhotoAvatar.svg";
import Inputs from "../../../../components/inputs/inputs";
import { formFields } from "../../../auth/utils/utils";
import {
  validateField,
} from "../../../auth/utils/validateForm";
import ArrowDown from "../../../../assests/images/icon/arrowdown";
import ArrowUp from "../../../../assests/images/icon/arrowup";

import TextInput from "../../ui/input/textInput";
import TextArea from "../../ui/textarea/textArea";
import Button from "../../../../components/button/button";
import DownloadButton from "../../ui/downloadBtn/downloadButton";

import stylesReg from "../../../auth/styles/registration.module.css";
import getRegion from "../../../../api/regions/getRegions";

const ProfileForm = ({
  initialData,
  handlePhotoChange,
  handlePdfChange,
  handleSaveProfile
}) => {
  const [regions, setRegions] = useState([]);
  const timerRef = useRef(null);

  const [isShowRegion, setIsShowRegion] = useState(false);
  const [formData, setFormData] = useState({
    role: { value: "participant", type: "role" },
    policy: { value: false, type: "checkbox" },
    regulations: { value: false, type: "checkbox" },
  });
  const [formError, setFormError] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Загрузка регионов
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getRegion();
        setRegions(response.data);
      } catch (error) {
        console.error('Ошибка загрузки регионов:', error);
      }
    };
    fetchRegions();
  }, []);

  // Инициализация формы данными пользователя
  useEffect(() => {
    if (initialData) {
      const role = initialData.role || 'participant';
      const { applicableFields, errorFields } = formFields.reduce(
        (acc, field) => {
          if (field.name === role) {
            field.data.forEach((val) => {
              // Для вложенных полей (participant/mentor)
              if (initialData[field.name] && initialData[field.name][val.name] !== undefined) {
                acc.applicableFields[val.name] = {
                  value: initialData[field.name][val.name] || "",
                  type: val.type,
                };
              } else {
                acc.applicableFields[val.name] = {
                  value: initialData[val.name] || "",
                  type: val.type,
                };
              }
              acc.errorFields[val.name] = "";
            });
          } else if (field.name !== 'role') {
            acc.applicableFields[field.name] = {
              value: initialData[field.name] || "",
              type: field.type,
            };
            acc.errorFields[field.name] = "";
          }
          return acc;
        },
        { applicableFields: {}, errorFields: {} }
      );

      // Добавляем основные поля пользователя
      const basicFields = ['firstName', 'lastName', 'patronymic', 'email', 'phoneNumber', 'eduOrganization', 'birthDate'];
      basicFields.forEach(field => {
        if (initialData[field] !== undefined) {
          applicableFields[field] = {
            value: initialData[field] || "",
            type: field === 'birthDate' ? 'date' : 'text'
          };
          errorFields[field] = "";
        }
      });

      setFormData({
        role: { value: role, type: "role" },
        policy: { value: initialData.policy || false, type: "checkbox" },
        regulations: { value: initialData.regulations || false, type: "checkbox" },
        ...applicableFields,
      });
      setFormError(errorFields);
    }
  }, [initialData]);

  const handleChange = (value, name) => {
    let processedValue = value;
    
    if (name === "phoneNumber") {
      // Для телефона убираем только плюс в начале, остальное форматирование оставляем
      // Окончательная очистка будет в prepareFormDataForSubmit
      processedValue = value.replace(/^\+/, "");
    }
    
    setFormData({
      ...formData,
      [name]: { value: processedValue, type: formData[name].type },
    });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      validateField(processedValue, formData[name].type, name, setFormError);
    }, 1500);
  };

  // Обработчик выбора фото
  const handlePhotoChangeInternal = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
      // Если есть внешний обработчик, вызываем его
      if (handlePhotoChange) {
        handlePhotoChange(file);
      }
    }
  };

  // Функция для очистки данных от пустых полей - ОБНОВЛЕННАЯ
  const removeEmptyFields = (obj) => {
    const cleaned = { ...obj };
    
    Object.keys(cleaned).forEach(key => {
      // Удаляем поля с null, undefined, пустой строкой или пустым массивом
      if (cleaned[key] === null || 
          cleaned[key] === undefined || 
          cleaned[key] === '' || 
          (Array.isArray(cleaned[key]) && cleaned[key].length === 0)) {
        delete cleaned[key];
      } else if (typeof cleaned[key] === 'object' && cleaned[key] !== null && !Array.isArray(cleaned[key])) {
        // Рекурсивно очищаем вложенные объекты
        cleaned[key] = removeEmptyFields(cleaned[key]);
        // Если после очистки вложенный объект пуст, удаляем его
        if (Object.keys(cleaned[key]).length === 0) {
          delete cleaned[key];
        }
      }
    });
    
    return cleaned;
  };

  // Функция подготовки данных для отправки - ОБНОВЛЕННАЯ
  const prepareFormDataForSubmit = () => {
    const data = {};
    
    // Преобразуем formData в плоский объект
    Object.keys(formData).forEach(key => {
      if (formData[key] && typeof formData[key] === 'object' && 'value' in formData[key]) {
        data[key] = formData[key].value;
      }
    });

    // Очищаем телефон от форматирования (оставляем только цифры)
    if (data.phoneNumber) {
      data.phoneNumber = data.phoneNumber.replace(/\D/g, '');
    }

    // Базовые поля пользователя - передаем ТОЛЬКО заполненные поля
    let apiData = {};

    // Добавляем только заполненные основные поля
    if (data.firstName) apiData.firstName = data.firstName;
    if (data.lastName) apiData.lastName = data.lastName;
    if (data.patronymic) apiData.patronymic = data.patronymic;
    if (data.birthDate || data.dateBirth) apiData.birthDate = data.birthDate || data.dateBirth;
    if (data.phoneNumber) apiData.phoneNumber = data.phoneNumber;
    if (data.eduOrganization) apiData.eduOrganization = data.eduOrganization;
    if (data.email) apiData.email = data.email;

    // Добавляем поля в зависимости от роли - ТОЛЬКО если есть хоть одно заполненное поле
    if (formData.role.value === 'participant') {
      const participantData = {};
      
      if (data.regionId) participantData.regionId = parseInt(data.regionId);
      if (data.schoolGrade) participantData.schoolGrade = data.schoolGrade;
      if (data.city) participantData.city = data.city;
      if (data.interests) participantData.interests = data.interests;
      if (data.olympics) participantData.olympics = data.olympics;
      if (data.achievements) participantData.achievements = data.achievements;
      
      // Добавляем participant только если есть хотя бы одно поле
      if (Object.keys(participantData).length > 0) {
        apiData.participant = participantData;
      }
    } else if (formData.role.value === 'mentor') {
      const mentorData = {};
      
      if (data.jobTitle) mentorData.jobTitle = data.jobTitle;
      if (data.specialization) mentorData.specialization = data.specialization;
      if (data.researchTopics) mentorData.researchTopics = data.researchTopics;
      if (data.articles) mentorData.articles = data.articles;
      if (data.scientificInterests) mentorData.scientificInterests = data.scientificInterests;
      if (data.taughtSubjects) mentorData.taughtSubjects = data.taughtSubjects;
      
      // Добавляем mentor только если есть хотя бы одно поле
      if (Object.keys(mentorData).length > 0) {
        apiData.mentor = mentorData;
      }
    }

    // Удаляем полностью пустые объекты
    apiData = removeEmptyFields(apiData);

    console.log('Подготовленные данные для отправки:', apiData);
    return apiData;
  };

  // Обработчик сохранения
  const handleSave = async () => {
    if (!handleSaveProfile) {
      console.error('handleSaveProfile function is not provided');
      return;
    }

    // Проверяем обязательные поля
    const requiredFields = ['firstName', 'lastName', 'email'];
    const hasEmptyRequiredFields = requiredFields.some(field => !formData[field]?.value);
    const hasValidationErrors = Object.values(formError).some(error => error !== '');
    
    if (hasEmptyRequiredFields) {
      alert('Пожалуйста, заполните все обязательные поля (имя, фамилия, email)');
      return;
    }

    if (hasValidationErrors) {
      alert('Пожалуйста, исправьте ошибки в форме перед сохранением');
      return;
    }

    setIsSaving(true);
    try {
      const apiData = prepareFormDataForSubmit();
      console.log('Sending data to API:', apiData);
      
      // Создаем FormData для multipart/form-data
      const formDataToSend = new FormData();
      
      // Важно: поле должно называться 'data' и содержать JSON строку
      formDataToSend.append('data', JSON.stringify(apiData));
      
      // Если есть новое фото, добавляем его
      if (photoFile) {
        formDataToSend.append('photo', photoFile);
      }

      // Отладочный вывод для проверки FormData
      console.log('FormData contents:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      console.log('FormData to send:', formDataToSend);
      await handleSaveProfile(formDataToSend);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Ошибка при сохранении данных: ' + (error.message || 'Неизвестная ошибка'));
    } finally {
      setIsSaving(false);
    }
  };

  // Проверка валидности формы для активации кнопки
  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email'];
    return !requiredFields.some(field => !formData[field]?.value);
  };

  return (
    <>
      <h2 className={`titleH2 ${styles.profileTabTitle}`}>Регистрационные данные</h2>
      <div className={`text2 ${styles.userRegDataChange}`}>
        {formFields.map((item) => {
          return item.name === formData.role.value ? (
            item.data.map((e) =>
              e.name === "regionId" ? (
                <div className={`${styles.regionId} ${styles.regionSelectContainer}`} key={e.id}>
                  <label className={stylesReg.label}>Регион</label>
                  <div className={styles.regionSelectWrapper}>
                    <div
                      className={`${styles.loginInput} ${stylesReg.requred} ${styles.regionSelect}`}
                      onClick={() => setIsShowRegion(!isShowRegion)}
                    >
                      {formData.regionId?.value && regions.length > 0
                        ? regions.find((r) => r.id == formData.regionId.value)?.name
                        : "Выберите регион"}
                      <span className={stylesReg.arrow}>
                        {!isShowRegion ? <ArrowDown /> : <ArrowUp />}
                      </span>
                    </div>
                    {isShowRegion && (
                      <div className={`${stylesReg.requredOptinsCOntainer} ${stylesReg.rq} ${styles.regionDropdown}`} style={{zIndex:'99 '}}>
                        {regions.map((option, index) => (
                          <div key={option.id}>
                            <div
                              className={stylesReg.option}
                              onClick={() => {
                                handleChange(String(option.id), "regionId");
                                setIsShowRegion(false);
                              }}
                            >
                              {option.name}
                            </div>
                            {index < regions.length - 1 && (
                              <hr className={stylesReg.hr} />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {formError.regionId && (
                    <div className={stylesReg.helperTextError}>
                      {formError.regionId}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`${stylesReg.conInputs} ${styles[item.data[e.id-8]?.name]}`}
                  key={e.id}
                >
                  <Inputs
                    {...e}
                    formData={formData}
                    formError={formError}
                    onChange={handleChange}
                  />
                </div>
              )
            )
          ) : item.label ? (
            <div
              className={`${stylesReg.conInputs} ${styles[item.name]}`}
              key={item.id}
            >
              <Inputs
                {...item}
                formData={formData}
                formError={formError}
                onChange={handleChange}
              />
            </div>
          ) : null;
        })}

        <Button 
          large 
          text="Сменить пароль" 
          onClick={() => alert("Сменить пароль")}
          addClass={styles.btnChangePassword}
        />
      </div>

      <div className={styles.profilePhotoSection}>
          <label>Фото пользователя (до 2 МБ):</label>
          <div>
            <img
              src={photoFile ? URL.createObjectURL(photoFile) : (initialData?.photoPath ? `${initialData.photoPath}?v=${Date.now()}` : profilePhotoAvatar)}
              alt="avatar"
              className={styles.profilePhotoPreview}
              key={photoFile ? 'new-photo' : 'current-photo'}
            />
          </div>
          <div>
            <label htmlFor="photoInput">
              {photoFile ? "Файл загружен" : "Загрузите файл"}
            </label>
            <DownloadButton onClick={() => document.getElementById("photoInput").click()}>
              Загрузить
            </DownloadButton>
          </div>
          <input
            type="file"
            accept="image/*"
            id="photoInput"
            onChange={handlePhotoChangeInternal}
            style={{ display: "none" }}
          />
        </div>

      <Button 
        large 
        text={isSaving ? "Сохранение..." : "Сохранить"} 
        onClick={handleSave}
        addClass={styles.btnSave}
        disabled={isSaving || !isFormValid()}
      />
    </>
  );
};

export default ProfileForm;