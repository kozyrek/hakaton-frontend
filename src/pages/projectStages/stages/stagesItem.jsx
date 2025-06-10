import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import ArrowStage from "../images/arrowStage";
import { steps } from "../utils/utils";
import { STEP_PROJECT_STATUS } from "../../../utils/constants";

import styles from "./styles/stagesItem.module.css";

export default function StagesItem({item, projectId, isAcceptPrevStep}) {
    const [inProgress, setInProgress] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const [notStarted, setNotStarted] = useState(false);

    const className = cn(styles.stepWrapper, {
        [styles.stepInProgress]: inProgress, 
        [styles.stepIsAccept]: isAccept,
        [styles.stepNotStarted]: notStarted,
    });

    useEffect(() => {
        if (item) {
            setInProgress(
                item.status === STEP_PROJECT_STATUS.IN_PROGRESS 
                || item.status === STEP_PROJECT_STATUS.TIME_EXCEEDED //------уточнить статус
                || item.status === STEP_PROJECT_STATUS.SUBMITTED //------уточнить статус
            );
            setIsAccept(item.status === STEP_PROJECT_STATUS.ACCEPTED);
            setNotStarted(item.status === STEP_PROJECT_STATUS.NOT_STARTED)
        }
    }, [item])
    
    return (
        // <Link 
        //     to={`/step/${item.id}`}
        //     state={{
        //         projectId: projectId,
        //         stepNumber: item.stepNumber, 
        //         stepTitle: steps.find(el => el.id === item.stepNumber).stepTitle,
        //     }}
        //     className={className} 
        // >
        //     <div className={styles.textBlock}>
        //         <p className="text4">
        //             Шаг&nbsp;{item.stepNumber}
        //         </p>
        //         <p className="text2">
        //             {steps.find(el => el.id === item.stepNumber).stepTitle}
        //         </p>
        //     </div>            
        //     <ArrowStage/>
        // </Link>

        <div className={className}>
            <div className={styles.textBlock}>
                <p className="text4">
                    Шаг&nbsp;{item.stepNumber}
                </p>
                {isAcceptPrevStep || item.stepNumber === 1
                ? <Link to={`/step/${item.id}`}
                    state={{
                        projectId: projectId,
                        stepNumber: item.stepNumber, 
                        stepTitle: steps.find(el => el.id === item.stepNumber).stepTitle,
                    }}
                    className={`text2`}
                    >
                    {steps.find(el => el.id === item.stepNumber).stepTitle}
                </Link>
                : <p className="text2">
                    {steps.find(el => el.id === item.stepNumber).stepTitle}
                </p>}
            </div>            
            <ArrowStage/>
        </div>
    )
}