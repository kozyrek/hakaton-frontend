import { management, statistics } from "../utils/utils";

import styles from "./aboutUs.module.css";
import PersonCard from "../../../components/person-card/personCard";

export default function AboutUs() {
    return (
        <section className={`${styles.wrapper} contentBox`}>
            <div>
                <h2 className="titleH2">О&#8239;&#8239;нас</h2>
                <p className={`text3 ${styles.subtitle}`}>
                    Федеральное государственное бюджетное образовательное учреждение высшего образования &laquo;Национальный исследовательский Мордовский государственный университет&nbsp;им. Н.П. Огарёва&raquo;
                </p>
                <div className={`text1 ${styles.textWrapper}`}>
                    <p>Научный Хакатон&nbsp;&mdash; это уникальный проект, созданный для развития талантливой молодежи и&nbsp;популяризации науки. Мы&nbsp;помогаем школьникам и&nbsp;студентам СПО раскрыть свой потенциал, решая реальные научные задачи в&nbsp;команде под руководством опытных менторов&nbsp;&mdash; ученых и&nbsp;педагогов.</p>
                    <p>Наш проект поддерживает цели Десятилетия науки и&nbsp;технологий в&nbsp;России, способствуя вовлечению молодежи в&nbsp;исследования и&nbsp;разработки. Кейсы, которые решают участники, разработаны с&nbsp;учетом приоритетных направлений Стратегии научно-технологического развития России.</p>
                    <p>Мы&nbsp;верим, что наука&nbsp;&mdash; это не&nbsp;только сложные формулы, но&nbsp;и&nbsp;возможность изменить мир к&nbsp;лучшему.</p>
                </div>
            </div>
            <ul className={styles.managementList}>
                {management.map((item) => (
                    <li key={item.id}>
                        <PersonCard item={item}/>
                    </li>
                ))}
            </ul>
            <ul className={styles.statisticsList}>
                {statistics.map((item) => (
                    <li key={item.id} className={styles.statisticsItem}>
                        <span>{item.value}</span>
                        <span className={`text3 ${styles.statisticsText}`}>{item.text}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}