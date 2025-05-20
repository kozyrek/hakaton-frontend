import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import StepProjectInfo from "./step-info/stepInfo";
import StepProjectComment from "./step-comments/stepComments";
import getStep from "../../api/steps/getStep";
import getStepComments from "../../api/steps/getStepComments";

export default function StepProjectPage() {
    const stepNumber = useLocation().state.stepNumber;
    const stepTitle = useLocation().state.stepTitle;
    const projectId = useLocation().state.projectId;
    const [error, setError] = useState(undefined);
    const [step, setStep] = useState({});
    const [comments, setComments] = useState([]);
    const [addComment, setAddComment] = useState(false);

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

    return (
        <>
            <Container>
                <StepProjectInfo step={step} stepNumber={stepNumber} stepTitle={stepTitle} />
                <StepProjectComment step={step} comments={comments} stepNumber={stepNumber} handleAddNewComment={handleAddNewComment} />
            </Container>
        </>
    )
}