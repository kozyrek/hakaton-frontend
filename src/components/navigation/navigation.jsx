import { NavLink, 
    // useLocation
 } from "react-router-dom";
import classNames from "classnames";

import styles from "./navigation.module.css";

export default function Navigation({ arr, addClass }) {
    // const location = useLocation();

    return (
        // location.pathname === '/' ?
        // <></> :
        <nav className={classNames(addClass)}>
            {arr.map((item) => (
                <NavLink key={item.id} to={item.path} className={styles.navLinkItem}>{item.title}</NavLink>
            ))}
        </nav>
    )
}