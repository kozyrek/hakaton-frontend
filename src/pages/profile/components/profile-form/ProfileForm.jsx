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
  const [photoFile, setPhotoFile] = useState(null); // ДОБАВЛЕНО: состояние для файла фото
  const [isSaving, setIsSaving] = useState(false); // ДОБАВЛЕНО: состояние загрузки

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
            acc.applicableFields[val.name] = {
              value: initialData[val.name] || "",
              type: val.type,
            };
            acc.errorFields[val.name] = "";
          });
        } else {
          // ИСПРАВЛЕНИЕ: используем field.name вместо val.name
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
      const processedValue =
        name === "phoneNumber" ? value.replace(/^\+/, "") : value;
  
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

  // ДОБАВЛЕНО: обработчик выбора фото
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

  // ДОБАВЛЕНО: функция для очистки данных от пустых полей
const removeEmptyFields = (obj) => {
  const cleaned = { ...obj };
  
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === '' || cleaned[key] === null || cleaned[key] === undefined) {
      delete cleaned[key];
    } else if (typeof cleaned[key] === 'object' && cleaned[key] !== null) {
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

// ДОБАВЛЕНО: функция подготовки данных для отправки
const prepareFormDataForSubmit = () => {
  const data = {};
  
  // Преобразуем formData в плоский объект
  Object.keys(formData).forEach(key => {
    if (formData[key] && typeof formData[key] === 'object' && 'value' in formData[key]) {
      data[key] = formData[key].value;
    }
  });

  // Удаляем служебные поля, которые не нужно отправлять
  delete data.role;
  delete data.policy;
  delete data.regulations;

  // ДОБАВЛЕНО: преобразование данных в camelCase и обработка специальных полей
  let apiData = {
    firstName: data.firstName,
    lastName: data.lastName,
    patronymic: data.patronymic,
    birthDate: data.dateBirth || null, // Преобразование имени поля
    phoneNumber: data.phoneNumber,
    eduOrganization: data.eduOrganization,
    // Для участников
    ...(formData.role.value === 'participant' && {
      participant: {
        regionId: data.regionId ? parseInt(data.regionId) : 1,
        schoolGrade: data.schoolGrade,
        city: data.city,
        interests: data.interests,
        olympics: data.olympics,
        achievements: data.achievements
      }
    }),
    // Для менторов
    ...(formData.role.value === 'mentor' && {
      mentor: {
        jobTitle: data.jobTitle,
        specialization: data.specialization,
        researchTopics: data.researchTopics,
        articles: data.articles,
        scientificInterests: data.scientificInterests,
        taughtSubjects: data.taughtSubjects
      }
    })
  };

  // ИСПРАВЛЕНИЕ: удаляем пустые поля перед отправкой
  apiData = removeEmptyFields(apiData);

  return apiData;
};

  // ДОБАВЛЕНО: обработчик сохранения
  // ДОБАВЛЕНО: обработчик сохранения
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
    formDataToSend.append('data', JSON.stringify(apiData));
    
    // Если есть новое фото, добавляем его
    if (photoFile) {
      formDataToSend.append('photo', photoFile);
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

  // ДОБАВЛЕНО: проверка валидности формы для активации кнопки
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
              src={initialData?.photoPath || profilePhotoAvatar}
              alt="avatar"
              className={styles.profilePhotoPreview}
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
            onChange={handlePhotoChangeInternal} // ИСПРАВЛЕНО
            style={{ display: "none" }}
          />
        </div>

      <Button 
        large 
        text={isSaving ? "Сохранение..." : "Сохранить"} 
        onClick={handleSave} // ИСПРАВЛЕНО
        addClass={styles.btnSave}
        disabled={isSaving || !isFormValid()} // ДОБАВЛЕНО: блокировка при сохранении или невалидной форме
      />
    </>
  );
};

export default ProfileForm;