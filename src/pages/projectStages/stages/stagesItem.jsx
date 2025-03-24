import ArrowStage from "../images/arrowStage";

import styles from "./styles/stagesItem.module.css";

export default function StagesItem({item}) {
    return (
        <>
            <div className={styles.textBlock}>
                <p className="text4">
                    {item.stepNumber}
                </p>
                <p className="text2">
                    {item.stepTitle}
                </p>
            </div>            
            <ArrowStage className={styles.icon}/>
        </>
    )
}