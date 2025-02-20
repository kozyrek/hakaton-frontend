import { Row, Col } from "react-bootstrap";
import Button from "../../../components/button/button";

import styles from "./hackathon.module.css";
import image from "./images/image.png";

export default function Hackathon() {
    return (
        <section className="contentBox">
            <Row>
                <h2>Что такое хакатон?</h2>
                <p>Хакатон&nbsp;&mdash; это твой шанс создать что-то значимое и&nbsp;сделать первый шаг к&nbsp;будущей карьере в&nbsp;науке или технологиях!</p>
            </Row>
            
            <Row>
                <Col xs={4} className={styles.blockWrapper}>
                    <p>Хакатон рассчитан для учащихся 9&ndash;11 классов и&nbsp;студентов СПО, которые:</p>
                    <ul className={`${styles.hackathonList} text1`}>
                        <li>Хотят развить свои навыки в&nbsp;науке, технологиях и&nbsp;проектной работе.</li>
                        <li>Мечтают найти единомышленников и&nbsp;работать в&nbsp;команде.</li>
                        <li>Стремятся к&nbsp;профессиональному самоопределению и&nbsp;хотят понять, как их&nbsp;знания могут быть применены на&nbsp;практике.</li>
                    </ul>
                </Col>

                <Col xs={4} className={styles.imageWrapper}>
                    <img src={image} alt="Фотография участников хакатона"></img>
                </Col>

                <Col xs={4} className={styles.blockWrapper}>
                    <p>Почему это важно?</p>
                    <ul>
                        <li>Получишь реальный опыт решения научных задач, которые важны для общества.</li>
                        <li>Научишься представлять свои идеи в&nbsp;формате презентаций и&nbsp;питчей.</li>
                        <li>Станешь частью большого движения, которое популяризирует науку и&nbsp;технологии в&nbsp;России.</li>
                </ul>
                </Col>
            </Row>
            <Button link large text="Положение о хакатоне"></Button>
        </section>
    )
}