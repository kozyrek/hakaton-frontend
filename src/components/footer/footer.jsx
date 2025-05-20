import { Container } from "react-bootstrap";
import Logo from "../logo/logo";
import Logo1T from "../../assests/images/svg/logo-1T.svg";
import { Link } from "react-router-dom";
import Navigation from "../navigation/navigation";
import { navLinks } from "../utils/utils";
import { contacts } from "../../pages/home/utils/utils";

import styles from "./footer.module.css";
import SvgLogo from "../../assests/images/svg/logo.svg";

export default function Footer() {
    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.block}>
                    <div className={styles.contacts}>
                        <Logo src={SvgLogo} addClass={styles.logo}/>
                        <ul className={`text2 ${styles.contactsList}`}>
                            {contacts.map((item) => (
                                (item.tel || item.email) && <li key={item.id}>
                                    <a 
                                        className={`text3 ${styles.contactsItem}`}
                                        href={
                                            item.tel
                                            ? `tel:${item.tel}`
                                            : `mailto:${item.email}`
                                        }
                                    >{item.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Navigation isFooter arr={navLinks} addClass={styles.navLinkList}></Navigation>

                    <p className={`text4 ${styles.copyright}`}>&copy;&nbsp;2025&nbsp;МГУ им. Н.П. ОГАРЁВА</p>

                    <div className={styles.politics}>
                        <Link to="/" className="text4">Пользовательское соглашение</Link>
                        <Link to="/" className="text4">Политика конфиденциальности</Link>
                    </div>
                    
                    <div className={styles.logo1T}>
                        <p>Сделано&nbsp;в</p>
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