import { Link } from "react-router-dom";
import { forWhom, advantages } from "../utils/utils";

import styles from "./hackathon.module.css";
import stylesButton from "../../../components/button/button.module.css";
import image from "./images/image.png";

export default function Hackathon() {
    return (
        <section id="forwhom" className="contentBox">
            <h2 className={`titleH2 ${styles.title}`}>Что такое хакатон?</h2>
            <p className={`text3 ${styles.subtitle}`}>Хакатон&nbsp;&mdash; это твой шанс создать что-то значимое и&nbsp;сделать первый шаг к&nbsp;будущей карьере в&nbsp;науке или технологиях!</p>

            <ul className={styles.hackathonCards}>
                <li className={styles.blockWrapper}>
                    <p className={`text2 ${styles.text}`}>Хакатон рассчитан для учащихся 9&ndash;11 классов и&nbsp;студентов СПО, которые:</p>
                    <ul className={styles.hackathonList}>
                        {forWhom.map((item) => (
                            <li key={item.id} className="text1">{item.text}</li>
                        ))}
                    </ul>
                </li>
                <li className={styles.imageWrapper}>
                    <img src={image} alt="Фотография участников хакатона"></img>
                </li>
                <li className={styles.blockWrapper}>
                    <p className={`text2 ${styles.text}`}>Почему это важно?</p>
                    <ul className={styles.hackathonList}>
                        {advantages.map((item) => (
                            <li key={item.id} className="text1">{item.text}</li>
                        ))}
                    </ul>
                </li>
            </ul>
            <Link 
                to="/Положение_о_научном_хакатоне_23_10_23.pdf"
                className={`${stylesButton.button} 
                ${stylesButton.buttonBlue} 
                ${stylesButton.buttonLarge} 
                ${styles.buttonTop}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Положение о хакатоне
            </Link>
        </section>
    )
}