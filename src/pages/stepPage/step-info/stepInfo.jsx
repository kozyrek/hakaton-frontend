import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import TeamRating from "../../projectStages/team-rating/teamRating";
import sendDataStepProject from "../../../api/projects/sendDataStepProject";
import acceptStep from "../../../api/steps/acceptStep";
import rejectStep from "../../../api/steps/rejectStep";
import { STEP_PROJECT_STATUS } from "../../../utils/constants";

import styles from "./stepInfo.module.css";

export default function StepProjectInfo({step, stepNumber, stepTitle}) {
    // const text = project.description;
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [textEdit, setTextEdit] = useState(step.text ? false : true);
    const [textValue, setTextValue] = useState(step.text);
    const [stepIsSubmitted, setStepIsSubmitted] = useState(false);
    const [time, setTime] = useState(5);

    const timer = 15;
    const scoreAccept = 9;
    const scoreReject = 5;

    useEffect(() => {
        setStepIsSubmitted(step.status === STEP_PROJECT_STATUS.SUBMITTED)
    }, [step])

    useEffect(() => {
        if (time > 0) {
            setTimeout(setTime, 1000, time - 1);
            console.log(time)//----------------------
        } else {
            console.log("таймер стоп")//-------------
        }
    }, [time])

    const editContent = () => {
        setTextEdit(true);
    }

    const handleChange = (event) => {
        event.preventDefault();
        setTextValue(event.target.value);
    };

    const handleSendDataStep = () => {
        let formData = new FormData();
        const data = {
                text: textValue,
            };
        formData.append('text', JSON.stringify(data));
        const response = sendDataStepProject(step.projectId, stepNumber, formData);
        console.log("шаг отправлен на ревью", response.data);
    }

    //Взаимодействие ментора со страницей 

    const handleAcceptStep = () => {
        const response = acceptStep(step.projectId, stepNumber, timer, scoreAccept);
        console.log("шаг согласован", response.data);
    }

    const handleRejectStep = () => {
        const response = rejectStep(step.projectId, stepNumber, timer, scoreReject);
        console.log("шаг отклонен", response.data);
    }

    return (
        <div className={`contentBox ${styles.wrapper}`}>

            {/* <span>{time}</span> */}
            <div className={styles.infoWrapper}>
                <h1 className={`titleH2 ${styles.title}`}>{stepTitle}</h1>
                <h2 className={`titleH3 ${styles.stepTitle}`}>Шаг {stepNumber}</h2>

                {(!step.text || textEdit) && 
                <textarea
                    name="description"
                    placeholder="Введите текст"
                    maxLength={3000}
                    value={textValue}
                    onChange={e => handleChange(e)}
                />
                }
            
                {step.text && !textEdit && (
                    <>
                        <p className={`text1 ${styles.text}`}>{step.text}</p>
                        <button 
                            className={`text2 ${styles.buttonEdit}`}
                            type="button"
                            onClick={editContent}
                        >
                            Изменить текст
                        </button>
                    </>
                )}
            </div>
            <TeamRating obj={step} />
            <div className={styles.filesWrapper}>
                <h3 className={`titleH3 ${styles.title}`}>Загрузите файлы проекта</h3>
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
            {isMentor 
            // && stepIsSubmitted
            && <div className={styles.buttonBlock}>
                <Button type="button" large text="Принять" onClick={handleAcceptStep}/>
                <Button type="button" large text="Отклонить" onClick={handleRejectStep} addClass={styles.buttonReject} violet/>
            </div>}
            {/* {!isMentor &&  */}
            <Button type="submit" large text="Готово" onClick={handleSendDataStep}/>
            {/* } */}
        </div>
    )
}