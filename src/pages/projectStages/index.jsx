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
import { useEffect, useState } from "react";

export default function ProjectStages() {
    const [error, setError] = useState(undefined);
    
    const projectId = 3;

    const [project, setProject] = useState({});
    const [files, setFiles] = useState([]);
    const [teamInfo, setTeamInfo] = useState(null);

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

    // getAnyDataDeleteAfterDev();

    /*Тестовый код------------------------------------------------------------------*/ 
    const handleChange = () => {
        // let formData = new FormData();
        // const data = {
        //     name: 'Еще один проект',
        //     description: 'Тестовый проект 3'
        // }

        // formData.append('data', JSON.stringify(data))
        // formData.append('document', event.target.files[0])

        // console.log(event.target.files[0])
       
        try {
            // const response = HTTP.post("/projects/", formData);
            const response = HTTP.post(`/teams/9/members`, 
                [
                    {
                        participantId: 20,
                        roleName: "капитан",
                    }
                ]
            );
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

                </Container>      
            </LayoutLogin>
            <Container>
                <TeamInfo obj={teamInfo} arr={project.steps}/>
                <ProjectDocuments files={files}/>
                <StagesList arr={project.steps} projectId={project.id} />
            </Container>
        </>
    )
}