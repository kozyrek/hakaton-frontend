import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Pencil from "../images/Pencil";
import styles from "./teamRating.module.css";
import cn from "classnames";
import setTimerStep from "../../../api/steps/setTimerStep";//----------------------------------

export default function TeamRating({
    overallRating, 
    step, 
    setScoreValue, 
    setTimer,
    stepStatus,
}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [isEdit, setIsEdit] = useState(false);
    const [isStepPage, setIsStepPage] = useState(useLocation().pathname.includes("step"));
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [ratingValue, setRatingValue] = useState(0);

    useEffect(() => {
        if (isStepPage) {
            setRatingValue(step ? step.score : 0);
        } else {
            setRatingValue(overallRating);
        }
        // eslint-disable-next-line
    }, [step])

    useEffect(() => {
        setMinutes(step ? step.timerMinutes : 30);
        setTimer(step ? step.timerMinutes : 30);
        console.log("таймер", minutes)
        // eslint-disable-next-line
    }, [step])

    const handleClick = () => {
        setIsEdit(!isEdit);
        // setIsEdit(true);
    }

    const handleChange = (event) => {
        event.preventDefault();
        setRatingValue(event.target.value);//---
        console.log(event.target.value);
        setScoreValue(parseInt(event.target.value));
    };

    const handleChangeTime = (e) => {
        e.preventDefault();
        setMinutes(parseInt(e.target.value));
        setTimer(parseInt(e.target.value));

        const response = setTimerStep(step.projectId, step.stepNumber, parseInt(e.target.value));
        console.log("установлен новый таймер", response.data)
    }

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
                        // max={10}
                        className={styles.inputValue}
                        value={ratingValue}
                        onChange={e => handleChange(e)} 
                        autoFocus 
                        disabled={stepStatus.isAccept}
                    /> :
                    <span className={styles.rating}>
                        {ratingValue || 0}
                    </span>}

                    {isMentor && isStepPage && !stepStatus.isAccept && !stepStatus.notStarted &&
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
                    {ratingValue == 1 && "балл"}
                    {ratingValue >=2 && ratingValue <= 4 && "балла"}
                    {(ratingValue >= 5 || !ratingValue) && "баллов"}
                </span>
            </div>

            {isStepPage && 
            <div className={styles.timerBlock}>
                <div className={styles.time}>
                    {isMentor 
                    ? <input 
                        className={styles.time}
                        value={minutes}
                        name="minutes"
                        type="number"
                        min={1}
                        max={999}
                        step={1}
                        onChange={handleChangeTime}

                        disabled={
                            stepStatus.notStarted ||
                            stepStatus.inProgress 
                            || !stepStatus.isSubmitted 
                            || stepStatus.isAccept
                        }
                        />
                    : <span>{minutes}</span>}
                    <span>минут</span>
                </div>

                <span className={styles.divider}>:</span>

                <div className={styles.time}>
                    <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                    <span>секунд</span>
                </div>
            </div>}
        </div>
    )
}