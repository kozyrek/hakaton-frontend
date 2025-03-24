import StagesItem from "./stagesItem";
import { steps } from "../utils/utils";
import { ReactComponent as Icon} from "../images/icon-hackathon.svg";

import styles from "./styles/stagesList.module.css";

export default function StagesList({projectIsComplete}) {
    return (
        <div className="contentBox">
            <h3 className={`titleH3 ${styles.subtitle}`}>Этапы проекта</h3>
            <ul className={styles.stepsList}>
                {steps.map((item, i) => (
                    <li key={i}>
                        <StagesItem item={item}/>
                    </li>
                ))}
                {projectIsComplete && <li key={steps.length} className={styles.stepsItem}>
                    <Icon/>
                </li>}
            </ul>
        </div>
    )
}