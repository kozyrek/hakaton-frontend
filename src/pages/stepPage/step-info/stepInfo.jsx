import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import Textarea from "../../../components/textarea/textarea";
import TeamRating from "../../projectStages/team-rating/teamRating";
import sendDataStepProject from "../../../api/projects/sendDataStepProject";
import acceptStep from "../../../api/steps/acceptStep";
import rejectStep from "../../../api/steps/rejectStep";

import styles from "./stepInfo.module.css";
import Inputs from "../../../components/inputs/inputs";

export default function StepProjectInfo({
    step, 
    stepNumber, 
    stepTitle,
    handleSwitchStatus,

    stepStatus,
}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    // const [textEdit, setTextEdit] = useState(!step.text);
    const [textValue, setTextValue] = useState(step.text ? JSON.parse(step.text).text : "");
    const [scoreValue, setScoreValue] = useState(0);
    const [timer, setTimer] = useState(0);
    
    const [time, setTime] = useState(5);//-----------------------
    useEffect(() => {
        if (time > 0) {
            setTimeout(setTime, 1000, time - 1);
            console.log(time)//----------------------
        } else {
            console.log("таймер стоп")//-------------
        }
    }, [time])

    useEffect(() => {
        setTextValue(step.text ? JSON.parse(step.text).text : "");
        // setTextEdit(!step.text)
        // eslint-disable-next-line
    }, [step.text])

    // const editContent = () => {
    //     setTextEdit(!textEdit);        
    // }

    const handleChange = (e) => {
        e.preventDefault();
        setTextValue(e.target.value);
        console.log(textValue)
    };

    const handleSendDataStep = () => {
        let formData = new FormData();
        const data = {
                text: textValue,
            };
        formData.append('text', JSON.stringify(data));
        const response = sendDataStepProject(step.projectId, stepNumber, formData);
        console.log("шаг отправлен на ревью", response.data);
        handleSwitchStatus(stepStatus.isSubmitted);
    }

    //Взаимодействие ментора со страницей 

    const handleAcceptStep = () => {
        const response = acceptStep(step.projectId, stepNumber, scoreValue);
        console.log("шаг согласован", response.data);
        handleSwitchStatus(stepStatus.isAccept);
    }

    const handleRejectStep = () => {
        const response = rejectStep(step.projectId, stepNumber, timer);
        console.log("шаг отклонен", response.data);
        handleSwitchStatus(stepStatus.notStarted);
    }

    return (
        <div className={`contentBox ${styles.wrapper}`}>

            {/* <span>{time}</span> */}
            <div className={styles.infoWrapper}>
                <h1 className={`titleH2 ${styles.title}`}>{stepTitle}</h1>
                <h2 className={`titleH3 ${styles.stepTitle}`}>Шаг {stepNumber}</h2>

                {!isMentor && 
                <Textarea
                    name="description"
                    placeholder="Введите текст"
                    maxLength={10000}
                    value={textValue}
                    onChange={handleChange}
                    disabled={
                        stepStatus.notStarted 
                        || !stepStatus.inProgress 
                        || stepStatus.isSubmitted 
                        || stepStatus.isAccept
                    }
                />}
                {isMentor && step.text &&
                <p className={`text1 ${styles.text}`}>{JSON.parse(step.text).text}</p>
                }

                {/* {(!step.text || (step.text && textEdit)) && !isAccept && 
                <Textarea
                    name="description"
                    placeholder="Введите текст"
                    maxLength={10000}
                    value={textValue}
                    onChange={handleChange}
                    disabled={notStarted || (isSubmitted && !isMentor)}
                />
                } */}
        
                {/* {((step.text && !textEdit) || isAccept) && (
                    <>
                        <p className={`text1 ${styles.text}`}>{JSON.parse(step.text).text}</p>
                        {(
                            // !isAccept || 
                            !notStarted) && 
                        <button 
                            className={`text2 ${styles.buttonEdit}`}
                            type="button"
                            onClick={editContent}
                        >
                            Изменить текст
                        </button>}
                    </>
                )} */}
            </div>
            <TeamRating 
                step={step} 
                setScoreValue={setScoreValue} 
                setTimer={setTimer}
                stepStatus={stepStatus}
            />
            <div className={styles.filesWrapper}>
                
                <h3 className={`titleH3 ${styles.title}`}>
                    {!stepStatus.isAccept ? "Загрузите файлы проекта" : "Файлы проекта"}
                </h3>

                <p className="text1">Документы, презентации, картинки, видео</p>
                {/* <Inputs
                    type="download"
                    formData={formData}
                    formError={formError}
                    name="download"
                    label="download"
                    onChange={handleChange}
                /> */}
            </div>
            {isMentor && 
            <div className={styles.buttonBlock}>
                <Button 
                    type="button" 
                    large 
                    text="Принять" 
                    onClick={handleAcceptStep}
                    disabled={
                        stepStatus.notStarted 
                        || stepStatus.inProgress 
                        || !stepStatus.isSubmitted 
                        || stepStatus.isAccept
                    }
                />
                <Button 
                    type="button" 
                    large 
                    text="Отклонить" 
                    onClick={handleRejectStep} 
                    addClass={styles.buttonReject}
                    violet 
                    disabled={
                        stepStatus.notStarted 
                        || stepStatus.nProgress 
                        || !stepStatus.isSubmitted 
                        || stepStatus.isAccept
                    }
                />
            </div>}
            {!isMentor && !stepStatus.isAccept &&
            <Button 
                type="button" 
                large 
                text="Готово" 
                onClick={handleSendDataStep}
                disabled={
                    stepStatus.notStarted 
                    || !stepStatus.inProgress 
                    || stepStatus.isSubmitted
                } 
            />
            } 
        </div>
    )
}