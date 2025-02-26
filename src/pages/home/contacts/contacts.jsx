import { Link } from "react-router-dom";

import styles from "./contacts.module.css";
import { ReactComponent as IconVK } from "./images/icon-VK.svg";

export default function Contacts() {
    const contacts = [
        {
            id: 1,
            title: 'График работы: ',
            text: '11:00-18:00',
        },
        {
            id: 2,
            title: 'Телефон: ',
            text: '8 (8342) 22-32-50',
            link: true,
        },
        {
            id: 3,
            title: 'Почта: ',
            text: 'licey-mrsu@yandex.ru',
            link: true,
        },
    ]
    return (
        <section className="contentBox">
            <div className={styles.blockWrapper}>
                <h2 className="visually-hidden">Контакты</h2>
                <h3 className="titleH3">
                    Остались вопросы?
                    <br></br>
                    Свяжитесь с&nbsp;организаторами удобным для Вас способом
                </h3>
                <ul className={`text2 ${styles.contactsList}`}>
                    {contacts.map((item) => (
                        <li key={item.id}>
                            {item.title}
                            {/* (item.href === mailto) || (item.href === tel)
                            ? <a href>{item.text}</a>
                            :  */}
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
                <p className={`text3 ${styles.contactsVK}`}>Следите за&nbsp;новостями&nbsp;в
                    <Link to="https://vk.com/liceymrsu">
                        <IconVK></IconVK>
                    </Link>
                </p>
            </div>
        </section>
    )
}