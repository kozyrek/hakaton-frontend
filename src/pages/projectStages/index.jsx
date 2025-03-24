import React from "react";
import { Container } from "react-bootstrap";
import LayoutLogin from "../auth/layoutLogin";
import HeadStages from "./head-stages/headStages";
import TeamInfo from "./team-info/teamInfo";
import ProjectDocuments from "./project-documents/projectDocuments";
import StagesList from "./stages/stagesList";

import { projectExample } from "./utils/utils";

export default function ProjectStages() {
    return (
        <>
            <LayoutLogin>
                <Container>
                    <HeadStages obj={projectExample.project}/>
                </Container>      
            </LayoutLogin>
            <Container>
                <TeamInfo obj={projectExample.team}/>
                <ProjectDocuments arr={projectExample.project.projectFiles}/>
                <StagesList projectIsComplete={projectExample.project.isComplete}/>
            </Container>
        </>
    )
}