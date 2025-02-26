import styles from "./partners.module.css";
import partner1 from "./images/partner-1.svg";
import partner2 from "./images/partner-2.svg";
import partner3 from "./images/partner-3.svg";
import partner4 from "./images/partner-4.svg";
import partner5 from "./images/partner-5.svg";
import partner6 from "./images/partner-6.svg";
import partner7 from "./images/partner-7.svg";
import partner8 from "./images/partner-8.svg";
import partner9 from "./images/partner-9.svg";
import partner10 from "./images/partner-10.svg";

export default function Partners() {
    const partners = [
        {
            id: 1,
            image: partner1,
        },
        {
            id: 2,
            image: partner2,
        },
        {
            id: 3,
            image: partner3,
        },
        {
            id: 4,
            image: partner4,
        },
        {
            id: 5,
            image: partner5,
        },
        {
            id: 6,
            image: partner6,
        },
        {
            id: 7,
            image: partner7,
        },
        {
            id: 8,
            image: partner8,
        },
        {
            id: 9,
            image: partner9,
        },
        {
            id: 10,
            image: partner10,
        },
    ]
    return (
        <section className="contentBox">
            <h2 className="titleH2">Наши партнеры</h2>
            <ul className={styles.partnersList}>
                {partners.map((item) => (
                    <li key={item.id} className={styles.partnersItem}>
                        <img src={item.image} alt="Логотип партнера"></img>
                    </li>
                ))}
            </ul>
        </section>
    )
}