import { NavLink } from "react-router-dom";
import cn from "classnames";

import styles from "./logo.module.css";

export default function Logo({ src, onClick, addClass, mobileMenu }) {
    const className = cn(styles.logo, addClass);
    return (
        <>
            { !mobileMenu ?
                <NavLink to="/" className={className}>
                    <img src={src} alt="Логотип сайта"></img>
                </NavLink> :
                <button type="button" onClick={onClick} className={className}>
                    <img src={src} alt="Логотип сайта"></img>
                </button>
            }
        </>
    )
}