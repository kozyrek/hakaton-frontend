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
  const dispatch = useDispatch()

  useEffect(() => {
    const { applicableFields, errorFields } =
      createFormDataAndError(personalInfo);
    setFormData(applicableFields);
    setFormError(errorFields);
  }, [personalInfo]);

  const handleChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: { value: value } }));
  };

  const handleSubmit = async () => {
    const response = await updateUserInterest(id, formData, isMentor);
    dispatch(set_user(response))
    onClick(false);
  };
  console.log(formData);

  return (
    <div>
      {Object.entries(formData).map(([key, value]) => {
        return (
          <Row
            className={styles.textViewContainer}
            key={key}
          >
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
            text="Сохранить"
            onClick={() => handleSubmit()}
          />
        </Col>
      </Row>
    </div>
  );
}
