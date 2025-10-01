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

  // Получаем ID из JWT токена
  const token = userState.token?.accessToken;
  const decodedToken = token ? decodeJWT(token) : null;
  const authenticatedUserId = decodedToken?.sub ? parseInt(decodedToken.sub) : null;

  // Данные пользователя из Redux
  const userData = userState.user;
  const isMentor = userData?.isMentor;

  console.log('Authenticated user ID from token:', authenticatedUserId);
  console.log('User data from Redux:', userData);
  console.log('Is mentor:', isMentor);

  // Используем ID из токена для API запросов
  const userId = authenticatedUserId;

  useEffect(() => {
    if (userData && Object.keys(userData).length !== 0) {
      console.log('Setting data from userData:', userData);
      setData(
        isMentor
          ? {
              articles: userData.mentor?.articles || "",
              scientificInterests: userData.mentor?.scientificInterests || "",
              taughtSubjects: userData.mentor?.taughtSubjects || "",
              researchTopics: userData.mentor?.researchTopics || "",
              documents: userState.documents || [],
            }
          : {
              interests: userData.participant?.interests || "",
              olympics: userData.participant?.olympics || "",
              achievements: userData.participant?.achievements || "",
              documents: userState.documents || [],
            }
      );
    }
  }, [userData, isMentor, userState.documents]);

  useEffect(() => {
    const getDocuments = async () => {
      console.log('Attempting to load documents for user ID:', userId);
      
      if (userId) {
        try {
          const docs = await getUserDocuments(userId);
          console.log('Loaded documents:', docs);
          dispatch(set_user_files(docs));
          
          // Обновляем данные с документами
          setData(prevData => ({
            ...prevData,
            documents: docs
          }));
        } catch (error) {
          console.error('Ошибка при загрузке документов:', error);
        }
      } else {
        console.warn('User ID не найден для загрузки документов');
      }
    };
    
    if (userId) {
      getDocuments();
    }
  }, [userId, dispatch]);

  if (!data) {
    console.log('Data is not ready, showing loading...');
    return <>Loading...</>;
  }

  console.log('Rendering with data:', data);
  console.log('Current user ID for TextEdit:', userId);

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
            onClick={setIsEdit}
            id={userId}
            isMentor={isMentor}
          />
        ) : (
          <div className="text-danger">
            Ошибка: ID пользователя не найден. Невозможно сохранить изменения.
            <br />
            <small>User ID: {userId}</small>
          </div>
        )
      ) : (
        Object.entries(data)
          .filter(([key, value]) => {
            // Показываем только непустые поля и документы
            if (key === 'documents') return value && value.length > 0;
            return value && value.toString().trim() !== '';
          })
          .map(([key, value]) => (
            <Row className={styles.textViewContainer} key={key}>
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