import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "./button.module.css";

export default function Button(props) {
    const {link, text, path, large, white, addClass} = props;

    const className = cn(styles.button, addClass, {
        [styles.buttonLarge]: large,
        [styles.buttonSmall]: !large,
        [styles.buttonWhite]: white,
        [styles.buttonBlue]: !white,
      });

    return (
        link ? (
            <Link to={path} className={className}>{text}</Link>
        ) : (
        <button className={className}>{text}</button>
        )
    )
}