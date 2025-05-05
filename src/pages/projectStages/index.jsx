import { Container } from "react-bootstrap";
import LayoutLogin from "../auth/layoutLogin";
import HeadStages from "./head-stages/headStages";
import TeamInfo from "./team-info/teamInfo";
import ProjectDocuments from "./project-documents/projectDocuments";
import StagesList from "./stages/stagesList";
import { HTTP } from "../../api/http";


import { projectExample } from "./utils/utils";

import { useSelector } from "react-redux";
// import getProjects from "../../api/projects/getProjects";

export default function ProjectStages() {
    const token = useSelector((state)=>state.user.token.accessToken);
    // getProjects(token);

    /*Тестовый код------------------------------------------------------------------*/
    const handleChange = (event) => {
        let formData = new FormData();

        formData.append('data[name]', 'Самый первый проект')
        formData.append('data[description]', 'Тестовый проект')
        formData.append('document', event.target.files[0])

        console.log(event.target.files[0])
       
        try {
            const response = HTTP.post("/projects/", formData,
                {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    // 'Content-Type': 'multipart/form-data',
                },
            }
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
                    <HeadStages obj={projectExample.project}/>
                    
                        <input onChange={handleChange} type="file"/>
                                            
                </Container>      
            </LayoutLogin>
            <Container>
                <TeamInfo obj={projectExample.team}/>
                <ProjectDocuments arr={projectExample.project.download}/>
                <StagesList projectIsComplete={projectExample.project.isComplete}/>
            </Container>
        </>
    )
}