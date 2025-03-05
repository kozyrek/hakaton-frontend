import { useState } from "react";
import { Container } from "react-bootstrap";

// import MainContainer from "../container/mainContainer";
import Logo from "../logo/logo";
import Navigation from "../navigation/navigation";
import Button from "../button/button";
import UserBlock from "./userBlock";
import cn from "classnames";

import styles from "./styles/header.module.css";
import SvgLogo from "../../assests/images/svg/logo.svg";
import LogoBlack from "../../assests/images/svg/logo-black.svg";
import userImage from "./images/image.jpg";
import Burger from "./images/Burger";
import Close from "./images/Close";

export default function Header() {
    const [isLogIn, setIsLogIn] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    function OpenMenu() {
        setMenuIsOpen(!menuIsOpen);
    }

    const user = {
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        image: userImage,
    }
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

    const classNameButton = cn(styles.buttonMenu, {
        [styles.buttonMenuOpen]: menuIsOpen
    });

    const classNameNavBlock = cn(styles.navBlock, {
        [styles.navBlockOpen]: menuIsOpen
    });

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <Logo src={SvgLogo} />
                    {menuIsOpen ? <div onClick={OpenMenu} className={styles.overlay}></div> : null}
                    <div className={classNameNavBlock}>
                        <Logo src={LogoBlack} addClass={styles.logoNavMenu}/>
                        <Navigation arr={navLinks} addClass={styles.navLinkList}></Navigation>
                    </div>
                    { isLogIn
                        ? <UserBlock user={user}/>
                        : <Button white text="Войти" path="login" addClass={styles.buttonLogIn}></Button>
                    }
                    <button className={classNameButton} onClick={OpenMenu}>
                        {menuIsOpen ? <Close /> : <Burger />}
                    </button>
                </div>
            </Container>
        </div>
    )
}