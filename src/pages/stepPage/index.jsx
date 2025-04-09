import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import StepProjectInfo from "./step-info/stepInfo";
import StepProjectComment from "./step-comments/stepComments";

import { projectExample } from "../projectStages/utils/utils";

export default function StepProjectPage() {
    const stepNumber = useLocation().state.stepNumber;
    const stepTitle = useLocation().state.stepTitle;

    return (
        <>
            <Container>
                <StepProjectInfo project={projectExample.project} stepNumber={stepNumber} stepTitle={stepTitle} />
                <StepProjectComment project={projectExample.project} />
            </Container>
        </>
    )
}