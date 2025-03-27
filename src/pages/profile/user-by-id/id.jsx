import { useEffect, useState } from "react";
import cn from "classnames";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileHeader, {
  getRole,
} from "../components/head-profile/profileHeader";
import LayoutProfileBg from "../styles/layoutProfileBg";
import PersonalInfo from "../components/personal-info";
import getUserById from "../../../api/getUserById";
import Button from "../../../components/button/button";
import { ROLES, ROUTES } from "../../../utils/constants";

import styles from "../styles/profile.module.css";
import stylesID from "./index.module.css";

export default function UserId() {
  const user = useSelector((state) => state.user.user);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const requestUser = await getUserById(userId);
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
            <PersonalInfo />
            {!userProfile.verified && (
              <div className={stylesID.buttonContainer}>
                <Button
                  text="Принять"
                  large
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
