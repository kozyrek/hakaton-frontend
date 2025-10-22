import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import { useResize } from "../../../hooks/useResize";
import Pencil from "../../profile/components/personal-info/images/Pencil";
import updateProject from "../../../api/projects/updateProject";
import getProjectById from "../../../api/projects/getProjectById";
import ProjectForm from "../../profile/components/projectForm/ProjectForm";

import styles from "./headStages.module.css";

export default function HeadStages({ obj, setProject }) {
  const [isMentor, setIsMentor] = useState(useSelector((state) => state.user.user.isMentor));
  const [isChangeProject, setIsChangeProject] = useState(false);
  const [loading, setLoading] = useState(false);
  const width = useResize();

  const fetchProject = async () => {
    try {
      if (obj.id) {
        const response = await getProjectById(obj.id);
        setProject(response.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleUpdateProject = async (projectData) => {
    setLoading(true);
    try {
      const response = await updateProject(
        obj.id, 
        projectData.name, 
        projectData.description, 
        projectData.document
      );
      
      if (response.status === 200) {
        await fetchProject();
        setIsChangeProject(false);
        return response;
      }
      throw new Error("Не удалось обновить проект");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.wrapper}>
        <h1 className={`titleH1 ${styles.title}`}>
          «{obj.name}»
          {isMentor &&
            <button 
              className={styles.iconPencil} 
              onClick={() => setIsChangeProject(true)}
            >
              <Pencil
                width={width < 769 ? 18 : 28}
                height={width < 769 ? 18 : 28}
                aria-hidden="true"
              />
            </button>
          }
        </h1>
        <p className={`text3 ${styles.text}`}>
          {obj.description}
        </p>
        <Button 
          path={obj.documentPath}
          text='Смотреть документ проекта'
          target="_blank"
          rel="noreferrer"
          large 
          white
          disabled={!obj.documentPath}
        />
      </section>

      {/* Используем общий компонент формы для редактирования */}
      <ProjectForm
        mode="edit"
        isOpen={isChangeProject}
        onClose={() => setIsChangeProject(false)}
        onSubmit={handleUpdateProject}
        initialData={obj}
        loading={loading}
      />
    </>
  );
}