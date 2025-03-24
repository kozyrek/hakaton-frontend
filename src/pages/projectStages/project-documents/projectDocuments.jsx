import { Link } from "react-router-dom";
import Button from "../../../components/button/button";

import styles from "./projectDocuments.module.css";

export default function ProjectDocuments({arr}) {
    return (
        <div className={`contentBox ${styles.documentsBlock}`}>
            <h3 className={`titleH3 ${styles.title}`}>Документы проекта</h3>
            {arr.length !== 0 ? (
                <ul className={`text2 ${styles.documentsList}`}>
                    {arr.map((item, i) => (
                        <li key={i}>
                            <Link className="tetx2">
                            {item}{/*----------------*/}
                            </Link>
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
                disabled={arr.length === 0}
            ></Button>
        </div>
    )
}