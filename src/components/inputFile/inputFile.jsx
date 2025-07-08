import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import IconDelete from "../../assests/images/icon/icon-delete";
import IconPaperclip from "../../assests/images/icon/icon-paperclip";

import styles from "./inputFile.module.css";

export default function InputFile({fileDownload, setFileDownload, stepStatus, multiple, isComment}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [files, setFiles] = useState([]);

    useEffect(() => {
        setFiles(fileDownload);
        console.log("файлы в компоненте", files)
        // eslint-disable-next-line
    }, [fileDownload])

    const handleAddFile = (e) => {
        //добавить валидацию файла--------------------------------------
        e.preventDefault();
        if (files?.length) {
            setFiles([...files, ...Array.from(e.target.files)]);
            setFileDownload([...files, ...Array.from(e.target.files)])
        } else {
            setFiles(Array.from(e.target.files));
            setFileDownload(Array.from(e.target.files));
        }
    }

    const handleDeleteFile = (i) => {
        setFiles(files => files.filter(el => el !== files[i]));
        setFileDownload(files => files.filter(el => el !== files[i]));
    }

    return (
        <div className={files?.length && styles.inputWrapper}>
            {(!isMentor || isComment) && <label className={`${styles.inputFile} ${(
                (stepStatus.notStarted || !stepStatus.inProgress || stepStatus.isSubmitted) && !isComment) 
                ? `${styles.disabled}` 
                : ""}`}>
                <span className={`text4 ${styles.inputFileText}`}>Выберите файл</span>
                <input 
                    type="file" 
                    name="file" 
                    multiple={multiple}
                    onChange={handleAddFile} 
                    className={styles.visuallyHidden}
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
                        >
                            <IconDelete/>
                        </button>}
                    </li>
                ))}
            </ul>}
        </div>
    )
}