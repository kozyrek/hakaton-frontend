import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";
import styles from "./projectsProfile.module.css";
import Card from "../../ui/card/Card";
import { ConfirmDeleteModal, Modal7 } from "../profileModals/ModalsList";
import Button from "../../../../components/button/button";

const ProjectsProfile = ({ projects }) => {
  const [isModal7Open, setIsModal7Open] = useState(false)
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
        onClick={() => setIsModal7Open(true)}
      />

</div>


<ConfirmDeleteModal
  isOpen={showModal}
  onCancel={cancelRemoval}
  onConfirm={confirmRemoval}
  title="Удалить проект?"
  description={selectedProject}
/>
<Modal7 isOpen={isModal7Open} onClose={() => setIsModal7Open(false)}/>
    </div>
  );
};

export default ProjectsProfile;
