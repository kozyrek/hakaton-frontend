import { useRef, useState } from "react";
import Button from "../button/button";

import styles from "./index.module.css";

import ShowPassword from "./images/showPassword";
import SvgDelete from "./images/SvgDelete";
import PaperClip from "../../pages/profile/components/personal-info/textView/images/PaperClip";
import { useDispatch } from "react-redux";
import { add_user_file, delete_user_file } from "../../store/user/userSlice";
import { Col, Row } from "react-bootstrap";

const HELPER_TEXT_PASSWORD =
  "Пароль должен содержать не менее 8 символов, используйте латиницу, спецсимволы (@#$%&*!), заглавные и прописные буквы, цифры.";

export default function Inputs(props) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { name, label, type, formData, formError, onChange, ...other } = props;
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
        onChange("", name);
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.container}>
      {type === "download" ? (
        <Row>
          {Array.isArray(formData[name].value) &&
            formData[name].value.map((item) => (
              <DownloadField
                key={item}
                files={item}
              />
            ))}
          <DownloadField />
        </Row>
      ) : (
        <>
          <label
            htmlFor={other.id}
            className={styles.label}
          >
            {label}
          </label>
          {type === "textarea" ? (
            <>
              <textarea
                className={`${styles.textarea} ${isError && styles.errorInput}`}
                value={formData[name]?.value || ""}
                onChange={(e) => onChange(e.target.value, name)}
                {...other}
              ></textarea>
              <div className={styles.length}>
                {formData[name].value.length}/600
              </div>
            </>
          ) : (
            <input
              type={isShowPassword ? "text" : type}
              className={`${styles.loginInput} ${isError && styles.errorInput}`}
              value={formData[name]?.value || ""}
              onChange={(e) => onChange(e.target.value, name)}
              required
              {...other}
            />
          )}
          <button
            className={`${styles.delete} ${!label && styles.notLabel}`}
            onClick={() => handelClick(type)}
          >
            {type === "password" ? <ShowPassword /> : <SvgDelete />}
          </button>
          {isError ? (
            <span className={styles.helherTextError}>{formError[name]}</span>
          ) : (
            name === "password" && <span>{HELPER_TEXT_PASSWORD}</span>
          )}
        </>
      )}
    </div>
  );
}

export function DownloadField({ files = "" }) {
  const [file, setFile] = useState(files);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      dispatch(add_user_file(e.target.files[0].name));
      setFile(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (value) => {
    setFile(null);
    if (fileInputRef.current) {
      dispatch(delete_user_file(value));
      fileInputRef.current.value = "";
    }
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

      {file ? (
        <div className={styles.fileInfo}>
          <div>
            <PaperClip />
          </div>
          <div className={styles.fileName}>{file.name || file}</div>
          <Button
            text="Удалить"
            onClick={() => handleRemoveFile(file.name || file)}
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
