import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import PaperClip from "../../profile/components/personal-info/textView/images/PaperClip";
import Textarea from "../../../components/textarea/textarea";
import InputFile from "../../../components/inputFile/inputFile";
import startWorkOnStep from "../../../api/steps/startWorkOnStep";
import addStepComment from "../../../api/steps/addStepComment";
import downloadComments from "../../../api/steps/downloadComments";
import { getDate } from "../../../utils/getDate";

import styles from "./stepComments.module.css";

import { HTTP } from "../../../api/http";//-------------------------

export default function StepProjectComment({
    step, 
    comments,
    handleAddNewComment,
    stepStatus,
    handleSwitchStatus,
}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [commentValue, setCommentValue] = useState('');
    const [fileDownload, setFileDownload] = useState(null);

    const handleChangeTextComment = (e) => {
        e.preventDefault();
        setCommentValue(e.target.value);
    }

    const handleAddComment = async () => {
        let formData = new FormData();
        const data = {
                text: commentValue,
            };
        // if (formCommentData.text.value) {//поле обязательное
            formData.append('text', JSON.stringify(data));
        // }
        for (let file of fileDownload) {
            formData.append('files', file);
        }

        const response = await addStepComment(step.projectId, step.stepNumber, formData);
        if (response.status === 201) {
            console.log("комментарий отправлен", response);
            handleAddNewComment();
            setCommentValue("");
            setFileDownload(null);
        }
    }

    // Взаимодействие капитана со страницей

    const handleStartStep = async () => {
        const response = await startWorkOnStep(step.projectId, step.stepNumber);
        if (response.status === 200) {
            console.log("старт работы на шаге", response.data);
            handleSwitchStatus(stepStatus.inProgress);
        }
    }

    // Взаимодействие ментора со страницей

    const handleDownloadComments = async () => {
        const response = await downloadComments(step.projectId, step.stepNumber);
    }

    //Тестовый код------------------------------------------
    const handleChange2 = () => {
        try {
            const response = HTTP.delete(`/projects/${step.projectId}/steps/${step.stepNumber}/comments/21`);
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
                            name="text"
                            addclass={styles.texareaComment}
                            placeholder="Введите комментарий"
                            maxLength={500}
                            value={commentValue}
                            onChange={handleChangeTextComment}
                            // disabled={
                            //     stepStatus.notStarted
                            //     || (!isMentor && (!stepStatus.inProgress || stepStatus.isSubmitted))
                            // }
                        />

                        <InputFile 
                            fileDownload={fileDownload} 
                            setFileDownload={setFileDownload}
                            stepStatus={stepStatus} 
                            multiple
                            isComment
                        />

                        <Button 
                            type="button" 
                            large 
                            text="Отправить" 
                            onClick={handleAddComment} 
                            addClass={styles.buttonSend}
                            disabled={
                                stepStatus.notStarted 
                                || (!isMentor && (!stepStatus.inProgress || stepStatus.isSubmitted))
                                || !(commentValue || fileDownload?.length)
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
                    onClick={handleDownloadComments} 
                    addClass={styles.buttonDownload}
                    // disabled={stepStatus.notStarted || !stepStatus.inProgress}
                    disabled={stepStatus.notStarted}
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