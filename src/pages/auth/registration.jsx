import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState, Fragment } from "react"; // Добавлен импорт Fragment
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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
import userRegistration from "../../api/userRegistration";
import getRegion from "../../api/regions/getRegions";

export default function Registration() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowRegion, setIsShowRegion] = useState(false);
  const [formData, setFormData] = useState({
    role: { value: "participant", type: "role" },
    policy: { value: false, type: "checkbox" },
    regulations: { value: false, type: "checkbox" },
  });
  const [regions, setRegions] = useState([]);
  const timerRef = useRef(null);
  const [formError, setFormError] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const options = [
    { role: "mentor", value: "Ментор" },
    { role: "participant", value: "Участник" },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegion = async () => {
      const response = await getRegion();
      setRegions(response.data);
    };
    fetchRegion();
  }, []);

  useEffect(() => {
    const { applicableFields, errorFields } = formFields.reduce(
      (acc, field) => {
        if (field.name === formData.role.value) {
          field.data.map((val) => {
            acc.applicableFields[val.name] = {
              value: "",
              type: val.type,
            };
            acc.errorFields[val.name] = "";
          });
        } else {
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

  const handleSubmit = async () => {
    const errors = validateForm(formData, formError, setFormError);
    if (!passwordMatchValidation(formData)) {
      const name = "retryPassword";
      setFormError((prevError) => ({
        ...prevError,
        [name]: "Пароли не совпадают",
      }));
      return;
    }

    if (errors) return;

    try {
      const response = await userRegistration(formData);

      if (response?.status === 201) {
        console.log("reg");
        setIsShowModal(true);
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);

      // Обработка конфликта 409
      if (error.response?.status === 409) {
        const errorMessage = error.response.data.detail;

        // Проверяем конкретную причину конфликта
        if (errorMessage.includes("User with this email already exists")) {
          setFormError((prev) => ({
            ...prev,
            email: "Пользователь с таким email уже зарегистрирован",
          }));
        } else if (errorMessage.includes("region_id does not exist")) {
          setFormError((prev) => ({
            ...prev,
            regionId: "Указанный регион не существует",
          }));
        } else {
          toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error(
          error.response?.data?.detail || "Произошла неизвестная ошибка",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  };

  return (
    <LayoutLogin>
      {!isShowModal ? (
        <Container
          fluid
          className={`${styles.containerForm} mt-5 mb-5`}
        >
          <div className={`${styles.form} pb-5`}>
            <h3 className={`${styles.h3} mb-4`}>Регистрация</h3>
            <div className={stylesReg.choosingRoleText}>
              Все поля обязательны для заполнения.
            </div>
            <div
              className={`${styles.loginInput} ${stylesReg.requred} pt-2`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {options.find((e) => e.role === formData.role.value).value}
              <span
                className={stylesReg.arrow}
                key="role-selected"
              >
                {!isOpen ? <ArrowDown /> : <ArrowUp />}
              </span>
            </div>

            {isOpen && (
              <div className={stylesReg.requredOptinsCOntainer}>
                {options.map((option, index) => (
                  <Fragment key={option.role}> {/* Добавлен ключ */}
                    {" "}
                    <div
                      className={stylesReg.option}
                      onClick={() => {
                        handleChange(option.role, "role");
                        setIsOpen(false);
                      }}
                    >
                      {option.value}
                    </div>
                    {index === 0 && <hr className={stylesReg.hr} />}
                  </Fragment>
                ))}
              </div>
            )}

            {formFields.map((item) => {
              return item.name === formData.role.value ? (
                item.data.map((e) =>
                  e.name === "regionId" ? (
                    <div key={e.id}> {/* Добавлен ключ */}
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
                              <div key={option.id}> {/* Добавлен ключ */}
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
                      className={`${stylesReg.conInputs} mb-4`}
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
                  className={`${stylesReg.conInputs} mb-4`}
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
          setIsShow={() => {
            setIsShowModal(false);
            navigate("/");
          }}
        />
      )}
    </LayoutLogin>
  );
}