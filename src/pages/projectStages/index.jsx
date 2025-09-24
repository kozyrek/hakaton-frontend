import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import LayoutLogin from "../auth/layoutLogin";
import HeadStages from "./head-stages/headStages";
import TeamInfo from "./team-info/teamInfo";
import ProjectDocuments from "./project-documents/projectDocuments";
import StagesList from "./stages/stagesList";
import Loader from "../../components/loader/loader";

import { HTTP } from "../../api/http";
import getAnyDataDeleteAfterDev from "../../api/projects/getAnyDataDeleteAfterDev";

import getProjectById from "../../api/projects/getProjectById";
import getProjectFiles from "../../api/projects/getProjectFiles";
import getTeamById from "../../api/team/getTeamById";
import { STEP_PROJECT_STATUS } from "../../utils/constants";

export default function ProjectStages() {
    const [error, setError] = useState(undefined);
    const { projectId } = useParams();
    const [project, setProject] = useState({});
    const [files, setFiles] = useState([]);
    const [teamInfo, setTeamInfo] = useState(null);
    const [isCompleteProject, setIsCompleteProject] = useState(false);

    useEffect(() => {
        console.log('Fetching project with ID:', projectId); // Добавлено для отладки
        const fetchDataProject = async () => {
            try {
                const requestProject = await getProjectById(projectId);
                setProject(requestProject.data);
            } catch (e) {
                console.error('Error fetching project:', e.message); // Добавлено для отладки
                setError(e.message);
            }
        }
        fetchDataProject();
        // eslint-disable-next-line
    }, [projectId])

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const requestFiles = await getProjectFiles(projectId);
                setFiles(requestFiles.data);
            } catch (e) {
                console.error('Error fetching files:', e.message); // Добавлено для отладки
                setError(e.message);
            }
        }
        fetchFiles();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (project.teamId) {
            const fetchTeamInfo = async () => {
                try {
                    const requestTeam = await getTeamById(project.teamId);
                    setTeamInfo(requestTeam);
                } catch (e) {
                    console.error('Error fetching team info:', e.message); // Добавлено для отладки
                    setError(e.message);
                }
            }
            console.log('Fetching team info for teamId:', project.teamId); // Добавлено для отладки
            fetchTeamInfo();
        }
        // eslint-disable-next-line
    }, [project.teamId])

    useEffect(() => {
        if (project.steps) {
            setIsCompleteProject(project.steps.find
                (x => (x.stepNumber === 15) && (x.status === STEP_PROJECT_STATUS.ACCEPTED)
            ));
        }
        // eslint-disable-next-line
    }, [project.steps])

    /*Тестовый код------------------------------------------------------------------*/ 

    // getAnyDataDeleteAfterDev();
                // const response = HTTP.post(`/teams/39/members`,
            //     [
            //         {
            //             participantId: 20,
            //             roleName: "капитан",
            //         }
            //     ]
            // );

            // const response = HTTP.post(`/teams`, 
            //     // [
            //         {
            //             name: "Тестовая команда. НЕ удалять!"
            //         }
            //     // ]
            // );
            
    const handleChange = (event) => {
        let formData = new FormData();
        const data = {
            name: 'тестирования!',
            description: 'Здесь должно быть описание проекта'
        }

        formData.append('data', JSON.stringify(data))
        formData.append('document', event.target.files[0])

        // console.log(event.target.files[0])
       
        try {
            const response = HTTP.post("/projects/", formData);
            return response.data
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
    }

    // ДОБАВЛЕНО: Обработка случая, когда проект не найден
    if (error) {
        return (
            <LayoutLogin>
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
                            {error}
                        </p>
                        <p style={{ color: '#666' }}>
                            Project ID: {projectId}
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
            </LayoutLogin>
        );
    }

    /*------------------------------------------------------------------------------*/
    return (        
        Object.keys(project).length === 0
        ?   <div className="loaderBox">
                <Loader />
            </div> 
        :   <>
                <LayoutLogin>
                    <Container fluid="xxl">
                        <HeadStages 
                            obj={project}
                            setProject={setProject}
                        />     

                    </Container>      
                </LayoutLogin>
                <Container fluid="xxl">
                    <TeamInfo 
                        obj={teamInfo} 
                        arr={project.steps}
                    />
                    <ProjectDocuments 
                        files={files} 
                        projectId={project.id} 
                        isCompleteProject={isCompleteProject} 
                    />
                    <StagesList 
                        arr={project.steps} 
                        projectId={project.id} 
                        isCompleteProject={isCompleteProject} 
                    />
                </Container>
            </>
    )
}   