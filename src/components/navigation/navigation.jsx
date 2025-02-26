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
        <ul className={classNames(styles.navLinkList, addClass)}>
            {arr.map((item) => (
                <li key={item.id}  >
                    <NavLink to={item.path} className={styles.navLinkItem}>
                        {item.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}