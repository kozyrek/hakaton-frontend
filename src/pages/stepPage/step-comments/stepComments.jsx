import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import PaperClip from "../../profile/components/personal-info/textView/images/PaperClip";
import Textarea from "../../../components/textarea/textarea";
import startWorkOnStep from "../../../api/steps/startWorkOnStep";
import addStepComment from "../../../api/steps/addStepComment";

import styles from "./stepComments.module.css";

import { HTTP } from "../../../api/http";//-------------------------

export default function StepProjectComment({
    step, 
    comments, 
    stepNumber, 
    handleAddNewComment,
    stepStatus,
    handleSwitchStatus,
}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [commentValue, setCommentValue] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setCommentValue(e.target.value);
    }

    const getDate = (str) => {
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }
        const date = new Date(str);
        return date.toLocaleString('ru', options)
    }

    const handleAddComment = async () => {
        // добавить отправку файлов-----------------------------------------
        let formData = new FormData();
        const data = {
                text: commentValue,
            };
        formData.append('text', JSON.stringify(data));
        const response = await addStepComment(step.projectId, stepNumber, formData);
        console.log("комментарий отправлен", response);
        
        handleAddNewComment();
        setCommentValue('');
    }

    const handleStartStep = () => {
        const response = startWorkOnStep(step.projectId, stepNumber);
        console.log("старт работы на шаге", response.data);//---------
        handleSwitchStatus(stepStatus.inProgress);
    }

    // Взаимодействие ментора со страницей
    const downloadComments = () => {
    }

    //Тестовый код------------------------------------------
    const handleChange2 = () => {
        try {
            const response = HTTP.delete(`/projects/${step.projectId}/steps/${stepNumber}/comments/21`);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
    //-----------------------------------------------------

    return (
        <div className={`contentBox ${styles.wrapper}`}>
            <h3 className={`titleH3 ${styles.title}`}>Комментарии к&#8239;&#8239;проекту</h3>
            <div className={styles.commentBlock}>
                {!stepStatus.isAccept &&
                    <>
                        <Textarea
                            name="comment"
                            addClass={styles.texareaComment}
                            placeholder="Введите комментарий"
                            maxLength={500}
                            value={commentValue}
                            onChange={handleChange}
                            disabled={
                                stepStatus.notStarted
                                || (!isMentor && (!stepStatus.inProgress || stepStatus.isSubmitted))
                            }
                        />

                        <input type="file"></input>

                        <Button 
                            type="button" 
                            large 
                            text="Отправить" 
                            onClick={handleAddComment} 
                            addClass={styles.buttonSend}
                            disabled={
                                stepStatus.notStarted 
                                || (!isMentor && (!stepStatus.inProgress || stepStatus.isSubmitted))
                            }
                        />
                    </>
                }

                {/* <button type="button" onClick={handleChange2}>удалить комментарий</button>----------------------------------- */}

                <div className={`text1 ${styles.commentsList}`}>
                    {comments.sort((a, b) => {return b.id - a.id}).map((item) => (
                        <div key={item.id}>
                            <p className={`text2 ${styles.nameText}`}>
                                {item.user.lastName} {item.user.firstName} {item.user.patronymic}, {getDate(item.createdAt)}
                            </p>
                            <p className={styles.commentText}>{JSON.parse(item.text).text}</p>
                            {item.files.length !== 0 && (
                                <ul className={`text2 ${styles.documentsList}`}>
                                    {item.files.map((item, index) => (
                                        <li key={index} className={styles.documentsItem}>
                                            <PaperClip />
                                            <a 
                                                target="_blank" 
                                                href={item.filePath} 
                                                rel="noreferrer" 
                                                className={`text2 ${styles.documentsLink}`}
                                            >
                                                {/* {item.filePath.split('/').at(-1)} */}
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul> 
                            )}
                        </div>
                    ))}
                </div>

                {isMentor && 
                <Button 
                    large 
                    text="Скачать комментарии" 
                    onClick={downloadComments} 
                    addClass={styles.buttonDownload}
                    disabled={stepStatus.notStarted || !stepStatus.inProgress}
                />}
            </div>
            {!isMentor && !stepStatus.isAccept && <Button 
                large 
                violet 
                text="Старт" 
                onClick={handleStartStep} 
                addClass={styles.buttonStart}
                disabled={!stepStatus.notStarted || stepStatus.inProgress || stepStatus.isSubmitted}
            />}
        </div>
    )
}