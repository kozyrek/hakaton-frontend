import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LayoutLogin from "./layoutLogin";
import Inputs from "../../components/inputs/inputs";
import ModalWindow from "../../components/modalWindow";
import { getFormFields } from "./utils/utils";
import { debounce } from "./utils/debounce";
import {
  passwordMatchValidation,
  validateField,
  validateForm,
} from "./utils/validateForm";

import styles from "./styles/formLogin.module.css";
import stylesReg from "./styles/registration.module.css";

import { MODAL } from "../../components/modalWindow/utils/constants";
import Select from "../../components/select";
import userRegistration from "../../api/userRegistration";
import getRegions from "../../api/getRegions";

const initFormData = {
  policy: { value: false, type: "checkbox" },
  regulations: { value: false, type: "checkbox" },
};

export default function Registration() {
  const [formData, setFormData] = useState(initFormData);
  const [role, setRole] = useState("participant");

  const [formError, setFormError] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [regions, setRegions] = useState([]);
  const [fieldsByRole, setFieldsByRole] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const formFields = getFormFields(regions);
    const { applicableFields, errorFields, fields } = formFields.reduce(
      (acc, field) => {
        if (field.data) {
          if (field.name === role) {
            field.data.map((val) => {
              acc.applicableFields[val.name] = {
                value: "",
                type: val.type,
              };
              acc.errorFields[val.name] = "";
              acc.fields.push(val);
            });
          }
        } else {
          acc.applicableFields[field.name] = {
            value: "",
            type: field.type,
          };
          acc.errorFields[field.name] = "";
          acc.fields.push(field);
        }
        return acc;
      },
      { applicableFields: {}, errorFields: {}, fields: [] }
    );

    setFormData({ ...initFormData, ...applicableFields });

    setFieldsByRole(fields);

    setFormError(errorFields);
  }, [role, regions]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const requestProject = await getRegions();
        setRegions(requestProject);
      } catch (e) {
        console.error(e.message);
      }
    }
    fetchRegions();
  }, []);

  const debonceValidate = debounce(validateField, 100);

  const handleChange = (value, name) => {
    const processedValue =
      name === "phoneNumber" ? value.replace(/^\+/, "") : value;

    setFormData({
      ...formData,
      [name]: { value: processedValue, type: formData[name].type },
    });
    debonceValidate(value, formData[name].type, name, setFormError);
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
      const response = await userRegistration({ role: { value: role, type: "text" }, ...formData });

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
              className={`${stylesReg.conInputs} mb-4`}
            >
              <Select
                label={"Роль"}
                name={"role"}
                selectedValue={role}
                onChange={setRole}
                options={[
                  { id: "mentor", name: "Ментор" },
                  { id: "participant", name: "Участник" },
                ]}
              />
            </div>

            {fieldsByRole.map((item) => {
              return (
                <div
                  className={`${stylesReg.conInputs} mb-4`}
                  key={item.id}
                >
                  {item.type === "select"
                    ? <Select
                      {...item}
                      isClearable={true}
                      selectedValue={formData[item.name].value}
                      onChange={handleChange}
                    />
                    : <Inputs
                      {...item}
                      formData={formData}
                      formError={formError}
                      onChange={handleChange}
                    />
                  }
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
          setIsShow={() => {
            setIsShowModal(false);
            navigate("/");
          }}
        />
      )}
    </LayoutLogin>
  );
}
