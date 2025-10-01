import { useEffect, useState } from "react";
import createFormDataAndError from "../../../../../utils/createFormDataAndError";
import Inputs from "../../../../../components/inputs/inputs";
import { LABELS } from "..";
import { Row, Col } from "react-bootstrap";
import updateUserInterest from "../../../../../api/updateUserInterest";

import styles from "../index.module.css";
import Button from "../../../../../components/button/button";
import { useDispatch } from "react-redux";
import { set_user } from "../../../../../store/user/userSlice";

export default function TextEdit(props) {
  const { personalInfo, onClick, id, isMentor } = props;
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { applicableFields, errorFields } = createFormDataAndError(personalInfo);
    setFormData(applicableFields);
    setFormError(errorFields);
  }, [personalInfo]);

  const handleChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: { value: value } }));
  };

  const handleSubmit = async () => {
    if (!id) {
      console.error('Нельзя сохранить: ID пользователя отсутствует');
      return;
    }

    try {
      setLoading(true);
      console.log('Отправка данных для пользователя:', id);
      console.log('Данные:', formData);
      
      const response = await updateUserInterest(id, formData, isMentor);
      console.log('Успешный ответ:', response);
      
      dispatch(set_user(response));
      onClick(false);
    } catch (error) {
      console.error('Ошибка сохранения данных:', error);
      console.error('Детали ошибки:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Проверка ID после всех хуков
  if (!id) {
    console.error('TextEdit: ID пользователя не передан');
    return <div>Ошибка: ID пользователя не найден</div>;
  }

  return (
    <div>
      {Object.entries(formData).map(([key, value]) => {
        return (
          <Row className={styles.textViewContainer} key={key}>
            <Col>
              <Inputs
                type={key === "documents" ? "download" : "textarea"}
                formData={formData}
                formError={formError}
                name={key}
                label={LABELS[key]}
                onChange={handleChange}
              />
            </Col>
          </Row>
        );
      })}
      <Row className="mt-5">
        <Col>
          <Button
            text={loading ? "Сохранение..." : "Сохранить"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </Col>
      </Row>
    </div>
  );
}