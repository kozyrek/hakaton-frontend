import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Pencil from "../images/Pencil";
import styles from "./teamRating.module.css";
import cn from "classnames";

export default function TeamRating({obj}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [isEdit, setIsEdit] = useState(false);
    const [isStepPage, setIsStepPage] = useState(useLocation().pathname.includes("step"));

    const handleClick = () => {
        setIsEdit(!isEdit);
        // setIsEdit(true);
    }

    const [ratingValue, setRatingValue] = useState(obj ? obj.score : 0);
    const handleChange = (event) => {
        event.preventDefault();
        setRatingValue(event.target.value);
        console.log(event.target.value)
    };

    const className = cn(styles.valueBlock, {
        [styles.isStepPage]: isStepPage,
    });

    return (
        <div className={styles.wrapper}>
            <div className={className}>
                {isStepPage
                ? <span>Оценка команды за&nbsp;шаг</span>
                : <span>Общая оценка команды</span>}
                
                <div className={styles.value}>
                    {isEdit ?
                    <input 
                        type="number" 
                        name="rating"
                        className={styles.inputeValue}
                        value={ratingValue}
                        onChange={e => handleChange(e)} 
                        autoFocus 
                    /> :
                    <span className={styles.rating}>
                        {ratingValue || 0}
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
                    {ratingValue === 1 && "балл"}
                    {ratingValue >=2 && ratingValue <= 4 && "балла"}
                    {(ratingValue >= 5 || !ratingValue) && "баллов"}
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