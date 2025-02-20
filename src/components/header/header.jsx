// import MainContainer from "../container/mainContainer";
import { Container } from "react-bootstrap";
import Logo from "../logo/logo";
import Navigation from "../navigation/navigation";
import Button from "../button/button";

import styles from "./header.module.css";

export default function Header() {
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
    ]

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.headerWrapper}>
                    <Logo></Logo>
                    <Navigation arr={navLinks} addClass={styles.navLinkList}></Navigation>
                    <Button link white text="Вход" path="login"></Button>
                </div>
            </Container>
        </div>
    )
}