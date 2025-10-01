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

  return (
    <>
      <h2 className={`titleH2 ${styles.profileTabTitle}`}>Регистрационные данные</h2>
      <div className={`text2 ${styles.userRegDataChange}`}>
        {formFields.map((item) => {
          return item.name === formData.role.value ? (
            item.data.map((e) =>
              e.name === "regionId" ? (
                <div className={styles.regionId}>
                  <label className={stylesReg.label}>Регион</label>
                  <div
                    className={`${styles.loginInput} ${stylesReg.requred} pt-2`}
                    onClick={() => setIsShowRegion(!isShowRegion)}
                  >
                    {formData.regionId?.value
                      ? regions.find((r) => r.id == formData.regionId.value)
                          ?.name
                      : "Выберите регион"}
                    <span
                      className={stylesReg.arrow}
                      key="role-selected"
                    >
                      {!isShowRegion ? <ArrowDown /> : <ArrowUp />}
                    </span>
                    {isShowRegion && (
                      <div
                        className={`${stylesReg.requredOptinsCOntainer} ${stylesReg.rq}`}
                      >
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
                </div>
              ) : (
                <div
                  className={`${stylesReg.conInputs} ${styles[item.data[e.id-8].name]}`}
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
              src={formData.photo_url || profilePhotoAvatar}
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
            // style={{ display: "none" }}
          />
        </div>

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