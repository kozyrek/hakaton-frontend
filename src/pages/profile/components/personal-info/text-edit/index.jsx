import { useEffect, useState } from "react";
import createFormDataAndError from "../../../../../utils/createFormDataAndError";
import Inputs from "../../../../../components/inputs/inputs";
import { LABELS } from "..";
import { Row, Col } from "react-bootstrap";

import styles from "../index.module.css";
import Button from "../../../../../components/button/button";

export default function TextEdit(props) {
  const { personalInfo, onClick } = props;
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  useEffect(() => {
    const { applicableFields, errorFields } =
      createFormDataAndError(personalInfo);
    setFormData(applicableFields);
    setFormError(errorFields);
  }, [personalInfo]);

  const handleChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: { value: value } }));
  };

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
                type={key === "download" ? "download" : "textarea"}
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
            onClick={() => onClick(false)}
          />
        </Col>
      </Row>
    </div>
  );
}
