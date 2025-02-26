import { NavLink } from "react-router-dom";
import cn from "classnames";

import styles from "./logo.module.css";

export default function Logo({ src, addClass }) {
    const className = cn(styles.logo, addClass);
    return (
        <NavLink to="/" className={className}>
            <img src={src} alt="Логотип сайта"></img>
        </NavLink>
    )
}