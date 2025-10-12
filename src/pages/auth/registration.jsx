import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState, Fragment } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LayoutLogin from "./layoutLogin";
import Inputs from "../../components/inputs/inputs";
import ModalWindow from "../../components/modalWindow";
import ModalWrapper from "../../components/modalOverlay";
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
import Button from "../../components/button/button";

export default function Registration() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowRegion, setIsShowRegion] = useState(false);
  
  // Инициализируем все поля сразу
  const initialFormData = {
    role: { value: "participant", type: "role" },
    policy: { value: false, type: "checkbox" },
    regulations: { value: false, type: "checkbox" },
  };
  
  // Добавляем все поля из formFields
  formFields.forEach(field => {
    if (field.data) {
      field.data.forEach(subField => {
        initialFormData[subField.name] = { value: '', type: subField.type };
      });
    } else {
      initialFormData[field.name] = { value: '', type: field.type };
    }
  });

  const [formData, setFormData] = useState(initialFormData);
  const [regions, setRegions] = useState([]);
  const [errorModal, setErrorModal] = useState({ isOpen: false, messages: [] });
  const timerRef = useRef(null);
  
  // Инициализируем ошибки для всех полей
  const initialFormError = {};
  formFields.forEach(field => {
    if (field.data) {
      field.data.forEach(subField => {
        initialFormError[subField.name] = '';
      });
    } else {
      initialFormError[field.name] = '';
    }
  });
  initialFormError.policy = '';
  initialFormError.regulations = '';
  
  const [formError, setFormError] = useState(initialFormError);
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

  const handleChange = (value, name) => {
    // Защищаемся от несуществующих полей
    if (!formData[name]) {
      return;
    }

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

  // Функция для проверки чекбоксов
  const validateCheckboxes = () => {
    const errors = {};
    let hasErrors = false;

    if (!formData.policy.value) {
      errors.policy = "Необходимо подтвердить согласие с политикой";
      hasErrors = true;
    }

    if (!formData.regulations.value) {
      errors.regulations = "Необходимо подтвердить ознакомление с положением";
      hasErrors = true;
    }

    if (hasErrors) {
      setFormError(prev => ({
        ...prev,
        ...errors
      }));
    }

    return hasErrors;
  };

const formatErrorMessage = (errorMessage) => {
  if (!errorMessage) return ["Пожалуйста, проверьте введенные данные"];
  
  let messages = [];
  
  // Если это массив ошибок, обрабатываем каждую
  if (Array.isArray(errorMessage)) {
    messages = errorMessage.map(msg => {
      const message = msg.toString();
      
      // Заменяем сообщения на русские
      if (message.includes("String should have at least 2 characters")) {
        return "Поле должно содержать минимум 2 символа";
      }
      if (message.includes("Input should be a valid date or datetime, input is too short")) {
        return "Неверный формат даты, пожалуйста, заполните её корректно";
      }
      if (message.includes("String should match pattern '^7\\d{10}$'")) {
        return "Номер телефона должен начинаться с 7 и содержать 11 цифр";
      }
      if (message.includes("Password contains invalid characters") || 
          message.includes("body.password: Value error, Password contains invalid characters")) {
        return "Пароль содержит недопустимые символы. Допустимые символы: заглавные и строчные латинские буквы, цифры и ! @ # $ % & *";
      }
      if (message.includes("Input should be a valid date or datetime, invalid date separator, expected `-`")) {
        return "Неверный формат даты, пожалуйста, заполните её корректно";
      }
      if (message.includes("field required")) {
        return "Обязательное поле не заполнено";
      }
      if (message.includes("invalid email")) {
        return "Неверный формат email адреса";
      }
      if (message.includes("value is not a valid")) {
        return "Неверное значение поля";
      }
      if (message.includes("ensure this value has at least") || message.includes("ensure this value has at most")) {
        return "Некорректная длина поля";
      }
      
      // Если сообщение не было переведено, используем фолбек
      return "Пожалуйста, проверьте введенные данные";
    });
  } else {
    // Если это одна ошибка
    const message = errorMessage.toString();
    
    // Заменяем конкретные сообщения об ошибках
    if (message.includes("String should have at least 2 characters")) {
      messages.push("Поле должно содержать минимум 2 символа");
    }
    else if (message.includes("Input should be a valid date or datetime, input is too short")) {
      messages.push("Неверный формат даты, пожалуйста, заполните её корректно");
    }
    else if (message.includes("String should match pattern '^7\\d{10}$'")) {
      messages.push("Номер телефона должен начинаться с 7 и содержать 11 цифр");
    }
    else if (message.includes("Password contains invalid characters") || 
             message.includes("body.password: Value error, Password contains invalid characters")) {
      messages.push("Пароль содержит недопустимые символы. Допустимые символы: заглавные и строчные латинские буквы, цифры и ! @ # $ % & *");
    }
    else if (message.includes("Input should be a valid date or datetime, invalid date separator, expected `-`")) {
      messages.push("Неверный формат даты, пожалуйста, заполните её корректно");
    }
    else if (message.includes("field required")) {
      messages.push("Обязательное поле не заполнено");
    }
    else if (message.includes("invalid email")) {
      messages.push("Неверный формат email адреса");
    }
    else if (message.includes("value is not a valid")) {
      messages.push("Неверное значение поля");
    }
    else if (message.includes("ensure this value has at least") || message.includes("ensure this value has at most")) {
      messages.push("Некорректная длина поля");
    }
    else {
      // Если сообщение не было переведено, используем фолбек
      messages.push("Пожалуйста, проверьте введенные данные");
    }
  }
  
  // Дополнительная проверка: если после обработки остались непереведенные английские сообщения, заменяем их
  const finalMessages = messages.map(msg => {
    // Проверяем, содержит ли сообщение английские слова (простые паттерны для common validation errors)
    const hasEnglishPattern = 
      /(String should|Input should|valid date|match pattern|Password contains|field required|invalid email|value is not|ensure this value)/i.test(msg);
    
    if (hasEnglishPattern) {
      return "Пожалуйста, проверьте введенные данные";
    }
    
    return msg;
  });
  
  return finalMessages;
};

const getErrorMessage = (error) => {
  console.log("Error response data:", error);
  
  // Если error.detail - это строка, возвращаем её
  if (typeof error?.detail === 'string') {
    return [error.detail];
  }
  
  // Если error.detail - это массив (как в Pydantic validation errors)
  if (Array.isArray(error?.detail)) {
    // Возвращаем массив всех сообщений об ошибках
    return error.detail.map(err => {
      // Если ошибка содержит loc и msg, формируем понятное сообщение
      if (err.loc && err.msg) {
        const field = err.loc[err.loc.length - 1]; // Берем последний элемент loc (название поля)
        // Пытаемся определить поле на русском
        const fieldNames = {
          'firstName': 'Имя',
          'lastName': 'Фамилия', 
          'patronymic': 'Отчество',
          'birthDate': 'Дата рождения',
          'phoneNumber': 'Номер телефона',
          'email': 'Email',
          'password': 'Пароль',
          'regionId': 'Регион',
          'schoolGrade': 'Класс',
          'city': 'Город',
          'policy': 'Согласие с политикой',
          'regulations': 'Согласие с положением'
        };
        const russianField = fieldNames[field] || field;
        return `${russianField}: ${err.msg}`;
      }
      return err.msg || JSON.stringify(err);
    });
  }
  
  // Если error.detail - это объект
  if (typeof error?.detail === 'object') {
    return Object.entries(error.detail)
      .map(([key, value]) => {
        const fieldNames = {
          'firstName': 'Имя',
          'lastName': 'Фамилия', 
          'patronymic': 'Отчество',
          'birthDate': 'Дата рождения',
          'phoneNumber': 'Номер телефона',
          'email': 'Email',
          'password': 'Пароль',
          'regionId': 'Регион',
          'schoolGrade': 'Класс',
          'city': 'Город',
          'policy': 'Согласие с политикой',
          'regulations': 'Согласие с положением'
        };
        const russianField = fieldNames[key] || key;
        return `${russianField}: ${value}`;
      });
  }
  
  // Если есть прямые поля с ошибками в response.data
  if (error && typeof error === 'object') {
    const messages = [];
    for (const [key, value] of Object.entries(error)) {
      if (key !== 'detail' && value) {
        if (Array.isArray(value)) {
          messages.push(...value.map(v => {
            const fieldNames = {
              'firstName': 'Имя',
              'lastName': 'Фамилия', 
              'patronymic': 'Отчество',
              'birthDate': 'Дата рождения',
              'phoneNumber': 'Номер телефона',
              'email': 'Email',
              'password': 'Пароль',
              'regionId': 'Регион',
              'schoolGrade': 'Класс',
              'city': 'Город',
              'policy': 'Согласие с политикой',
              'regulations': 'Согласие с положением'
            };
            const russianField = fieldNames[key] || key;
            return `${russianField}: ${v}`;
          }));
        } else {
          const fieldNames = {
            'firstName': 'Имя',
            'lastName': 'Фамилия', 
            'patronymic': 'Отчество',
            'birthDate': 'Дата рождения',
            'phoneNumber': 'Номер телефона',
            'email': 'Email',
            'password': 'Пароль',
            'regionId': 'Регион',
            'schoolGrade': 'Класс',
            'city': 'Город',
            'policy': 'Согласие с политикой',
            'regulations': 'Согласие с положением'
          };
          const russianField = fieldNames[key] || key;
          messages.push(`${russianField}: ${value}`);
        }
      }
    }
    if (messages.length > 0) return messages;
  }
  
  // Если это просто строка в response.data
  if (typeof error === 'string') {
    return [error];
  }
  
  // Если пришел сам объект ошибки
  if (error?.msg || error?.message) {
    return [error.msg || error.message];
  }
  
  // По умолчанию
  return ["Пожалуйста, проверьте введенные данные"];
};

const handleSubmit = async () => {
  // Сначала проверяем чекбоксы
  const checkboxErrors = validateCheckboxes();
  if (checkboxErrors) {
    return;
  }

  // Затем проверяем остальную валидацию формы
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

    let errorMessages = ["Произошла неизвестная ошибка при регистрации"];

    if (error.response?.status === 409) {
      const errorDetail = error.response.data.detail || error.response.data;

      if (typeof errorDetail === 'string' && errorDetail.includes("User with this email already exists")) {
        setFormError((prev) => ({
          ...prev,
          email: "Пользователь с таким email уже зарегистрирован",
        }));
        return;
      } else if (typeof errorDetail === 'string' && errorDetail.includes("region_id does not exist")) {
        setFormError((prev) => ({
          ...prev,
          regionId: "Указанный регион не существует",
        }));
        return;
      } else {
        errorMessages = getErrorMessage(error.response.data);
      }
    } else if (error.response?.status === 422) {
      // Ошибки валидации - наиболее частый случай
      errorMessages = getErrorMessage(error.response.data) || ["Ошибка валидации данных. Проверьте правильность заполнения полей."];
    } else if (error.response?.status === 400) {
      errorMessages = getErrorMessage(error.response.data) || ["Неверные данные для регистрации. Проверьте введенную информацию."];
    } else if (error.response?.status === 500) {
      errorMessages = ["Внутренняя ошибка сервера. Попробуйте позже."];
    } else if (error.response?.data) {
      errorMessages = getErrorMessage(error.response.data);
    } else if (error.message) {
      errorMessages = [error.message];
    }

    // Форматируем сообщения об ошибках для лучшей читаемости
    const formattedErrorMessages = formatErrorMessage(errorMessages);

    // Показываем модальное окно с ошибками
    setErrorModal({
      isOpen: true,
      messages: formattedErrorMessages
    });
  }
};

  const closeErrorModal = () => {
    setErrorModal({ isOpen: false, messages: [] });
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
                  <Fragment key={option.role}>
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
                    <div key={e.id}>
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
  <div className={stylesReg.checkboxRow}>
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
      <span style={{marginRight: "4px", marginLeft: "4px"}}>
      <a 
         href="/Положение_о_научном_хакатоне_23_10_23.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className={stylesReg.link}
      >
        Политикой
      </a>
      </span>

       и даю согласие на обработку персональных данных в порядке
      и на условиях, указанных в Политике.
    </span>
  </div>
  {formError.policy && (
    <div className={stylesReg.checkboxError}>
      {formError.policy}
    </div>
  )}
</div>

<div className={stylesReg.consent}>
  <div className={stylesReg.checkboxRow}>
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
      <a 
        href="/Положение_о_научном_хакатоне_23_10_23.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className={stylesReg.link}
      >
        Положением о проведении Хакатона
      </a>
    </span>
  </div>
  {formError.regulations && (
    <div className={stylesReg.checkboxError}>
      {formError.regulations}
    </div>
  )}
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

      {/* Модальное окно для ошибок регистрации с использованием ModalWrapper */}
<ModalWrapper
  isOpen={errorModal.isOpen}
  onClose={closeErrorModal}
>
  <ModalWindow
    title="Ошибка регистрации"
    setIsShow={closeErrorModal}
    buttonArea={[
      <Button
        key="close"
        text="Ок"
        onClick={closeErrorModal}
      />
    ]}
  >
    <div style={{ whiteSpace: 'pre-line' }}>
      {errorModal.messages.map((message, index) => {
        // Определяем выравнивание в зависимости от длины сообщения
        const textAlign = message.length < 40 ? 'center' : 'left';
        
        return (
          <div 
            key={index} 
            style={{ 
              marginBottom: index < errorModal.messages.length - 1 ? '10px' : '0',
              textAlign: textAlign,
              padding: '0 10px'
            }}
          >
            {message}
          </div>
        );
      })}
    </div>
  </ModalWindow>
</ModalWrapper>
    </LayoutLogin>
  );
}