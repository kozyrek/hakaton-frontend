import { Link } from "react-router-dom";

import styles from "./button.module.css";

export default function Button(props) {
    const {link, text, path, large, white} = props;
    return (
        link ? (
            <Link to={path} className={`${large ? styles.buttonLarge : styles.buttonSmall} ${white ? styles.buttonWhite : styles.buttonBlue} ${styles.button}`}>{text}</Link>
        ) : (
        <button className={`${large ? styles.buttonLarge : styles.buttonSmall} ${white ? styles.buttonWhite : styles.buttonBlue} ${styles.button}`}>{text}</button>
        )
    )
}