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

export default function UserId() {
  const user = useSelector((state) => state.user.user);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token.accessToken);
  const [data, setData] = useState({});

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

  const handleVerify = async () => {
    await verifyUser(userId);
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
            {/* <PersonalInfo /> */}
            <Row className={stylesView.mb48}>
              <Col className={stylesView.personalInfoContainer}>
                <h2 className={stylesView.sectionTitle}>Персональные данные</h2>{" "}
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
                  onClick={handleVerify}
                />
                <Button
                  text="Отклонить"
                  large
                  addClass={stylesID.violetButton}
                />
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
