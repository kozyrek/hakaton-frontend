import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/button/button";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";
import getProjects from "../../../api/projects/getProjects";
import updateTeam from "../../../api/team/updateTeam"; // Добавляем импорт для обновления команды

import styles from "./teamProject.module.css";

export default function TeamProject({ project, teamId, onTeamUpdate }) {
    const [isDeleteProjectOpen, setIsDeleteProjectOpen] = useState(false);
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                console.log("res", response);
                // Фильтруем проекты, которые еще не назначены командам
                const availableProjects = response.data.items.filter(
                    proj => !proj.teamId || proj.teamId === parseInt(teamId)
                );
                setProjects(availableProjects);
            } catch (e) {
                console.log(e.message);
            }
        };
        fetchProjects();
    }, [teamId]);

    const handleOpenAddProject = () => {
        setIsAddProjectOpen(true);
    }

    const handleOpenDeleteProject = () => {
        setIsDeleteProjectOpen(true);
    }

    const handleAddProject = async (projectId) => {
        try {
            // Обновляем команду, добавляя projectId
            const response = await updateTeam(teamId, { projectId });
            onTeamUpdate(response.data);
            setIsAddProjectOpen(false);
        } catch (error) {
            console.error("Ошибка при добавлении проекта:", error);
        }
    }

    const handleDeleteProject = async () => {
        try {
            // Обновляем команду, удаляя projectId (устанавливаем null)
            const response = await updateTeam(teamId, { projectId: null });
            onTeamUpdate(response.data);
            setIsDeleteProjectOpen(false);
        } catch (error) {
            console.error("Ошибка при удалении проекта:", error);
        }
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
                            onClick={handleDeleteProject}
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