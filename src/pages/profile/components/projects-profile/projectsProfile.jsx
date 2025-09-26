import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../ui/card/Card";
import ModalWrapper from "../../../../components/modalOverlay";
import ModalWindow from "../../../../components/modalWindow";
import Inputs from "../../../../components/inputs/inputs";
import Button from "../../../../components/button/button";
import getProjects from "../../../../api/projects/getProjects";
import getTeamById from "../../../../api/team/getTeamById";
import createProject from "../../../../api/projects/createProject";
import deleteProject from "../../../../api/projects/deleteProject";
import Loader from "../../../../components/loader/loader";
import { FILENAME_EXTENSION } from "../../../../utils/constants";

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

  const [formData, setFormData] = useState({
    name: { value: "", type: "text" },
    description: { value: "", type: "text" },
    document: { value: null, type: "file" },
  });
  const [formError, setFormError] = useState({});

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
      // Получаем команду пользователя
      const team = await getTeamById(userTeamId);
      
      // Если у команды есть проект, получаем его
      if (team.projectId) {
        // Здесь нужно получить проект по ID - возможно, потребуется новый API метод
        // Пока используем фильтрацию всех проектов
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
        // Для ментора/админа загружаем все проекты
        await fetchAllProjects();
      } else {
        // Для участника загружаем только его проект
        await fetchUserProject();
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [userTeamId, isMentor, isAdmin]);

  const handleCreateProject = async () => {
    try {
      const response = await createProject(
        formData.name.value,
        formData.description.value,
        formData.document.value
      );
      if (response.status === 201) {
        await fetchAllProjects();
        setIsCreateProject(false);
        setFormData({
          name: { value: "", type: "text" },
          description: { value: "", type: "text" },
          document: { value: null, type: "file" },
        });
      }
    } catch (error) {
      console.error("Ошибка при создании проекта:", error);
    }
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

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: { value: value, type: formData[name]?.type || "text" },
    });
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

  // Рендер для участника (не ментора)
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

  // Рендер для ментора/админа
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

      {/* Модальные окна показываем только менторам/админам */}
      {(isMentor || isAdmin) && (
        <>
          <ModalWrapper
            isOpen={isCreateProject}
            onClose={() => setIsCreateProject(false)}
          >
            <ModalWindow
              title="Создание нового проекта"
              buttonArea={[
                <Button
                  text="Создать"
                  onClick={handleCreateProject}
                />,
                <Button
                  violet
                  text="Отменить"
                  onClick={() => {
                    setIsCreateProject(false);
                  }}
                />,
              ]}
            >
              <Inputs
                name="name"
                type="text"
                formData={formData}
                formError={formError}
                placeholder="Название кейса"
                onChange={handleChange}
                maxLength={50}
              />
              <Inputs
                name="description"
                type="textarea"
                formData={formData}
                formError={formError}
                placeholder="Описание кейса"
                onChange={handleChange}
              />
              <Inputs
                name="document"
                type="download"
                formData={formData}
                formError={formError}
                placeholder="Загрузите документ кейса"
                notUser
                onChange={handleChange}
                accept={FILENAME_EXTENSION.join(", ")}
              />
            </ModalWindow>
          </ModalWrapper>

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
      )}
    </>
  );
};

export default ProjectsProfile;