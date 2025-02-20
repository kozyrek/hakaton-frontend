import { Container } from "react-bootstrap";
import Logo from "../logo/logo";
import { Link } from "react-router-dom";
import Navigation from "../navigation/navigation";

import styles from "./footer.module.css";


export default function Footer() {
    const navLinks = [
        {
            id: 1,
            title: "О\u00A0нас",
            path: '/',
        },
        {
            id: 2,
            title: "Для кого",
            path: '/',
        },
        {
            id: 3,
            title: "Команда",
            path: '/',
        },
        {
            id: 4,
            title: "Галерея",
            path: '/',
        },
        {
            id: 5,
            title: "Отзывы",
            path: '/',
        },
        {
            id: 6,
            title: "Вопросы",
            path: '/',
        },
        {
            id: 7,
            title: "Положение о\u00A0хакатоне",
            path: '/',
        },
    ]

    return (
        <div className={styles.footerWrapper}>
            <Container>
                <div className={styles.footerContacts}>
                    <Logo></Logo>
                    <Link>8 (8342) 22-32-50</Link>
                    <Link>licey-mrsu@yandex.ru</Link>
                </div>

                <Navigation arr={navLinks} addClass={styles.navLink}></Navigation>

                <p>&copy;&nbsp;2025&nbsp;МГУ им. Н.П. ОГАРЁВА</p>

                <div className={styles.politics}>
                    <Link to="/">Политика конфиденциальности</Link>
                    <Link to="/">Пользовательское соглашение</Link>
                </div>
            </Container>
        </div>
    )
}