import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Pencil from "../images/Pencil";
import Button from "../../../components/button/button";
import styles from "./teamRating.module.css";
import cn from "classnames";
import { POINTS, MINUTES, SECONDS } from "../../../utils/constants";
import { inflectWords } from "../../../utils/inflectWords";
import setTimerStep from "../../../api/steps/setTimerStep";//----------------------------------

export default function TeamRating({
    arr,
    step, 
    setScoreValue, 
    setTimer,
    stepStatus,
}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [isEditScore, setIsEditScore] = useState(false);
    const [isStepPage, setIsStepPage] = useState(useLocation().pathname.includes("step"));

    const [startTime, setStartTime] = useState(isStepPage && getSortArr(step.attempts, "startedAt"));
    const [endTime, setEndTime] = useState(isStepPage && getSortArr(step.attempts, "endTimeAt"));
    const [submitTime, setSubmitTime] = useState(isStepPage && getSortArr(step.attempts, "submittedAt"));
    const [time, setTime] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isEditTimer, setIsEditTimer] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [isError, setIsError] = useState({ score: false, time: false});
    const [isErrorMessage, setIsErrorMessage] = useState("");

    const addTimer = () => {
        setTimeout(setTime, 1000, time - 1000);
    }

    function getSortArr(arr, field) {
        // console.log(arr.sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt)), arr.sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt))[0])
        return arr.sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt))[0][field];
    }

    useEffect(() => {
        if (isStepPage) {
            if (stepStatus.notStarted) {
                addTimer && clearTimeout(addTimer);

                setTime(step.timerMinutes*60*1000);
                console.log("111", time, step.timerMinutes*60*1000);
            }

            if (stepStatus.inProgress) {
                // if (time > 0) {
                    setTime(new Date(endTime) - Date.now())
                    addTimer();
                    console.log("222", time);
                // } else {
                //     
                // }
            }

            if (stepStatus.isSubmitted || stepStatus.isAccept) {
                addTimer && clearTimeout(addTimer);

                setTime(new Date(submitTime) - new Date(startTime));
                console.log("333", time, new Date(submitTime));
            }

            if (stepStatus.timeExceeded) {
                addTimer && clearTimeout(addTimer);

                setTime(0)
            }

            const localTime = new Date(time + new Date(time).getTimezoneOffset()*60*1000);
            setMinutes(localTime.getHours()*60 + localTime.getMinutes());
            setSeconds(localTime.getSeconds());
            // console.log("осталось/прошло времени", localTime/1000, localTime/1000/60)//----------
            // console.log("осталось/прошло времени3", minutes, seconds)//-----------
        }
        // eslint-disable-next-line
    }, [step, time, isStepPage, stepStatus])

    useEffect(() => {
        if (isStepPage) {
            setRatingValue(step ? step.score : 0);
        } else {
            if (arr) {
            setRatingValue(
                arr.reduce((prev, item) => {
                    const sum = prev + item.score;
                    // console.log('рейтинг команды', sum)
                    return sum;
                }, 0));
            }
        }
        // eslint-disable-next-line
    }, [arr, step])

    const handleClickEditScore = () => {
        setIsEditScore(!isEditScore);
    }

    const handleClickEditTimer = () => {
        setIsEditTimer(!isEditTimer);
    }

    const printErrorMessage = (event) => {//разделить сообщения
        if (event.target.validity.badInput) {
            setIsErrorMessage("Введите правильное число")
        } else if (event.target.validity.stepMismatch) {
            setIsErrorMessage("Введите целое число");
        } else if (event.target.validity.rangeOverflow) {
            setIsErrorMessage(`Превышено максимальное значение ${event.target.attributes.max.nodeValue}`)
        } else if (event.target.validity.rangeUnderflow) {
            setIsErrorMessage(`Введите значение не ниже ${event.target.attributes.min.nodeValue}`);
        } else {
            setIsErrorMessage("");
        }
    }

    const handleChangeScore = (event) => {
        event.preventDefault();
        setRatingValue(event.target.value);
        setScoreValue(Number(event.target.value));

        // console.log(event.target.validity);
        if (!event.target.validity.valid) {
            setIsError({...isError, score: true});
            printErrorMessage(event);
        } else {
            setIsError({...isError, score: false});
        }
    };

    const handleChangeTime = (event) => {
        event.preventDefault();
        setMinutes(event.target.value);
        setSeconds(0);
        setTimer(Number(event.target.value));

        if (!event.target.validity.valid) {
            setIsError({...isError, time: true});
            printErrorMessage(event);
        } else {
            setIsError(false);
            setButtonDisabled(false);
        }
    }

    const handleSetTimer = async () => {
        if (minutes <= 0 || !Number.isInteger(Number(minutes))) {
            alert("Установите таймер, используйте целые числа");//---------------------------
        } else {
            const response = await setTimerStep(step.projectId, step.stepNumber, minutes);
            if (response.status === 200) {
                console.log("установлен новый таймер", response.data);
                setIsEditTimer(!isEditTimer);
                setButtonDisabled(true);
            }
        }
    }

    const className = cn(styles.valueBlock, {
        [styles.isStepPage]: isStepPage,
    });

    return (
        <div className={styles.wrapper}>
            <div style={{backgroundColor: "violet",}}>
            {step?.status}
            </div>

            <div className={className}>
                {isStepPage
                ? <span>Оценка команды за&nbsp;шаг</span>
                : <span>Общая оценка команды</span>}
                
                <div className={styles.value}>
                    {isEditScore ?
                    <input 
                        type="number" 
                        name="rating"
                        min={0}
                        max={10}
                        step={1}
                        className={styles.inputValue}
                        value={ratingValue}
                        onChange={e => handleChangeScore(e)} 
                        autoFocus 
                        disabled={stepStatus.isAccept}
                    /> :
                    <span className={styles.rating}>
                        {ratingValue || 0}
                    </span>}

                    {isMentor 
                    && isStepPage 
                    && (stepStatus.isSubmitted || stepStatus.timeExceeded) &&
                    <button 
                        type="button" 
                        aria-label="Редактировать баллы"
                        onClick={handleClickEditScore} 
                        className={styles.buttonEdit}
                        disabled={isError.score}
                    >
                        <Pencil />
                    </button>}
                </div>
                <span>{inflectWords(ratingValue, POINTS)}</span>

                {isError.score &&
                <div className={`text4 ${styles.errorBlock}`}>
                    {isErrorMessage}
                </div>}
            </div>

            {isStepPage && 
            <div className={styles.timerBlock}>
                <div className={styles.time}>
                    {isMentor && isEditTimer
                    ? <input 
                        className={styles.time}
                        value={minutes}
                        name="minutes"
                        type="number"
                        min={1}
                        max={999}
                        step={1}
                        autoFocus
                        onChange={handleChangeTime}
                        disabled={stepStatus.inProgress || stepStatus.isAccept}
                    />
                    : <span>{minutes}</span>}
                    <span className={styles.unitBlock}>{inflectWords(minutes, MINUTES)}</span>
                    {isMentor 
                    && isStepPage 
                    && (stepStatus.notStarted || stepStatus.isSubmitted || stepStatus.timeExceeded) &&
                    <button 
                        type="button" 
                        aria-label="Редактировать таймер"
                        onClick={handleClickEditTimer} 
                        className={styles.buttonEdit}
                        disabled={isError.time}
                    >
                        <Pencil />
                    </button>}
                </div>

                <span className={styles.divider}>:</span>

                <div className={styles.time}>
                    <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                    <span>{inflectWords(seconds, SECONDS)}</span>
                </div>

                {isError.time &&
                <div className={`text4 ${styles.errorBlock}`}>
                    {isErrorMessage}
                </div>}
            </div>}

            {isStepPage && isMentor && 
            <Button 
                type="button" 
                large 
                text="Установить таймер" 
                onClick={handleSetTimer}
                disabled={stepStatus.inProgress || stepStatus.isAccept || buttonDisabled}
            />}
        </div>
    )
}