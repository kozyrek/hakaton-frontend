import Button from "../../../components/button/button";
import styles from "./promo.module.css";

export default function Promo() {
    return (
        <section className={styles.wrapper}>
            <h1 className="titleH1">Научный хакатон</h1>
            <ul className={styles.promoList}>
                <li className="text2">Лицей ФГБОУ ВО&nbsp;&laquo;МГУ им. Н.&nbsp;П.&nbsp;Огарёва&raquo; Республика Мордовия</li>
                <li className="text2">Учащиеся 9&ndash;11 классов образовательных организаций и&nbsp;студенты СПО</li>
            </ul>
            <Button large white path="/registration" text='Регистрация'></Button>
        </section>
    )
}