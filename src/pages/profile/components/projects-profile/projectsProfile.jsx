import { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import ModalWrapper from "../../../../components/modalOverlay";
import ModalWindow from "../../../../components/modalWindow";
import Inputs from "../../../../components/inputs/inputs";
import Button from "../../../../components/button/button";
import getProjects from "../../../../api/projects/getProjects";
import createProject from "../../../../api/projects/createProject";
import deleteProject from "../../../../api/projects/deleteProject";

import styles from "./projectsProfile.module.css";

const ProjectsProfile = () => {
  const [projects, setProjects] = useState(null);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isDeleteProject, setIsDeleteProject] = useState(false);

  const [formData, setFormData] = useState({
    name: { value: "", type: "text" },
    description: { value: "", type: "text", },
    document: { value: null, type: "file"},
  });
  const [formError, setFormError] = useState({
    // projectName: "",
    // projectDescription: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      console.log("res", response);
      setProjects(response.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (name, description,document) => {
      const response = await createProject(name, description, document);
      if (response.status === 201) {
        fetchProjects();
        setIsCreateProject(false);
      }
    };

  const handleDeleteProject = async (isDeleteProject) => {
    const response = await deleteProject(isDeleteProject);
    if (response.status === 204) {
      fetchProjects();
      setIsDeleteProject(false);
    }
  };
// -ДОПИСАТЬ ФУНКЦИЮ---------------------------------------------------
  const handleChange = (
    value, 
    name = "name", 
    description = "description", 
    document = "document",
  ) => {
    setFormData({
      ...formData,
      [name]: { value: value, type: "text" },
      [description]: { value: value, type: "text" },
      [document]: {value: value, type: "file"},
    });
  };

  return (
    <>
      <h2 className="titleH2">Проекты</h2>
      <div className={styles.cardsContainer}>
        {projects && 
          projects.map((proj) => (
            <Card
              key={proj.id}
              team={proj}
              onDelete={() => {setIsDeleteProject({ id: proj.id })}}
              colorCard="alternative"
              logoVariant="alternative"
              buttonText="Удалить проект"
              isProject
            />
          ))}
      </div>

      <div className={styles.createButton}>
        <Button
          large
          text="Создать проект"
          onClick={() => setIsCreateProject(true)}
        />
      </div>

      <ModalWrapper
        isOpen={isCreateProject}
        onClose={() => setIsCreateProject(false)}
      >
        <ModalWindow
          title="Создание нового проекта"
          buttonArea={[
            <Button
              text="Создать"
              // дописать функцию
              onClick={() => handleCreateProject(formData.name.value, formData.description.value, formData.document.value)}
            />,
            <Button
              violet
              text="Отменить"
              onClick={() => {
                handleChange("");
                setIsCreateProject(false);
              }}
            />,
          ]}
        >
          {/* добавить поля для названия, описания и файла */}
          <Inputs
            name="name"
            type="text"
            formData={formData}
            formError={formError}
            placeholder="Название кейса"
            onChange={handleChange}
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
            onChange={handleChange}
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
            «{projects && projects.find((el) => el.id === isDeleteProject.id)?.name}»
          </p>
        </ModalWindow>
      </ModalWrapper>
    </>
  );
};

export default ProjectsProfile;
