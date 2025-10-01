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
import rejectUser from "../../../api/mock_reject-user"; // ДОБАВЛЕНО: API для отклонения
import ModalWrapper from "../../../components/modalOverlay"; // ДОБАВЛЕНО: модальное окно
import ModalWindow from "../../../components/modalWindow"; // ДОБАВЛЕНО: модальное окно

export default function UserId() {
  const user = useSelector((state) => state.user.user);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token.accessToken);
  const [data, setData] = useState({});

  // ДОБАВЛЕНО: состояния для модальных окон
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isActionSuccess, setIsActionSuccess] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (userProfile) {
      setData(
        userProfile.isMentor
          ? {
              articles: userProfile.mentor.articles,
              scientificInterests: userProfile.mentor.scientificInterests,
              taughtSubjects: userProfile.mentor.taughtSubjects,
              researchTopics: userProfile.mentor.researchTopics,
              // documents: user.documents,
            }
          : {
              interests: userProfile.participant.interests,
              olympics: userProfile.participant.olympics,
              achievements: userProfile.participant.achievements,
              // documents: user.documents,
            }
      );
    }
  }, [userProfile]);

  // ДОБАВЛЕНО: функция подтверждения регистрации
  const handleVerify = async () => {
    try {
      await verifyUser(userId);
      setActionMessage("Пользователь успешно подтвержден");
      setIsActionSuccess(true);
      setIsVerifyModalOpen(false);
    } catch (error) {
      console.error("Ошибка при подтверждении пользователя:", error);
      setActionMessage("Ошибка при подтверждении пользователя");
      setIsActionSuccess(true);
    }
  };

  // ДОБАВЛЕНО: функция отклонения регистрации
  const handleReject = async () => {
    try {
      await rejectUser(userId);
      setActionMessage("Пользователь успешно отклонен");
      setIsActionSuccess(true);
      setIsRejectModalOpen(false);
    } catch (error) {
      console.error("Ошибка при отклонении пользователя:", error);
      setActionMessage("Ошибка при отклонении пользователя");
      setIsActionSuccess(true);
    }
  };

  // ДОБАВЛЕНО: функция возврата к списку пользователей
  const handleBackToUsers = () => {
    navigate(ROUTES.PROFILE); // Возвращаемся к профилю (на вкладку users)
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const requestUser = await getUser(userId);
        if (!requestUser.verified && getRole(user) !== ROLES.ADMIN) {
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
    // eslint-disable-next-line
  }, [userId]);

  if (loading) return <div style={{ marginTop: "80px" }}>Loading...</div>;
  if (error) return <div style={{ marginTop: "80px" }}>{error}</div>;

  return (
    <>
      <div className={styles.userHeader}>
        <LayoutProfileBg>
          <ProfileHeader user={userProfile} />
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

            {!userProfile.verified && (
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

      {/* Модальное окно подтверждения принятия */}
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

      {/* Модальное окно подтверждения отклонения */}
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
        </ModalWindow>
      </ModalWrapper>

      {/* Модальное окно результата действия */}
      <ModalWrapper
        isOpen={isActionSuccess}
        onClose={handleBackToUsers}
      >
        <ModalWindow
          title="Результат"
          buttonArea={[
            <Button
              text="OK"
              large
              onClick={handleBackToUsers}
            />
          ]}
        >
          <p>{actionMessage}</p>
        </ModalWindow>
      </ModalWrapper>
    </>
  );
}