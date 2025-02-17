import { useState } from "react";
import { Container } from "react-bootstrap";
import LayoutLogin from "./layoutLogin";

import styles from "./styles/formLogin.module.css";
import stylesReg from "./styles/registration.module.css";
import Inputs from "../../../components/inputs/inputs";
import ArrowDown from "./images/arrowdown";
import ArrowUp from "./images/arrowup";

export default function Registration() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Участник");
  const options = ["Ментор", "Участник"];
  const formFields = [
    {
      id: 1,
      name: "firstName",
      label: "Фамилия",
      type: "text",
      placeholder: "Введите фамилию",
    },
    { id: 2, name: "lastName", label: "Имя", type: "text" },
    { id: 3, name: "middleName", label: "Отчество", type: "text" },
    { id: 4, name: "dateBirth", label: "Дата рождения", type: "date" },
    { id: 5, name: "region", label: "Регион", type: "text" },
    { id: 6, name: "locality", label: "Населенный пункт", type: "text" },
    {
      id: 7,
      name: "educationalOrganization",
      label: "Образовательная организация",
      type: "text",
    },
    { id: 8, name: "group", label: "Класс/група", type: "text" },
    { id: 9, name: "email", label: "Электронная почта", type: "email" },
    { id: 10, name: "tel", label: "Номер телефона", type: "tel" },
    { id: 10, name: "password", label: "Пароль", type: "password" },
    { id: 10, name: "retryPassword", label: "Повтор пароля", type: "password" },
  ];

  return (
    <LayoutLogin>
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
            {selected}
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
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </div>
                  {index === 0 && <hr className={stylesReg.hr} />}
                </>
              ))}
            </div>
          )}

          {formFields.map((item) => (
            <Inputs
              key={item.id}
              {...item}
            />
          ))}

          <div className={stylesReg.consent}>
            <span>
              <input
                type="checkbox"
                name="consent"
                id="consent"
                className={stylesReg.consentCheckBox}
              />
            </span>
            <span>
              Я подтверждаю ознакомление с Политикой и даю согласие на обработку
              персональных данных в порядке и на условиях, указанных в Политике.
            </span>
          </div>

          <div className={stylesReg.consent}>
            <span>
              <input
                type="checkbox"
                name="consent"
                id="consent"
                className={stylesReg.consentCheckBox}
              />
            </span>
            <span>Ознакомлен с Положением о проведении Хакатона</span>
          </div>

          <div>
            <button className={styles.enterButton}>Зарегистрироваться</button>
          </div>
        </div>
      </Container>
    </LayoutLogin>
  );
}
