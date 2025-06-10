import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/button/button";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";
import getProjects from "../../../api/projects/getProjects";

import styles from "./teamProject.module.css";

export default function TeamProject({ project }) {
    const [isDeleteProjectOpen, setIsDeleteProjectOpen] = useState(false);
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                console.log("res", response);
                //исключать проекты, которые уже назначены командам??
                setProjects(response.data.items);
            } catch (e) {
                console.log(e.message);
            }
        };
        fetchProjects();
    }, []);

    const handleOpenAddProject = () => {
        setIsAddProjectOpen(true);
    }

    const handleOpenDeleteProject = () => {
        setIsDeleteProjectOpen(true);
    }

// дописать функцию---------------------------
    const handleAddProject = (id) => {

        setIsAddProjectOpen(false);
    }

// дописать функцию---------------------------
    const handleDeleteProject = (id) => {

        setIsDeleteProjectOpen(false);
    }

    return (
        <>
            <div className="contentBox">
                <h2 className={`titleH2 ${styles.title}`}>Проект команды</h2>
                <h3 className={`titleH3 ${styles.subtitle}`}>
                    {project
                    ? <Link
                        to={`/project/${project.id}`}
                        state={{projectId: project.id}}
                        className="titleH3"
                    >
                        «{project.name}»
                    </Link>
                    : "У\u2009\u2009вас пока нет добавленного проекта"}
                </h3>
                <Button
                    addClass={styles.projectButton}
                    large
                    text={project ? "Удалить проект" : "Добавить проект"}
                    onClick={project ? handleOpenDeleteProject : handleOpenAddProject}
                    // disabled
                />
            </div>

            <ModalWrapper
                isOpen={isAddProjectOpen}
                onClose={() => setIsAddProjectOpen(false)}
            >
                <ModalWindow title="Добавить проект">
                    <ul className={styles.projectList}>
                        {projects && 
                        projects.map((proj) => (
                            <li key={proj.id} className={styles.projectItem}>
                                <span className="text4">{proj.name}</span>
                                <button
                                    className={`text2 ${styles.textBtn}`}
                                    type="button"
                                    onClick={() => handleAddProject(proj.id)}
                                >
                                    Добавить
                                </button>
                            </li>
                        ))}
                    </ul>
                </ModalWindow>
            </ModalWrapper>

            <ModalWrapper
                isOpen={isDeleteProjectOpen}
                onClose={() => setIsDeleteProjectOpen(false)}
            >
                <ModalWindow 
                    title="Действительно хотите удалить данный проект из&nbsp;команды?"
                    buttonArea={[
                        <Button
                            large
                            text="Да"
                            onClick={() => handleDeleteProject(project.id)}
                        />,
                        <Button
                            large
                            violet
                            text="Нет"
                            onClick={() => setIsDeleteProjectOpen(false)}
                        />,
                    ]}
                >
                    <p className="text3">
                        «{project && project.name}»
                    </p>
                </ModalWindow>
            </ModalWrapper>
        </>
    )
}