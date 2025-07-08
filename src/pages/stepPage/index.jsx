import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import StepProjectInfo from "./step-info/stepInfo";
import StepProjectComment from "./step-comments/stepComments";
import Loader from "../../components/loader/loader";
import getStep from "../../api/steps/getStep";
import getStepComments from "../../api/steps/getStepComments";
import { STEP_PROJECT_STATUS } from "../../utils/constants";

export default function StepProjectPage() {
    const stepNumber = useLocation().state.stepNumber;
    const stepTitle = useLocation().state.stepTitle;
    const projectId = useLocation().state.projectId;
    const [error, setError] = useState(undefined);
    const [step, setStep] = useState(null);
    const [comments, setComments] = useState(null);
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
                setStep(requestStep.data);
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
                timeExceeded: step.status === STEP_PROJECT_STATUS.TIME_EXCEEDED,
            });
            console.log("текущий статус шага", stepStatus);//---
        }
        // eslint-disable-next-line
    }, [step])

    useEffect(() => {
        const fetchDataStepComments = async () => {
            try {
                const requestStepComments = await getStepComments(projectId, stepNumber);
                setComments(requestStepComments.data);
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
    }

    return (
        <>
            <Container fluid="xxl">
                {!(step && comments)
                ? <div className="loaderBox">
                    <Loader />
                </div> 
                : (
                    <>
                        <StepProjectInfo 
                            step={step}
                            stepTitle={stepTitle} 
                            stepStatus={stepStatus}
                            handleSwitchStatus={handleSwitchStatus}
                        />
                        <StepProjectComment 
                            step={step} 
                            comments={comments} 
                            handleAddNewComment={handleAddNewComment} 
                            stepStatus={stepStatus}
                            handleSwitchStatus={handleSwitchStatus}
                        />
                    </>
                )}
            </Container>
        </>
    )
}