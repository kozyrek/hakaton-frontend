import React from "react";
import { Container } from "react-bootstrap";
import LayoutLogin from "../auth/layoutLogin";
import HeadStages from "./head-stages/headStages";
import StagesList from "./stages/stagesList";

export default function ProjectStages() {
    return (
        <>
            <LayoutLogin>
                <Container>
                    <HeadStages/>
                </Container>      
            </LayoutLogin>
            <Container>
                <StagesList/>
            </Container>
        </>
    )
}