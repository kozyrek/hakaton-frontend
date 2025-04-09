import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Pencil from "../images/Pencil";
import styles from "./teamRating.module.css";
import cn from "classnames";

export default function TeamRating({value}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [isEdit, setIsEdit] = useState(false);
    const [isStepPage, setIsStepPage] = useState(useLocation().pathname === "/step");

    const handleClick = () => {
        setIsEdit(!isEdit);
        // setIsEdit(true);
    }

    const className = cn(styles.valueBlock, {
        [styles.isStepPage]: isStepPage,
    });

    return (
        <div className={styles.wrapper}>
            <div className={className}>
                <span>Общая оценка команды</span>

                <div className={styles.value}>
                    {isEdit ?
                    <input type="number" className={styles.inputeValue} autoFocus /> :
                    <span className={styles.rating}>
                        {value || 0}
                    </span>}

                    {isMentor && isStepPage &&
                    <button 
                        type="button" 
                        aria-label="Редактировать баллы"
                        onClick={handleClick} 
                        className={styles.buttonEdit}
                    >
                        <Pencil />
                    </button>}
                </div>
                
                <span>
                    {value === 1 && "балл"}
                    {value >=2 && value <= 4 && "балла"}
                    {(value >= 5 || !value) && "баллов"}
                </span>
            </div>

            {isStepPage && 
            <div className={styles.timerBlock}>
                <div className={styles.time}>
                    <span>00</span>
                    <span>минут</span>
                </div>
                <span className={styles.divider}>:</span>
                <div className={styles.time}>
                    <span>00</span>
                    <span>секунд</span>
                </div>
            </div>}
        </div>
    )
}