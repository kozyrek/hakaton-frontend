import { useState, useEffect } from "react";
import createFormDataAndError from "../../../utils/createFormDataAndError";
import Inputs from "../../../components/inputs/inputs";
import Button from "../../../components/button/button";
import TeamRating from "../../projectStages/team-rating/teamRating";

import styles from "./stepInfo.module.css";

export default function StepProjectInfo({project, stepNumber, stepTitle}) {
    const text = project.description;
    const [textEdit, setTextEdit] = useState(text ? false : true);

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});

    useEffect(() => {
        const { applicableFields, errorFields } =
            createFormDataAndError(project);
            setFormData(applicableFields);
            setFormError(errorFields);
        }, [project]);

    console.log(formData);/*------*/

    const handleChange = (value, name) => {
        setFormData((prev) => ({ ...prev, [name]: { value: value } }));
    };

    const editContent = () => {
        setTextEdit(true);
    }

    return (
        <div className={`contentBox ${styles.wrapper}`}>
            <div className={styles.infoWrapper}>
                <h1 className={`titleH2 ${styles.title}`}>{stepTitle}</h1>
                <h2 className={`titleH3 ${styles.stepTitle}`}>{stepNumber}</h2>

                {(!text || textEdit) && 
                <Inputs 
                    name="description"
                    placeholder="Введите текст"
                    type="textarea"
                    maxLength={3000}
                    formData={formData}
                    onChange={handleChange}
                    formError={formError}
                />
                }
            
                {text && !textEdit && (
                    <>
                        <p className={`text1 ${styles.text}`}>{text}</p>
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
            <TeamRating
                // obj={projectExample.team}
            />
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
            <Button type="submit" large text="Готово" />
        </div>
    )
}