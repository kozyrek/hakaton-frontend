// import MainContainer from "../container/mainContainer";
import { Container } from "react-bootstrap";
import Logo from "../logo/logo";
import Navigation from "../navigation/navigation";
import Button from "../button/button";

import styles from "./header.module.css";

export default function Header() {
    const navLinks = [
        {
            title: "О\u00A0нас",
            path: '/',
        },
        {
            title: "Для кого",
            path: '/',
        },
        {
            title: "Команда",
            path: '/',
        },
        {
            title: "Галерея",
            path: '/',
        },
        {
            title: "Отзывы",
            path: '/',
        },
        {
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