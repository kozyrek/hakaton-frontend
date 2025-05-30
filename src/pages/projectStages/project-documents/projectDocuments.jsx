import Button from "../../../components/button/button";
import downloadAllFiles from "../../../api/projects/downloadAllFiles";

import styles from "./projectDocuments.module.css";

export default function ProjectDocuments({files, projectId, isCompleteProject}) {
    const handleClick = () => {
        const response = downloadAllFiles(projectId);
        console.log("скачать все файлы проекта", response.data);
    }

    return (
        <div className={`contentBox ${styles.documentsBlock}`}>
            <h3 className={`titleH3 ${styles.title}`}>Документы проекта</h3>
            {files ? (
                <ul className={`text2 ${styles.documentsList}`}>
                    {files.map((item, i) => (
                        <li key={i}>
                            <a 
                                className="text2" 
                                href={item.filePath} 
                                target="_blank" 
                                rel="noreferrer"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul> 
                ) : (
                <p className="text1">Вы&nbsp;пока не&nbsp;загрузили ни&nbsp;одного документа</p>
            )}
            <Button 
                large 
                path="#" 
                text='Скачать проект' 
                addClass={styles.buttonTop}
                onClick={handleClick}
                // disabled={!files}
                disabled={!isCompleteProject}
            ></Button>
        </div>
    )
}