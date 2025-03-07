import Button from "../../../components/button/button";
import { forWhom, advantages } from "../utils/utils";

import styles from "./hackathon.module.css";
import image from "./images/image.png";

export default function Hackathon() {
    return (
        <section className="contentBox">
            <h2 className={`titleH2 ${styles.title}`}>Что такое хакатон?</h2>
            <p className={`text3 ${styles.text}`}>Хакатон&nbsp;&mdash; это твой шанс создать что-то значимое и&nbsp;сделать первый шаг к&nbsp;будущей карьере в&nbsp;науке или технологиях!</p>

            <ul className={styles.hackathonCards}>
                <li className={styles.blockWrapper}>
                    <p className="text2">Хакатон рассчитан для учащихся 9&ndash;11 классов и&nbsp;студентов СПО, которые:</p>
                    <ul className={styles.hackathonList}>
                        {forWhom.map((item) => (
                            <li key={item.id}>{item.text}</li>
                        ))}
                    </ul>
                </li>
                <li className={styles.imageWrapper}>
                    <img src={image} alt="Фотография участников хакатона"></img>
                </li>
                <li className={styles.blockWrapper}>
                    <p className="text2">Почему это важно?</p>
                    <ul className={styles.hackathonList}>
                        {advantages.map((item) => (
                            <li key={item.id}>{item.text}</li>
                        ))}
                    </ul>
                </li>
            </ul>
            <Button large path="test" addClass={styles.buttonTop} text="Положение о хакатоне"></Button>
        </section>
    )
}