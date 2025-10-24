import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./navigation.module.css";

export default function Navigation({ arr, addClass, isHeader, isFooter }) {
    return (
        <ul className={classNames(styles.navLinkList, addClass)}>
            {arr.map((item) => (
                ((isHeader && !item.isFooter) || isFooter) &&
                <li key={item.id}  >
                    <NavLink 
                        to={item.path} 
                        className={`text2 ${styles.navLinkItem}`}
                        target={item.target}
                        rel={item.rel}
                    >
                        {item.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}