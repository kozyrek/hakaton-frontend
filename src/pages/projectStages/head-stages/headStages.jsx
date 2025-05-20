import Button from "../../../components/button/button";

import styles from "./headStages.module.css";

export default function HeadStages({obj}) {
    return (
        <section className={styles.wrapper}>
            <h1 className={`titleH1 ${styles.title}`}>«{obj.name}»</h1>
            <p className={`text3 ${styles.text}`}>
                {obj.description}
            </p>
            <Button 
                path={obj.documentPath}
                text='Смотреть документ проекта'
                target="_blank"
                rel="noreferrer"
                large 
                white
                disabled={!obj.documentPath}
            />
        </section>
    )
}