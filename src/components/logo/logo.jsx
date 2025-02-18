import { NavLink } from "react-router-dom";
import {ReactComponent as SvgLogo} from "../../assests/images/svg/logo.svg";

import styles from "./logo.module.css";

export default function Logo() {
    return (
        <NavLink to="home" className={styles.logo}>
            <SvgLogo/>
        </NavLink>
    )
}