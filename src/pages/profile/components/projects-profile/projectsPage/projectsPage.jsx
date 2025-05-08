import React from "react";
import styles from "./projectsPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../../utils/constants";
import ProjectsHeader from "./projectsHeader/ProjectsHeader";

const ProjectsPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(ROUTES.PROFILE, { replace: true });
    };
  
    return (
      <>
        <ProjectsHeader />
        <div className={styles.projectPage}>
          <button onClick={handleBack}>Назад</button>
          <h2>Проект: {projectId}</h2>
        </div>
      </>
    );
  };
  
  export default ProjectsPage;