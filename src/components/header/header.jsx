import { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useResize } from "../../hooks/useResize";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import getUser from "../../api/getUser";
import { 
    set_user, 
    // logout 
} from "../../store/user/userSlice";
import { scrollPageLock, scrollPageUnlock } from "../../utils/scrollLock";
import Logo from "../logo/logo";
import Navigation from "../navigation/navigation";
import Button from "../button/button";
import UserBlock from "./userBlock";
import cn from "classnames";
import { navLinks } from "../utils/utils";

import styles from "./styles/header.module.css";
import SvgLogo from "../../assests/images/svg/logo.svg";
import LogoBlack from "../../assests/images/svg/logo-black.svg";
import Burger from "./images/Burger";
import Close from "./images/Close";

export default function Header() {
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let isLogIn = false;
    let user = {};
    const token = useSelector((state)=>state.user.token.accessToken);

    useEffect(() => {
        const setUser = async () => {
            if (token) {
                const user = await getUser(token);
                if (user) {
                    dispatch(set_user(user))
                };
            } else {
                navigate(ROUTES.LOGIN)
            }
        }
        setUser();
        // eslint-disable-next-line
    }, []);
    
    user = useSelector((state)=>state.user.user);
    if (Object.keys(user).length !== 0) {
        isLogIn = true;
    } else {
        isLogIn = false
    }

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    useEffect(() => {
        if (menuIsOpen) {
            scrollPageLock(scrollWidth);
        } else {
            scrollPageUnlock();
        }
    })
    
    const OpenMenu = () => {
        setMenuIsOpen(!menuIsOpen);       
    }

    const handleCLick = () => {
        navigate(ROUTES.MAIN);
        if (menuIsOpen) {
            setMenuIsOpen(!menuIsOpen);
        }
    }

    const location = useLocation();
    const lastHash = useRef('');
    const width = useResize();
    const navbarHeight = width > 1024 ? "80" : "70" 
    // listen to location change using useEffect with location as dependency
    // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
    useEffect(() => {
        if (location.hash) {
            lastHash.current = location.hash.slice(1);
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            const element = document.getElementById(lastHash.current);
        setTimeout(() => {
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - navbarHeight,
                    behavior: 'smooth',
                })
            }
            lastHash.current = '';
            if (menuIsOpen) {
                setMenuIsOpen(!menuIsOpen);
            }
        }, 100);
        }
    }, [location]);

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
                        <Logo mobileMenu src={LogoBlack} addClass={styles.logoNavMenu} onClick={handleCLick} />
                        <Navigation isHeader arr={navLinks} addClass={styles.navLinkList}></Navigation>
                    </div>
                    { isLogIn
                        ? <UserBlock user={user}/>
                        : <Button white text="Войти" path="login" addClass={styles.buttonLogIn}></Button>
                    }
                    <button 
                        className={classNameButton} 
                        onClick={OpenMenu}
                        aria-label={menuIsOpen ? "Закрыть мобильное меню" : "Открыть мобильное меню"}
                    >
                        {menuIsOpen ? <Close /> : <Burger />}
                    </button>
                </div>
            </Container>
        </div>
    )
}