import styles from "./howHackathonGoes.module.css";
import image from "./images/image.png";

export default function HowHackathonGoes() {
    const consist = [
        {
            id: 1,
            text: 'Курс \u00ABОсновы проектной деятельности\u00BB',
        },
        {
            id: 2,
            text: '2\u00A0проектные сессии',
        },
        {
            id: 3,
            text: '1\u00A0презентация',
        },
        {
            id: 4,
            text: '2\u00A0лекции и\u00A0мастер-класса',
        },
        {
            id: 5,
            text: '1\u00A0профориентационный питч',
        },
        {
            id: 6,
            text: '1\u00A0профориентационная игра, научная и\u00A0образовательная викторина',
        },
    ]

    const stages = [
        {
            id: 1,
            title: 'Формирование команд. ',
            text: 'Участники объединяются в\u00A0команды (из\u00A0одной образовательной организации) и\u00A0выбирают кейс.',
        },
        {
            id: 2,
            title: 'Работа над проектом. ',
            text: 'Команда разрабатывает решение под руководством ментора\u00A0\u2014 ученого или педагога.',
        },
        {
            id: 3,
            title: 'Образовательная программа. ',
            text: 'Участники посещают лекции, мастер-классы и\u00A0викторины, чтобы глубже погрузиться в\u00A0тему.',
        },
        {
            id: 4,
            title: 'Питч-сессия. ',
            text: 'Команда представляет свой проект жюри в\u00A0формате презентации, макета или видео.',
        },
        {
            id: 5,
            title: 'Итоги. ',
            text: 'Лучшие проекты выбираются на\u00A0основе защиты кейсов и\u00A0получают признание экспертов.',
        },
    ]

    const important = [
        {
            id: 1,
            text: 'Проект создается с\u00A0нуля прямо на\u00A0хакатоне.',
        },
        {
            id: 2,
            text: 'Решения должны быть научно обоснованными и\u00A0опираться на\u00A0методы исследований.',
        },
        {
            id: 3,
            text: 'Защита проекта\u00A0\u2014 это возможность ярко и\u00A0интерактивно представить свои идеи.',
        },
    ]

    return(
        <section className="contentBox">
            <h2 className="titleH2">Как это происходит?</h2>
            <ul className={styles.cards}>
                <li className={`${styles.blockWrapper}`}>
                    <p className="text3">Что включает мероприятие:</p>
                    <ul>
                        {consist.map((item) => (
                            <li key={item.id}>{item.text}</li>
                        ))}
                    </ul>
                    <p className="text3">Хакатон&nbsp;&mdash; это интенсивное командное соревнование, где за&nbsp;ограниченное время нужно решить научный кейс и&nbsp;представить его решение.</p>
                </li>
                <li className={`${styles.card} ${styles.cardImage}`}>
                    <div className={styles.imageWrapper}>
                        <img src={image} alt="Фотография участников хакатона"></img>
                    </div>
                    <p className={`text3 ${styles.text}`}>Хакатон&nbsp;&mdash; это не&nbsp;только про науку, но&nbsp;и&nbsp;про атмосферу творчества,<br></br>драйва и&nbsp;новых возможностей!</p>
                </li>
                <li className={`${styles.blockWrapper} ${styles.card} ${styles.cardStages}`}>
                    <p className="text3">Этапы участия:</p>
                    <ul>
                        {stages.map((item) => (
                            <li key={item.id}>
                                <span className="text2">{item.title}</span>
                                {item.text}
                            </li>
                        ))} 
                    </ul>
                </li>
                <li className={`${styles.blockWrapper}`}>
                    <p className="text3">Что важно?</p>
                    <ul>
                        {important.map((item) => (
                            <li key={item.id}>{item.text}</li>
                        ))}
                    </ul>
                </li>
            </ul>
        </section>
    )
}