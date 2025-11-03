import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import LayoutSmall from "../auth/layoutSmall";
import HeadStages from "./head-stages/headStages";
import TeamInfo from "./team-info/teamInfo";
import ProjectDocuments from "./project-documents/projectDocuments";
import StagesList from "./stages/stagesList";
import Loader from "../../components/loader/loader";

import { HTTP } from "../../api/http";

import getProjectById from "../../api/projects/getProjectById"; // для проектов
import getTeamById from "../../api/team/getTeamById"; // для команд
import getProjectFiles from "../../api/projects/getProjectFiles";
import { STEP_PROJECT_STATUS } from "../../utils/constants";

export default function ProjectStages() {
    const [error, setError] = useState(undefined);
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [files, setFiles] = useState([]);
    const [teamInfo, setTeamInfo] = useState(null);
    const [isCompleteProject, setIsCompleteProject] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Загрузка проекта и связанных данных
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setIsLoading(true);
                setError(undefined);
                
                console.log('Fetching project with ID:', projectId);
                
                // Загружаем проект
                const projectResponse = await getProjectById(projectId);
                const projectData = projectResponse.data;
                console.log('Received project data:', projectData);
                
                setProject(projectData);

                // Загружаем файлы проекта
                try {
                    const filesResponse = await getProjectFiles(projectId);
                    setFiles(filesResponse.data || []);
                } catch (fileError) {
                    console.error('Error fetching project files:', fileError.message);
                    setFiles([]);
                }

                // Загружаем информацию о команде, если она есть
                if (projectData.teamId) {
                    try {
                        console.log('Fetching team info for teamId:', projectData.teamId);
                        const teamResponse = await getTeamById(projectData.teamId);
                        setTeamInfo(teamResponse);
                    } catch (teamError) {
                        console.error('Error fetching team info:', teamError.message);
                        setTeamInfo(null);
                    }
                } else {
                    console.log('No teamId found in project data');
                    setTeamInfo(null);
                }

                // Проверяем завершенность проекта
                if (projectData.steps) {
                    const isComplete = projectData.steps.find(
                        x => (x.stepNumber === 15) && (x.status === STEP_PROJECT_STATUS.ACCEPTED)
                    );
                    setIsCompleteProject(!!isComplete);
                }

            } catch (e) {
                console.error('Error fetching project data:', e.message);
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);

    const handleChange = (event) => {
        let formData = new FormData();
        const data = {
            name: 'тестирования!',
            description: 'Здесь должно быть описание проекта'
        }

        formData.append('data', JSON.stringify(data))
        formData.append('document', event.target.files[0])

        try {
            const response = HTTP.post("/projects/", formData);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw new Error('ошибка');
            }
    
            const message =
            error.response.data?.detail ||
            error.response.data?.message ||
            'ошибка';
    
            throw new Error(message);
        }
    };

    // Обработка ошибки загрузки
    if (error) {
        return (
            <LayoutSmall>
                <Container fluid="xxl">
                    <div style={{ 
                        padding: '2rem', 
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        margin: '2rem 0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        position: 'relative',
                        zIndex: 10
                    }}>
                        <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>
                            Ошибка загрузки проекта
                        </h2>
                        <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                            {error.includes('Team not found') 
                                ? 'Проект не связан с командой' 
                                : error}
                        </p>
                        <p style={{ color: '#666' }}>
                            Project ID: {projectId}
                            {project && project.teamId && ` | Team ID: ${project.teamId}`}
                        </p>
                        <button 
                            onClick={() => window.history.back()}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#1976d2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Вернуться назад
                        </button>
                    </div>
                </Container>
            </LayoutSmall>
        );
    }

    // Отображение загрузки
    if (isLoading || !project) {
        return (
            <div className="loaderBox">
                <Loader />
            </div>
        );
    }

    // Основной рендеринг
    return (        
        <>
            <LayoutSmall>
                <Container fluid="xxl">
                    <HeadStages 
                        obj={project}
                        setProject={setProject}
                    />     
                </Container>      
            </LayoutSmall>
            <Container fluid="xxl">
                <TeamInfo 
                    obj={teamInfo} 
                    arr={project.steps || []}
                />
                <ProjectDocuments 
                    files={files} 
                    projectId={project.id} 
                    isCompleteProject={isCompleteProject} 
                />
                <StagesList 
                    arr={project.steps || []} 
                    projectId={project.id} 
                    isCompleteProject={isCompleteProject} 
                />
            </Container>
        </>
    );
}