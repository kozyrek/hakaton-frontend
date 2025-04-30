import { Link } from "react-router-dom";
import { contacts } from "../utils/utils";

import styles from "./contacts.module.css";
import { ReactComponent as IconVK } from "./images/icon-VK.svg";

export default function Contacts() {
    return (
        <section className="contentBox">
            <div className={styles.blockWrapper}>
                <h2 className="visually-hidden">Контакты</h2>
                <h3 className="titleH3">
                    Остались вопросы?
                    <span>
                        Свяжитесь с организаторами удобным для&#8239;&#8239;Вас&#8239;&#8239;способом
                    </span>
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