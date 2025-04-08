import { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import ArrowStage from "../images/arrowStage";

import styles from "./styles/stagesItem.module.css";

export default function StagesItem({item}) {
    const [inProgress, setInProgress] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const className = cn(styles.stepWrapper, {
        [styles.stepInProgress]: inProgress, 
        [styles.stepIsComplete]: isComplete, 
    });
    
    return (
        <Link to="#" className={className}>
            <div className={styles.textBlock}>
                <p className="text4">
                    {item.stepNumber}
                </p>
                <p className="text2">
                    {item.stepTitle}
                </p>
            </div>            
            <ArrowStage/>
        </Link>
    )
}