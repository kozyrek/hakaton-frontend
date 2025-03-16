import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./navigation.module.css";

export default function Navigation({ arr, addClass }) {

    return (
        <ul className={classNames(styles.navLinkList, addClass)}>
            {arr.map((item) => (
                <li key={item.id}  >
                    <NavLink to={item.path} className={`text2 ${styles.navLinkItem}`}>
                        {item.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}