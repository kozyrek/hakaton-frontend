import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import TextView from "./textView";
import { useState } from "react";
import TextEdit from "./text-edit";

import styles from "./index.module.css";

import Pencil from "./images/Pencil";
import { useResize } from "../../../../hooks/useResize";

export const LABELS = {
  interests: "Интересы",
  olympiads: "Олимпиады",
  progress: "Достижения",
  download: "",
};

export default function PersonalInfo() {
  const personalInfo = useSelector((state) => state.user.personalInfo ?? {});
  const [isEdit, setIsEdit] = useState(false);
  const width = useResize();
  return (
    <Container
      fluid
      className="p-0"
    >
      <Row className={styles.mb48}>
        <Col className={styles.personalInfoContainer}>
          <h2 className={styles.sectionTitle}>Персональные данные</h2>{" "}
          <button
            className={styles.editButton}
            onClick={() => setIsEdit(true)}
            aria-label="Редактировать персональные данные"
          >
            <Pencil
              width={width < 769 ? 12 : 28}
              height={width < 769 ? 12 : 28}
              aria-hidden="true"
            />
          </button>
        </Col>
      </Row>
      {isEdit ? (
        <TextEdit
          personalInfo={personalInfo}
          onClick={setIsEdit}
        />
      ) : (
        Object.entries(personalInfo).map(([key, value]) => (
          <Row
            className={styles.textViewContainer}
            key={key}
          >
            <Col>
              <TextView
                title={LABELS[key]}
                text={value}
              />
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
}
