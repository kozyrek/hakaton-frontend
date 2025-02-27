import React from "react";
import styles from "./projectsProfile.module.css";

const ProjectsProfile = ({ projects }) => {
  return (
    <div className={styles.projectsGrid}>
      <h3>Проекты</h3>
      <div className={styles.cardsContainer}>
        {projects.map((proj, index) => (
          <div key={index} className={styles.cardItem}>
            <p>{proj}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsProfile;
