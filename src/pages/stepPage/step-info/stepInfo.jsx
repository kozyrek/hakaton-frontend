import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import Textarea from "../../../components/textarea/textarea";
import TeamRating from "../../projectStages/team-rating/teamRating";
import sendDataStepProject from "../../../api/projects/sendDataStepProject";
import acceptStep from "../../../api/steps/acceptStep";
import rejectStep from "../../../api/steps/rejectStep";

import styles from "./stepInfo.module.css";
import IconDelete from "../images/icon-delete";
import IconPaperclip from "../images/icon-paperclip";

export default function StepProjectInfo({
    step, 
    stepTitle,
    handleSwitchStatus,
    stepStatus,
}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    // const [textEdit, setTextEdit] = useState(!step.text);
    const [textValue, setTextValue] = useState(step.text ? JSON.parse(step.text).text : "");
    const [scoreValue, setScoreValue] = useState(0);
    const [timer, setTimer] = useState(0);
    const [fileDownload, setFileDownload] = useState(null);

    
    // const [time, setTime] = useState(5);//-----------------------
    // useEffect(() => {
    //     if (time > 0) {
    //         setTimeout(setTime, 1000, time - 1);
    //         console.log(time)//----------------------
    //     } else {
    //         console.log("таймер стоп")//-------------
    //     }
    // }, [time])

    useEffect(() => {
        setTextValue(step.text ? JSON.parse(step.text).text : "");
        // setTextEdit(!step.text)
        // eslint-disable-next-line
    }, [step.text])

    // const editContent = () => {
    //     setTextEdit(!textEdit);        
    // }

    useEffect(() => {
        setFileDownload(step.files)
    }, [step])

    //Взаимодействие капитана/участника со страницей 

    const handleChangeText = (e) => {
        e.preventDefault();
        setTextValue(e.target.value);
    };
    
    const handleAddFile = (e) => {
        //добавить валидацию файла--------------------------------------
        e.preventDefault();
        if (fileDownload?.length) {
            setFileDownload([...fileDownload, ...Array.from(e.target.files)]);
        } else {
            setFileDownload(Array.from(e.target.files));
        }
    }

    const handleDeleteFile = (i) => {
        setFileDownload(fileDownload => fileDownload.filter(el => el !== fileDownload[i]))
    }

    const handleSendDataStep = async () => {
        if (!textValue || !fileDownload?.length) {
            alert("Заполните текст шага или добавьте файлы");
        } else {
            let formData = new FormData();
            const data = {
                text: textValue,
            };
            formData.append('text', JSON.stringify(data));
            //------------------------------------------------
            for (let file of fileDownload) {
                formData.append('files', file);
            }

            const response = await sendDataStepProject(step.projectId, step.stepNumber, formData);
            if (response.status === 200) {
                console.log("шаг отправлен на ревью", response.data);
                handleSwitchStatus(stepStatus.isSubmitted);
            }
        }
    }

    //Взаимодействие ментора со страницей 

    const handleAcceptStep = async () => {
        if (scoreValue < 0 || scoreValue > 10 || isNaN(scoreValue) || !Number.isInteger(scoreValue)) {
            alert("Установите баллы (от 0 до 10) в поле «Оценка», используйте целые числа");//----------
        } else {
            const response = await acceptStep(step.projectId, step.stepNumber, scoreValue);
            if (response.status === 200) {
                console.log("шаг согласован", response.data);
                handleSwitchStatus(stepStatus.isAccept);
            }
        }
    }

    const handleRejectStep = async() => {
        if (timer <= 0 || isNaN(timer) || !Number.isInteger(timer)) {
            alert("Установите таймер, используйте целые числа");//------------
        } else {
            const response = await rejectStep(step.projectId, step.stepNumber, timer);
            if (response.status === 200) {
                console.log("шаг отклонен", response.data);
                handleSwitchStatus(stepStatus.notStarted);
            }
        }
    }

    return (
        <div className={`contentBox ${styles.wrapper}`}>

            {/* <span>{time}</span> */}
            <div className={styles.infoWrapper}>
                <h1 className={`titleH2 ${styles.title}`}>{stepTitle}</h1>
                <h2 className={`titleH3 ${styles.stepTitle}`}>Шаг {step.stepNumber}</h2>

                {!isMentor && 
                <Textarea
                    name="description"
                    placeholder="Введите текст"
                    maxLength={10000}
                    value={textValue}
                    onChange={handleChangeText}
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
                    onChange={handleChangeText}
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
                {!isMentor && 
                <label className={`${styles.inputFile} ${(
                    stepStatus.notStarted || !stepStatus.inProgress || stepStatus.isSubmitted) 
                    ? `${styles.disabled}` 
                    : ""}`}>
                    <span className={`text4 ${styles.inputFileText}`}>Выберите файл</span>
                    <input 
                        type="file" 
                        name="file" 
                        multiple 
                        onChange={handleAddFile} 
                        className={styles.visuallyHidden}
                    />        
                    <span className={`text2 ${styles.inputFileBtn}`}>Загрузить</span>
                </label>}
                {fileDownload &&
                <ul className={`text2 ${styles.documentsList}`}>
                    {fileDownload.map((item, i) => (
                        <li key={i} className={styles.documentsItem}>
                            <IconPaperclip />
                            <a 
                                className="text2" 
                                href={item.filePath} 
                                target="_blank" 
                                rel="noreferrer"
                            >
                                {item.name}
                            </a>
                            {!isMentor && (!stepStatus.notStarted || stepStatus.inProgress || !stepStatus.isSubmitted || !stepStatus.isAccept) &&//--------уточнить условия отображения
                            <button 
                                type="button"
                                className={styles.buttonDeleteFile}
                                onClick={() => handleDeleteFile(i)}
                                aria-label="Удалить файл"
                            >
                                <IconDelete/>
                            </button>}
                        </li>
                    ))}
                </ul>
                }
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