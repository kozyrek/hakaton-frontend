import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./navigation.module.css";

export default function Navigation({ arr, addClass }) {
    return (
        <nav className={classNames(addClass)}>
            {arr.map((item) => (
                <NavLink to={item.path} className={styles.navLinkItem}>{item.title}</NavLink>
            ))}
        </nav>
    )
}