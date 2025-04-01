import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";
import styles from "./projectsProfile.module.css";
import Card from "../../ui/card/Card";
import ModalWindow from "../../../../components/modalWindow";
import Button from "../../../../components/button/button";

const ProjectsProfile = ({ projects }) => {
    const navigate = useNavigate();
  const [projectsState, setProjectsState] = useState(projects);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);


  const openModal = (projectName) => {
    setSelectedProject(projectName);
    setShowModal(true);
  };


  const cancelRemoval = () => {
    setShowModal(false);
    setSelectedProject(null);
  };


  const confirmRemoval = () => {
    if (selectedProject) {
      setProjectsState((prev) => prev.filter((p) => p !== selectedProject));
    }
    cancelRemoval();
  };

  const handleProjectClick = (project) => {
    navigate(ROUTES.PROJECTSPAGE.replace(":projectId", project));
  };

  return (
    <div className={styles.projectsGrid}>
      <h2 className={styles.profileTabTitle}>Проекты</h2>
      <div className={styles.cardsContainer}>
        {projectsState.map((project, index) => (
          <Card
            key={index}
            team={project}
            onDelete={() => openModal(project)}
            colorCard="alternative"
            logoVariant="alternative"
            buttonText="Удалить проект"
            titleSize = "alternative"
            onClick={() => handleProjectClick(index)}
          />
        ))}
      </div>

      <div  className={styles.createButton}>
     <Button
     large
        text="Создать проект"
        onClick={() => alert("Создать команду")}
      />

</div>


      {showModal && (
        <div className={styles.modalOverlay}>
          <ModalWindow
            title="Удалить проект?"
            description={selectedProject}
            setIsShow={cancelRemoval}
          >
            <div className={styles.buttonContainer}>
              <Button text="Да" large onClick={confirmRemoval} addClass={styles.confirmButton} />
              <Button text="Нет" large onClick={cancelRemoval} addClass={styles.cancelButton} />
            </div>
          </ModalWindow>
        </div>
      )}
    </div>
  );
};

export default ProjectsProfile;
