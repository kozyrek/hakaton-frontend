import Button from "../../../components/button/button";

import styles from "./gallery.module.css";
import img1 from "./images/img-1.png";
import img2 from "./images/img-2.png";
import img3 from "./images/img-3.png";
import img4 from "./images/img-4.png";
import img5 from "./images/img-5.png";

export default function Gallery() {
    const photos = [
        {
            id: 1,
            image: img1,
        },
        {
            id: 2,
            image: img2,
        },
        {
            id: 3,
            image: img3,
        },
        {
            id: 4,
            image: img4,
            wide: true,
        },
        {
            id: 5,
            image: img5,
        },
    ]

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
            <Button link large addClass={styles.buttonTop} text="Регистрация"></Button>
        </section>
    )
}