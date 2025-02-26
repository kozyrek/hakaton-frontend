import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LayoutLogin from "./layoutLogin";
import Inputs from "../../components/inputs/inputs";
import ModalWindow from "../../components/modalWindow";
import { formFields } from "./utils/utils";
import {
  passwordMatchValidation,
  validateField,
  validateForm,
} from "./utils/validateForm";

import styles from "./styles/formLogin.module.css";
import stylesReg from "./styles/registration.module.css";

import ArrowDown from "./images/arrowdown";
import ArrowUp from "./images/arrowup";
import { MODAL } from "../../components/modalWindow/utils/constants";

export default function Registration() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: { value: "participant", type: "role" },
    policy: { value: false, type: "checkbox" },
    regulations: { value: false, type: "checkbox" },
  });
  const timerRef = useRef(null);
  const [formError, setFormError] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const options = [
    { role: "mentor", value: "Ментор" },
    { role: "participant", value: "Участник" },
  ];

  useEffect(() => {
    const { applicableFields, errorFields } = formFields.reduce(
      (acc, field) => {
        const isApplicable =
          !Object.hasOwn(field, "role") || field.role === formData.role.value;

        if (isApplicable) {
          acc.applicableFields[field.name] = {
            value: "",
            type: field.type,
          };
          acc.errorFields[field.name] = "";
        }
        return acc;
      },
      { applicableFields: {}, errorFields: {} }
    );

    setFormData((prev) => ({
      ...prev,
      ...applicableFields,
    }));

    setFormError(errorFields);
  }, [formData.role.value]);

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: { value: value, type: formData[name].type },
    });

    if (timerRef.current) {
      clearTimeout(timerRef);
    }

    timerRef.current = setTimeout(() => {
      validateField(value, formData[name].type, name, setFormError);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsShowModal(true);
    const errors = validateForm(formData, formError, setFormError);
    if (!passwordMatchValidation(formData)) {
      const name = "retryPassword";
      setFormError((prevError) => ({
        ...prevError,
        [name]: "Пароли не совпадают.",
      }));
      return;
    }
    if (errors) return;
  };

  return (
    <LayoutLogin>
      {!isShowModal ? (
        <Container
          fluid
          className={`${styles.containerForm} mt-5 mb-5`}
        >
          <div className={`${styles.form} pb-5`}>
            <h3 className="mb-4">Регистрация</h3>
            <div className={stylesReg.choosingRoleText}>
              Все поля обязательны для заполнения.
            </div>
            <div
              className={`${styles.loginInput} ${stylesReg.requred} pt-2`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {options.find((e) => e.role === formData.role.value).value}
              <span className={stylesReg.arrow}>
                {!isOpen ? <ArrowDown /> : <ArrowUp />}
              </span>
            </div>

            {isOpen && (
              <div className={stylesReg.requredOptinsCOntainer}>
                {options.map((option, index) => (
                  <>
                    {" "}
                    <div
                      className={stylesReg.option}
                      key={index}
                      onClick={() => {
                        handleChange(option.role, "role");
                        setIsOpen(false);
                      }}
                    >
                      {option.value}
                    </div>
                    {index === 0 && <hr className={stylesReg.hr} />}
                  </>
                ))}
              </div>
            )}

            {formFields.map((item) => {
              return (
                <div
                  className={stylesReg.conInputs}
                  key={item.id}
                >
                  {!item.hasOwnProperty("role") ||
                  item["role"] === formData.role.value ? (
                    <Inputs
                      {...item}
                      formData={formData}
                      formError={formError}
                      onChange={handleChange}
                    />
                  ) : null}
                </div>
              );
            })}

            <div className={stylesReg.consent}>
              <span>
                <input
                  type="checkbox"
                  name="policy"
                  id="policy"
                  className={stylesReg.consentCheckBox}
                  onChange={() =>
                    handleChange(!formData["policy"].value, "policy")
                  }
                />
              </span>
              <span className={stylesReg.policy}>
                Я подтверждаю ознакомление с 
                <Link
                  to="/"
                  className={stylesReg.link}
                >
                  Политикой
                </Link>
                 и даю согласие на обработку персональных данных в порядке
                и на условиях, указанных в Политике.
              </span>
            </div>

            <div className={stylesReg.consent}>
              <span>
                <input
                  type="checkbox"
                  name="regulations"
                  id="regulations"
                  className={stylesReg.consentCheckBox}
                  onChange={() =>
                    handleChange(!formData["regulations"].value, "regulations")
                  }
                />
              </span>
              <span className={stylesReg.policy}>
                Ознакомлен с{" "}
                <Link
                  to="/"
                  className={stylesReg.link}
                >
                  Положением о проведении Хакатона
                </Link>
              </span>

              <div className={stylesReg.helperTextError}>
                {formError["policy"]}
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className={styles.enterButton}
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </Container>
      ) : (
        <ModalWindow
          {...MODAL.REGISTRATION_FORM_HAS_BEEN_SENT}
          setIsShow={() => setIsShowModal(false)}
        />
      )}
    </LayoutLogin>
  );
}
