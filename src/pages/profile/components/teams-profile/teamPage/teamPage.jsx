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
import TextButton from "../../../ui/textButton/textButton";
import { ProjectModal } from "../../profileModals/ModalsList";

import cn from "classnames";

const TeamPage = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [assignedProject, setAssignedProject] = useState(null);
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

  const handleSelectProject = (project) => {
    setAssignedProject(project);
    setIsProjectModalOpen(false);
  };

  return (
    <>
      <LayoutProfileBg>
        <TeamHeader teamName={teamId} />
      </LayoutProfileBg>
      <div className={cn(styles.mt80, styles.mb160)}>
        <div className={styles.teamPage}>
          <Container className={styles.content}>
            <TextButton onClick={handleBack}>← Назад</TextButton>
            <TeamMembers
              user={user.user}
              participants={participants}
              onRemoveParticipant={handleRemoveParticipant}
            />
            <div className={styles.projectZone}>
              <h2 className={styles.infoPrj}>Проект команды</h2>
              <p className={styles.messagePrj}>
              «{assignedProject ? assignedProject.name : "У вас пока нет добавленного проекта"}»
              </p>
              <Button text="Добавить проект" onClick={() => setIsProjectModalOpen(true)} />
            </div>
          </Container>
        </div>
      </div>
      <ProjectModal
      title="Добавить проект"
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSelect={handleSelectProject}
        data={data.projects}
      />
    </>
  );
};

export default TeamPage;
