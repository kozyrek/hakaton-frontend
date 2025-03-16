import { useState } from "react";
import { Container } from "react-bootstrap";

// import { getToken } from "../../api/getToken";
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
    
    // getToken()
    // .then(
    //     result => console.log(result),
    //     error => console.log(error),
    // )

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
        [styles.buttonMenuOpen]: menuIsOpen,
        [styles.isLogIn]: isLogIn,
    });

    const classNameNavBlock = cn(styles.navBlock, {
        [styles.navBlockOpen]: menuIsOpen
    });

    const classNameWrapper = cn(styles.wrapper, {
        [styles.isLogIn]: isLogIn,
    });

    return (
        <div className={styles.header}>
            <Container>
                <div className={classNameWrapper}>
                    <Logo src={SvgLogo} addClass={styles.logo} />
                    {menuIsOpen ? <div onClick={OpenMenu} className={`overlay ${styles.overlay}`}></div> : null}
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