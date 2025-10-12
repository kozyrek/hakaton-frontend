import { useEffect, useState } from "react";
import cn from "classnames";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileHeader, {
  getRole,
} from "../components/head-profile/profileHeader";
import LayoutProfileBg from "../styles/layoutProfileBg";
import PersonalInfo, { LABELS } from "../components/personal-info";
import Button from "../../../components/button/button";
import { ROLES, ROUTES } from "../../../utils/constants";
import getUser from "../../../api/getUser";

import styles from "../styles/profile.module.css";
import stylesView from "../components/personal-info/index.module.css";
import stylesID from "./index.module.css";
import TextView from "../components/personal-info/textView";
import verifyUser from "../../../api/verify-user";
import deleteUser from "../../../api/deleteUser";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";

export default function UserId() {
  const currentUser = useSelector((state) => state.user.user);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token.accessToken);
  const [data, setData] = useState({});

  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isActionSuccess, setIsActionSuccess] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [modalTitle, setModalTitle] = useState(""); // ДОБАВЛЕНО: состояние для заголовка модального окна
  const [showMessage, setShowMessage] = useState(true); // ДОБАВЛЕНО: состояние для отображения сообщения

  useEffect(() => {
    if (userProfile) {
      setData(
        userProfile.isMentor
          ? {
              articles: userProfile.mentor.articles,
              scientificInterests: userProfile.mentor.scientificInterests,
              taughtSubjects: userProfile.mentor.taughtSubjects,
              researchTopics: userProfile.mentor.researchTopics,
            }
          : {
              interests: userProfile.participant.interests,
              olympics: userProfile.participant.olympics,
              achievements: userProfile.participant.achievements,
            }
      );
    }
  }, [userProfile]);

  const handleVerify = async () => {
    try {
      await verifyUser(userId);
      // ИСПРАВЛЕНО: устанавливаем заголовок и скрываем сообщение
      setModalTitle("Пользователь успешно зачислен");
      setActionMessage(""); // Пустое сообщение
      setShowMessage(false); // Не показывать блок с сообщением
      setIsActionSuccess(true);
      setIsVerifyModalOpen(false);
    } catch (error) {
      console.error("Ошибка при подтверждении пользователя:", error);
      setModalTitle("Результат");
      setActionMessage("Ошибка при подтверждении пользователя");
      setShowMessage(true); // Показывать блок с сообщением об ошибке
      setIsActionSuccess(true);
    }
  };

  const handleReject = async () => {
    try {
      await deleteUser(userId);
      setModalTitle("Пользователь успешно отклонен и удален");
      setActionMessage(""); // Пустое сообщение
      setShowMessage(false); // Не показывать блок с сообщением
      setIsActionSuccess(true);
      setIsRejectModalOpen(false);
    } catch (error) {
      console.error("Ошибка при отклонении пользователя:", error);
      setModalTitle("Результат");
      if (error.response?.status === 403) {
        setActionMessage("Недостаточно прав для удаления пользователя");
      } else if (error.response?.status === 404) {
        setActionMessage("Пользователь не найден");
      } else {
        setActionMessage("Ошибка при отклонении пользователя");
      }
      setShowMessage(true); // Показывать блок с сообщением об ошибке
      setIsActionSuccess(true);
    }
  };

  const handleBackToUsers = () => {
    navigate(ROUTES.PROFILE);
  };

  // ДОБАВЛЕНО: функция для сброса состояний модального окна
  const resetModalStates = () => {
    setModalTitle("");
    setActionMessage("");
    setShowMessage(true);
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const requestUser = await getUser(userId);
        if (!requestUser.verified && getRole(currentUser) !== ROLES.ADMIN) {
          navigate(ROUTES.PROFILE);
          return;
        }
        setUserProfile(requestUser);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataUser();
  }, [userId, currentUser, navigate]);

  if (loading) return <div style={{ marginTop: "80px" }}>Loading...</div>;
  if (error) return <div style={{ marginTop: "80px" }}>{error}</div>;

  return (
    <>
      <div className={styles.userHeader}>
        <LayoutProfileBg>
          <ProfileHeader 
            user={userProfile} 
            isEditable={false}
          />
        </LayoutProfileBg>
      </div>
      <div className={styles.profileWrapper}>
        <Container fluid="xxl">
          <div className={cn(styles.mt80, styles.mb160)}>
            <Row className={stylesView.mb48}>
              <Col className={stylesView.personalInfoContainer}>
                <h2 className={stylesView.sectionTitle}>Персональные данные</h2>
              </Col>
            </Row>
            {Object.entries(data).map(([key, value]) => (
              <Row
                className={stylesView.textViewContainer}
                key={key}
              >
                <Col>
                  <TextView
                    title={LABELS[key]}
                    text={value}
                  />
                </Col>
              </Row>
            ))}

            {!userProfile.verified && getRole(currentUser) === ROLES.ADMIN && (
              <div className={stylesID.buttonContainer}>
                <Button
                  text="Принять"
                  large
                  onClick={() => setIsVerifyModalOpen(true)}
                />
                <Button
                  text="Отклонить"
                  large
                  addClass={stylesID.violetButton}
                  onClick={() => setIsRejectModalOpen(true)}
                />
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Модальное окно подтверждения регистрации */}
      <ModalWrapper
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      >
        <ModalWindow
          title="Подтверждение регистрации"
          buttonArea={[
            <Button
              text="Отменить"
              large
              violet
              onClick={() => setIsVerifyModalOpen(false)}
            />,
            <Button
              text="Подтвердить"
              large
              onClick={handleVerify}
            />
          ]}
        >
          <p>Вы действительно хотите подтвердить регистрацию этого пользователя?</p>
        </ModalWindow>
      </ModalWrapper>

      {/* Модальное окно отклонения пользователя */}
      <ModalWrapper
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
      >
        <ModalWindow
          title="Вы уверены, что хотите отклонить данного пользователя?"
          buttonArea={[
            <Button
              text="Назад"
              large
              violet
              onClick={() => setIsRejectModalOpen(false)}
            />,
            <Button
              text="Отклонить"
              large
              onClick={handleReject}
            />
          ]}
        >
          <p>Это действие нельзя отменить. Пользователь будет удален из системы.</p>
        </ModalWindow>
      </ModalWrapper>

      {/* Модальное окно результата действия */}
      <ModalWrapper
        isOpen={isActionSuccess}
        onClose={() => {
          resetModalStates();
          setIsActionSuccess(false);
          handleBackToUsers();
        }}
      >
        <ModalWindow
          title={modalTitle}
          buttonArea={[
            <Button
              text="OK"
              large
              onClick={() => {
                resetModalStates();
                setIsActionSuccess(false);
                handleBackToUsers();
              }}
            />
          ]}
        >
          {/* УСОВЕРШЕНСТВОВАНО: блок p показывается только если есть сообщение */}
          {showMessage && actionMessage && <p>{actionMessage}</p>}
        </ModalWindow>
      </ModalWrapper>
    </>
  );
}