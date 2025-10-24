import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../ui/card/Card";
import ModalWrapper from "../../../../components/modalOverlay";
import ModalWindow from "../../../../components/modalWindow";
import Button from "../../../../components/button/button";
import getProjects from "../../../../api/projects/getProjects";
import getTeamById from "../../../../api/team/getTeamById";
import createProject from "../../../../api/projects/createProject";
import deleteProject from "../../../../api/projects/deleteProject";
import Loader from "../../../../components/loader/loader";
import ProjectForm from "../profile-form/ProfileForm";

import styles from "./projectsProfile.module.css";

const ProjectsProfile = ({ user }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [userProject, setUserProject] = useState(null);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isMentor = user?.isMentor;
  const isAdmin = user?.mentor?.isAdmin;
  const userTeamId = user?.teamId;

  const fetchAllProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data?.items || []);
    } catch (e) {
      console.log(e.message);
      setProjects([]);
    }
  };

  const fetchUserProject = async () => {
    if (!userTeamId) {
      setUserProject(null);
      setIsLoading(false);
      return;
    }

    try {
      const team = await getTeamById(userTeamId);
      
      if (team.projectId) {
        const allProjectsResponse = await getProjects();
        const userProj = allProjectsResponse.data?.items?.find(
          project => project.id === team.projectId
        );
        setUserProject(userProj || null);
      } else {
        setUserProject(null);
      }
    } catch (error) {
      console.error("Ошибка при загрузке проекта пользователя:", error);
      setUserProject(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (isMentor || isAdmin) {
        await fetchAllProjects();
      } else {
        await fetchUserProject();
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [userTeamId, isMentor, isAdmin]);

  const handleCreateProject = async (projectData) => {
    const response = await createProject(
      projectData.name,
      projectData.description,
      projectData.document
    );
    
    if (response.status === 201) {
      await fetchAllProjects();
      setIsCreateProject(false);
      return response;
    }
    throw new Error("Не удалось создать проект");
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await deleteProject(projectId);
      if (response.status === 204) {
        if (isMentor || isAdmin) {
          await fetchAllProjects();
        } else {
          await fetchUserProject();
        }
        setIsDeleteProject(false);
      }
    } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
    }
  };

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const getProjectToDelete = () => {
    if (isMentor || isAdmin) {
      return projects?.find((el) => el.id === isDeleteProject.id);
    } else {
      return userProject?.id === isDeleteProject.id ? userProject : null;
    }
  };

  const renderParticipantView = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (userProject) {
      return (
        <div className={styles.cardsContainer}>
          <Card
            key={userProject.id}
            team={userProject}
            onClick={() => handleCardClick(userProject.id)}
            colorCard="alternative"
            logoVariant="alternative"
            isProject
          />
        </div>
      );
    } else {
      return (
        <div className={styles.emptyState}>
          <p>Пока ни одного проекта не добавлено</p>
        </div>
      );
    }
  };

  const renderMentorView = () => {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        <div className={styles.cardsContainer}>
          {projects && projects.length > 0 ? (
            projects.map((proj) => (
              <Card
                key={proj.id}
                team={proj}
                onDelete={() => setIsDeleteProject({ id: proj.id })}
                onClick={() => handleCardClick(proj.id)}
                colorCard="alternative"
                logoVariant="alternative"
                buttonText="Удалить проект"
                isProject
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Пока ни одного проекта не добавлено</p>
            </div>
          )}
        </div>

        <div className={styles.createButton}>
          <Button
            large
            text="Создать проект"
            onClick={() => setIsCreateProject(true)}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <h2 className="titleH2">Проекты</h2>
      
      {isMentor || isAdmin ? renderMentorView() : renderParticipantView()}

      {/* Используем общий компонент формы */}
      <ProjectForm
        mode="create"
        isOpen={isCreateProject}
        onClose={() => setIsCreateProject(false)}
        onSubmit={handleCreateProject}
      />

      {/* Модальное окно удаления проекта */}
      <ModalWrapper
        isOpen={isDeleteProject}
        onClose={() => setIsDeleteProject(false)}
      >
        <ModalWindow
          title="Действительно хотите удалить данный проект?"
          buttonArea={[
            <Button
              text="Да"
              onClick={() => handleDeleteProject(isDeleteProject.id)}
            />,
            <Button
              violet
              text="Нет"
              onClick={() => setIsDeleteProject(false)}
            />,
          ]}
        >
          <p className="text4">
            «{getProjectToDelete()?.name}»
          </p>
        </ModalWindow>
      </ModalWrapper>
    </>
  );
};

export default ProjectsProfile;