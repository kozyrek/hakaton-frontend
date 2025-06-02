import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import StepProjectInfo from "./step-info/stepInfo";
import StepProjectComment from "./step-comments/stepComments";
import getStep from "../../api/steps/getStep";
import getStepComments from "../../api/steps/getStepComments";
import { STEP_PROJECT_STATUS } from "../../utils/constants";

export default function StepProjectPage() {
    const stepNumber = useLocation().state.stepNumber;
    const stepTitle = useLocation().state.stepTitle;
    const projectId = useLocation().state.projectId;
    const [error, setError] = useState(undefined);
    const [step, setStep] = useState({});
    const [comments, setComments] = useState([]);
    const [addComment, setAddComment] = useState(false);
    const [stepStatus, setStepStatus] = useState({
        notStarted: false,
        inProgress: false,
        isSubmitted: false,
        isAccept: false,
    })

    useEffect(() => {
        const fetchDataStep = async () => {
            try {
                const requestStep = await getStep(projectId, stepNumber);
                setStep(requestStep);
            } catch (e) {
                setError(e.message);
            }
        }
        fetchDataStep();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (step) {
            setStepStatus({
                notStarted: step.status === STEP_PROJECT_STATUS.NOT_STARTED,
                inProgress: step.status === STEP_PROJECT_STATUS.IN_PROGRESS,
                isSubmitted: step.status === STEP_PROJECT_STATUS.SUBMITTED,
                isAccept: step.status === STEP_PROJECT_STATUS.ACCEPTED,
            });
            // console.log(stepStatus);//---
        }
        // eslint-disable-next-line
    }, [step])

    useEffect(() => {
        const fetchDataStepComments = async () => {
            try {
                const requestStepComments = await getStepComments(projectId, stepNumber);
                setComments(requestStepComments);
            } catch (e) {
                setError(e.message);
            }
        }
        fetchDataStepComments();
        // eslint-disable-next-line
    }, [addComment])

    const handleAddNewComment = () => {
        setAddComment(!addComment);
    }

    const handleSwitchStatus = (status) => {
        switch (status) {
            case stepStatus.notStarted:
                setStepStatus({isSubmitted: false, notStarted: true});
                break;
            case stepStatus.inProgress:
                setStepStatus({notStarted: false, inProgress: true})
                break;
            case stepStatus.isSubmitted:
                setStepStatus({inProgress: false, isSubmitted: true})
                break;
            case stepStatus.isAccept:
                setStepStatus({isSubmitted: false, isAccept: true})
                break;
            default:
                break;
        }
        console.log("статус шага изменен на", status, stepStatus
        );
    }

    return (
        <>
            <Container fluid="xxl">
                <StepProjectInfo 
                    step={step} 
                    stepNumber={stepNumber} 
                    stepTitle={stepTitle} 
                    stepStatus={stepStatus}
                    handleSwitchStatus={handleSwitchStatus}
                />
                <StepProjectComment 
                    step={step} 
                    comments={comments} 
                    stepNumber={stepNumber} 
                    handleAddNewComment={handleAddNewComment} 
                    stepStatus={stepStatus}
                    handleSwitchStatus={handleSwitchStatus}
                />
            </Container>
        </>
    )
}