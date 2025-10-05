import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import IconDelete from "../../assests/images/icon/icon-delete";
import IconPaperclip from "../../assests/images/icon/icon-paperclip";

import styles from "./inputFile.module.css";

export default function InputFile({
    files,
    setFiles,
    fileDownload, 
    setFileDownload, 
    fileDelete,
    setFileDelete,
    stepStatus, 
    multiple, 
    accept, 
    isComment, 
    disabledButton
}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));

    const handleAddFile = (e) => {
        //добавить валидацию файла--------------------------------------
        e.preventDefault();
        if (files?.length) {
            setFiles([...files, ...Array.from(e.target.files)]);
            setFileDownload([...fileDownload, ...Array.from(e.target.files)])
        } else {
            setFiles(Array.from(e.target.files));
            setFileDownload(Array.from(e.target.files));
        }
    }

    const handleDeleteFile = (i) => {
        if (files[i] instanceof File) {
            setFileDownload(fileDownload => fileDownload.filter(el => el.name !== files[i].name));
        } else {
            fileDelete.push(files[i].id);
            setFileDelete(fileDelete);
        }
        setFiles(files => files.filter(el => el !== files[i]));
    }

    return (
        <div className={files?.length && styles.inputWrapper}>
            {(!isMentor || isComment) && <label className={`${styles.inputFile} ${(
                // (stepStatus.notStarted || !stepStatus.inProgress || stepStatus.isSubmitted) && !isComment)
                !stepStatus.inProgress) 
                ? `${styles.disabled}` 
                : ""} ${isComment ? styles.inputFileMobile : ""}`}>
                <span className={`text4 ${styles.inputFileText} ${!isComment ? styles.inputWidth : ""}`}>Выберите файл</span>
                <input 
                    type="file" 
                    name="file" 
                    multiple={multiple}
                    onChange={handleAddFile} 
                    className={styles.visuallyHidden}
                    accept={accept}
                />        
                <span className={`text2 ${styles.inputFileBtn}`}>Загрузить</span>
            </label>}

            {(isMentor && !isComment) && !files?.length &&
            <p className="text1">Пока не добавлено ни одного документа</p>
            }
            {files &&
            <ul className={`text2 ${styles.documentsList}`}>
                {files.map((item, i) => (
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
                        {(!isMentor || isComment) && (!stepStatus.notStarted || stepStatus.inProgress || !stepStatus.isSubmitted || !stepStatus.isAccept) &&//--------уточнить условия отображения 
                        <button 
                            type="button"
                            className={styles.buttonDeleteFile}
                            onClick={() => handleDeleteFile(i)}
                            aria-label="Удалить файл"
                            disabled={disabledButton}
                        >
                            <IconDelete/>
                        </button>}
                    </li>
                ))}
            </ul>}
        </div>
    )
}