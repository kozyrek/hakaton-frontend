import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
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

export default function Registration() {
  const [formData, setFormData] = useState({
    role: { value: "participant", type: "role" },
    policy: { value: false, type: "checkbox" },
    regulations: { value: false, type: "checkbox" },
  });

  const [formError, setFormError] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [regions, setRegions] = useState([]);
  const [fieldsByRole, setFieldsByRole] = useState([]);
  console.log("🚀 ~ Registration ~ fieldsByRole:", fieldsByRole)
  console.log("🚀 ~ Registration ~ formData:", formData)

  useEffect(() => {
    const formFields = getFormFields(regions);
    const { applicableFields, errorFields, fields } = formFields.reduce(
      (acc, field) => {
        if (field.data) {
          if (field.name === formData.role.value) {
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

    setFormData((prev) => ({
      ...prev,
      ...applicableFields,
    }));

    setFieldsByRole(fields);

    setFormError(errorFields);
  }, [formData.role.value, regions]);

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
    setFormData({
      ...formData,
      [name]: { value: value, type: formData[name].type },
    });
    debonceValidate(value, formData[name].type, name, setFormError);
  };

  const handleSubmit = () => {
    const errors = validateForm(formData, formError, setFormError);
    if (!passwordMatchValidation(formData)) {
      const name = "retryPassword";
      setFormError((prevError) => ({
        ...prevError,
        [name]: "Пароли не совпадают.",
      }));
      return;
    }
    console.log(formError);
    if (errors) return;
    const response = userRegistration(formData);
    setIsShowModal(true);
    console.log(response);
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
                selectedValue={formData["role"].value}
                onChange={handleChange}
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
          setIsShow={() => setIsShowModal(false)}
        />
      )}
    </LayoutLogin>
  );
}
