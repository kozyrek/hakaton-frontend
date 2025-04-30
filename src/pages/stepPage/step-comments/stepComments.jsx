import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Inputs from "../../../components/inputs/inputs";
import Button from "../../../components/button/button";
import PaperClip from "../../profile/components/personal-info/textView/images/PaperClip";
import { Link } from "react-router-dom";
import createFormDataAndError from "../../../utils/createFormDataAndError";

import styles from "./stepComments.module.css";

export default function StepProjectComment({project}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    
    useEffect(() => {
        const { applicableFields, errorFields } =
            createFormDataAndError(project);
            setFormData(applicableFields);
            setFormError(errorFields);
        }, [project]);

    // console.log(formData);/*------*/

    const handleChange = (value, name) => {
        setFormData((prev) => ({ ...prev, [name]: { value: value } }));
    };

    const handleClick = (id) => {
    }

    const downloadComments = () => {
    }

    return (
        <div className={`contentBox ${styles.wrapper}`}>
            <h3 className={`titleH3 ${styles.title}`}>Комментарии к&#8239;&#8239;проекту</h3>
            <div className={styles.commentBlock}>
                <Inputs 
                    name="comment"
                    placeholder="Введите комментарий"
                    type="textarea"
                    formData={formData}
                    onChange={handleChange}
                    formError={formError}
                />

                <input type="file"></input>

                <Button type="submit" large text="Отправить" addClass={styles.buttonSend} />

                <div className={`text1 ${styles.commentsList}`}>
                    {project.comments.map((item, i) => (
                        <div key={i}>
                            <p className={`text2 ${styles.nameText}`}>{item.author}, {item.time}</p>
                            <p className={styles.commentText}>{item.text}</p>
                            {item.download.length !== 0 && (
                                <ul className={`text2 ${styles.documentsList}`}>
                                    {item.download.map((item, index) => (
                                        <li key={index} className={styles.documentsItem}>
                                            <PaperClip />
                                            <Link className={`text2 ${styles.documentsLink}`} to="#">
                                                {item}{/*----------------*/}
                                            </Link>
                                        </li>
                                    ))}
                                </ul> 
                            )}
                            <button 
                                type="button" 
                                className={`text2 ${styles.buttonAnswer}`} 
                                onClick={handleClick(i)}
                            >
                                Ответить
                            </button>
                        </div>
                    ))}
                </div>

                {isMentor && 
                <Button 
                    large 
                    text="Скачать комментарии" 
                    onClick={downloadComments} 
                    addClass={styles.buttonDownload}
                />}
            </div>
        </div>
    )
}