import StagesItem from "./stagesItem";
import { steps } from "../utils/utils";

import styles from "./styles/stagesList.module.css";

export default function StagesList() {
    return (
        <div className={styles.wrapper}>
            <h3 className={`titleH3 ${styles.subtitle}`}>Этапы проекта</h3>
            <ul className={styles.stepsList}>
                {steps.map((item, i) => (
                    <li key={i} className={styles.stepsItem}>
                        <StagesItem item={item}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}