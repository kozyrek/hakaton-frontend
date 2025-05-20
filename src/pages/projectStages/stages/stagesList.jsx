import StagesItem from "./stagesItem";
import { steps } from "../utils/utils";
import { ReactComponent as Icon} from "../images/icon-hackathon.svg";
import { STEP_PROJECT_STATUS } from "../../../utils/constants";

import styles from "./styles/stagesList.module.css";
import { useEffect, useState } from "react";

export default function StagesList({arr, projectId}) {
    const [isCompleteProject, setIsCompleteProject] = useState(false);

    useEffect(() => {
        if (arr) {
            setIsCompleteProject(arr[14].status === STEP_PROJECT_STATUS.ACCEPTED)
        }
    }, [arr])

    return (
        <div className="contentBox">
            <h3 className={`titleH3 ${styles.subtitle}`}>Этапы проекта</h3>
            <ul className={styles.stepsList}>
                {arr && arr.map((item) => (
                    <li key={item.id}>
                        <StagesItem item={item} projectId={projectId}/>
                    </li>
                ))}
                {isCompleteProject && <li key={steps.length} className={styles.stepsItem}>
                    <Icon/>
                </li>}
            </ul>
        </div>
    )
}
