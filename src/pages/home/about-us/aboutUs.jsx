import image1 from "./images/image-1.png";
import image2 from "./images/image-2.png";

import styles from "./aboutUs.module.css";

export default function AboutUs() {
    const management = [
        {
            id: 1,
            url: image1,
            name: "Бачкова Ирина Александровна",
            description: "директор Лицея МГУ им. Н.\u00A0П.\u00A0Огарева, учитель информатики высшей квалификационной категории, Лауреат Премии Президента\u00A0РФ",
        },
        {
            id: 2,
            url: image2,
            name: "Зарубин Олег Александрович ",
            description: "кандидат географических наук, директор Центра проектирования научно-образовательного пространства университета МГУ им. Н.\u00A0П.\u00A0Огарева, Председатель совета молодых ученых МГУ им. Н.\u00A0П.\u00A0Огарева"
        },
    ]

    const statistics = [
        {
            id: 1,
            value: "100+",
            text: "общее количество участников",
        },
        {
            id: 2,
            value: "7",
            text: "общее количество мероприятий",
        },
        {
            id: 3,
            value: "10+",
            text: "количество разработано кейсов",
        },
        {
            id: 4,
            value: "500 000+",
            text: "количество просмотров в\u00A0социальных сетях и\u00A0СМИ",
        },
    ]

    return (
        <section className={`${styles.wrapper} contentBox`}>
            <div>
                <h2 className="titleH2">О&nbsp;нас</h2>
                <p>
                    <b>
                        Федеральное государственное бюджетное образовательное учреждение высшего образования &laquo;Национальный исследовательский Мордовский государственный университет&nbsp;им. Н.П. Огарёва&raquo;
                    </b>   
                </p>
                <p>
                    Научный Хакатон&nbsp;&mdash; это уникальный проект, созданный для развития талантливой молодежи и&nbsp;популяризации науки. Мы&nbsp;помогаем школьникам и&nbsp;студентам СПО раскрыть свой потенциал, решая реальные научные задачи в&nbsp;команде под руководством опытных менторов&nbsp;&mdash; ученых и&nbsp;педагогов.
                    
                    <br></br>
                    Наш проект поддерживает цели Десятилетия науки и&nbsp;технологий в&nbsp;России, способствуя вовлечению молодежи в&nbsp;исследования и&nbsp;разработки. Кейсы, которые решают участники, разработаны с&nbsp;учетом приоритетных направлений Стратегии научно-технологического развития России.
                    
                    <br></br>
                    Мы&nbsp;верим, что наука&nbsp;&mdash; это не&nbsp;только сложные формулы, но&nbsp;и&nbsp;возможность изменить мир к&nbsp;лучшему.
                </p>
            </div>
            <ul className={styles.managementList}>
                {management.map((item) => (
                    <li key={item.id} className={styles.managementItem}>
                        <div>
                            <img src={item.url} alt="Фотография руководителя"></img>
                        </div>
                        <p className={styles.managementName}>{item.name}</p>
                        <p>{item.description}</p>
                    </li>
                ))}

            </ul>
            <ul className={styles.statisticsList}>
                {statistics.map((item) => (
                    <li key={item.id} className={styles.statisticsItem}>
                        <span>{item.value}</span>
                        <span>{item.text}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}