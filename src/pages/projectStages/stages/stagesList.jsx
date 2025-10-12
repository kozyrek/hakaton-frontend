import StagesItem from "./stagesItem";
import { steps } from "../utils/utils";
import { ReactComponent as Icon} from "../images/icon-hackathon.svg";
import { STEP_PROJECT_STATUS } from "../../../utils/constants";

import styles from "./styles/stagesList.module.css";
import { useEffect, useState } from "react";

export default function StagesList({arr, projectId, isCompleteProject}) {
    const STEPS_COUNT = 15;
    const [isAcceptPrevStep, setIsAcceptPrevStep] = useState(Array(STEPS_COUNT).fill(false));

    useEffect(() => {
        if (arr) {
            const newIsAcceptPrevStep = isAcceptPrevStep.slice();
            for (let i = 1; i < arr.length; i++) {
                // if (arr[i-1].status !== STEP_PROJECT_STATUS.NOT_STARTED) {
                if (arr[i-1].status === STEP_PROJECT_STATUS.ACCEPTED) {
                    newIsAcceptPrevStep[i] = true;
                }
            }
            setIsAcceptPrevStep(newIsAcceptPrevStep);
        }
        // eslint-disable-next-line
    }, [arr])

    return (
        <div className="contentBox">
            <h3 className={`titleH3 ${styles.subtitle}`}>Этапы проекта</h3>
            <ul className={styles.stepsList}>
                {arr && arr.sort((a, b) => {return a.id - b.id}).map((item) => (
                    <li key={item.id}>
                        <StagesItem 
                            item={item} 
                            projectId={projectId} 
                            isAcceptPrevStep={isAcceptPrevStep[item.stepNumber - 1]} 
                        />
                    </li>
                ))}
                {isCompleteProject && <li key={steps.length} className={styles.stepsItem}>
                    <Icon/>
                </li>}
            </ul>
        </div>
    )
}
