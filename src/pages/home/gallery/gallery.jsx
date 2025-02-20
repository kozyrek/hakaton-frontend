import { Row, Col } from "react-bootstrap";
import Button from "../../../components/button/button";

import styles from "./gallery.module.css";
import img1 from "./images/img-1.png";
import img2 from "./images/img-2.png";
import img3 from "./images/img-3.png";
import img4 from "./images/img-4.png";
import img5 from "./images/img-5.png";

export default function Gallery() {
    return (
        <section className="contentBox">
            <h2>Яркие моменты с прошедших хакатонов</h2>
            <Row>
                <Col xs={4} className={styles.imageWrapper}>
                    <img src={img1} alt="Фотография хакатона"></img>
                </Col>
                <Col xs={4} className={styles.imageWrapper}>
                    <img src={img2} alt="Фотография хакатона"></img>
                </Col>
                <Col xs={4} className={styles.imageWrapper}>
                    <img src={img3} alt="Фотография хакатона"></img>
                </Col>
            </Row>
            <Row>
                <Col xs={8} className={styles.imageWrapper}>
                    <img src={img4} alt="Фотография хакатона"></img>
                </Col>
                <Col xs={4} className={styles.imageWrapper}>
                    <img src={img5} alt="Фотография хакатона"></img>
                </Col>
            </Row>
            <Button link large text="Регистрация"></Button>
        </section>
    )
}