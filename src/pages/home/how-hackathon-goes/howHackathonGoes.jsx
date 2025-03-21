import { consist, stages, important } from "../utils/utils";

import styles from "./howHackathonGoes.module.css";
import image from "./images/image.png";

export default function HowHackathonGoes() {
    return(
        <section className="contentBox">
            <h2 className="titleH2">Как это происходит?</h2>
            <ul className={styles.cards}>
                <li className={styles.blockWrapper}>
                    <p className="text3">Что включает мероприятие:</p>
                    <ul>
                        {consist.map((item) => (
                            <li key={item.id}>{item.text}</li>
                        ))}
                    </ul>
                    <p className="text3">Хакатон&nbsp;&mdash; это интенсивное командное соревнование, где за&nbsp;ограниченное время нужно решить научный кейс и&nbsp;представить его решение.</p>
                </li>
                <li className={styles.imageWrapper}>
                    <img src={image} alt="Фотография участников хакатона"></img>
                    <p className={`text3 ${styles.text}`}>Хакатон&nbsp;&mdash; это не&nbsp;только про науку, но&nbsp;и&nbsp;про атмосферу творчества,<br></br>драйва и&nbsp;новых возможностей!</p>
                </li>
                <li className={`${styles.blockWrapper} ${styles.cardStages}`}>
                    <p className="text3">Этапы участия:</p>
                    <ul>
                        {stages.map((item) => (
                            <li key={item.id}>
                                <span className="text2">{item.title}</span>
                                {item.text}
                            </li>
                        ))} 
                    </ul>
                </li>
                <li className={styles.blockWrapper}>
                    <p className="text3">Что важно?</p>
                    <ul>
                        {important.map((item) => (
                            <li key={item.id}>{item.text}</li>
                        ))}
                    </ul>
                </li>
            </ul>
        </section>
    )
}