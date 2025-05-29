import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LayoutLogin from "../auth/layoutLogin";
import HeadStages from "./head-stages/headStages";
import TeamInfo from "./team-info/teamInfo";
import ProjectDocuments from "./project-documents/projectDocuments";
import StagesList from "./stages/stagesList";

import { HTTP } from "../../api/http";
import getAnyDataDeleteAfterDev from "../../api/projects/getAnyDataDeleteAfterDev";

import getProjectById from "../../api/projects/getProjectById";
import getProjectFiles from "../../api/projects/getProjectFiles";
import getTeamById from "../../api/teams/getTeamById";
import { STEP_PROJECT_STATUS } from "../../utils/constants";

export default function ProjectStages() {
    const [error, setError] = useState(undefined);
    
    const projectId = 9;

    const [project, setProject] = useState({});
    const [files, setFiles] = useState([]);
    const [teamInfo, setTeamInfo] = useState(null);
    const [isCompleteProject, setIsCompleteProject] = useState(false);

    useEffect(() => {
        const fetchDataProject = async () => {
            try {
                const requestProject = await getProjectById(projectId);
                setProject(requestProject);
            } catch (e) {
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
                    setFiles(requestFiles);
                } catch (e) {
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
                    setError(e.message);
                }
            }
            console.log(project);//------------------
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
    
    const handleChange = () => {
        // let formData = new FormData();
        // const data = {
        //     name: 'Проект для тестирования',
        //     description: 'Здесь должно быть описание проекта'
        // }

        // formData.append('data', JSON.stringify(data))
        // formData.append('document', event.target.files[0])

        // console.log(event.target.files[0])
       
        try {
            // const response = HTTP.post("/projects/", formData);
            const response = HTTP.post(`/teams/39/members`,
                [
                    {
                        participantId: 20,
                        roleName: "капитан",
                    }
                ]
            );

            // const response = HTTP.post(`/teams`, 
            //     // [
            //         {
            //             name: "Тестовая команда. НЕ удалять!"
            //         }
            //     // ]
            // );

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
    /*------------------------------------------------------------------------------*/
    return (
        <>
            <LayoutLogin>
                <Container>
                    <HeadStages obj={project}/>     

{/* <button type="button" onClick={handleChange}>добавить участника в команду</button> */}

{/* <input type="file" onChange={handleChange}/> */}

                </Container>      
            </LayoutLogin>
            <Container>
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