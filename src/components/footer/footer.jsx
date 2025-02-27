import { Container } from "react-bootstrap";
import Logo from "../logo/logo";
import Logo1T from "../../assests/images/svg/logo-1T.svg";
import { Link } from "react-router-dom";
import Navigation from "../navigation/navigation";

import styles from "./footer.module.css";
import SvgLogo from "../../assests/images/svg/logo.svg";

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
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.block}>
                    <div className={styles.contacts}>
                        <Logo src={SvgLogo} />
                        <Link>8 (8342) 22-32-50</Link>
                        <Link>licey-mrsu@yandex.ru</Link>
                    </div>

                    <Navigation arr={navLinks} addClass={styles.navLinkList}></Navigation>

                    <p className={styles.copyright}>&copy;&nbsp;2025&nbsp;МГУ им. Н.П. ОГАРЁВА</p>

                    <div className={styles.politics}>
                        <Link to="/">Политика конфиденциальности</Link>
                        <Link to="/">Пользовательское соглашение</Link>
                    </div>
                    
                    <div className={styles.logo1T}>
                        <p>Сделано в</p>
                        <Link to="https://club.1t.ru/work" target="_blank">
                            <img src={Logo1T} width="107" height="24"alt="Логотип команда 1Т Клуб"></img>
                            <span>Teamcode</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}