import React, { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import data from "../../../data.json";
import styles from "./teamPage.module.css";
import TeamHeader from "./teamHeader/teamHeader";
import { ROUTES } from "../../../../../utils/constants";
import TeamMembers from "./teamMembers/teamMembers";
import LayoutProfileBg from "../../../styles/layoutProfileBg";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Button from "../../../../../components/button/button";
import DeleteButton from "../../../ui/deleteBtn/deleteButton";
import cn from "classnames";

const TeamPage = () => {
  const [participants, setParticipants] = useState(data.participants);

  const user = useSelector((state) => state.user);
  const { teamId } = useParams();
  const navigate = useNavigate();

  const handleRemoveParticipant = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  const teamsList = [...(data.my_teams || []), ...(data.all_teams || [])];

  if (!teamsList.includes(teamId)) {
    return <Navigate to="/404" replace />;
  }

  const handleBack = () => {
    navigate(ROUTES.PROFILE, { replace: true });
  };

  return (
    <>
      <div className={cn(styles.mt80, styles.mb160)}>
        <LayoutProfileBg>
          <TeamHeader />
        </LayoutProfileBg>
        <div className={styles.teamPage}>
          <Container className={styles.content}>
            <DeleteButton onClick={handleBack}>← Назад</DeleteButton>
            <TeamMembers
              user={user.user}
              participants={participants}
              onRemoveParticipant={handleRemoveParticipant}
            />
            <div className={styles.projectZone}>
            <h2 className={styles.infoPrj}>Проект команды</h2>
            <p className={styles.messagePrj}>У вас пока нет добавленного проекта</p>
            <Button text="Добавить проект" />
            </div>
           
          </Container>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
