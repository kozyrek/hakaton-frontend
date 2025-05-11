import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TextView from "./textView";
import { useEffect, useState } from "react";
import TextEdit from "./text-edit";
import { useResize } from "../../../../hooks/useResize";
import getUserDocuments from "../../../../api/document-user/getUserDocuments";

import styles from "./index.module.css";

import Pencil from "./images/Pencil";
import { set_user_files } from "../../../../store/user/userSlice";

export const LABELS = {
  interests: "Интересы",
  olympics: "Олимпиады",
  achievements: "Достижения",
  download: "",
  articles: "Статьи",
  scientificInterests: "Круг научных интересов",
  taughtSubjects: "Преподаваемые предметы",
  researchTopics: "Тематика научных и исследовательских работ",
};

export default function PersonalInfo({ isViewied = false }) {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user ?? {});
  const isMentor = user.user.isMentor;
  const width = useResize();

  const data = isMentor
    ? {
        articles: user.user.mentor.articles,
        scientificInterests: user.user.mentor.scientificInterests,
        taughtSubjects: user.user.mentor.taughtSubjects,
        researchTopics: user.user.mentor.researchTopics,
        documents: user.documents,
      }
    : {
        interests: user.user.participant.interests,
        olympics: user.user.participant.olympics,
        achievements: user.user.participant.achievements,
        documents: user.documents,
      };

  useEffect(() => {
    const getDocuments = async () => {
      const docs = await getUserDocuments(user.user.id, user.token.accessToken);
      dispatch(set_user_files(docs));
    };
    getDocuments();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      fluid
      className="p-0"
    >
      <Row className={styles.mb48}>
        <Col className={styles.personalInfoContainer}>
          <h2 className={styles.sectionTitle}>Персональные данные</h2>{" "}
          {isViewied && (
            <button
              className={styles.editButton}
              onClick={() => setIsEdit(true)}
              aria-label="Редактировать персональные данные"
            >
              <Pencil
                width={width < 769 ? 18 : 28}
                height={width < 769 ? 18 : 28}
                aria-hidden="true"
              />
            </button>
          )}
        </Col>
      </Row>
      {isEdit ? (
        <TextEdit
          personalInfo={data}
          onClick={setIsEdit}
          token={user.token.accessToken}
          id={user.user.id}
          isMentor={isMentor}
        />
      ) : (
        Object.entries(data).map(([key, value]) => (
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
