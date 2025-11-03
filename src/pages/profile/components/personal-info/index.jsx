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
  download: "Документы",
  articles: "Статьи",
  scientificInterests: "Круг научных интересов",
  taughtSubjects: "Преподаваемые предметы",
  researchTopics: "Тематика научных и исследовательских работ",
};

// Функция для декодирования JWT токена
const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export default function PersonalInfo({ isViewied = false }) {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user ?? {});
  const width = useResize();
  const [data, setData] = useState();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Получаем ID из JWT токена
  const token = userState.token?.accessToken;
  const decodedToken = token ? decodeJWT(token) : null;
  const authenticatedUserId = decodedToken?.sub ? parseInt(decodedToken.sub) : null;

  // Данные пользователя из Redux
  const userData = userState.user;
  const isMentor = userData?.isMentor;

  // Используем ID из токена для API запросов
  const userId = authenticatedUserId;

  // Загрузка документов пользователя
  const loadUserDocuments = async () => {
    if (!userId) {
      console.warn('User ID не найден для загрузки документов');
      return;
    }

    setLoading(true);
    try {
      const docs = await getUserDocuments(userId);
      const documentsArray = Array.isArray(docs) ? docs : [];
      
      dispatch(set_user_files(documentsArray));
      setDocuments(documentsArray);
      
      return documentsArray;
    } catch (error) {
      console.error('Ошибка при загрузке документов:', error);
      dispatch(set_user_files([]));
      setDocuments([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData && Object.keys(userData).length !== 0) {
      setData(
        isMentor
          ? {
              articles: userData.mentor?.articles || "",
              scientificInterests: userData.mentor?.scientificInterests || "",
              taughtSubjects: userData.mentor?.taughtSubjects || "",
              researchTopics: userData.mentor?.researchTopics || "",
            }
          : {
              interests: userData.participant?.interests || "",
              olympics: userData.participant?.olympics || "",
              achievements: userData.participant?.achievements || "",
            }
      );
    }
  }, [userData, isMentor]);

  useEffect(() => {
    loadUserDocuments();
  }, [userId]);

  useEffect(() => {
    // Обновляем documents из Redux store
    if (userState.documents && Array.isArray(userState.documents)) {
      setDocuments(userState.documents);
    }
  }, [userState.documents]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-0">
      <Row className={styles.mb48}>
        <Col className={styles.personalInfoContainer}>
          <h2 className={styles.sectionTitle}>Персональные данные</h2>
          {isViewied && userId === authenticatedUserId && (
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
        userId ? (
          <TextEdit
            personalInfo={data}
            documents={documents}
            onClick={setIsEdit}
            id={userId}
            isMentor={isMentor}
            onDocumentsUpdate={loadUserDocuments}
          />
        ) : (
          <div className="text-danger">
            Ошибка: ID пользователя не найден. Невозможно сохранить изменения.
          </div>
        )
      ) : (
        <>
          {/* Отображение текстовых полей */}
          {Object.entries(data)
            .filter(([key, value]) => value && value.toString().trim() !== '')
            .map(([key, value]) => (
              <Row className={styles.textViewContainer} key={key}>
                <Col>
                  <TextView
                    title={LABELS[key]}
                    text={value}
                  />
                </Col>
              </Row>
            ))}
          
          {/* Отдельное отображение документов */}
          {documents.length > 0 && (
            <Row className={styles.textViewContainer}>
              <Col>
                <TextView
                  title={LABELS.download}
                  documents={documents}
                />
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
}