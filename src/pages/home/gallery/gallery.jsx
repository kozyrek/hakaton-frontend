import Button from "../../../components/button/button";
import { photos } from "../utils/utils";

import styles from "./gallery.module.css";

export default function Gallery() {
    return (
        <section className="contentBox">
            <h2 className="titleH2">Яркие моменты с прошедших хакатонов</h2>
            <ul className={styles.galleryList}>
                {photos.map((item) => (
                    <li key={item.id} className={`${styles.galleryItem} ${item.wide ? styles.galleryPhotoWide : ''}`}>
                        <img src={item.image} alt="Фотография хакатона"></img>
                    </li>
                ))}
            </ul>
            <Button large path="/registration" addClass={styles.buttonTop} text="Регистрация"></Button>
        </section>
    )
}