import { useState } from "react";
import Slider from "../../../components/slider/slider";
import ReviewCard from "./reviewCard";
import { reviews } from "../utils/utils";

import styles from "./styles/reviews.module.css";
import stylesCardItem from "./styles/reviewCard.module.css";
import CloseIcon from "./images/closeIcon";

export default function Reviews() {
    const [modalIsOpen, setModalIsOpen] = useState(null);

    return (
        <section className="contentBox">
            <h2 className="titleH2">Отзывы участников</h2>
            <Slider items={reviews} Component={ReviewCard} setModalIsOpen={setModalIsOpen}/>

            <div onClick={() => {setModalIsOpen(!modalIsOpen)}} className={`overlay ${styles.overlay} ${modalIsOpen ? styles.animationBlock : ''}`}></div>
            
            <div className={`${styles.modalWrapper} ${modalIsOpen ? styles.animationBlock : ''}`}>
                {modalIsOpen && <ReviewCard item={modalIsOpen} addClass={`${stylesCardItem.modal} ${styles.modal}`}/>}
                <div
                    className={styles.closeIcon}
                    onClick={() => setModalIsOpen(!modalIsOpen)}
                    aria-label="Закрыть окно"
                >
                    <CloseIcon />
                </div>
            </div>
        </section>
    )
}