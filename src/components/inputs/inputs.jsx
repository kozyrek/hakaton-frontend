import { useRef, useState } from "react";
import { IMaskInput } from 'react-imask';
import Button from "../button/button";

import styles from "./index.module.css";

import ShowPassword from "./images/showPassword";
import SvgDelete from "./images/SvgDelete";
import PaperClip from "../../pages/profile/components/personal-info/textView/images/PaperClip";
import { useDispatch, useSelector } from "react-redux";
import { add_user_file, delete_user_file } from "../../store/user/userSlice";
import { Col, Row } from "react-bootstrap";
import addUserDocument from "../../api/document-user/addUserDocument";
import deleteUserDocument from "../../api/document-user/deleteUserDocument";

const HELPER_TEXT_PASSWORD =
  "Пароль должен содержать не менее 8 символов, используйте латиницу, спецсимволы (@#$%&*!), заглавные и строчные буквы, цифры.";

// Функция для форматирования даты из формата сервера (YYYY-MM-DD) в формат отображения (DD.MM.YYYY)
const formatDateForDisplay = (serverDate) => {
  if (!serverDate) return '';
  try {
    const [year, month, day] = serverDate.split('-');
    if (day && month && year) {
      return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
    }
    return serverDate;
  } catch (e) {
    return serverDate;
  }
};

// Функция для преобразования даты из формата отображения (DD.MM.YYYY) в формат сервера (YYYY-MM-DD)
const formatDateForServer = (displayDate) => {
  if (!displayDate) return '';
  try {
    const [day, month, year] = displayDate.split('.');
    if (day && month && year) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return displayDate;
  } catch (e) {
    return displayDate;
  }
};

export default function Inputs(props) {
  const documents = useSelector((state) => state.user?.documents);
  const [filesList, setFilesList] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const {
    name,
    label,
    type,
    formData,
    formError,
    onChange,
    maxLength = 500,
    notUser = false,
    disabled,
    accept,
    ...other
  } = props;
  const isError = formError[name] || null;

  const handelClick = (type) => {
    switch (type) {
      case "password":
        setIsShowPassword(!isShowPassword);
        break;
      case "text":
      case "tel":
      case "email":
      case "textarea":
      case "date":
        onChange("", name);
        break;
      default:
        break;
    }
  };

  const handleChangeFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      e.preventDefault();
      onChange(e.target.files[0], name);
      setFilesList(e.target.files[0]);
    }
  }

  const handleDeleteFile = (i) => {
    onChange("", name);
    setFilesList(null);
  }

  // Проверяем, является ли поле датой рождения
  const isDateField = name === "birthDate" || type === "date";

  return (
    <div className={styles.container}>
      {type === "download" ? (
        !notUser ? <Row>
          {Array.isArray(documents) &&
            documents.map((item) => (
              <DownloadField
                key={item.id}
                files={item}
              />
            ))}
          <DownloadField key="new-file" />
        </Row>
        : <DownloadFile 
          onChange={handleChangeFile}
          onClick={handleDeleteFile}
          filesList={filesList}
          disabled={disabled}
          accept={accept}
        />
      ) : (
        <>
          <label
            htmlFor={other.id}
            className={styles.label}
          >
            {label}
          </label>
          
          {/* Обертка для поля ввода и кнопки очистки */}
          <div className={styles.inputWrapper}>
            {type === "textarea" ? (
              <>
                <textarea
                  className={`${styles.textarea} ${isError && styles.errorInput}`}
                  value={formData[name]?.value || ""}
                  onChange={(e) => onChange(e.target.value, name)}
                  {...other}
                  maxLength={maxLength}
                  disabled={disabled}
                ></textarea>
                <div className={styles.length}>
                  {formData[name]?.value.length || 0}/{maxLength}
                </div>
                <button
                  className={`${styles.delete} ${!label && styles.notLabel}`}
                  onClick={() => handelClick(type)}
                >
                  <SvgDelete />
                </button>
              </>
            ) : type === "tel" ? (
              <div className={styles.phoneInputWrapper}>
                <IMaskInput
                  mask="+7 (000) 000-00-00"
                  placeholderChar="_"
                  placeholder="+7 (999) 999-99-99"
                  lazy={!formData[name]?.value}
                  value={formData[name]?.value || ""}
                  onAccept={(value) => onChange(value, name)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className={`${styles.loginInput} ${isError && styles.errorInput} ${
                    !formData[name]?.value && !focused ? styles.transparentInput : ''
                  }`}
                  required
                  maxLength={maxLength}
                  disabled={disabled}
                  {...other}
                />
                <button
                  className={`${styles.delete} ${styles.phoneDelete} ${!label && styles.notLabel}`}
                  onClick={() => handelClick(type)}
                >
                  <SvgDelete />
                </button>
              </div>
            ) : isDateField ? (
              // Специальная обработка для поля даты рождения
              <div className={styles.phoneInputWrapper}>
                <IMaskInput
                  mask="00.00.0000"
                  placeholder="дд.мм.гггг"
                  lazy={!formData[name]?.value}
                  value={formData[name]?.value || ""}
                  onAccept={(value) => onChange(value, name)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className={`${styles.loginInput} ${isError && styles.errorInput} ${
                    !formData[name]?.value && !focused ? styles.transparentInput : ''
                  }`}
                  required
                  disabled={disabled}
                  {...other}
                />
                <button
                  className={`${styles.delete} ${styles.phoneDelete} ${!label && styles.notLabel}`}
                  onClick={() => handelClick(type)}
                >
                  <SvgDelete />
                </button>
              </div>
            ) : (
              <>
                <input
                  type={isShowPassword ? "text" : type}
                  className={`${styles.loginInput} ${isError && styles.errorInput}`}
                  value={formData[name]?.value || ""}
                  onChange={(e) => onChange(e.target.value, name)}
                  required
                  maxLength={maxLength}
                  disabled={disabled}
                  {...other}
                />
                <button
                  className={`${styles.delete} ${!label && styles.notLabel}`}
                  onClick={() => handelClick(type)}
                >
                  {type === "password" ? <ShowPassword /> : <SvgDelete />}
                </button>
              </>
            )}
          </div>

          {isError ? (
            <span className={styles.helherTextError}>{formError[name]}</span>
          ) : (
            name === "password" && <span className={styles.helherTextPassword}>{HELPER_TEXT_PASSWORD}</span>
          )}
        </>
      )}
    </div>
  );
}

// Остальной код компонента остается без изменений...
export function DownloadField({ files = null }) {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = await addUserDocument(e.target.files[0]);
      dispatch(add_user_file(file.data));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = async (id) => {
    await deleteUserDocument(id);
    dispatch(delete_user_file(id));
  };

  return (
    <Col
      xs={12}
      md={6}
      className={styles.fileUploadContainer}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {files ? (
        <div className={styles.fileInfo}>
          <div>
            <PaperClip />
          </div>
          <div className={styles.fileName}>{files.name}</div>
          <Button
            text="Удалить"
            onClick={() => handleRemoveFile(files.id)}
          />
        </div>
      ) : (
        <Button
          text="Добавить файл"
          onClick={handleButtonClick}
          addClass={styles.btn}
        />
      )}
    </Col>
  );
}

export function DownloadFile({
  name, 
  filesList,
  onChange, 
  onClick, 
  disabled,
  accept,
}) {
  const fileInputRef = useRef(null);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputFileWrapper}>
        <label className={`${styles.inputFile}`}>
          <span className={`text4 ${styles.inputFileText} ${filesList && styles.inputFileName}`}>
            {filesList ? filesList.name : "Выберите файл"}
          </span>
          <input 
            type="file" 
            ref={fileInputRef}
            name={name}
            onChange={onChange} 
            className={styles.visuallyHidden}
            disabled={disabled}
            accept={accept}
          />
        </label>
        <button
          className={`${styles.delete}`}
          onClick={onClick}
        >
          <SvgDelete />
        </button>
      </div>

      <Button 
        text="Загрузить"
        violet
        onClick={handleAddClick} 
      >
        Загрузить
      </Button>
    </div> 
  )
}