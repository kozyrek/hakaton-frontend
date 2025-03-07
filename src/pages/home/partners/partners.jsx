import { partners } from "../utils/utils";

import styles from "./partners.module.css";

export default function Partners() {
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