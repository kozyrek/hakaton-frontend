import Button from "../../../components/button/button";

import styles from "./hackathon.module.css";
import image from "./images/image.png";

export default function Hackathon() {
    const forWhom = [
        {
            id: 1,
            text: 'Хотят развить свои навыки в\u00A0науке, технологиях и\u00A0проектной работе.',
        },
        {
            id: 2,
            text: 'Мечтают найти единомышленников и\u00A0работать в\u00A0команде.',
        },
        {
            id: 3,
            text: 'Стремятся к\u00A0профессиональному самоопределению и\u00A0хотят понять, как их\u00A0знания могут быть применены на\u00A0практике.',
        },
    ]

    const advantages = [
        {
            id: 1,
            text: 'Получишь реальный опыт решения научных задач, которые важны для общества.'
        },
        {
            id: 2,
            text: 'Научишься представлять свои идеи в\u00A0формате презентаций и\u00A0питчей.'
        },
        {
            id: 3,
            text: 'Станешь частью большого движения, которое популяризирует науку и\u00A0технологии в\u00A0России.'
        },
    ]
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
            <Button link large path="test" addClass={styles.buttonTop} text="Положение о хакатоне"></Button>
        </section>
    )
}