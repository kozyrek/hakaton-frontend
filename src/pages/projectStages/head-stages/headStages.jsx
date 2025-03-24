import Button from "../../../components/button/button";

import styles from "./headStages.module.css";

export default function HeadStages({obj}) {
    return (
        <section className={styles.wrapper}>
            <h1 className={`titleH1 ${styles.title}`}>«{obj.title}»</h1>
            <p className={`text3 ${styles.text}`}>
                {obj.description}
            </p>
            <Button large white path="#" text='Смотреть документ проекта'></Button>
        </section>
    )
}